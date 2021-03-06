import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment"

import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';

export default interface IAppointmentsRepository {
    findByDate(date: Date, provider_id:string): Promise<Appointment | undefined>;
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findAllInMonthFromProvider(
        data: IFindAllInMonthFromProviderDTO,
    ): Promise<Appointment[]>

    findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
}
