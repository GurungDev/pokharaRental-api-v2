import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import HighlightEntity from "../entities/highlight.entity";
  
export class HighLightRepository extends Repository<HighlightEntity>{}

export const highLightRepository = new HighLightRepository(
    HighlightEntity,
  new EntityManager(AppDataSource)
);
