import AppError from '@/shared/errors/AppError'

import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@/modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeMailProvider from '@/shared/providers/MailProvider/fakes/FakeMailProvider'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmailService: SendForgotPasswordEmailService

describe('SendForgotPasswordEmailService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeMailProvider = new FakeMailProvider()

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository
    )
  })

  it('should be able to recover the password using the email', async () => {
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'jardel@email.com'
    })

    expect(sendEmail).toHaveBeenCalled()
  })


  it('should be able to recover the password using the non-existing user email', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'jardel@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'jardel@email.com'
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })

})
