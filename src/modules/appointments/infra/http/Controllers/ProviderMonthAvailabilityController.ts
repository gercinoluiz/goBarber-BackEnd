import { Response, Request, request, response } from 'express';
import ListProviderMonthAvailabilityService from '../../../services/ListProviderMonthAvailabilityService';
import { container } from 'tsyringe';





export default class ProviderMonthAlailabilityController {

    public async index(request: Request, response: Response): Promise<Response> {

        const { provider_id } = request.params
        const { day, month, year } = request.query

        const listProviderMonthAvalability = container.resolve(ListProviderMonthAvailabilityService)

        const availability = await listProviderMonthAvalability.execute({
             month: Number(month), provider_id, year: Number(year)
        })

        return response.json(availability)

    }

}