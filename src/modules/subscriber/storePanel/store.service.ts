import { SubscriberService } from "../subscriber.service";

export class StoreSubsriberService extends SubscriberService {

    constructor() {
        super()
    }

    async getSubscriberAccordingToStoreId(storeId: number) {
        return this.repository.find({ where: { store: { id: storeId } }, relations: { user: true }, select: { user: { name: true, email: true, phoneNumber: true, id: true } } })
    }

    async getSubscriberCount(storeId: number) {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setUTCDate(today.getUTCDate() + 1);
        const updateToday = await this.repository.createQueryBuilder("store").where("store.createdAt > :date", { date: today }).andWhere({ id: storeId }).getCount();
        return {count: await this.repository.count({ where: { store: { id: storeId } } }), today: updateToday}
    }


}

export const storeSubsriberService = new StoreSubsriberService();