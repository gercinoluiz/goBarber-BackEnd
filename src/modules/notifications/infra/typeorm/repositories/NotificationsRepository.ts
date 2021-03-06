
import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotificationDTO from '../../dtos/ICreateNotificationsDTO';
import Notification from '../schemas/Notification';
import INotificationsRemository from '../../../repositories/INotificationsRepository';





export default class NotificationsRepository implements INotificationsRemository {

    private mongoOrmRepository: MongoRepository<Notification>


    constructor() {

        this.mongoOrmRepository = getMongoRepository(Notification, 'mongo')

    }

    public async create({ content, receipt_id}: ICreateNotificationDTO): Promise<Notification> {

        const notification = this.mongoOrmRepository.create({
            receipt_id, 
            content
        })


        await this.mongoOrmRepository.save(notification)

        return notification


    }

}