import { SubscriberService } from "../subscriber.service";

export class StoreSubsriberService extends SubscriberService{

    constructor(){
        super()
    }

    async getSubscriberAccordingToStoreId(storeId: number){
        return this.repository.findOne({ where: { store: { id: storeId } } })
    }

}

export const storeSubsriberService = new StoreSubsriberService();