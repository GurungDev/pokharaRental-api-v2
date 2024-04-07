import crypto from "crypto";
import { ExpressError } from "../../common/class/error";
import { EnvConfig } from "../../config/envConfig";
import axios from "axios";
import { KhaltiInitPayloadDto, KhaltiPayloadDto } from "./payment.dto";

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


  async initKhaltiPayemnt(payload: KhaltiInitPayloadDto, amount: string, purchase_order_id: string, purchase_order_name: string) {
    try {
      let data = {
        return_url: payload.return_url,
        website_url: payload.website_url,
        amount: amount,
        purchase_order_id: purchase_order_id,
        purchase_order_name: purchase_order_name,
      };
       
      let config = {
        headers: {
          Authorization: `key ${EnvConfig.khaltiConfig.secretKey}`,
          "Content-Type": "application/json",
        },
      };
      
      const response: any = await axios.post(
        EnvConfig.khaltiConfig.url,
        data,
        config
      );
   
      return { success: true, Data: response?.data };
    } catch (error: any) {
      return {
        success: false,
        Message: error.response.data.detail || error?.message,
      };
    }
  }
  async verifyKhaltiPayment(payload: KhaltiPayloadDto) {
    try {
      let data = {
        pidx: payload.pidx,
      };

      let config = {
        headers: { Authorization: `key ${EnvConfig.khaltiConfig.secretKey}` },
      };

      const response: any = await axios.post(
        EnvConfig.khaltiConfig.verifyUrl,
        data,
        config
      );
      if (response?.data.status != "Completed") {
        throw new ExpressError(401, response.data.status);
      }
      return { success: true, Data: response?.data };
    } catch (error: any) {
      return { success: false, Message: error.data || error?.message };
    }
  }

}

export const checkOutPaymentService = new CheckOutPaymentService();
