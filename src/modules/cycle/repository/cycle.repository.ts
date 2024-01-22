import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import CycleEntity from "../entities/cycle.entity";
 
export class CycleRepository extends Repository<CycleEntity>{}

export const cycleRepository = new CycleRepository(
    CycleEntity,
  new EntityManager(AppDataSource)
);
