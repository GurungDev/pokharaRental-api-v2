import { Column, Entity, Index, ManyToOne } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import CustomerEntity from "../../user/customer/entities/customer.entity";
import { RatingForEnum } from "../../../common/enum/enums";

 

@Entity({name: "ratings"})
export class RatingEntity extends CustomBaseEntity{
    @Column({})
    @Index()
    star: number; 
  
    @Index()
    @Column({ enum: RatingForEnum })
    ratingFor: RatingForEnum;

    @Index()
    @Column({})
    issueId: number; //id of the entity rated for i.e store, boat or cycle

    @ManyToOne(()=> CustomerEntity, (value)=> value.id)
    postedBy: CustomerEntity;
}
