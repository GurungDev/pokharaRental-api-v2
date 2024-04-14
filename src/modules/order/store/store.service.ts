import { Brackets, DeepPartial } from "typeorm";
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
                'cycle.id',
                'cycle.title',
                'customer.name',
                'customer.phoneNumber',
                'customer.email',
                'order.paymentType',
                'order.transaction_uuid'
            ])
            .withDeleted()
            .leftJoin('order.boat', 'boat')
            .leftJoin('order.customer', 'customer')
            .leftJoin('order.cycle', 'cycle')
            .leftJoin('boat.store', 'bs')
            .leftJoin('cycle.store', 'cs')
            .where('bs.id = :storeId OR cs.id = :storeId', { storeId })
            .andWhere(new Brackets(qb => {
                qb.where('(order.paymentType = :paymentType1 AND order.transaction_code IS NOT NULL)', { paymentType1: 'esewa' })
                    .orWhere('(order.paymentType = :paymentType2 AND order.transaction_code IS NOT NULL)', { paymentType2: 'khalti' })
                    .orWhere('order.paymentType = :paymentType3', { paymentType3: 'cash' })
            }))
            .orderBy("order.createdAt", "DESC")
            .getMany();
        return query;


    }

    async findOrderCountPerDay(storeId: number, month: number, year: number) {
        // const query = await this.repository
        //     .createQueryBuilder('order')
        //     .select('COUNT(order.id)', 'orderCount')
        //     .where('EXTRACT(MONTH FROM order.createdAt) = :month AND EXTRACT(YEAR FROM order.createdAt) = :year', { month, year })
        //     .groupBy('order.boat')
        //     .getRawMany();
        const query = await this.repository
            .createQueryBuilder('order')
            .withDeleted()
            .select('SUM(order.totalPriceInRs)', 'sales')
            .addSelect('bs')
            .addSelect('cs')
            .leftJoin('order.boat', 'boat')
            .leftJoin('order.cycle', 'cycle')
            .leftJoin('boat.store', 'bs')
            .leftJoin('cycle.store', 'cs')
            .where(new Brackets(qb => {
                qb.where('(order.paymentType = :paymentType1 AND order.transaction_code IS NOT NULL)', { paymentType1: 'esewa' })
                    .orWhere('(order.paymentType = :paymentType2 AND order.transaction_code IS NOT NULL)', { paymentType2: 'khalti' })
            }))
            .groupBy('bs.id')
            .addGroupBy('cs.id')
            .getRawMany();
        return query;
    }
    async findSalesPerDay(storeId: number, month: number, year: number) {
        const query = await this.repository
            .createQueryBuilder('order')
            .withDeleted()
            .select('DATE(order.createdAt)', 'date')
            .addSelect('SUM(order.totalPriceInRs)', 'sales')
            .addSelect('COUNT(order.id)', 'count')
            .leftJoin('order.boat', 'boat')
            .leftJoin('order.cycle', 'cycle')
            .leftJoin('boat.store', 'bs')
            .leftJoin('cycle.store', 'cs')
            .where('bs.id = :storeId OR cs.id = :storeId', { storeId })
            .andWhere(new Brackets(qb => {
                qb.where('(order.paymentType = :paymentType1 AND order.transaction_code IS NOT NULL)', { paymentType1: 'esewa' })
                    .orWhere('(order.paymentType = :paymentType2 AND order.transaction_code IS NOT NULL)', { paymentType2: 'khalti' })
                    .orWhere('order.paymentType = :paymentType3', { paymentType3: 'cash' })
            }))
            .groupBy('date')
            .orderBy('date', 'ASC')
            .getRawMany();
        return query;
    }


}

export const storeOrderService = new StoreOrderService();