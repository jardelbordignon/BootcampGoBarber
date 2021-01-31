import { injectable, inject } from 'tsyringe'

import User from '@/modules/users/infra/typeorm/entities/User'

import { DI_USERS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'

interface IRequest {
  user_id: string
}

@injectable()
export default class ListProvidersService {

  constructor(
    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id
    })

    return users
  }

}
