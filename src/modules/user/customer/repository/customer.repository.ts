import { EntityManager, Repository } from "typeorm";
 
 import { AppDataSource } from "../../../../data-source";
import CustomerEntity from "../entities/customer.entity";

export class CustomerRepository extends Repository<CustomerEntity>{}

export const customerRepository = new CustomerRepository(
    CustomerEntity,
  new EntityManager(AppDataSource)
);
