import { ExpressError } from "../../common/class/error";
import { OtpPurpose, UserEnum, UserServiceEnum } from "../../common/enum/enums";
import { AdminService, adminService } from "../admin/admin.service";
import {
  CustomerService,
  customerService,
} from "../user/customer/customer.service";
import jwt from "jsonwebtoken";
import { StoreService, storeService } from "../user/store/store.service";
import { CustomerRegisterDto, StoreDto, StoreRegisterDto } from "./auth.dto";
import { EnvConfig } from "../../config/envConfig";
import { Point } from "typeorm";
import emailService, { EmailService } from "../email/emai.service";
import { OTPService, otpService } from "../otp/otp.service";

export class AuthService {
  private storeService: StoreService;
  private customerService: CustomerService;
  private adminService: AdminService;
  private readonly emailService: EmailService;
  private readonly otpService: OTPService;
  constructor() {
    this.storeService = storeService;
    this.customerService = customerService;
    this.adminService = adminService;
    this.emailService = emailService;
    this.otpService = otpService;
  }


  async createToken(id: number, role: UserEnum, extraData?: any){
    return jwt.sign({id, role, extraData}, EnvConfig.jwtSecret, { expiresIn:EnvConfig.jwtExpiresInSec})
  }

  async verifyToken(token: string){
    return jwt.verify(token, EnvConfig.jwtSecret) as {id: number, role: string, extraData?: any};
  }
  

  async send(email: string, purpose:OtpPurpose) {
 
     const otp = await this.otpService.buildOtp(email, purpose);
      switch (purpose) {
        case OtpPurpose.SIGNUP_CUSTOMER:
          const user = await this.customerService.findByEmail(email);
          if (user) {
            throw new ExpressError(
              400,
              `User with email ${email} already exists. Please login.`
            );
          }

          this.emailService.mailCustomerRegister(email, otp.otp)
          break;

        case OtpPurpose.FORGOT_PASSWORD_CUSTOMER:
          const userForForgotPassword = await this.customerService.findByEmail(email);
          if (!userForForgotPassword) {
            throw new ExpressError(
              400,
              `User with email ${email} doesn't exists. Please signup.`
            );
          }
          // otp = otpCache.setOtpInCache(email, purpose);
          // await emailSender.forgotPassword(email, otp);
          break;

          case OtpPurpose.SIGNUP_STORE:
            const store = await this.customerService.findByEmail(email);
            if (store) {
              throw new ExpressError(
                400,
                `store with email ${email} already exists. Please login.`
              );
            }        
            this.emailService.mailStoreRegister(email, otp.otp)
            break;
  
          case OtpPurpose.FORGOT_PASSWORD_STORE:
            const storePasswordForgot = await this.customerService.findByEmail(email);
            if (!storePasswordForgot) {
              throw new ExpressError(
                400,
                `User with email ${email} doesn't exists. Please signup.`
              );
            }
  
            // otp = otpCache.setOtpInCache(email, purpose);
            // await emailSender.forgotPassword(email, otp);
            break;

        default:
          throw new ExpressError(400, "Invalid purpose");
      }
 
    
  }

  async registerStore(storeRegisterDto: StoreDto) {
    const { name, password,long, lat, email, ownerName, phoneNumber } =
      storeRegisterDto;

    //otp verification here
    const pointObject :Point= {
      type: "Point",
      coordinates: [parseFloat(long) , parseFloat(lat)]
  };
   
    const store = await this.storeService.createOne({
      name,
      password,
      location: pointObject,
      email,
      ownerName,
      phoneNumber,
    });
    return store;
  } 

  async registerUser(customerRegisterDto: CustomerRegisterDto) {
    const { name, password, email, phoneNumber } = customerRegisterDto;

    //otp verification here

    const newUser = await this.customerService.createOne({
      name,
      password,
      email,
      phoneNumber,
    });
    return newUser;
  }

  async validate(email: string, password: string, validateFor: UserEnum) {
    let validationResponse;
    let id;
    let role;
    let extraData;
    if (validateFor == UserEnum.STORE) {
      validationResponse = await this.storeService.findByEmail(email);
      if (!validationResponse) {
        throw new ExpressError(404, "Store not found");
      } 
      if(!validationResponse.is_approved){
        throw new ExpressError(400, "Your store is not approved.")
      }
    } else if (validateFor == UserEnum.CUSTOMER) {
      validationResponse = await this.customerService.findByEmail(email);
      if (!validationResponse) {
        throw new ExpressError(404, "User not found");
      }
    }
    else{
      validationResponse = await this.adminService.findByEmail(email);
      if (!validationResponse) {
        throw new ExpressError(404, "Admin not found");
      }  
    }
    //checking password
    const checkPassword = await validationResponse.verifyPassword(password);
    if (!checkPassword) {
      throw new ExpressError(400, "Incorrect password");
    }
    //creating token
    this.createToken(validationResponse.id, validateFor);

    return validationResponse;
  }
}


export const authService = new AuthService();