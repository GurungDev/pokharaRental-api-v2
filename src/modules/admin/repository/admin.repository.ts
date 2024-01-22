import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import AdminEntity from "../entities/admin.entity";
 
 

export class AdminRepository extends Repository<AdminEntity>{}

export const adminRepository = new AdminRepository(
    AdminEntity,
  new EntityManager(AppDataSource)
);
