import { DeepPartial } from "typeorm";
import { RatingRepository, ratingRepository } from "./repository/ratings.repository";
import { RatingEntity } from "./entities/ratings.entity";
import { RatingForEnum } from "../../common/enum/enums";
import BoatEntity from "../boat/entities/boat.entity";


export class RatingService {
    private readonly repository: RatingRepository;
    constructor() {
        this.repository = ratingRepository
    }

    async createARating(rating: DeepPartial<RatingEntity>) {
        return this.repository.create(rating).save()
    }

    async findRating(rating: { ratingFor: RatingForEnum, issueId: number, postedBy: number; }) {
        const checkRating = await this.repository.findOne({ where: { ratingFor: rating.ratingFor, issueId: rating.issueId, postedBy: { id: rating.postedBy } } })
        return checkRating
    }

    async getRatingAccordingToIssuedItem(ratingFor: RatingForEnum, issueId: number) {
        const [ratingList, count] = await this.repository.findAndCount({ where: { ratingFor: ratingFor, issueId: issueId } })
        return { ratingList, count }
    }

    async getTop5RatedAccordingToIssuedItem(ratingFor: RatingForEnum) {

        let queryBuilder = this.repository.createQueryBuilder('rating')
            .select('rating.ratingFor AS ratingFor')
            .addSelect('rating.issueId AS issueId')
            .addSelect('COUNT(*) AS count')
            .addSelect('AVG(rating.star) AS averageStar')
            .where('rating.ratingFor = :ratingFor', { ratingFor })
            .groupBy('rating.ratingFor')
            .addGroupBy('rating.issueId')
            .orderBy('averageStar', 'DESC')
            .take(5);

        switch (ratingFor) {
            case RatingForEnum.BOAT:
                queryBuilder = queryBuilder.addSelect('boat')
                    .innerJoin('BoatEntity', 'boat', 'rating.issueId = boat.id  AND boat.deletedAt IS NULL')
                    .innerJoin('boat.store', 'store', 'store.is_approved = true') // Check if the associated store is approved

                    .addGroupBy('boat.id')
                break;
            case RatingForEnum.CYCLE:
                queryBuilder = queryBuilder.addSelect('cycle')
                    .innerJoin('CycleEntity', 'cycle', 'rating.issueId = cycle.id AND cycle.deletedAt IS NULL').innerJoin('cycle.store', 'store', 'store.is_approved = true')
                    .addGroupBy('cycle.id')
                break;
            case RatingForEnum.STORE:
                queryBuilder = queryBuilder.addSelect('store')
                    .innerJoin('StoreEntity', 'store', 'rating.issueId = store.id')
                    .addGroupBy('store.id')
                break;
            default:
                break;
        }
        const result = await queryBuilder.getRawMany();
        return result;
    }

}

export const ratingService = new RatingService()