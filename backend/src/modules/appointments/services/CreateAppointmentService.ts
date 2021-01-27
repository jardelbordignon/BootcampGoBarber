import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '@/modules/appointments/infra/typeorm/entities/Appointment'
import AppointmentsRepository from '@/modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import ICreateAppointmentDTO from '@/modules/appointments/dtos/ICreateAppointmentDTO'
import AppError from '@/shared/errors/AppError'

export default class CreateAppointmentService {

  public async execute({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked')
    }

    const appointment = await appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    return appointment
  }
}
