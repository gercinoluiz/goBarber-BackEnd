
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import ICacheProvider from '../../../shared/container/providers/CaheProvider/models/ICacheProvider';
import { da } from 'date-fns/locale';
import appointmentRouter from '../infra/http/routes/appointments.routes';
import { classToClass } from 'class-transformer';


interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}



@injectable()
export default class ListProviderAppointmentsService {


    constructor(

        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider

    ) { }


    public async execute({ day, month, provider_id, year }: IRequest): Promise<Appointment[]> {
        console.log('@DevLog/LisProvidersAppointmentService/execute')

        const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`

        let appointments  = await this.cacheProvider.recover<Appointment[]>(cacheKey)


        if (!appointments) {
            console.log("@DevLog - DataBase ==> Nothing found in Redis PostGress")

            console.log("@DevLog - DataBase ==> Querying PostGress")

            appointments = await this.appointmentRepository.findAllInDayFromProvider({ provider_id, day, month, year })


        }
        await this.cacheProvider.save(cacheKey, classToClass(appointments))

        return appointments


    }

}