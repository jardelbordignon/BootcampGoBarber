import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'

import User from '../models/User'
import usersTransformer, { TransformedUser } from '../transformers/users.transformer'

interface AuthenticateProps {
  email: string
  password: string
}

export default class AuthenticateUserService {

  public async execute({ email, password }: AuthenticateProps): Promise<TransformedUser> {
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

    return usersTransformer.renderOne(user)

  }

}
