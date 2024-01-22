import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../../common/baseEntity/custom-base-entity";
import BoatEntity from "../../../boat/entities/boat.entity";
import { generateHash } from "../../../../common/function/hashing";
import CycleEntity from "../../../cycle/entities/cycle.entity";
 
@Entity({name: 'Stores'})
export default class StoreEntity extends CustomBaseEntity {
    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @Column()
    location: string;

    @Column({ unique: true })
    email: string;

    @Column()
    ownerName: string;
 
    @Column({ unique: true })
    phoneNumber: string;

    @Column({default: false})
    is_approved: boolean;

    @OneToMany(() => BoatEntity, (boat) => boat.store)
    boats: BoatEntity[]

    @OneToMany(() => CycleEntity, (boat) => boat.store)
    cycles: CycleEntity[]

    async verifyPassword(password: string): Promise<boolean>{
        const {hashedValue: hashedPassword} = await generateHash(password, this.salt);
        return this.password === hashedPassword;
    }
    async setPassword(password: string) {
        const { hashedValue: hashedPassword, salt } = await generateHash(password);
        this.password = hashedPassword;
        this.salt = salt;
      }
}