import AppError from '@/shared/errors/AppError'

import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@/modules/users/providers/HashProvider/fakes/FakeHashProvider'
import AuthenticateUserService from './AuthenticateUserService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUserService: AuthenticateUserService

describe('AuthenticateUserService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository, fakeHashProvider
    )
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const response = await authenticateUserService.execute({
      email: 'jardel@email.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user.id).toEqual(user.id)
  })


  it('should not be able to authenticate with non existing uer', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'jardel@email.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await expect(
      authenticateUserService.execute({
        email: 'jardel@email.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
