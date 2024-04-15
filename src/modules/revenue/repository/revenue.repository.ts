import { EntityManager, Repository } from "typeorm";

import { AppDataSource } from "../../../data-source";
import { RevenueEntity } from "../entities/revenue.entity";


export class RevenueRepository extends Repository<RevenueEntity> { }

export const revenueRepository = new RevenueRepository(
    RevenueEntity,
    new EntityManager(AppDataSource)
)