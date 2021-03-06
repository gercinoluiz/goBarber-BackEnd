
import Notification from '../../infra/typeorm/schemas/Notification';
import { ObjectID } from 'mongodb';
import INotificationsRemository from '../INotificationsRepository';
import ICreateAppointmentDTO from '../../../appointments/dtos/ICreateAppointmentDTO';
import ICreateNotificationDTO from '../../infra/dtos/ICreateNotificationsDTO';




export default class FakeNotificationsRepository implements INotificationsRemository {

    private notifications : Notification[] = []

    public async create({ content, receipt_id }: ICreateNotificationDTO): Promise<Notification> {

        const notification = new Notification()

        Object.assign(notification, {
            id: new ObjectID(),
            receipt_id, content
        })
         this.notifications.push(notification)

        return notification


    }

}