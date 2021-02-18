import { injectable, inject } from 'tsyringe'
import { classToClass } from 'class-transformer'

import { DI_USERS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import { DI_CACHE_PROVIDER } from '@/shared/providers/CacheProvider'
import ICacheProvider from '@/shared/providers/CacheProvider/models/ICacheProvider'

import User from '@/modules/users/infra/typeorm/entities/User'

interface IRequest {
  user_id: string
}

@injectable()
export default class ListProvidersService {

  constructor(
    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository,

    @inject(DI_CACHE_PROVIDER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {

    let users = await this.cacheProvider.get<User[]>(`providers-list:${user_id}`)

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      })

      await this.cacheProvider.set(`providers-list:${user_id}`, classToClass(users))
    }

    return users
  }

}
