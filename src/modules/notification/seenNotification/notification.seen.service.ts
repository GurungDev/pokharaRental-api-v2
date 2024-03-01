import { Notification, notificationService } from "../notification.service";
import {
  NotificationSeenRepository,
  notificationSeenRepository,
} from "./repository/notification.repository";

export class NotificationSeenService {
  private readonly repository: NotificationSeenRepository;
  private readonly notification: Notification;
  constructor() {
    this.repository = notificationSeenRepository;
    this.notification = notificationService;
  }
  // async getNotificationAccordingToProjectId(userId: number, projectId: number, paginationInfo: PaginationRequest) {
  //     let qb: SelectQueryBuilder<NotificationEntity> = this.repository
  //       .createQueryBuilder("notification")
  //       .where("notification.project.id = :projectId", { projectId });
  //     const notification = this.repository.paginateQb(qb, paginationInfo)
  //     return notification;
  // }

 

  async create(userId: number, notificationId: number) {
    return this.repository
      .create({ user: { id: userId }, notification: { id: notificationId } })
      .save();
  }


  async getOne(userId: number, notificationId: number) {
    return this.repository.findOne({ where: { user: { id: userId }, notification: { id: notificationId } } });
  }
}

export const notificationSeenService = new NotificationSeenService();
