import AppError from '@/shared/errors/AppError'

import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '@/modules/users/repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPasswordService: ResetPasswordService

describe('ResetPasswordService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository, fakeUserTokensRepository, fakeHashProvider
    )
  })


  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPasswordService.execute({
      password: 'abcedf',
      token
    })

    const updatedUser = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('abcedf')
    expect(updatedUser?.password).toBe('abcedf')
  })


  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token', password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('non-existing-user')

    await expect(
      resetPasswordService.execute({
        token, password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('must not be able to reset the password after 2 hours generated token', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id)

    // Altera o funcionamento padrão do método Date retorando 3 horas no futuro
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const newDate = new Date()
      return newDate.setHours(newDate.getHours() + 3)
    })

    await expect(
      resetPasswordService.execute({
        token, password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


})
