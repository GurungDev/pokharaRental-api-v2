import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../../data-source";
import { NotificationSeenEntity } from "../entities/notificationSen.entity";
 

export class NotificationSeenRepository extends Repository<NotificationSeenEntity>{}

export const notificationSeenRepository  =  new NotificationSeenRepository(
    NotificationSeenEntity,
    new EntityManager(AppDataSource)
)