import { SelectQueryBuilder } from "typeorm";
import { CycleRepository, cycleRepository } from "./repository/cycle.repository";
import CycleEntity from "./entities/cycle.entity";
import { getPaginationResult } from "../../common/service/paginationService";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { SortByProductEnum, SortEnum } from "../../common/enum/enums";
import { getProductType, productSortType } from "../boat/boat.service";

 
export default class CycleService{
    protected readonly repository: CycleRepository;
    constructor(){
        this.repository = cycleRepository;
    }

    

    async getAll(
        { limit = 20, page = 1 }: PaginationRequest,
        { storeId, search }: getProductType,
        { sortBy, order }: productSortType
    ) {

        let qb: SelectQueryBuilder<CycleEntity> = this.repository
            .createQueryBuilder("cycle")
            .leftJoinAndSelect("cycle.store", "c")
            .select([
                "cycle",
                "c.name",
                "c.id"
            ]);

        if (sortBy === undefined) {
        } else if (sortBy == SortByProductEnum.DATE) {
            if (order == SortEnum.ASC) {
                qb = qb.orderBy("cycle.createdAt", "ASC");
            } else {
                qb = qb.orderBy("cycle.createdAt", "DESC");
            }
        } else if (sortBy == SortByProductEnum.NAME) {
            if (order == SortEnum.ASC) {
                qb = qb.orderBy("cycle.title", "ASC");
            } else {
                qb = qb.orderBy("cycle.title", "DESC");
            }
        } else if (sortBy == SortByProductEnum.PRICE) {
            if (order == SortEnum.ASC) {
                qb = qb.orderBy("cycle.priceInRs", "ASC");
            } else {
                qb = qb.orderBy("cycle.priceInRs", "DESC");
            }
        }

        if (search === undefined) {
        } else {
            qb = qb.andWhere("LOWER(cycle.title) LIKE  :search", { search: `%${search.toLowerCase()}%` });
        }

        if (storeId === undefined) {
        } else {
            qb = qb.andWhere("c.id = :storeId", { storeId });
        }
        const [result, count] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();

        const paginationInfo = getPaginationResult(count, { limit, page })
        return [result, paginationInfo];
    }


    async getCycleById(id: number) {
        let qb: SelectQueryBuilder<CycleEntity> = this.repository
            .createQueryBuilder("cycle")
            .where("cycle.id = :id", { id })
            .leftJoinAndSelect("cycle.store", "c")
            .select([
                "cycle",
                "c"
            ]);

        return await qb.getOne();
    }




    // async getAll(){
    //     const cycles = await this.repository.find();
    //     return cycles;
    // }

    async getCyclesAccordingToStoreId(storeId: number){
        return await this.repository.findBy({ store: {id: storeId} });
    }
    async getCyclesCountAccordingToStoreId(storeId: number){
        return await this.repository.countBy({ store: {id: storeId} });
    }
 
}

export const cycleService = new CycleService();