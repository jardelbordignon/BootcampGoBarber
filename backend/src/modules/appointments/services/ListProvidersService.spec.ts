import AppError from '@/shared/errors/AppError'

import FakeCacheProvider from '@/shared/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUsersRepository from '@/modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from './ListProvidersService'

let fakeCacheProvider: FakeCacheProvider
let fakeUsersRepository: FakeUsersRepository
let listProvidersService: ListProvidersService

describe('ListProvidersService', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listProvidersService = new ListProvidersService(
      fakeUsersRepository, fakeCacheProvider
    )
  })


  it('should be able to list the providers', async () => {

    ['sabrina', 'benjamin', 'ernesto', 'felicia'].map(async user => (
      await fakeUsersRepository.create({
        name: user,
        email: user+'@email.com',
        password: '123456'
      })
    ))

    const loggedUser = await fakeUsersRepository.create({
      name: 'Jardel Bordignon',
      email: 'jardel@email.com',
      password: '123456'
    })

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    })

    expect(providers.length).toBe(4)
    expect(
      providers.find(provider => provider.id === loggedUser.id)
    ).toBe(undefined)
  })


})
