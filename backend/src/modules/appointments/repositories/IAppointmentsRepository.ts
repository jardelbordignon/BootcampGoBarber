import Appointment from '@/modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@/modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInMonthFromProviderDTO from '@/modules/users/dtos/IFindAllInMonthFromProviderDTO'
import IFindAllInDayFromProviderDTO from '@/modules/users/dtos/IFindAllInDayFromProviderDTO'

export default interface IAppointmentRepository {

  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>

}
