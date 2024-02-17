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