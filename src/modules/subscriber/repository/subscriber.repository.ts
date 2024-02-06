import { EntityManager, Repository } from "typeorm";
 
import { SubscriberEntity } from "../entities/subscriber.entity";
import { AppDataSource } from "../../../data-source";
 

export class SubscriberRepository extends Repository<SubscriberEntity>{}

export const subscriberRepository  =  new SubscriberRepository(
    SubscriberEntity,
    new EntityManager(AppDataSource)
)