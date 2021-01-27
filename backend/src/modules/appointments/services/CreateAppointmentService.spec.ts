import FakeAppointmentsRepository from '@/modules/appointments/repositories/fakes/FakeAppointmentsRepository.ts'
import CreateAppointmentService from './CreateAppointmentService'

describe('CreateAppointment', () => {

  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository()
    const createAppointmentService = new CreateAppointmentService(fakeAppointmentsRepository)

    const appointment = await createAppointmentService.execute({
      provider_id: '123abc',
      date: new Date()
    })

    expect(appointment).toHaveProperty('id')
    expect(appointment.provider_id).toBe('123abc')
  })

  // it('should not be able to create two appointments on the same time', () => {
  //   expect(1+2).toBe(3)
  // })

})
