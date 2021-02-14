import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'

import ListProviderMonthAvailabilityService from '@/modules/appointments/services/ListProviderMonthAvailabilityService'

export default class ProviderMonthAvailabilityController {

  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { month, year } = request.query

    const listProviderMonthAvailabilityService = dependencyInjector.resolve(ListProviderMonthAvailabilityService)

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id,
      month: Number(month),
      year: Number(year)
    })

    return response.json(availability)
  }

}
