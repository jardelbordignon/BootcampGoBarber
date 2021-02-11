
import AppError from '@/shared/errors/AppError'
import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository.ts'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeCacheProvider from '@/shared/providers/CacheProvider/fakes/FakeCacheProvider'


let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUserService: CreateUserService
let fakeCacheProvider: FakeCacheProvider

describe('CreateUserService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    fakeCacheProvider = new FakeCacheProvider()
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    )
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })


  it('should not be able to create a new user with an email already registered ', async () => {
    await createUserService.execute({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await expect(
      createUserService.execute({
        name: 'Jardel Bordignon',
        email: 'jardel@email.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
