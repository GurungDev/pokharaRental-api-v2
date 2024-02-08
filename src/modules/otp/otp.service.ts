import otpGenerator from "otp-generator";
import { OtpRepository, otpRepository } from "./repository/otp.repository";
import { OtpPurpose } from "../../common/enum/enums";
import { ExpressError } from "../../common/class/error";
import { OtpEntity } from "./entities/otp.entity";
import { DeepPartial } from "typeorm";
import { EnvConfig } from "../../config/envConfig";
import {
  UNIT_FOR_DATE_INTERVAL,
  getDateInInterval,
} from "../../common/function/dateManip";

export class OTPService {
  private readonly repository: OtpRepository;
  constructor() {
    this.repository = otpRepository;
  }
  async buildOtp(email: string, purpose: OtpPurpose, duration?: number) {
    const otp = otpGenerator.generate(6);

    let verificationToken: DeepPartial<OtpEntity> = {
      purpose,
      email,
      otp: otp,
      validTill: getDateInInterval(
        duration || EnvConfig.otpExipryTime,
        UNIT_FOR_DATE_INTERVAL.MINUTE
      ),
    };

    await this.repository.update({ purpose, email }, { isRevoked: true });
    return await this.repository.create(verificationToken).save();
  }

  async getOTP(otp: string) {
    return await this.repository.find({ where: { otp } });
  }

  async verifyOtp(purpose: OtpPurpose, otp: string, email?: string) {
    const vToken = await this.repository.findOne({
      where: {
        purpose,
        otp,
        email,
      },
    });
    if (!vToken) {
      throw new ExpressError(
        400,
        `Invalid token provided. Couldn't find token for this puropse.`
      );
    }
    if (vToken.isRevoked) {
      throw new ExpressError(400, `Can't verify token. Token no longer valid.`);
    }
    if (vToken.validTill < new Date()) {
      throw new ExpressError(400, `Can't verify token. Token expired.`);
    }
    return vToken;
  }

  async revokeAOtp(id: number) {
    return await this.repository.update({ id }, { isRevoked: true });
  }
}

export const otpService = new OTPService();
