import { SubscriberRepository, subscriberRepository } from "./repository/subscriber.repository";

 
 

export class SubscriberService {
  protected readonly repository: SubscriberRepository;
 
  constructor() {
    this.repository = subscriberRepository;
  }
 

  async create(userId: number, storeId: number) {
    return this.repository.create({ user: { id: userId }, store: { id: storeId } }).save();
  }

  async getOne(userId: number, storeId: number) {
    return this.repository.findOne({ where: { user: { id: userId }, store: { id: storeId } } });
  }

  async getSubscriberAccordingToUserId(userId: number){
    return this.repository.findOne({ where: { user: { id: userId } } })
  }

  async deleteSubscriber(userId: number, storeId: number){
    return this.repository.delete( { user: { id: userId }, store: { id: storeId } })
  }
}

export const subscriberService = new SubscriberService();
