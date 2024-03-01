import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import StoreEntity from "../../user/store/entities/store.entity";
 

@Entity({name: 'Cycles'})
export default class CycleEntity extends CustomBaseEntity {
    
    @Column()
    priceInRs: number;

    @Column()
    title: string;

    @Column({nullable: true})
    thumbnail: string;

    @Column({nullable: true})
    secondaryImage: string;

    @Column({ nullable: true})
    description: string

    @ManyToOne(() => StoreEntity, (store) => store.cycles)
    store: StoreEntity
}