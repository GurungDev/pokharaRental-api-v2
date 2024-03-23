import { BaseEntity, Column, Entity, ManyToOne } from "typeorm";
import CustomerEntity from "../../user/customer/entities/customer.entity";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import BoatEntity from "../../boat/entities/boat.entity";
import CycleEntity from "../../cycle/entities/cycle.entity";

@Entity({ name: 'Order' })
export default class OrderEntity extends CustomBaseEntity {

    @Column()
    quantity: number;

    @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
    customer: CustomerEntity;

    @Column()
    totalPriceInRs: number;


    @Column()
    priceOfSingleProduct: number;


    @ManyToOne(() => BoatEntity, (boat) => boat.orders)
    boat: BoatEntity

    @ManyToOne(() => CycleEntity, (cycle) => cycle.orders)
    cycle: CycleEntity

    @Column({ nullable: true })
    bookingDate: Date

    @Column({ nullable: true })
    durationInHour: number
}