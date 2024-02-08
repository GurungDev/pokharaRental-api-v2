import { EnvConfig } from "../../config/envConfig";
import sendGrid from "@sendgrid/mail";

export abstract class SendGridEmailServiceService {
  private readonly genericEmailSender: string;
  constructor() {
    sendGrid.setApiKey(EnvConfig.mailConfig.providerApiSecret);
    this.genericEmailSender = EnvConfig.mailConfig.noReplySender;
  }
  protected async sendEmail(
    to: string[],
    subject: string,
    html: string,
    sender = this.genericEmailSender
  ) {
    try {
        await sendGrid.send({
          to,
          from: sender,
          subject,
          html,
        });
      } catch (e) {
        console.log(e)
        console.log("Error while sending email")
      }
  }
}
