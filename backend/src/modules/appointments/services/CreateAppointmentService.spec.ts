import AppError from '@/shared/errors/AppError'
import FakeAppointmentsRepository from '@/modules/appointments/repositories/fakes/FakeAppointmentsRepository.ts'
import CreateAppointmentService from './CreateAppointmentService'

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointmentService: CreateAppointmentService

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository()
    createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository)

  })

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      provider_id: 'provider',
      client_id: 'client',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('provider')
  })

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2021, 1, 27, 11)

    await createAppointmentService.execute({
      provider_id: 'provider',
      client_id: 'client',
      date: appointmentDate
    })

    await expect(
      createAppointmentService.execute({
        provider_id: 'provider',
        client_id: 'client2',
        date: appointmentDate
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
