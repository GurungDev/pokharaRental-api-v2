import { ExpressError } from "../../../../common/class/error";
import { CustomerService } from "../customer.service";
 

export class AdminCustomerService extends CustomerService{
     constructor(){
        super()
     }
     async deleteCustomer(userId: number) {
        return await this.repository.softDelete({ id: userId });
      }
    async getAllCustomer(){
        return await this.repository.find();
    }
    async getCustomerNumber(){
        return await this.repository.count();
    }

}

export const adminCustomerService = new AdminCustomerService();