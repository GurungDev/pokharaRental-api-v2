import { generateHash } from "../../../common/function/hashing";
import { EnvConfig } from "../../../config/envConfig";
import { AppDataSource } from "../../../data-source";
import AdminEntity from "../entities/admin.entity";

 
export async function AdminSeeder(){
    try {
    const {hashedValue, salt}= await generateHash(EnvConfig.adminConfig.password);
    const email = EnvConfig.adminConfig.email;
    const existingAdmin = await AppDataSource.getRepository(AdminEntity).findOne({
      where: {email: email}
    })

    if(!existingAdmin){
        await AppDataSource.getRepository(AdminEntity).create({email, password: hashedValue, salt: salt}).save();
        return console.log("Admin seeded");
    }
    console.log("Admin already seeded");
    } catch (error) {
        console.log("Error While seeding admin.")
    }
}