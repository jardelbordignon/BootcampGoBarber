import { generate } from 'shortid'
import { isEqual } from 'date-fns'

import Appointment from '@/modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@/modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@/modules/appointments/dtos/ICreateAppointmentDTO'

export default class AppointmentsRepository implements IAppointmentRepository {

  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    )
    return findAppointment
  }


  public async create({ provider_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: generate(), provider_id, date })

    this.appointments.push(appointment)

    return appointment
  }

}

