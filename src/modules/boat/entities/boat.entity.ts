import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import StoreEntity from "../../user/store/entities/store.entity";
 

@Entity({name: 'Boats'})
export default class BoatEntity extends CustomBaseEntity {
    
    @Column()
    capacity: number;

    @Column()
    priceInRs: number;

    @Column()
    title: string;

    @Column({ nullable: true})
    description: string

    @ManyToOne(() => StoreEntity, (store) => store.boats)
    store: StoreEntity
}