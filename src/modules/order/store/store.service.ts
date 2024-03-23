import { DeepPartial } from "typeorm";
import { OrderService } from "../order.service";
import { query } from "express";


export class StoreOrderService extends OrderService {

    constructor() {
        super()
    }


    async getOrders(storeId: number) {
        const query = await this.repository
            .createQueryBuilder('order')
            .select([
                'order.id',
                'order.quantity',
                'order.totalPriceInRs',
                'order.priceOfSingleProduct',
                'order.bookingDate',
                'order.durationInHour',
                'boat.id',
                'boat.title',
            ])
            .leftJoin('order.boat', 'boat')
            .leftJoin('order.cycle', 'cycle')
            .leftJoin('boat.store', 'bs')
            .leftJoin('cycle.store', 'cs')
            .where('bs.id = :storeId OR cs.id = :storeId', { storeId })
            .getMany();
            return query;


    }

 

}

export const storeOrderService = new StoreOrderService();