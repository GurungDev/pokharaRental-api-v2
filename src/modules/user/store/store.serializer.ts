import { Exclude, Expose } from "class-transformer";
import { BaseSerializer } from "../../../common/baseSerializer/base.serializer";


@Exclude()
export class StoreSerializer extends BaseSerializer{
    @Expose()
    name: string
    @Expose()
    location: string;

    @Expose()
    email: string;

    @Expose()
    ownerName: string;
    @Expose()
    phoneNumber: number;
    @Expose()
    is_approved: boolean;
}