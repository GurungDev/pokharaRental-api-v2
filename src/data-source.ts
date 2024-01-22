 
import { join } from 'path';
import 'reflect-metadata';
import { DataSource } from "typeorm";
import { EnvConfig } from './config/envConfig';

 

export let typeormConfig: any = {
   type: 'postgres',
   host: EnvConfig.dbConfig.dbHost,
   port: EnvConfig.dbConfig.dbPort,
   username: EnvConfig.dbConfig.dbUsername,
   password: EnvConfig.dbConfig.dbPassword,
   database: EnvConfig.dbConfig.dbName,
   synchronize: true,
   logging: false,
   entities: [join(__dirname, "**", "entities", "*.entity.{js,ts}")],
   migrations: [join(__dirname, "migration", "*.migration.{js,ts}")],
   subscribers: [join(__dirname, "modules", "**", "*.subscriber.{js,ts}")],
   cli: {
     entitiesDir: "src/entities",
     migrationsDir: "src/migration",
     subscribersDir: "src/subscriber",
   },
}
export const AppDataSource = new DataSource(typeormConfig)