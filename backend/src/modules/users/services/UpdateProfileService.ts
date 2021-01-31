import { injectable, inject } from 'tsyringe'


import AppError from '@/shared/errors/AppError'
import User from '@/modules/users/infra/typeorm/entities/User';

import { DI_USERS_REPOSITORY } from '@/shared/DependencyInjectionContainer'
import IUsersRepository from '../repositories/IUsersRepository'

import { DI_HASH_PROVIDER } from '../providers'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

interface IRequest {
  user_id: string
  name: string
  email: string
  old_password?: string
  password?: string
}

@injectable()
export default class UpdateProfileService {

  constructor(
    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository,

    @inject(DI_HASH_PROVIDER)
    private hashProvider: IHashProvider
  ) {}

  public async execute({ user_id, name, email, old_password, password}: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only autenticated users can change profile', 401)
    }

    if (user.email !== email) {
      const emailAlreadyRegistered = await this.usersRepository.findByEmail(email)

      if (emailAlreadyRegistered) {
        throw new AppError('This e-mail is already registered', 401)
      }
    }

    user.name = name
    user.email = email

    if (password) {

      if (!old_password) {
        throw new AppError('You need to inform the old password', 401)
      }

      const checkOldPass = await this.hashProvider.compareHash(old_password, user.password)
      if (!checkOldPass) {
        throw new AppError('Old password is incorrect', 401)
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    return user
  }

}
