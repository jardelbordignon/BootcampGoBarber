import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment, { CreateAppointmentDTO } from '@/models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

export default class CreateAppointmentService {

  public async execute({ provider_id, date }: CreateAppointmentDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
