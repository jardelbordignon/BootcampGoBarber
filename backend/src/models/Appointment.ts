import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import Defaults from './Defaults'
import User from './User'

export interface CreateAppointmentDTO {
  provider:string
  date: Date
}

@Entity('appointments')
export default class Appointment extends Defaults {

  @Column()
  provider_id: string

  @ManyToOne(() => User) // many appointments to one user
  @JoinColumn({ name: 'provider_id'})
  provider: User

  @Column('timestamp')
  date: Date

}
