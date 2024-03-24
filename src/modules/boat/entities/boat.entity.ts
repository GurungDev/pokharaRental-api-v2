import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import StoreEntity from "../../user/store/entities/store.entity";
import OrderEntity from "../../order/entities/order.entity";
 

@Entity({name: 'Boats'})
export default class BoatEntity extends CustomBaseEntity {
    
    @Column()
    capacity: number;

    @Column()
    priceInRs: number;

    @Column({nullable: true})
    thumbnail: string;

    @Column({nullable: true})
    secondaryImage: string;

    @Column()
    title: string;

    @Column({ nullable: true})
    description: string

    @ManyToOne(() => StoreEntity, (store) => store.boats)
    store: StoreEntity

    @OneToMany(() => OrderEntity, (order) => order.boat)
    orders: OrderEntity[]

    @DeleteDateColumn()
    deletedAt: Date
}