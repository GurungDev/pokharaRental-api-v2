 
import pokharaRental from './app';
import { EnvConfig } from './config/envConfig';
import { AppDataSource } from './data-source';
import { AdminSeeder } from './modules/admin/seeder/admin.seeder';
import emailService, { EmailService } from './modules/email/emai.service';
 
 
const app = pokharaRental();
const PORT = EnvConfig.appConfig.port;

app.listen(PORT, async () => {
  console.log(
    `Server is running on port ${PORT}. `
  );
  await AppDataSource.initialize();
  
  await AdminSeeder();
   console.log(`DB is connected in port  ${EnvConfig.dbConfig.dbPort}` );
});
 