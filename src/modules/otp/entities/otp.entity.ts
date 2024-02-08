import { Column, Entity, Index } from "typeorm";
import { OtpPurpose } from "../../../common/enum/enums";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";

@Entity({
  name: "otp",
})
export class OtpEntity extends CustomBaseEntity {
  @Column({})
  @Index()
  otp: string; // unique id

  @Column()
  @Index()
  validTill: Date; //validate time

  @Column({ enum: OtpPurpose })
  purpose: OtpPurpose; // Otp purpose for register, forgot password 

  @Column({})
  email: string; //OTP issued for email

  @Column({
    default: false,
  })
  isRevoked: boolean; 
}
