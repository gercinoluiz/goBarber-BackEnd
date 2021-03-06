import 'reflect-metadata'

import { injectable, inject } from "tsyringe";
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { getDate, getDaysInMonth } from 'date-fns';
import { Index } from 'typeorm';
import { isAfter } from 'date-fns';



interface IRequest {
    provider_id: string;
    month: number;
    year: number;
}


// I will receive one array, not one array of thing, so that I got to use the way bellow

type IResponse = Array<{
    day: number;
    available: boolean;
}>



@injectable()

export default class ListProviderMonthAvailabilityService {

    constructor(

        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmentsRepository

    ) { }

    public async execute({ month, provider_id, year }: IRequest): Promise<IResponse> {

        console.log(`DevLog: /ListProviderMonthAvalabilityService/execute`)

        const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
            provider_id, year, month
        })


        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

        const numberOfDaysInMonthArray = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1)


        const avalability = numberOfDaysInMonthArray.map(day => {

            const compareDate = new Date(year, month - 1, day, 23, 59, 59)

            const appointmentsInDay = appointments.filter(appointment => {
                return getDate(appointment.date) === day
            })

            console.log(appointmentsInDay.length)

            return {
                day,
                available: isAfter(compareDate, new Date()) && appointmentsInDay.length < 10
            }
        })

        return avalability

    }

}
