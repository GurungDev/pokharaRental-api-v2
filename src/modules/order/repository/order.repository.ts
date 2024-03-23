import { EntityManager, Repository } from "typeorm";
import { AppDataSource } from "../../../data-source";
import OrderEntity from "../entities/order.entity";

export class OrderRepository extends Repository<OrderEntity>{ }

export const orderRepository = new OrderRepository(
    OrderEntity,
    new EntityManager(AppDataSource)
);
