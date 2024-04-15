import { Brackets } from "typeorm";
import { ExpressError } from "../../../../common/class/error";
import StoreEntity from "../entities/store.entity";
import { StoreService } from "../store.service";
import { OrderRepository, orderRepository } from "../../../order/repository/order.repository";

export class AdminStoreService extends StoreService {
    
    constructor() {
        super()
        
    }

    async approveStore(storeId: number): Promise<StoreEntity> {
        const store = await this.findBYId(storeId);
        if (store == null || store == undefined) {
            throw new ExpressError(404, "Store not found")
        }
        store.is_approved = !store.is_approved;
        await store.save();
        return store;
    }
    async deleteStore(storeId: number) {
        return await this.repository.softDelete({ id: storeId });
    }
    async getAllStore() {
        return await this.repository.find();
    }

    async getStoreCount() {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setUTCDate(today.getUTCDate() + 1);

        const updateToday = await this.repository.createQueryBuilder("store").where("store.createdAt > :date", { date: today }).getCount();
        return { count: await this.repository.count(), today: updateToday }
    }

    async findStoreJoinedPerDay() {
        return await this.repository.createQueryBuilder("store").select('COUNT(*)', 'StoreNummber').addSelect('store.createdAt').groupBy("store.createdAt").getRawMany();
    }

    async findSalesPerStore(month: number, year: number) {
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
            .groupBy('bs.id')
            .addGroupBy('cs.id')
            .getRawMany();
        return query;


    }

   
 


}

export const adminStoreService = new AdminStoreService();