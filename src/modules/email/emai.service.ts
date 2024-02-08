import { SendGridEmailServiceService } from "./sendgrid.service";
import { storeRegister } from "./template/storeRegister";
import { baseTemplate } from "./template/base-template";
import { customerRegister } from "./template/customerRegister";

export class EmailService extends SendGridEmailServiceService{
    constructor(){
        super()
        this.mailStoreRegister = this.mailStoreRegister.bind(this)
    }

    private wrapGenericTemplate(body: string) {
        return baseTemplate(body);
      }
    
      mailStoreRegister(email: string, token: string) {
        this.sendEmail(
          [email],
          "Store Registration",
          this.wrapGenericTemplate(storeRegister(token))
        );
      }

      mailCustomerRegister(email: string, token: string) {
        this.sendEmail(
          [email],
          "Customer Registration",
          this.wrapGenericTemplate(customerRegister(token))
        );
      }
}


const emailService = new EmailService();
export default emailService;