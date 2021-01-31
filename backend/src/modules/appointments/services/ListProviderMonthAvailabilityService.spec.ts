import AppError from '@/shared/errors/AppError'

import FakeAppointmentsRepository from '@/modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService

describe('ListProviderMounthAvailabilityService', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    )
  })


  it('should be able to list the month availability from provider', async () => {
    const daysAndHours = [
      [29,10], [29,14], [29,15],
      [30,8], [30,9], [30,10], [30,11], [30,12], [30,13], [30,14], [30,15], [30,16], [30,17],
      [31,8], [31,9], [31,11], [31,14], [31,17]
    ]

    daysAndHours.map(async appoint => (
      await fakeAppointmentsRepository.create({
        provider_id: 'provider',
        client_id: 'client',
        date: new Date(2021, 0, appoint[0], appoint[1], 0, 0) // 2021/jan/29 10:00:00 ...
      })
    ))

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'provider',
      year: 2021,
      month: 1 // jan
    })

    expect(availability).toEqual(expect.arrayContaining([
      { day: 28, available: true },
      { day: 29, available: true },
      { day: 30, available: false },
      { day: 31, available: true }
    ]))

  })


})
