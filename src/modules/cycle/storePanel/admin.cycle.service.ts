import { DeepPartial } from "typeorm";
import CycleService from "../cycle.service";
import CycleEntity from "../entities/cycle.entity";

export class AdminCycleSevice extends CycleService {

    constructor() {
        super();
    }

    async createCycle(cycle: DeepPartial<CycleEntity>) {
        return await this.repository.create(cycle).save();
    }

    async delete(id: number) {
        return await this.repository.softDelete({ id: id })
    }

    async patch(id: number, cycle: Partial<CycleEntity>) {
        return await this.repository.update(id, cycle);

    }
}

export const adminCycleService = new AdminCycleSevice();