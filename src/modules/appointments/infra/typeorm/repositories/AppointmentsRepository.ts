import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import { getRepository, Repository } from 'typeorm'
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
// interface CreateAppointmentDTO {
//     provider: string;
//     date: Date;
// }

class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>


    constructor() {
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date: Date): Promise<Appointment | undefined> {
        // const findAppointmentByDate = this.appointments.find(appointment => {
        //     isEqual(date, appointment.date)
        // })


        const findAppointmentByDate = await this.ormRepository.findOne({
            where: { date }
        })


        return findAppointmentByDate || undefined
    }

    public async create({date, provider_id}: ICreateAppointmentDTO): Promise<Appointment> {

        const appointment =  this.ormRepository.create({provider_id, date})
        await this.ormRepository.save(appointment)

        return appointment

    }
}

export default AppointmentRepository;
