import { config } from "dotenv";
import { join } from "path";
import { ExpressError } from "../common/class/error";

config({
  path: join(__dirname, "..", "..", ".env"),
});

export class EnvConfig {
  constructor() {
    throw new ExpressError(400, `Can't instance static class`);
  }

  public static appConfig = {
    port: EnvConfig.parseInt(EnvConfig.getFromEnv("PORT")),

  };

  public static dbConfig = {
    dbName: this.parseString(this.getFromEnv("DB_NAME")),
    dbPort: this.parseInt(this.getFromEnv("DB_PORT")),
    dbHost: this.parseString(this.getFromEnv("DB_HOST")),
    dbUsername: this.parseString(this.getFromEnv("DB_USERNAME")),
    dbPassword: this.parseString(this.getFromEnv("DB_PASSWORD")),

  };

  public static jwtSecret = this.parseString(this.getFromEnv("JWT_SECRET"));
  public static jwtExpiresInSec = this.parseInt(
    this.getFromEnv("JWT_EXPIRY_SEC")
  );


  public static adminConfig = {
    email: this.parseString(this.getFromEnv("ADMIN_EMAIL")),
    password: this.parseString(this.getFromEnv("ADMIN_PASSWORD")),
  };

  public static otpSecret = this.parseString(this.getFromEnv("OTP_SECRET"))
  public static otpExipryTime = this.parseInt(
    this.getFromEnv("VERIFICATION_OTP_EXPIRY_SEC")
  );


  public static mailConfig = {
    noReplySender: this.parseString(this.getFromEnv("NO_REPLY_SENDER")),
    providerApiSecret: this.parseString(this.getFromEnv("PROVIDER_API_KEY")),
  };


  public static cloudinaryConfig = {
    name: this.parseString(this.getFromEnv("CLOUDINARY_NAME")),
    apiKey: this.parseString(this.getFromEnv("CLOUDINARY_API_KEY")),
    secret: this.parseString(this.getFromEnv("CLOUDINARY_API_KEY_SECRET")),
  };



  public static EsewaConfig = {
    url: this.parseString(this.getFromEnv("ESEWA_URL")),
    secretKey: this.parseString(this.getFromEnv("ESEWA_SECRET_KEY"))
  };

  public static khaltiConfig = {
    url: this.parseString(this.getFromEnv("KHALTI_URL")),
    verifyUrl: this.parseString(this.getFromEnv("KHALTI_VERIFY_URL")),
    secretKey: this.parseString(this.getFromEnv("KHALTI_SECRETKEY")),
  };


  private static getFromEnv(key: string) {
    return process.env[key];
  }

  private static parseInt(value: string | undefined): number {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: number`);
    }
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      throw new Error("This config is not of correct type");
    }
    return parsedValue;
  }

  private static parseString(value: string | undefined): string {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: string`);
    }
    return value;
  }

  private static parseBoolean(value: string | undefined): boolean {
    if (!value) {
      throw new Error(`Boolean value is missing in Config.`);
    }

    if (!(value === "true" || value === "false")) {
      throw new Error(`Boolean valve is invalid.`);
    }

    return value === "true" ? true : false;
  }

  private static parseArrayOfString(value: string | undefined) {
    if (!value) {
      throw new Error(`Missing Env value in Conig type: arrayOfString.`);
    }
    return value.split(",");
  }
}
