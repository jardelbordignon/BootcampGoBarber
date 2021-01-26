import { getRepository } from 'typeorm'

import User, { CreateUserDTO } from '../models/User';

export default class CreateUserService {

  public async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const usersRepository = getRepository(User)

    const checkUserExists = await usersRepository.findOne({ where: { email } })

    if (checkUserExists) {
      throw new Error('Email address already used.')
    }

    const user = usersRepository.create({ name, email, password })

    await usersRepository.save(user)

    return user
  }

}
