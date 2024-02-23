import { EntityManager, Repository } from "typeorm";
 
import { NotificationEntity } from "../entities/notification.entity";
import { AppDataSource } from "../../../data-source";

export class NotificationRepository extends Repository<NotificationEntity>{}

export const notificationRepository  =  new NotificationRepository(
    NotificationEntity,
    new EntityManager(AppDataSource)
)