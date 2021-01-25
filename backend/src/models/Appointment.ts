import { generate } from 'shortid'

export default class Appointment {

  id: string
  provider: string
  date: Date

  constructor(provider:string, date:Date) {
    this.id = generate()
    this.provider = provider
    this.date = date
  }

}
