import { SendGridEmailServiceService } from "./sendgrid.service";
import { ContactInfo } from "./template/ContactInfo";
import { baseTemplate } from "./template/base-template";
import { customerRegister } from "./template/customerRegister";
import { passwordChange } from "./template/forgotPassword";
import { OrderSuccesMessage } from "./template/orderSuccess";
import { storeRegister } from "./template/storeRegister";

export class EmailService extends SendGridEmailServiceService {
  constructor() {
    super()
    this.mailStoreRegister = this.mailStoreRegister.bind(this)
    this.mailCustomerRegister = this.mailCustomerRegister.bind(this)
    this.mailPasswordChange = this.mailPasswordChange.bind(this)
  }

  private wrapGenericTemplate(body: string) {
    return baseTemplate(body);
  }

  sendContactEmail(email: string, phone: string, name: string, description: string) {
    this.sendEmail(
      ["gurungngr@gmail.com"],
      "Contact Info",
      this.wrapGenericTemplate(ContactInfo(name,email, phone , description)),
      
    );
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

  mailOrderComplete(email: string, quantity: number,
    priceOfSingleProduct: number,
    bookingDate: Date,
    durationInHour: number,
    totalPriceInRs: number,

    transaction_uuid: string) {
    this.sendEmail(
      [email],
      "Order Placed Succesfully",
      this.wrapGenericTemplate(OrderSuccesMessage(quantity, priceOfSingleProduct, bookingDate, durationInHour, totalPriceInRs, transaction_uuid))
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