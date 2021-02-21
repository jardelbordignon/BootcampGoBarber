import { startOfHour, isBefore, getHours, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { injectable, inject } from 'tsyringe'

import { DI_CACHE_PROVIDER } from '@/shared/providers/CacheProvider'
import ICacheProvider from '@/shared/providers/CacheProvider/models/ICacheProvider'
import { DI_APPOINTMENTS_REPOSITORY, DI_NOTIFICATIONS_REPOSITORY, DI_USERS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import INotificationsRepository from '@/modules/notifications/repositories/INotificationsRepository'
import IAppointmentsRepository from '@/modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@/modules/appointments/dtos/ICreateAppointmentDTO'
import Appointment from '@/modules/appointments/infra/typeorm/entities/Appointment'
import AppError from '@/shared/errors/AppError'

@injectable()
export default class CreateAppointmentService {

  constructor(
    @inject(DI_APPOINTMENTS_REPOSITORY)
    private appointmentsRepository: IAppointmentsRepository,

    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository,

    @inject(DI_NOTIFICATIONS_REPOSITORY)
    private notificationsRepository: INotificationsRepository,

    @inject(DI_CACHE_PROVIDER)
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ provider_id, client_id, date }: ICreateAppointmentDTO): Promise<Appointment> {

    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.")
    }

    if (client_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.")
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create an appointment between 8am and 5pm')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate, provider_id
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      client_id,
      date: appointmentDate
    })

    const client = await this.usersRepository.findById(client_id)
    const dateFormatted = format(appointmentDate, "dd/MMM cccc 'às' HH:mm'h'", { locale: ptBR })

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `(${dateFormatted}) - ${client!.name}`
    })

    await this.cacheProvider.remove(
      `provider-appointments:${provider_id}:${format(appointmentDate, 'yyyy-M-d')}`
    )

    return appointment
  }
}
