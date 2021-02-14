import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import { DI_USERS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import { DI_HASH_PROVIDER } from '../providers'
import IHashProvider from '@/modules/users/providers/HashProvider/models/IHashProvider'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import User from '@/modules/users/infra/typeorm/entities/User'
import authConfig from '@/config/auth'
import AppError from '@/shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
export default class AuthenticateUserService {

  constructor(
    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository,

    @inject(DI_HASH_PROVIDER)
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const errorMessage = 'Incorrect email/password combination'

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(errorMessage, 401)
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password, user.password
    )

    if (!passwordMatch) {
      throw new AppError(errorMessage, 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      user,
      token
    }

  }

}
