import { hash } from 'bcryptjs'
import { injectable, inject } from 'tsyringe'

import ICreateUserDTO from '@/modules/users/dtos/ICreateUserDTO'
import User from '@/modules/users/infra/typeorm/entities/User'
import AppError from '@/shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

@injectable()
export default class CreateUserService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ name, email, password }: ICreateUserDTO): Promise<User> {

    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError('Email address already used.')
    }

    const hashPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name, email, password: hashPassword
    })

    return user
  }

}
