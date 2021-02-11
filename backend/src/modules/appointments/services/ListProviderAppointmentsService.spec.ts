
import AppError from '@/shared/errors/AppError'

import FakeAppointmentsRepository from '@/modules/appointments/repositories/fakes/FakeAppointmentsRepository'
import ListProviderAppointmentsService from './ListProviderAppointmentsService'
import FakeCacheProvider from '@/shared/providers/CacheProvider/fakes/FakeCacheProvider'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderAppointmentsService: ListProviderAppointmentsService
let fakeCacheProvider: FakeCacheProvider

describe('ListProviderAppointmentsService', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider
    )

    // Altera o funcionamento padrão do método Date retorando 2021/jan/1 11:00:00
    // jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    //   return new Date(2021, 0, 1, 11).getTime()
    // })
  })


  it('should be able to list the appointments on a day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date(2021, 1, 2, 10, 0, 0)
    })
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date(2021, 1, 2, 11, 0, 0)
    })

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider', year: 2021, month: 2, day: 2
    })

    expect(appointments).toEqual([appointment1, appointment2])

  })


})
