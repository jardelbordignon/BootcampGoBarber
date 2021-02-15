import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { DI_CACHE_PROVIDER } from '@/shared/providers/CacheProvider'
import ICacheProvider from '@/shared/providers/CacheProvider/models/ICacheProvider'
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
    private appointmentsRepository: IAppointmentsRepository,

    @inject(DI_CACHE_PROVIDER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<Appointment[]> {

    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`

    let appointments = await this.cacheProvider.get<Appointment[]>(cacheKey)

    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id, day, month, year
      })

      await this.cacheProvider.set(cacheKey, classToClass(appointments))
    }

    return appointments
  }

}
