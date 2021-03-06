
import ICreateNotificationDTO from '../infra/dtos/ICreateNotificationsDTO';
import Notification from '../infra/typeorm/schemas/Notification';



export default interface INotificationsRemository {


    create(date: ICreateNotificationDTO): Promise<Notification>;
}