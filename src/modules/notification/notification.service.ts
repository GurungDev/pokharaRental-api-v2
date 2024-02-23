import { DeepPartial, In, SelectQueryBuilder } from "typeorm";
import { getPaginationResult } from "../../common/service/paginationService";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { NotificationEntity } from "./entities/notification.entity";
import {
  NotificationRepository,
  notificationRepository,
} from "./repository/notification.repository";
import { SubscriberEntity } from "../subscriber/entities/subscriber.entity";

export class Notification {
  private readonly repository: NotificationRepository;

  constructor() {
    this.repository = notificationRepository;
  }


  async getNotificationAccordingToUserId(
    userID: number,
    { page = 1, limit = 10 }: PaginationRequest
  ) {

    const notificationList = await this.repository.query(`
    SELECT notification.*
    FROM notification
    WHERE "notification"."storeId" IN (
        SELECT "subscriber"."storeId" 
        FROM subscriber 
        WHERE "subscriber"."userId" = ${userID}
    )
    ORDER BY "notification"."createdAt" DESC
    LIMIT ${limit}
    OFFSET ${(page - 1) * limit};
`);

    const storeId: number[] = [];
    notificationList.forEach((item: any) => {
      if (!storeId.includes(item.storeId)) {
        storeId.push(item.storeId);
      }
    });

  
    const unseenNotification = await this.getUnSeenNotificationAccordingToStoreId(userID, storeId)

    const paginationInfo = getPaginationResult(unseenNotification.length, { limit, page })
    return { notification: unseenNotification, paginationInfo: paginationInfo };
  }


  async getUnSeenNotificationAccordingToStoreId(
    userId: number,
    storeId: number[]
  ) {
    let notificationList = await this.repository.find({
      relations: {
        seenBy: {
          user: true,
        },
        store: false,
      },
      where: {
        store: { id: In(storeId) }
      }
    });

    let notification: NotificationEntity[] = [];
    notificationList.map((i) => {
   
      //searches all the notification list
      if (i.seenBy.length > 0) {
        // if notification has been seen by users

        let userSeen = i.seenBy.filter((seen) => seen.user.id === userId); //find the notification that has been seen by the user

        if (userSeen.length > 0) {
          //do nothing
        } else {
          notification.push(i); //returns false if the user has not seen
        }
      } else {
        notification.push(i); // returns true if no users has seen
      }
    });

    return notification;
  }

  async createNotificationAndNotifyAll(
    notification: DeepPartial<NotificationEntity>) {
    return await this.repository.create(notification).save();
  }
}

export const notificationService = new Notification();
