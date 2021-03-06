
import { Response, Request } from 'express'
import { container } from 'tsyringe';
import ListProviderAppointmentsService from '../../../services/ListProvidersAppointmentsService';
import { classToClass } from 'class-transformer';






export default class ProvidersAppointmentsController {


    public async index(request: Request, response: Response): Promise<Response> {

        const provider_id = request.user.id
        const { day, year, month } = request.query

        console.log('DevLog : /ProvidersAppointmentsController')

        const listProvidersAppointmentsService = container.resolve(ListProviderAppointmentsService)

        const appointments = await listProvidersAppointmentsService.execute({

            day: Number(day), month: Number(month), provider_id, year: Number(year)
        })



        return response.status(200).json(classToClass(appointments))


    }

}