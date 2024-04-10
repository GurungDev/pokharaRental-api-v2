import { Brackets, DeepPartial } from "typeorm";
import { ProductEnum, SortEnum } from "../../common/enum/enums";
import BoatService, { boatService } from "../boat/boat.service";
import CycleService, { cycleService } from "../cycle/cycle.service";
import { OrderRepository, orderRepository } from "./repository/order.repository";
import OrderEntity from "./entities/order.entity";

export class OrderService {
    protected boatService: BoatService;
    protected cycleService: CycleService;
    protected readonly repository: OrderRepository;
    constructor() {
        this.boatService = boatService;
        this.cycleService = cycleService;
        this.repository = orderRepository;
    }

    // async buyNow( id: number, order: DeepPartial<MarketOrderEntity>, productId:number, quantity: number, priceOfSingleProduct:number){
    //     //create order row (user id)
    //      const neworder = await this.orderService.post(order);

    //     //create a cart items
    //     const createCart = await this.repository.createOne({product:  {id: productId}, order: {id: neworder.id}, user: {id: id}, quantity: quantity, priceOfSingleProduct: priceOfSingleProduct});

    //     return neworder;
    //   }

    async create(order: DeepPartial<OrderEntity>) {
        return await this.repository.create(order).save()
    }

    async getProduct(issueId: number, issuedFor: ProductEnum) {
        switch (issuedFor) {
            case ProductEnum.BOAT:
                const boat = await this.boatService.getBoatById(issueId);
                return boat;

            case ProductEnum.CYCLE:
                const cycle = await this.cycleService.getCycleById(issueId);
                return cycle;
        }
    }

    async getOrder(transaction_uuid: string) {
        return await this.repository.findOneBy({ transaction_uuid: transaction_uuid })
    }


    async findByCustomerId(id: number, orderBy: SortEnum) {
        console.log(id)
        const query = await this.repository
            .createQueryBuilder('order')
            .withDeleted()
            .select([
                'order.id',
                'order.quantity',
                'order.totalPriceInRs',
                'order.priceOfSingleProduct',
                'order.bookingDate',
                'order.durationInHour',
                'order.transaction_uuid',
                'boat.id',
                'boat.title',
                'boat.thumbnail',
                'boat.description',
                'cycle.id',
                'cycle.title',
                'cycle.description',
                'cycle.thumbnail',
                'order.paymentType',
                'c.id'
            ])

            .leftJoin('order.boat', 'boat')
            .leftJoin('order.cycle', 'cycle')
            .leftJoin('boat.store', 'bs')
            .leftJoin('order.customer', 'c')
      
            .leftJoin('cycle.store', 'cs')
            .where('c.id = :id', { id })
            .andWhere(new Brackets(qb => {
              qb.where('(order.paymentType = :paymentType1 AND order.transaction_code IS NOT NULL)', { paymentType1: 'esewa' })
                .orWhere('(order.paymentType = :paymentType2 AND order.transaction_code IS NOT NULL)', { paymentType2: 'khalti' })
                .orWhere('order.paymentType = :paymentType3', { paymentType3: 'cash' })
            }));



        if (orderBy === SortEnum.DESC) {
            return query.orderBy("order.createdAt", "DESC").getMany();
        } else if (orderBy === SortEnum.ASC) {
            return query.orderBy("order.createdAt", "ASC").getMany();
        }

        return query.getMany(); // Execute and return results for ASC sorting
    }

}

export const orderService = new OrderService();