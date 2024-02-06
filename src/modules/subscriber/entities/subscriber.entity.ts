import {  Entity, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import CustomerEntity from "../../user/customer/entities/customer.entity";
import StoreEntity from "../../user/store/entities/store.entity";
 
 

@Entity({name: "subscriber"})
export class SubscriberEntity extends CustomBaseEntity{
    @ManyToOne(()=> StoreEntity, (store)=> store.subscribers, { nullable: false })
    store: StoreEntity   

    @ManyToOne(()=> CustomerEntity, (customer)=> customer.id, { nullable: false })
    user: CustomerEntity   
}
