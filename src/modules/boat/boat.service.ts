import { BoatRepository, boatRepository } from "./repository/boat.repository";

export default class BoatService{
    protected readonly repository: BoatRepository;
    constructor(){
        this.repository = boatRepository;
    }

    async getAll(){
        const boats = await this.repository.find();
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