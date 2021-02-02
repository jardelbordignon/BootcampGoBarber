import AppError from '@/shared/errors/AppError'

import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository'
import FakeNotificationsRepository from '@/modules/notifications/repositories/fakes/FakeNotificationsRepository.ts'
import FakeAppointmentsRepository from '@/modules/appointments/repositories/fakes/FakeAppointmentsRepository.ts'
import CreateAppointmentService from './CreateAppointmentService'

let fakeUsersRepository: FakeUsersRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointmentService: CreateAppointmentService

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeNotificationsRepository
    )

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 11).getTime()
    })
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date(2021, 0, 1, 12)
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider')
  })


  it('should not be able to create two appointments on the same time', async () => {
    const date = new Date(2021, 0, 1, 12)

    await createAppointmentService.execute({
      provider_id: 'provider',
      client_id: 'client',
      date
    })

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider',
        client_id: 'client2',
        date
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to create an appointment on a past date', async () => {
    await expect(
      createAppointmentService.execute({
        provider_id: 'provider',
        client_id: 'client',
        date: new Date(2021, 0, 1, 10)
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to create an appointment with same client and provider', async () => {
    await expect(
      createAppointmentService.execute({
        provider_id: 'same-user',
        client_id: 'same-user',
        date: new Date(2021, 0, 1, 14)
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    await expect(
      createAppointmentService.execute({
        provider_id: 'provider',
        client_id: 'client2',
        date: new Date(2021, 0, 1, 18)
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
