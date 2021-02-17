import { injectable, inject } from 'tsyringe'

import { DI_STORAGE_PROVIDER } from '@/shared/providers/StorageProvider'
import { DI_USERS_REPOSITORY } from '@/shared/DependencyInjectionContainer'

import AppError from '@/shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/User'
import IStorageProvider from '@/shared/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
export default class UpdateUserAvatarService {

  constructor(
    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository,

    @inject(DI_STORAGE_PROVIDER)
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only autenticated users can change avatar', 401)
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = filename

    await this.usersRepository.save(user)

    return user
  }

}
