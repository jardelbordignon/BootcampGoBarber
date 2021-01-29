import { Column, Entity, Generated } from 'typeorm'

import Defaults from '@/shared/entities/Defaults'

@Entity('user_tokens')
export default class UserToken extends Defaults {

  @Column()
  @Generated('uuid')
  token: string

  @Column()
  user_id: string

}
