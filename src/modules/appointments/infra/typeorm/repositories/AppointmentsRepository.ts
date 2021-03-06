import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import { getRepository, Raw, Repository } from 'typeorm'
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository"
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO"
import IFindAllInMonthFromProviderDTO from '../../../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../../dtos/IFindAllInDayFromProviderDTO';
import { da } from "date-fns/locale";
// interface CreateAppointmentDTO {
//     provider: string;
//     date: Date;
// }

class AppointmentRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>


    constructor() {
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date: Date, provider_id:string): Promise<Appointment | undefined> {
        // const findAppointmentByDate = this.appointments.find(appointment => {
        //     isEqual(date, appointment.date)
        // })


        const findAppointmentByDate = await this.ormRepository.findOne({
            where: { date, provider_id }
        })


        return findAppointmentByDate || undefined
    }

    public async create({date, provider_id, user_id}: ICreateAppointmentDTO): Promise<Appointment> {

        const appointment =  this.ormRepository.create({provider_id, date, user_id})
        await this.ormRepository.save(appointment)

        return appointment

    }

    public async findAllInMonthFromProvider ({month, provider_id,year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>{

        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where:{
                provider_id,
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`)
            },
            relations: ['user'],
        })

        return appointments
    }


    public async findAllInDayFromProvider({day, month, provider_id, year}:IFindAllInDayFromProviderDTO): Promise<Appointment[]>{

        const parseDay = String(day).padStart(2,'0')
        const parseMonth = String(month).padStart(2,'0')


        const appoitment = await this.ormRepository.find({
            where:{
                provider_id,
                date: Raw(dateFieldName => `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`)
            },
        
            relations: ['user'],
        })
        return appoitment

    }
}

export default AppointmentRepository;
