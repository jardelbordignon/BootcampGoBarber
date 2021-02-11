import { injectable, inject } from 'tsyringe'

import AppError from '@/shared/errors/AppError'

import { DI_USERS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import { DI_HASH_PROVIDER } from '../providers'
import IHashProvider from '@/modules/users/providers/HashProvider/models/IHashProvider'
import { DI_CACHE_PROVIDER } from '@/shared/providers/CacheProvider'
import ICacheProvider from '@/shared/providers/CacheProvider/models/ICacheProvider'

import ICreateUserDTO from '@/modules/users/dtos/ICreateUserDTO'
import User from '@/modules/users/infra/typeorm/entities/User'

@injectable()
export default class CreateUserService {

  constructor(
    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository,

    @inject(DI_HASH_PROVIDER)
    private hashProvider: IHashProvider,

    @inject(DI_CACHE_PROVIDER)
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const hashPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name, email, password: hashPassword
    })

    await this.cacheProvider.removePrefix('providers-list')

    return user
  }

}
