import { Column, Entity } from 'typeorm'

import Defaults from '@/shared/entities/Defaults'

@Entity('users')
export default class User extends Defaults {

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  avatar: string

}
