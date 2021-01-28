import 'reflect-metadata'
import { injectable, inject } from 'tsyringe'
import { sign } from 'jsonwebtoken'

import IHashProvider from '@/modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import usersTransformer, { TransformedUser } from '@/modules/users/infra/http/transformers/users.transformer'
import authConfig from '@/config/auth'
import AppError from '@/shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: TransformedUser
  token: string
}

@injectable()
export default class AuthenticateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
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
      user: usersTransformer.renderOne(user),
      token
    }

  }

}
