import { SubscriberService } from "../subscriber.service";

export class StoreSubsriberService extends SubscriberService{

    constructor(){
        super()
    }

    async getSubscriberAccordingToStoreId(storeId: number){
        return this.repository.find({ where: { store: { id: storeId } }, relations: {user: true}, select: {user:{name: true, email: true, phoneNumber: true, id:true}} })
    }

}

export const storeSubsriberService = new StoreSubsriberService();