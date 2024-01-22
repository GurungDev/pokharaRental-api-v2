import { ExpressError } from "../../../../common/class/error";
import StoreEntity from "../entities/store.entity";
import { StoreService } from "../store.service";

export class AdminStoreService extends StoreService{
     constructor(){
        super()
     }

     async approveStore(storeId: number): Promise<StoreEntity>{
        const store = await this.findBYId(storeId);
        if (store == null || store == undefined){
            throw new ExpressError(404, "Store not found")
        }
        store.is_approved = !store.is_approved;
        await store.save();
        return store;
     }
     async deleteStore(storeId: number) {
        return await this.repository.softDelete({ id: storeId });
      }
    async getAllStore(){
        return await this.repository.find();
    }
}

export const adminStoreService = new AdminStoreService();