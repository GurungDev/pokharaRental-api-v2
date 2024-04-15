import { Brackets, DeepPartial } from "typeorm";
import {
  StoreRepository,
  storeRepository,
} from "./repository/store.repository";
import StoreEntity from "./entities/store.entity";
import { plainToInstance } from "class-transformer";
import { StoreSerializer } from "./store.serializer";
import { OrderRepository, orderRepository } from "../../order/repository/order.repository";

export class StoreService {
  protected readonly repository: StoreRepository;
   protected readonly orderRepo: OrderRepository;
  constructor() {
    this.repository = storeRepository; 
    this.orderRepo = orderRepository
  }

  async findBYId(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email: email } });
  }

  async changePassword(email: string, newPassword: string) {
    const customer = await this.repository.findOne({ where: { email } });
    if (!customer) {
      throw new Error('Customer not found');
    }

    await customer.setPassword(newPassword);
    return await customer.save();
  }
  async findByNumber(number: string) {
    return await this.repository.findOne({ where: { phoneNumber: number } });
  }

  async createOne(data: DeepPartial<StoreEntity>) {
    const store = this.repository.create({
      name: data.name,
      location: data.location,
      email: data.email,
      ownerName: data.ownerName,
      phoneNumber: data.phoneNumber,
    });
    if (data?.password) {
      await store.setPassword(data?.password);
    }
    return await store.save();
  }

  async findSalesPerStore(month: number, year: number, storeId: number) {
    const query = await this.orderRepo
      .createQueryBuilder('order')
      .withDeleted()
      .select('SUM(order.totalPriceInRs)', 'sales')
      .addSelect('bs.name', 'store_name_b')
      .addSelect('cs.name', 'store_name_c')
      .addSelect('bs.id', 'store_id_b')
      .addSelect('cs.id', 'store_id_c')
      .leftJoin('order.boat', 'boat')
      .leftJoin('order.cycle', 'cycle')
      .leftJoin('boat.store', 'bs')
      .leftJoin('cycle.store', 'cs')
      .where(new Brackets(qb => {
        qb.where('(order.paymentType = :paymentType1 AND order.transaction_code IS NOT NULL)', { paymentType1: 'esewa' })
          .orWhere('(order.paymentType = :paymentType2 AND order.transaction_code IS NOT NULL)', { paymentType2: 'khalti' })
      }))
      .andWhere('EXTRACT(MONTH FROM order.createdAt) = :month AND EXTRACT(YEAR FROM order.createdAt) = :year', { month, year })
      .andWhere(new Brackets(qb => {
        qb.where('bs.id = :storeId')
          .orWhere('cs.id = :storeId')
      }))
      .groupBy('bs.id')
      .addGroupBy('cs.id')
      .setParameters({ storeId })
      .getRawMany();
    return query;
  }

  transformMany(store?: StoreEntity[]) {
    return store?.map((store) => plainToInstance(StoreSerializer, store, {}));
  }

  transformOne(store?: StoreEntity) {
    return plainToInstance(StoreSerializer, store, {});
  }


}

export const storeService = new StoreService();
