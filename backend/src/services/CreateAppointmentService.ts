import { startOfHour } from 'date-fns'

import Appointment, { CreateAppointmentDTO } from '@/models/Appointment'
import AppointmentsRepository from '@/repositories/AppointmentsRepository'

export default class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository
  }

  public execute({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(date)

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    return appointment
  }
}
