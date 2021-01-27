import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import Defaults from '@/shared/entities/Defaults'
import User from '@/modules/users/infra/typeorm/entities/User'

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
