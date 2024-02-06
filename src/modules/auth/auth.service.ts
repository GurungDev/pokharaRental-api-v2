import { ExpressError } from "../../common/class/error";
import { UserEnum, UserServiceEnum } from "../../common/enum/enums";
import { AdminService, adminService } from "../admin/admin.service";
import {
  CustomerService,
  customerService,
} from "../user/customer/customer.service";
import jwt from "jsonwebtoken";
import { StoreService, storeService } from "../user/store/store.service";
import { CustomerRegisterDto, StoreRegisterDto } from "./auth.dto";
import { EnvConfig } from "../../config/envConfig";
import { Point } from "typeorm";

export class AuthService {
  private storeService: StoreService;
  private customerService: CustomerService;
  private adminService: AdminService;
 
  constructor() {
    this.storeService = storeService;
    this.customerService = customerService;
    this.adminService = adminService;
  }


  async createToken(id: number, role: UserEnum, extraData?: any){
    return jwt.sign({id, role, extraData}, EnvConfig.jwtSecret, { expiresIn:EnvConfig.jwtExpiresInSec})
  }

  async verifyToken(token: string){
    return jwt.verify(token, EnvConfig.jwtSecret) as {id: number, role: string, extraData?: any};
  }
  
  async registerStore(storeRegisterDto: StoreRegisterDto) {
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