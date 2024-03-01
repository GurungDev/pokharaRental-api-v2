import { DeepPartial } from "typeorm";

import { plainToInstance } from "class-transformer";
import StoreEntity from "../entities/store.entity";
import { StoreSerializer } from "../store.serializer";
import { StoreRepository, storeRepository } from "../repository/store.repository";


export class StoreCustomerService {
  protected readonly repository: StoreRepository;
  constructor() {
    this.repository = storeRepository;
  }

  async findBYId(id: number) {
    return await this.repository.findOne({ where: { id: id } }); //return listings also 
  }

  //get many stores according to location
  async getAllStore() {
    return await this.repository.find({ where: { is_approved: true } });
  } 

  //get subscribed store




  transformMany(store?: StoreEntity[]) {
    return store?.map((store) => plainToInstance(StoreSerializer, store, {}));
  }

  transformOne(store?: StoreEntity) {
    return plainToInstance(StoreSerializer, store, {});
  }


}

export const storeCustomerService = new StoreCustomerService();
