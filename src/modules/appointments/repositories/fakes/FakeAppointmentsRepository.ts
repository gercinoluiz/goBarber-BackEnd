import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import { uuid } from "uuidv4";
import { isEqual } from "date-fns";
// interface CreateAppointmentDTO {
//     provider: string;
//     date: Date;
// }

class AppointmentRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = []

    public async findByDate(date: Date): Promise<Appointment | undefined> {

        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date)
        )

        return findAppointment


    }

    public async create({ date, provider_id }: ICreateAppointmentDTO): Promise<Appointment> {

        const appointment = new Appointment()


        Object.assign(appointment, {
            id: uuid(),
            date: date,
            provider_id: provider_id
        })

        this.appointments.push(appointment)

        return appointment
    }
}

export default AppointmentRepository;
