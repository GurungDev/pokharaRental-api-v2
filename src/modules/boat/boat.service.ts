import { PaginationRequest } from "../../common/validation/paginationRequest.validation";
import { GetBoatDto } from "./boat.dto";
import { BoatRepository, boatRepository } from "./repository/boat.repository";

export default class BoatService{
    protected readonly repository: BoatRepository;
    constructor(){
        this.repository = boatRepository;
    }

    async getAll( { sortBy,order, search, storeId }: GetBoatDto, { limit=20 , page=1 }: PaginationRequest){
        let whereQuery = {}
        
        const boats = await this.repository.find({
            where:{
                title: search,
                store: {id: storeId}
            },
            order: {
                title: order
            },
            skip: (page -1 ) * limit,
            take: limit
        });
        return boats;
    }

    async getBoatsAccordingToStoreId(storeId: number){
        return await this.repository.findBy({ store: {id: storeId} });
    }

    async getBoatsCountAccordingToStoreId(storeId: number){
        return await this.repository.countBy({ store: {id: storeId} });
    }

    async getBoatAccordingToId(id:number){
        return await this.repository.findOneBy({ id: id });
    }    
}

export const boatService = new BoatService();