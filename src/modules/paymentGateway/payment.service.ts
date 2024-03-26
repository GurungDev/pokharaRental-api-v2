import crypto from "crypto";
import { ExpressError } from "../../common/class/error";
import { EnvConfig } from "../../config/envConfig";

export class CheckOutPaymentService {
  async verifyEsewaPayment(token: string) {
    try {
      //verifying esewa
      const data = Buffer.from(token, "base64").toString("utf-8")
      const jsonData = JSON.parse(data);
      console.log(jsonData);
      if (jsonData.status != "COMPLETE") {
        throw new ExpressError(400, jsonData.status);
      }
      return { success: true, Data: jsonData };
    } catch (error: any) {
      return { success: false, Message: error?.message };
    }
  }

  async getEsewaSignature(message: string) {
    const hmac = crypto.createHmac("sha256", EnvConfig.EsewaConfig.secretKey);
    hmac.update(message);
    const base64Hash = hmac.digest("base64");
    return base64Hash;
  }
}

export const checkOutPaymentService = new CheckOutPaymentService();
