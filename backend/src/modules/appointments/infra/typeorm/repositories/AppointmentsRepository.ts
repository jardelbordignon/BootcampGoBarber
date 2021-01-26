import { EntityRepository, Repository } from 'typeorm'

import Appointment from '@/modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@/modules/appointments/infra/repositories/IAppointmentsRepository'

@EntityRepository(Appointment)
export default class AppointmentsRepository
  extends Repository<Appointment> implements IAppointmentRepository {

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({ where: { date } })
    return findAppointment
  }

}

