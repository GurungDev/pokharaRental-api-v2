import { SelectQueryBuilder } from "typeorm";
import { CycleRepository, cycleRepository } from "./repository/cycle.repository";
import CycleEntity from "./entities/cycle.entity";
import { getPaginationResult } from "../../common/service/paginationService";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { SortByProductEnum, SortEnum } from "../../common/enum/enums";
import { getProductType, productSortType } from "../boat/boat.service";


export default class CycleService {
    protected readonly repository: CycleRepository;
    constructor() {
        this.repository = cycleRepository;
    }

    async getAll(
        { limit = 20, page = 1 }: PaginationRequest,
        { storeId, search }: getProductType,
        { sortBy, order }: productSortType
    ) {
        let list = await this.repository.query(`
        SELECT "Cycles".*,
        "rt".* ,"store"."is_approved" AS "is_approved",
        "store"."id" AS "storeId",
        "store"."name" AS "storeName" FROM  "Cycles"
        LEFT JOIN (
            SELECT "ratings"."issueId", COUNT(*) AS ratingCount, SUM(star)/COUNT(*) AS TotalStar
            FROM ratings
            WHERE "ratings"."ratingFor" = 'cycle'
            GROUP BY "ratings"."issueId"
        ) "rt" ON "rt"."issueId" = "Cycles"."id"  
        LEFT JOIN "Stores" "store" ON "store"."id" = "Cycles"."storeId"
        WHERE "Cycles"."deletedAt" IS NULL
    `);

        // Sorting
        if (sortBy === SortByProductEnum.DATE) {
            if (order === SortEnum.ASC) {
                list.sort((a: any, b: any) => a.createdAt - b.createdAt);
            } else {
                list.sort((a: any, b: any) => b.createdAt - a.createdAt);
            }
        } else if (sortBy === SortByProductEnum.NAME) {
            if (order === SortEnum.ASC) {
                list.sort((a: any, b: any) => a.title.localeCompare(b.title));
            } else {
                list.sort((a: any, b: any) => b.title.localeCompare(a.title));
            }

        } else if (sortBy === SortByProductEnum.PRICE) {
            if (order === SortEnum.ASC) {
                list.sort((a: any, b: any) => a.priceInRs - b.priceInRs);
            } else {
                list.sort((a: any, b: any) => b.priceInRs - a.priceInRs);
            }

        }

        // Filtering
        if (search !== undefined) {
            list = list.filter((cycle: any) => cycle.title.toLowerCase().includes(search.toLowerCase()));
        }
        // Filtering
        if (storeId !== undefined) {
            list = list.filter((cycle: any) => cycle.storeId == storeId);
        }
        list = list.filter((cycle: any) => cycle.is_approved == true);
        // Pagination
        const paginationInfo = getPaginationResult(list.length, { limit, page });
        const paginatedList = list.slice((page - 1) * limit, page * limit);

        return [paginatedList, paginationInfo];
        // let qb: SelectQueryBuilder<CycleEntity> = this.repository
        //     .createQueryBuilder("cycle")
        //     .leftJoinAndSelect("cycle.store", "c")
        //     .select([
        //         "cycle",
        //         "c.name",
        //         "c.id"
        //     ]);

        // if (sortBy === undefined) {
        // } else if (sortBy == SortByProductEnum.DATE) {
        //     if (order == SortEnum.ASC) {
        //         qb = qb.orderBy("cycle.createdAt", "ASC");
        //     } else {
        //         qb = qb.orderBy("cycle.createdAt", "DESC");
        //     }
        // } else if (sortBy == SortByProductEnum.NAME) {
        //     if (order == SortEnum.ASC) {
        //         qb = qb.orderBy("cycle.title", "ASC");
        //     } else {
        //         qb = qb.orderBy("cycle.title", "DESC");
        //     }
        // } else if (sortBy == SortByProductEnum.PRICE) {
        //     if (order == SortEnum.ASC) {
        //         qb = qb.orderBy("cycle.priceInRs", "ASC");
        //     } else {
        //         qb = qb.orderBy("cycle.priceInRs", "DESC");
        //     }
        // }

        // if (search === undefined) {
        // } else {
        //     qb = qb.andWhere("LOWER(cycle.title) LIKE  :search", { search: `%${search.toLowerCase()}%` });
        // }

        // if (storeId === undefined) {
        // } else {
        //     qb = qb.andWhere("c.id = :storeId", { storeId });
        // }
        // const [result, count] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();

        // const paginationInfo = getPaginationResult(count, { limit, page })
        // return [result, paginationInfo];
    }


    async getCycleById(id: number) {
        let qb: SelectQueryBuilder<CycleEntity> = this.repository
            .createQueryBuilder("cycle")
            .where("cycle.id = :id", { id })
            .leftJoinAndSelect("cycle.store", "c")
            .select([
                "cycle",
                "c.name",
                "c.id",
                "c.location",
                "c.phoneNumber"
            ]);

        return await qb.getOne();
    }




    // async getAll(){
    //     const cycles = await this.repository.find();
    //     return cycles;
    // }

    async getCyclesAccordingToStoreId(storeId: number) {
        return await this.repository.findBy({ store: { id: storeId } });
    }
    async getCyclesCountAccordingToStoreId(storeId: number) {
        return await this.repository.countBy({ store: { id: storeId } });
    }

}

export const cycleService = new CycleService();