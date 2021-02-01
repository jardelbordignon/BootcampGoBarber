import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'

import ListProviderDayAvailabilityService from '@/modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {

  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { day, month, year } = request.body

    const listProviderDayAvailabilityService = dependencyInjector.resolve(ListProviderDayAvailabilityService)

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id, day, month, year
    })

    return response.json(availability)
  }

}
