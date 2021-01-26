import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import usersTransformer, { TransformedUser } from '../transformers/users.transformer'
import authConfig from '../config/auth'

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
      throw new Error(errorMessage)
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error(errorMessage)
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
