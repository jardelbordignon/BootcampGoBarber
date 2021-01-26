import { Column, Entity } from 'typeorm'
import Defaults from './Defaults'

export interface CreateAppointmentDTO {
  provider:string
  date: Date
}

@Entity('appointments')
export default class Appointment extends Defaults {

  @Column()
  provider: string

  @Column('timestamp')
  date: Date

}
