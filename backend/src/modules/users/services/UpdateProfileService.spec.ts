
import AppError from '@/shared/errors/AppError'

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateProfileService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository, fakeHashProvider
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jaaaaaardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
    })

    expect(updatedUser.name).toBe('Jardel Bordignon')
  })


  it('should not be able to update the profile from inexisting user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'inexisting-user',
        name: 'Jardel Bordignon',
        email: 'jardel@email.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to change the email to another one already in use', async () => {
    await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const user = await fakeUsersRepository.create({
      name: 'Sabrina de Arruda',
      email: 'sabrina@email.com',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Sabrina de Arruda',
        email: 'jardel@email.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })



  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      old_password: '123456',
      password: '123456'
    })

    expect(updatedUser.password).toBe('123456')
  })


  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jardel Bordignon',
        email: 'jardel@email.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })



  it('should not be able to update the password with an incorrect old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jardel Bordignon',
        email: 'jardel@email.com',
        old_password: 'incorrect-old-password',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

})
