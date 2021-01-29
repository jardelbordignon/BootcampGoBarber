import path from 'path'
import fs from 'fs'
import { injectable, inject } from 'tsyringe'

import uploadConfig from '@/config/upload'
import usersTransformer, { TransformedUser } from '@/modules/users/infra/http/transformers/users.transformer'
import AppError from '@/shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'
import IStorageProvider from '@/shared/providers/StorageProvider/models/IStorageProvider'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
export default class UpdateUserAvatarService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<TransformedUser> {

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

    return usersTransformer.renderOne(user)
  }

}
