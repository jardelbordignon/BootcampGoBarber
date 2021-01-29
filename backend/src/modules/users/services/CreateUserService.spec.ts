
import AppError from '@/shared/errors/AppError'
import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository.ts'
import CreateUserService from './CreateUserService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'


describe('CreateUser', () => {

  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)

    const user = await createUserService.execute({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })


  it('should not be able to create a new user with an email already registered ', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUserService = new CreateUserService(fakeUsersRepository, fakeHashProvider)

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
