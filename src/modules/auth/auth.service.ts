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

  async createToken(id: number, role: UserEnum, extraData?: any) {
    return jwt.sign({ id, role, extraData }, EnvConfig.jwtSecret, {
      expiresIn: EnvConfig.jwtExpiresInSec,
    });
  }

  async verifyToken(token: string) {
    return jwt.verify(token, EnvConfig.jwtSecret) as {
      id: number;
      role: string;
      extraData?: any;
    };
  }

  async send(email: string, purpose: OtpPurpose, phoneNumber?: string) {
    let otp;
    console.log(phoneNumber);
    switch (purpose) {
      case OtpPurpose.SIGNUP_CUSTOMER:

        const user = await this.customerService.findByEmail(email);

        if (user) {
          throw new ExpressError(
            400,
            `User with email ${email} already exists. Please login.`
          );
        }

        if (!phoneNumber) {
          throw new ExpressError(
            400,
            `Please provide phone Number!`
          );
        }
        if (await this.customerService.findByNumber(phoneNumber)) {
          throw new ExpressError(
            400,
            `User with phone Number ${phoneNumber} already exists. Please login.`
          );
        }
        await this.otpService.revokeAllSimilarOtp(purpose, email);
        otp = await this.otpService.buildOtp(email, purpose);

        this.emailService.mailCustomerRegister(email, otp.otp);
        break;

      case OtpPurpose.FORGOT_PASSWORD_CUSTOMER:
        const userForForgotPassword = await this.customerService.findByEmail(
          email
        );
        if (!userForForgotPassword) {
          throw new ExpressError(
            400,
            `User with email ${email} doesn't exists. Please signup.`
          );
        }
        await this.otpService.revokeAllSimilarOtp(purpose, email);
        otp = await this.otpService.buildOtp(email, purpose);
        this.emailService.mailPasswordChange(email, otp.otp);
        break;

      case OtpPurpose.SIGNUP_STORE:
        const store = await this.storeService.findByEmail(email);
        if (store) {
          throw new ExpressError(
            400,
            `store with email ${email} already exists. Please login.`
          );
        }

        if (!phoneNumber) {
          throw new ExpressError(
            400,
            `Please provide phone Number!`
          );
        }
        if (await this.storeService.findByNumber(phoneNumber)) {
          throw new ExpressError(
            400,
            `store with phone Number ${phoneNumber} already exists. Please login.`
          );
        }
        await this.otpService.revokeAllSimilarOtp(purpose, email);
        otp = await this.otpService.buildOtp(email, purpose);

        this.emailService.mailStoreRegister(email, otp.otp);
        break;

      case OtpPurpose.FORGOT_PASSWORD_STORE:
        const storePasswordForgot = await this.storeService.findByEmail(
          email
        );
        if (!storePasswordForgot) {
          throw new ExpressError(
            400,
            `User with email ${email} doesn't exists. Please signup.`
          );
        }
        await this.otpService.revokeAllSimilarOtp(purpose, email);
        otp = await this.otpService.buildOtp(email, purpose);

        this.emailService.mailPasswordChange(email, otp.otp);
        break;

      default:
        throw new ExpressError(400, "Invalid purpose");
    }
  }

  async registerStore(storeRegisterDto: StoreDto) {
    const { name, password, long, lat, email, ownerName, phoneNumber } =
      storeRegisterDto;

    const pointObject: Point = {
      type: "Point",
      coordinates: [parseFloat(long), parseFloat(lat)],
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
    const newUser = await this.customerService.createOne({
      name,
      password,
      email,
      phoneNumber,
    });
    return newUser;
  }

  async changePassword(
    password: string,
    email: string,
    otpPurpose: OtpPurpose
  ) {
    switch (otpPurpose) {
      case OtpPurpose.FORGOT_PASSWORD_CUSTOMER:
        const customer = await this.customerService.changePassword(
          email,
          password
        );
        return "Sucesssfully Changed Password";
      case OtpPurpose.FORGOT_PASSWORD_STORE:
        const store = await this.storeService.changePassword(email, password);
        return "Sucesssfully Changed Password";
      default:
        return "Invalid Purpose";
    }
  }

  async validate(email: string, password: string, validateFor: UserEnum) {
    let validationResponse;
    if (validateFor == UserEnum.STORE) {
      validationResponse = await this.storeService.findByEmail(email);
      console.log(validationResponse)
      if (!validationResponse) {
        throw new ExpressError(404, "Store not found");
      }
      if (!validationResponse.is_approved) {
        throw new ExpressError(400, "Your store is not approved.");
      }
    } else if (validateFor == UserEnum.CUSTOMER) {
      validationResponse = await this.customerService.findByEmail(email);
      if (!validationResponse) {
        throw new ExpressError(404, "User not found");
      }
    } else {
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
