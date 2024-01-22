import { EntityManager, Repository } from "typeorm";
 
import StoreEntity from "../entities/store.entity";
import { AppDataSource } from "../../../../data-source";

export class StoreRepository extends Repository<StoreEntity>{}

export const storeRepository = new StoreRepository(
    StoreEntity,
  new EntityManager(AppDataSource)
);
