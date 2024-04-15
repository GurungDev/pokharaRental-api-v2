import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import StoreEntity from "../../user/store/entities/store.entity";


@Entity({name: "revenue"})
export class RevenueEntity extends CustomBaseEntity{
    @Column({})
    @Index()
    totalRevenue:number;

    @ManyToOne(() => StoreEntity, (store) => store.revenueHistory)
    store: StoreEntity

    @Column({type: Boolean})
    isPaid: Boolean;
}