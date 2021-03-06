import { injectable, inject } from 'tsyringe'
import { getHours, isAfter } from 'date-fns'

import { DI_APPOINTMENTS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

type IResponse = Array<{
  hour: number
  available: boolean
}>

@injectable()
export default class ListProviderDayAvailabilityService {

  constructor(
    @inject(DI_APPOINTMENTS_REPOSITORY)
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id, day, month, year
    })

    const hourStart = 8
    const hoursNumbers = Array.from({length: 10}, (_, index) => index + hourStart) // [8...17]
    const currentDate = new Date(Date.now())

    const availability = hoursNumbers.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month-1, day, hour)

      const available = !hasAppointmentInHour && isAfter(compareDate, currentDate)

      return { hour, available }
    })

    return availability
  }

}
