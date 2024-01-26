import { Exclude, Expose } from "class-transformer";
import { BaseSerializer } from "../../../common/baseSerializer/base.serializer";

@Exclude()
export class CustomerSerializer extends BaseSerializer{
    @Expose()
    name: string
 
    @Expose()
    email: string;
 
    @Expose()
    phoneNumber: number;

}