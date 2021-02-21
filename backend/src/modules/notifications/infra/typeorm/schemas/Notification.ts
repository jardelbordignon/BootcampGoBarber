import CreatedAtUpdatedAt from '@/shared/entities/CreatedAtUpdatedAt'
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity('notifications')
export default class Notification extends CreatedAtUpdatedAt {

  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column()
  recipient_id: string

  @Column({ default: false })
  read: boolean

}
