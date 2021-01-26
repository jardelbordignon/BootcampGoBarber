import { Column, Entity } from 'typeorm'
import Defaults from './Defaults'

export interface CreateUserDTO {
  name: string
  email: string
  password: string
}

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
