import { getHours, isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";
import AppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';



interface IRequest {
    provider_id: string;
    day: number;
    month: number;
    year: number;
}


type IResponse = Array<{

    hour: number;
    available: boolean;
}>


@injectable()

export default class ListProviderDayAvailabilityService {

    constructor(

        @inject('AppointmentsRepository')
        private appointmentRepository: AppointmentRepository

    ) { }
    


    public async execute({ day, month, provider_id, year }: IRequest): Promise<IResponse> {

        const appointments = await this.appointmentRepository.findAllInDayFromProvider(
            {
                provider_id,
                year,
                month,
                day,
            },
        );

        console.log({appointments})

        const hourStart = 8

        const eachHourArray = Array.from({ length: 10 }, (_, index) => index + hourStart)

        console.log({eachHourArray})


        const currentDate = new Date(Date.now())

        const avalability = eachHourArray.map(hour => {
            const hourAppointmentInHour = appointments.find(
                appointments => getHours(appointments.date) === hour,
            )

            const compareDate = new Date(year, month - 1, day, hour)

            return {
                hour,
                available: !hourAppointmentInHour && isAfter(compareDate, currentDate)
            }
        })

        return avalability

   
    }



}