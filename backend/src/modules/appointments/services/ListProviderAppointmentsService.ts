import { injectable, inject } from 'tsyringe'

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
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id, day, month, year
    })

    await this.cacheProvider.set('chaveTeste', 'valorTeste')
    const cache = await this.cacheProvider.get('chaveTeste')
    console.log(cache)

    return appointments
  }

}
