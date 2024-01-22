import { CycleRepository, cycleRepository } from "./repository/cycle.repository";

 
export default class CycleService{
    protected readonly repository: CycleRepository;
    constructor(){
        this.repository = cycleRepository;
    }

    async getAll(){
        const cycles = await this.repository.find();
        return cycles;
    }

    async getCyclesAccordingToStoreId(storeId: number){
        return await this.repository.findBy({ store: {id: storeId} });
    }

    async getCycleAccordingToId(id:number){
        return await this.repository.findOneBy({ id: id });
    }    
}

export const cycleService = new CycleService();