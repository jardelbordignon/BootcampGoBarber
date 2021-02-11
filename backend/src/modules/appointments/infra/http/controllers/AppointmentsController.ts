import { Request, Response } from 'express'
import { parseISO, format } from 'date-fns'
import { container as dependencyInjector } from 'tsyringe'

import CreateAppointmentService from '@/modules/appointments/services/CreateAppointmentService'

export default class AppointmentsController {

  public async create(request: Request, response: Response): Promise<Response> {
    const client_id = request.user.id
    const { provider_id, date } = request.body

    const parsedDate = parseISO(format(date, "yyyy-MM-dd'T'HH:mm:ss"))

    const createAppointmentService = dependencyInjector.resolve(CreateAppointmentService)

    const appointment = await createAppointmentService.execute({
      provider_id,
      client_id,
      date: parsedDate
    })

    return response.json(appointment)
  }

}
