import { Column, Entity, OneToMany } from "typeorm";
import { CustomBaseEntity } from "../../../../common/baseEntity/custom-base-entity";
 
import { generateHash } from "../../../../common/function/hashing";
import { SubscriberEntity } from "../../../subscriber/entities/subscriber.entity";
import OrderEntity from "../../../order/entities/order.entity";
 
@Entity({name: 'Customers'})
export default class CustomerEntity extends CustomBaseEntity {
    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    salt: string;
 

    @Column({ unique: true })
    email: string;


    @Column()
    phoneNumber: string;

    @OneToMany(() => SubscriberEntity, (subscriber) => subscriber.user)
    subscribers: SubscriberEntity[]

    @OneToMany(() => OrderEntity, (order) => order.customer)
    orders: OrderEntity[]

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