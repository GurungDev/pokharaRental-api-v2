import { DeepPartial } from "typeorm";
import CustomerEntity from "./entities/customer.entity";
import { CustomerRepository, customerRepository } from "./repository/customer.repository";
  

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

  async createOne(data: DeepPartial<CustomerEntity>) {
    const store = this.repository.create({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    if (data?.password) {
      await store.setPassword(data?.password);
    }
    return await store.save();
  }

  async deleteUser(userId: number) {
    return await this.repository.softDelete({ id: userId });
  }
}

export const customerService = new CustomerService();
