import AppError from '@/shared/errors/AppError'

import FakeAppointmentsRepository from '@/modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService

describe('ListProviderDayAvailabilityService', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    )
  })


  it('should be able to list the day availability from provider', async () => {
    const hours = [8, 10, 11, 14]

    hours.map(async hour => (
      await fakeAppointmentsRepository.create({
        provider_id: 'user',
        date: new Date(2021, 0, 31, hour, 0, 0) // 2021/jan/31
      })
    ))

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2021,
      month: 1, // jan
      day: 31
    })

    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: true },
      { hour: 10, available: false },
      { hour: 11, available: false },
      { hour: 13, available: true },
      { hour: 14, available: false }
    ]))

  })


})
