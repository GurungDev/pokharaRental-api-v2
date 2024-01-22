import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomBaseEntity } from "../../../common/baseEntity/custom-base-entity";
import { generateHash } from "../../../common/function/hashing";
 
@Entity({name: 'Admin'})
export default class AdminEntity extends CustomBaseEntity {
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    async verifyPassword(password: string): Promise<boolean> {
        const { hashedValue: hashedPassword } = await generateHash(
          password,
          this.salt
        );
        return this.password === hashedPassword;
      }
    
      async setPassword(password: string) {
        const { hashedValue: hashedPassword, salt } = await generateHash(password);
        this.password = hashedPassword;
        this.salt = salt;
      }
}