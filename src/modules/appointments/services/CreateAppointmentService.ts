import { getHours, isBefore, startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe" // for invertion dependency
import AppError from "@shared/errors/AppError";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import INotificationsRemository from '../../notifications/repositories/INotificationsRepository';
import { format } from "date-fns";
import ICacheProvider from '../../../shared/container/providers/CaheProvider/models/ICacheProvider';



interface Request {

    date: Date;
    provider_id: string,
    user_id: string;

}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository: IAppointmentsRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRemository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider


    ) {
    }

    public async execute({ date, provider_id, user_id }: Request): Promise<Appointment> {




        const appointmentDate = startOfHour(date);

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't create an appointment on a past date.");

        }

        if (user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself.");

        }


        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                'You can only create appontments between 8am and 5pm.',
            );
        }

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);

        if (findAppointmentInSameDate) {

            throw new AppError("This book has been already booked", 400)
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate, user_id
        })


        const dateFormated = format(appointment.date, "dd/MM/yyyy 'às' HH:mm 'h'")

        await this.notificationsRepository.create({
            content: `Novo agendamento realizado para o dia ${dateFormated}`,
            receipt_id: provider_id
        })

        await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`)

        return appointment;

    }
}


export default CreateAppointmentService
