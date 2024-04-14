import { FindOptionsWhere } from "typeorm";
import { ExpressError } from "../../../../common/class/error";
import { CustomerService } from "../customer.service";
import CustomerEntity from "../entities/customer.entity";


export class AdminCustomerService extends CustomerService {
    constructor() {
        super()
    }
    async deleteCustomer(userId: number) {
        return await this.repository.softDelete({ id: userId });
    }
    async getAllCustomer() {
        return await this.repository.find();
    }
    async getCustomerNumber() {

        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setUTCDate(today.getUTCDate() + 1);

        const updateToday = await this.repository.createQueryBuilder("customer").where("customer.createdAt > :date", { date: today }).getCount();
        return {count: await this.repository.count(), today: updateToday}
    }

 
}

export const adminCustomerService = new AdminCustomerService();
