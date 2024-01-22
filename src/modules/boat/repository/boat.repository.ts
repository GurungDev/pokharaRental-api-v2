import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import BoatEntity from "../entities/boat.entity";
 
export class BoatRepository extends Repository<BoatEntity>{}

export const boatRepository = new BoatRepository(
    BoatEntity,
  new EntityManager(AppDataSource)
);
