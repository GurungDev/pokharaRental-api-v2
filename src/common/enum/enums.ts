export enum RequestDataPaths {
    Body,
    Params,
    Query,
    Files,
  }

export enum UserEnum {
    STORE= "store",
    CUSTOMER= "customer",
    ADMIN= "admin",
}

export enum UserServiceEnum {
  STORE= "storeService",
  CUSTOMER= "customerService",
  ADMIN= "adminService",
}

export enum OtpPurpose  {
  SIGNUP_STORE = "signupStore",
  FORGOT_PASSWORD_STORE =  "forgotPasswordStore",
  SIGNUP_CUSTOMER = "signupCustomer",
  FORGOT_PASSWORD_CUSTOMER =  "forgotPasswordCustomer",
};


export enum SortByProductEnum {
  NAME = "name",
  DATE = "date",
  PRICE = "price",
}

export enum SortEnum {
  ASC = "asc",
  DESC = "desc",
}

export enum RatingForEnum{
  STORE= "store",
  BOAT = "boat",
  CYCLE = "cycle"
}

export enum NotificationTypeEnum {
  NEW_BOAT = "new_boat",
  NEW_CYCLE = "new_cycle",
  UPDATE_BOAT = "update_boat",
  UPDATE_CYCLE = "update_cycle"
}


export enum ProductEnum{
  BOAT = "boat",
  CYCLE = "cycle"
}


export enum PaymentType{
  CASH = "cash",
  ESEWA = "esewa"
}