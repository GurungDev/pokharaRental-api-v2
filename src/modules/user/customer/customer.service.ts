import { DeepPartial } from "typeorm";
import CustomerEntity from "./entities/customer.entity";
import { CustomerRepository, customerRepository } from "./repository/customer.repository";
import { plainToInstance } from "class-transformer";
import { CustomerSerializer } from "./customer.serializer";
  

export class CustomerService {
  protected readonly repository: CustomerRepository;
  constructor() {
    this.repository = customerRepository;
  }

  async findBYId(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email: email } });
  }

 
 
  async findByNumber(number: string) {
    return await this.repository.findOne({ where: { phoneNumber: number } });
  }

  async createOne(data: DeepPartial<CustomerEntity>) {
    const customer = this.repository.create({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    if (data?.password) {
      await customer.setPassword(data?.password);
    }
    return await customer.save();
  }

  async changePassword(email: string, newPassword: string) {
    const customer = await this.repository.findOne({where: {email} });
    if (!customer) {
      throw new Error('Customer not found');
    }
    
    await customer.setPassword(newPassword);
    return await customer.save();
  }
  async deleteUser(userId: number) {
    return await this.repository.softDelete({ id: userId });
  }

  transformMany(customer?: CustomerEntity[]) {
    return customer?.map((customer) => plainToInstance(CustomerSerializer, customer, {}));
  }

  transformOne(customer?: CustomerEntity) {
    return plainToInstance(CustomerSerializer, customer, {});
  }
}

export const customerService = new CustomerService();
