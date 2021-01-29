import AppError from '@/shared/errors/AppError'

import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository.ts'
import FakeMailProvider from '@/shared/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

describe('SendForgotPasswordEmailService', () => {

  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository, fakeMailProvider
    )

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail')

    await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '1234546'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'jardel@email.com'
    })

    expect(sendEmail).toHaveBeenCalled()
  })


  it('should be able to recover the password using the non-existing user email', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeMailProvider = new FakeMailProvider()
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository, fakeMailProvider
    )

    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'jardel@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
