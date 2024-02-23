import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";
 
import { NotificationSeenEntity } from "../seenNotification/entities/notificationSen.entity";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import { NotificationTypeEnum } from "../../../common/enum/enums";
import StoreEntity from "../../user/store/entities/store.entity";

@Entity({name: "notification"})
export class NotificationEntity extends CustomBaseEntity{
    @Column({nullable:false})
    notificationFor: NotificationTypeEnum;

    @Column({nullable: true})
    linkId: string;

    @Column()
    title: string

    @Column()
    description: string

    @ManyToOne(()=> StoreEntity, (store)=> store.id, { nullable: false })
    store: StoreEntity 
    
    @OneToMany(()=> NotificationSeenEntity, (seen)=> seen.notification, { nullable: true })
    seenBy: NotificationSeenEntity[]  
}