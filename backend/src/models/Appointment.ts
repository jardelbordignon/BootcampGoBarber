import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export interface CreateAppointmentDTO {
  provider:string
  date: Date
}

@Entity('appointments')
export default class Appointment {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  provider: string

  @Column('timestamp')
  date: Date

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

}
