import {  Entity, ManyToOne } from "typeorm";
 
import { NotificationEntity } from "../../entities/notification.entity";
import CustomerEntity from "../../../user/customer/entities/customer.entity";
import { CustomBaseEntity } from "../../../../common/baseEntity/custom-base-entity";
 

@Entity({name: "notification_seen"})
export class NotificationSeenEntity extends CustomBaseEntity{
    @ManyToOne(()=> NotificationEntity, (notification)=> notification.seenBy, { nullable: false })
    notification: NotificationEntity   

    @ManyToOne(()=> CustomerEntity, (user)=> user.id, { nullable: false })
    user: CustomerEntity   
}