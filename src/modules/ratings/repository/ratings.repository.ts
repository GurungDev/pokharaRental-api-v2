import { EntityManager, Repository } from "typeorm";
 
import { RatingEntity } from "../entities/ratings.entity";
import { AppDataSource } from "../../../data-source";

export class RatingRepository extends Repository<RatingEntity>{}

export const ratingRepository = new RatingRepository(
    RatingEntity, 
    new EntityManager(AppDataSource),
    AppDataSource.createQueryRunner()
)