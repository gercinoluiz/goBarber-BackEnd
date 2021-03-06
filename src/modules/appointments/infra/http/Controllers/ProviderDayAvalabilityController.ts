import { Response, Request, request, response } from 'express';
import ListProviderDayAvailabilityService from '../../../services/ListProviderDayAvailabilityService';
import { container } from 'tsyringe';





export default class ProviderDayAlailabilityController {

    public async index(request: Request, response: Response): Promise<Response> {

        const { provider_id } = request.params
        const { day, month, year } = request.query

        const listProviderDayAvalability = container.resolve(ListProviderDayAvailabilityService)

        const availability = await listProviderDayAvalability.execute({
            day: Number(day), month: Number(month), provider_id, year: Number(year)
        })

        return response.json(availability)

    }

}