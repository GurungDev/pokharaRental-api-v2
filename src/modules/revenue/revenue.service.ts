import { DeepPartial } from "typeorm";
import { RevenueRepository, revenueRepository } from "./repository/revenue.repository";
import { RevenueEntity } from "./entities/revenue.entity";

export class RevenueService {
    protected readonly repository: RevenueRepository;

    constructor() {
        this.repository = revenueRepository

    }
    async create(revenue: DeepPartial<RevenueEntity>) {
        return this.repository.create(revenue).save();
    }

    async getRevenueAccordingToStore(storeId: number) {
        return this.repository.find({ where: { store: { id: storeId } }, relations: { store: true } })
    }
}

export const revenueService = new RevenueService()