import { SelectQueryBuilder } from "typeorm";
import { RatingForEnum, SortByProductEnum, SortEnum } from "../../common/enum/enums";
import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { GetBoatDto } from "./boat.dto";
import { BoatRepository, boatRepository } from "./repository/boat.repository";
import BoatEntity from "./entities/boat.entity";
import { RatingEntity } from "../ratings/entities/ratings.entity";
import { getPaginationResult } from "../../common/service/paginationService";
import { RatingService, ratingService } from "../ratings/ratings.service";
export type getProductType = {
    storeId?: number;
    isPublised?: boolean;
    search?: string;
};

export type productSortType = {
    sortBy?: SortByProductEnum;
    order?: SortEnum;
};
export default class BoatService {
    protected readonly repository: BoatRepository;
    protected readonly ratingService: RatingService;
    constructor() {
        this.repository = boatRepository;
        this.ratingService = ratingService
    }


    async getAllBoats(
        { limit = 20, page = 1 }: PaginationRequest,
        { storeId, search }: getProductType,
        { sortBy, order }: productSortType
    ) {

        let list = await this.repository.query(`
        SELECT  "Boats".*,
        "rt".* ,"store"."is_approved" AS "is_approved",
        "store"."id" AS "storeId",
        "store"."name" AS "storeName" FROM "Boats"
        LEFT JOIN (
            SELECT "ratings"."issueId", COUNT(*) AS ratingCount, SUM(star)/COUNT(*) AS TotalStar
            FROM ratings
            WHERE "ratings"."ratingFor" = 'boat'
            GROUP BY "ratings"."issueId"
        ) "rt" ON "rt"."issueId" = "Boats"."id"
        LEFT JOIN "Stores" "store" ON "store"."id" = "Boats"."storeId"
        WHERE "Boats"."deletedAt" IS NULL
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
            list = list.filter((boat: any) => boat.title.toLowerCase().includes(search.toLowerCase()));
        }

        // Filtering
        if (storeId !== undefined) {
            list = list.filter((boat: any) => boat.storeId == storeId);
        }

        list = list.filter((boat: any) => boat.is_approved == true);

        console.log(list)
        // Pagination
        const paginationInfo = getPaginationResult(list.length, { limit, page });
        const paginatedList = list.slice((page - 1) * limit, page * limit);

        return [paginatedList, paginationInfo];


        // let qb = this.repository.createQueryBuilder("Boats")
        // .leftJoin(
        //     (subQuery) => {
        //         return subQuery
        //             .select("ratings.issueId", "issueId")
        //             .addSelect("COUNT(*)", "ratingCount")
        //             .addSelect("SUM(star) / COUNT(*)", "TotalStar")
        //             .from("ratings", "ratings")
        //             .where("ratings.ratingFor = :ratingFor", { ratingFor: 'boat' }) // Correctly bind the parameter here
        //             .groupBy("ratings.issueId")
        //     },
        //     "ratings", // Alias for the subquery
        //     "ratings.issueId = Boats.id" // Join condition
        // )
        // .orderBy("Boats.createdAt", "DESC")
        // .limit(limit)
        // .offset((page - 1) * limit);

        // if (sortBy === undefined) {
        // } else if (sortBy == SortByProductEnum.DATE) {
        //     if (order == SortEnum.ASC) {
        //         qb = qb.orderBy("boat.createdAt", "ASC");
        //     } else {
        //         qb = qb.orderBy("boat.createdAt", "DESC");
        //     }
        // } else if (sortBy == SortByProductEnum.NAME) {
        //     if (order == SortEnum.ASC) {
        //         qb = qb.orderBy("boat.title", "ASC");
        //     } else {
        //         qb = qb.orderBy("boat.title", "DESC");
        //     }
        // } else if (sortBy == SortByProductEnum.PRICE) {
        //     if (order == SortEnum.ASC) {
        //         qb = qb.orderBy("boat.priceInRs", "ASC");
        //     } else {
        //         qb = qb.orderBy("boat.priceInRs", "DESC");
        //     }
        // }

        // if (search === undefined) {
        // } else {
        //     qb = qb.andWhere("LOWER(boat.title) LIKE  :search", { search: `%${search.toLowerCase()}%` });
        // }

        // if (storeId === undefined) {
        // } else {
        //     qb = qb.andWhere("c.id = :storeId", { storeId });
        // }
        // const [result, count] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();

        // const paginationInfo = getPaginationResult(count, { limit, page })
        // return [result, paginationInfo];
        return list;
    }

    async getBoatById(id: number) {
        let qb: SelectQueryBuilder<BoatEntity> = this.repository
            .createQueryBuilder("boat")
            .where("boat.id = :id", { id })
            .leftJoinAndSelect("boat.store", "c")
            .select([
                "boat",
                "c.name",
                "c.id",
                "c.location",
                "c.phoneNumber"
            ]);

        return await qb.getOne();
    }

    async getBoatsAccordingToStoreId(storeId: number) {
        return await this.repository.findBy({ store: { id: storeId } });
    }

    async getBoatsCountAccordingToStoreId(storeId: number) {
        return await this.repository.countBy({ store: { id: storeId } });
    }

    async getBoatAccordingToId(id: number) {
        return await this.repository.findOneBy({ id: id });
    }
}

export const boatService = new BoatService();