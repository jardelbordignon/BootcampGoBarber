import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User, { CreateUserDTO } from '@/modules/users/infra/typeorm/entities/User'
import AppError from '@/shared/errors/AppError'

export default class CreateUserService {

  public async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const checkUserExists = await usersRepository.findOne({ where: { email } })

    if (checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const hashPassword = await hash(password, 8)

    const user = usersRepository.create({ name, email, password: hashPassword })

    await usersRepository.save(user)

    return user
  }

}
