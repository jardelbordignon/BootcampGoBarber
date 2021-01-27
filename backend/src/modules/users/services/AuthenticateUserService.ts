import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import usersTransformer, { TransformedUser } from '@/modules/users/infra/http/transformers/users.transformer'
import authConfig from '@/config/auth'
import AppError from '@/shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: TransformedUser
  token: string
}

export default class AuthenticateUserService {

  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const errorMessage = 'Incorrect email/password combination'

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(errorMessage, 401)
    }

    const passwordMatch = await compare(password, user.password)

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
