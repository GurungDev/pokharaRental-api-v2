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

  async getAllStore(lat: number, long: number) {
    return await this.repository
      .createQueryBuilder("store")
      .select(["store.id", "store.name","store.location", "store.phoneNumber", "store.ownerName", "store.email"])
      .addSelect("ST_Distance(store.location, ST_SetSRID(ST_MakePoint(:long, :lat), 4326))", "distance")
      .setParameters({ lat, long })
      .where("store.is_approved = true")
      .getRawMany();

  }

  transformMany(store?: StoreEntity[]) {
    return store?.map((store) => plainToInstance(StoreSerializer, store, {}));
  }

  transformOne(store?: StoreEntity) {
    return plainToInstance(StoreSerializer, store, {});
  }


}

export const storeCustomerService = new StoreCustomerService();
