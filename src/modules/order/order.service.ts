import { DeepPartial } from "typeorm";
import { ProductEnum } from "../../common/enum/enums";
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

}

export const orderService = new OrderService();