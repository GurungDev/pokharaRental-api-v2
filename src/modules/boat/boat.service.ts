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

        let qb: SelectQueryBuilder<BoatEntity> = this.repository
            .createQueryBuilder("boat")
            .leftJoinAndSelect("boat.store", "c")
            .select([
                "boat",
                "c.name",
                "c.id"
            ]);

        if (sortBy === undefined) {
        } else if (sortBy == SortByProductEnum.DATE) {
            if (order == SortEnum.ASC) {
                qb = qb.orderBy("boat.createdAt", "ASC");
            } else {
                qb = qb.orderBy("boat.createdAt", "DESC");
            }
        } else if (sortBy == SortByProductEnum.NAME) {
            if (order == SortEnum.ASC) {
                qb = qb.orderBy("boat.title", "ASC");
            } else {
                qb = qb.orderBy("boat.title", "DESC");
            }
        } else if (sortBy == SortByProductEnum.PRICE) {
            if (order == SortEnum.ASC) {
                qb = qb.orderBy("boat.priceInRs", "ASC");
            } else {
                qb = qb.orderBy("boat.priceInRs", "DESC");
            }
        }

        if (search === undefined) {
        } else {
            qb = qb.andWhere("LOWER(boat.title) LIKE  :search", { search: `%${search.toLowerCase()}%` });
        }

        if (storeId === undefined) {
        } else {
            qb = qb.andWhere("c.id = :storeId", { storeId });
        }
        const [result, count] = await qb.skip((page - 1) * limit).take(limit).getManyAndCount();

        const paginationInfo = getPaginationResult(count, { limit, page })
        return [result, paginationInfo];
    }

    async getBoatById(id: number) {
        let qb: SelectQueryBuilder<BoatEntity> = this.repository
            .createQueryBuilder("boat")
            .where("boat.id = :id", { id })
            .leftJoinAndSelect("boat.store", "c")
            .select([
                "boat",
                "c.name",
                "c.id"
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