import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'

import User, { CreateUserDTO } from '../models/User';

export default class CreateUserService {

  public async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const checkUserExists = await usersRepository.findOne({ where: { email } })

    if (checkUserExists) {
      throw new Error('Email address already used.')
    }

    const hashPassword = await hash(password, 8)

    const user = usersRepository.create({ name, email, password: hashPassword })

    await usersRepository.save(user)

    return user
  }

}
