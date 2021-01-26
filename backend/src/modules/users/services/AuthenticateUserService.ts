import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '@/modules/users/infra/typeorm/entities/User'
import usersTransformer, { TransformedUser } from '@/modules/users/infra/http/transformers/users.transformer'
import authConfig from '@/config/auth'
import AppError from '@/shared/errors/AppError'

interface RequestDTO {
  email: string
  password: string
}

interface ResponseDTO {
  user: TransformedUser
  token: string
}

export default class AuthenticateUserService {

  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const errorMessage = 'Incorrect email/password combination'

    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({ where: { email } })

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
