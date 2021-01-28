import { injectable, inject } from 'tsyringe'

import AppError from '@/shared/errors/AppError'
import ICreateUserDTO from '@/modules/users/dtos/ICreateUserDTO'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import IHashProvider from '@/modules/users/providers/HashProvider/models/IHashProvider'
import User from '@/modules/users/infra/typeorm/entities/User'

@injectable()
export default class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
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

    return user
  }

}
