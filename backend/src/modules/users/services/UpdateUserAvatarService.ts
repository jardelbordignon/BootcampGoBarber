import path from 'path'
import fs from 'fs'

import { tmpDirectory } from '@/config/upload'
import usersTransformer, { TransformedUser } from '@/modules/users/infra/http/transformers/users.transformer'
import AppError from '@/shared/errors/AppError'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  user_id: string
  avatarFilename: string
}

export default class UpdateUserAvatarService {

  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<TransformedUser> {

    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only autenticated users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(tmpDirectory, user.avatar)
      const userAvatarFileExists = fs.existsSync(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = avatarFilename

    await this.usersRepository.save(user)

    return usersTransformer.renderOne(user)
  }

}
