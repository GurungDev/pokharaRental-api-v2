import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { plainToInstance } from "class-transformer";
import {
  ChangePasswordDto,
  CustomerRegisterDto,
  OtpDto,
  StoreRegisterDto,
} from "./auth.dto";
import { ResponseHandler } from "../../common/class/success.response";
import { OtpPurpose, UserEnum } from "../../common/enum/enums";
import { OTPService, otpService } from "../otp/otp.service";
import emailService, { EmailService } from "../email/emai.service";

export default class AuthController {
  private readonly service: AuthService;
  private readonly otpService: OTPService;

  constructor() {
    this.service = new AuthService();
    this.otpService = otpService;
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, validateFor } = req.body;
      const { id, name }: any = await this.service.validate(
        email,
        password,
        validateFor
      );
      const token = await this.service.createToken(id, validateFor);
      return ResponseHandler.success(res, "Login Success", {
        id,
        name,
        token,
      });
    } catch (error) {
      next(error);
    }
  }



  async sendOtp(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, phoneNumber, purpose } = plainToInstance(OtpDto, req.body);
      await this.service.send(email, purpose, phoneNumber);
      return ResponseHandler.success(res, "OTP sent");
    } catch (error) {
      next(error);
    }
  }

  async RegisterStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { otp, ...registerDto } = plainToInstance(
        StoreRegisterDto,
        req.body
      );

      await this.otpService.verifyOtp(
        OtpPurpose.SIGNUP_STORE,
        otp,
        registerDto.email
      );
      await this.otpService.revokeAOtp(otp);
      const newStore = await this.service.registerStore(registerDto);

      return ResponseHandler.success(res, "Store registered", {
        store: {
          id: newStore.id,
          name: newStore.name,
          email: newStore.email,
          ownerName: newStore.ownerName,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async RegisterUser(req: Request, res: Response, next: NextFunction) {
    try {
      const registerDto = plainToInstance(CustomerRegisterDto, req.body);
      await this.otpService.verifyOtp(
        OtpPurpose.SIGNUP_CUSTOMER,
        registerDto.otp,
        registerDto.email
      );
      await this.otpService.revokeAOtp(registerDto.otp);
      const newUser = await this.service.registerUser(registerDto);
      return ResponseHandler.success(res, "User registered", {
        store: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async ChangePasword(req: Request, res: Response, next: NextFunction) {
    try {
      const changePasswordPayload = plainToInstance(
        ChangePasswordDto,
        req.body
      );
      console.log(changePasswordPayload);
      await this.otpService.verifyOtp(
        changePasswordPayload.purpose,
        changePasswordPayload.otp,
        changePasswordPayload.email
      );
      await this.otpService.revokeAOtp(changePasswordPayload.otp);
      return ResponseHandler.success(
        res,
        await this.service.changePassword(
          changePasswordPayload.password,
          changePasswordPayload.email,
          changePasswordPayload.purpose
        )
      );
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
