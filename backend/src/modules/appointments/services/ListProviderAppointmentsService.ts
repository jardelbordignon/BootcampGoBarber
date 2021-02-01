import { injectable, inject } from 'tsyringe'

import { DI_APPOINTMENTS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import Appointment from '../infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
export default class ListProviderAppointmentsService {

  constructor(
    @inject(DI_APPOINTMENTS_REPOSITORY)
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id, day, month, year
    })

    return appointments
  }

}
