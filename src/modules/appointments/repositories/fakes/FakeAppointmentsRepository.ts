import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import { uuid } from "uuidv4";
import { isEqual, getMonth, getYear, getDate } from "date-fns";
import IFindAllInMonthFromProviderDTO from '../../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../dtos/IFindAllInDayFromProviderDTO';
// interface CreateAppointmentDTO {
//     provider: string;
//     date: Date;
// }

class AppointmentRepository implements IAppointmentsRepository {

    private appointments: Appointment[] = []

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {

        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date) && appointment.provider_id == provider_id
        )

        return findAppointment


    }

    public async create({ date, provider_id, user_id }: ICreateAppointmentDTO): Promise<Appointment> {

        const appointment = new Appointment()


        Object.assign(appointment, {
            id: uuid(),
            date: date,
            provider_id: provider_id,
            user_id,
        })

        this.appointments.push(appointment)

        return appointment
    }



    public async findAllInMonthFromProvider({
        month, provider_id, year
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;

    }

    public async findAllInDayFromProvider({ day, month, provider_id, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {

        const appointments = this.appointments.filter(appointment => appointment.provider_id === provider_id && getDate(appointment.date) === day && getMonth(appointment.date) + 1 === month && getYear(appointment.date) === year)

        return appointments
    }

}

export default AppointmentRepository;
