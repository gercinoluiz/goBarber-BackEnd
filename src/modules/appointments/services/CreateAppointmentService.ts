import { startOfHour } from "date-fns";
import {injectable, inject} from "tsyringe" // for invertion dependency
import { getCustomRepository } from "typeorm"
import AppError from "@shared/errors/AppError";
import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";



interface Request {

    date: Date;
    provider_id: string

}

@injectable()
class CreateAppointmentService {

    constructor(
        @inject("AppointmentsRepository")
        private appointmentsRepository:IAppointmentsRepository,

        ){
    }

    public async execute({ date, provider_id }: Request): Promise<Appointment> {




        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(date);

        if (findAppointmentInSameDate) {

            throw new AppError ("This book has been already booked", 400)
        }

        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })


        // try {
        //     await appointmentRepository.save(appointment)

        // } catch (error) {
        //     console.log(error)
        // }

        return appointment;

    }
}


export default CreateAppointmentService
