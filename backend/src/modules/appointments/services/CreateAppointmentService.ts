import { startOfHour, isBefore, getHours } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import { DI_APPOINTMENTS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import IAppointmentsRepository from '@/modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@/modules/appointments/dtos/ICreateAppointmentDTO'
import Appointment from '@/modules/appointments/infra/typeorm/entities/Appointment'
import AppError from '@/shared/errors/AppError'
import { LessThanOrEqual } from 'typeorm'

@injectable()
export default class CreateAppointmentService {

  constructor(
    @inject(DI_APPOINTMENTS_REPOSITORY)
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, client_id, date }: ICreateAppointmentDTO): Promise<Appointment> {

    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.")
    }

    if (client_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.")
    }

    console.log('getHours(appointmentDate)', getHours(appointmentDate))
    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can only create an appointment between 8am and 5pm')
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      client_id,
      date: appointmentDate
    })

    return appointment
  }
}
