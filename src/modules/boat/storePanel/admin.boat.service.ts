import { DeepPartial } from "typeorm";
import BoatService from "../boat.service";
import BoatEntity from "../entities/boat.entity";

export class AdminBoatSevice extends BoatService{
    
    constructor(){
        super();
    }
    
    async createBoat(Boat: DeepPartial<BoatEntity>){
        return await this.repository.create(Boat).save();
    }

    async delete(id:number){
        return await this.repository.delete({id: id})
    }

    async patch(id: number, Boat: DeepPartial<BoatEntity> ){
        await this.repository.update(id, Boat);
        return await this.repository.findBy({id})
    }
}

export const adminBoatService = new AdminBoatSevice();