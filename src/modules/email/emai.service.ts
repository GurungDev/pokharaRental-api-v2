import { SendGridEmailServiceService } from "./sendgrid.service";
import { storeRegister } from "./template/storeRegister";
import { baseTemplate } from "./template/base-template";
import { customerRegister } from "./template/customerRegister";
import { passwordChange } from "./template/forgotPassword";

export class EmailService extends SendGridEmailServiceService{
    constructor(){
        super()
        this.mailStoreRegister = this.mailStoreRegister.bind(this)
        this.mailCustomerRegister = this.mailCustomerRegister.bind(this)
        this.mailPasswordChange = this.mailPasswordChange.bind(this)
    }

    private wrapGenericTemplate(body: string) {
        return baseTemplate(body);
      }
    
      mailStoreRegister(email: string, otp: string) {
        this.sendEmail(
          [email],
          "Store Registration",
          this.wrapGenericTemplate(storeRegister(otp))
        );
      }

      mailCustomerRegister(email: string, otp: string) {
        this.sendEmail(
          [email],
          "Customer Registration",
          this.wrapGenericTemplate(customerRegister(otp))
        );
      }

      mailPasswordChange(email: string, otp: string) {
        this.sendEmail(
          [email],
          "Forgot Pasword",
          this.wrapGenericTemplate(passwordChange(otp))
        );
      }
}


const emailService = new EmailService();
export default emailService;