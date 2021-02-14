import { Column, Entity } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

import { storage } from '@/config/dotenv'
import Defaults from '@/shared/entities/Defaults'

@Entity('users')
export default class User extends Defaults {

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string

  @Column()
  @Exclude()
  avatar: string

  @Expose({ name: 'avatar_url' })
  getAvatar_url(): string | null {
    return this.avatar ? storage.filesPath + this.avatar : null
  }

}
