import { getRepository, Raw, Repository } from 'typeorm'

import Appointment from '@/modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentRepository from '@/modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@/modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@/modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@/modules/appointments/dtos/IFindAllInDayFromProviderDTO'

export default class AppointmentsRepository implements IAppointmentRepository {

  private ormRepository: Repository<Appointment>

  constructor() {
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: { date, provider_id }
    })
    return appointment
  }


  public async findAllInMonthFromProvider({ provider_id, month, year }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parseMonth = String(month).padStart(2, '0')

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `DATE_FORMAT(${dateFieldName}, "%Y-%m") = '${year}-${parseMonth}'`
        )
      },
      relations: ['client']
    })

    return appointments
  }


  public async findAllInDayFromProvider({ provider_id, day, month, year }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parseDay = String(day).padStart(2, '0')
    const parseMonth = String(month).padStart(2, '0')

    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(dateFieldName =>
          `DATE_FORMAT(${dateFieldName}, "%Y-%m-%d") = '${year}-${parseMonth}-${parseDay}'`
        )
      },
      relations: ['client']
    })

    return appointments
  }


  public async create({ provider_id, client_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, client_id, date })

    await this.ormRepository.save(appointment)

    return appointment
  }

}

