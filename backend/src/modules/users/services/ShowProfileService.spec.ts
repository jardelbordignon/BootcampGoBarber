
import AppError from '@/shared/errors/AppError'

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('ShowProfileService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfileService = new ShowProfileService(
      fakeUsersRepository
    )
  })


  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const profile = await showProfileService.execute({
      user_id: user.id
    })

    expect(profile.name).toBe('Jardel Bordignon')
  })



  it('should not be able to show the profile from inexisting user', async () => {
    await expect(
      showProfileService.execute({ user_id: 'inexisting-user' })
    ).rejects.toBeInstanceOf(AppError)
  })


})
