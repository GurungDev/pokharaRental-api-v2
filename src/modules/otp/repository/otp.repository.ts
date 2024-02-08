import { EntityManager, Repository } from "typeorm";
import { OtpEntity } from "../entities/otp.entity";
import { AppDataSource } from "../../../data-source";

export class OtpRepository extends Repository<OtpEntity> {}

export const otpRepository = new OtpRepository(
  OtpEntity,
  new EntityManager(AppDataSource),
  AppDataSource.createQueryRunner()
);
