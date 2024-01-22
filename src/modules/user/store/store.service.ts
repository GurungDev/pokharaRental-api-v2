import { DeepPartial } from "typeorm";
import {
  StoreRepository,
  storeRepository,
} from "./repository/store.repository";
import StoreEntity from "./entities/store.entity";
import { plainToInstance } from "class-transformer";
import { StoreSerializer } from "./store.serializer";

export class StoreService {
  protected readonly repository: StoreRepository;
  constructor() {
    this.repository = storeRepository;
  }

  async findBYId(id: number) {
    return await this.repository.findOne({ where: { id: id } });
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ where: { email: email } });
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



  transformMany(store?: StoreEntity[]) {
    return store?.map((store) => plainToInstance(StoreSerializer, store, {}));
  }

  transformOne(store?: StoreEntity) {
    return plainToInstance(StoreSerializer, store, {});
  }


}

export const storeService = new StoreService();
