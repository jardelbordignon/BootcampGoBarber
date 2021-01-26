import { getRepository } from 'typeorm'
import path from 'path'
import fs from 'fs'

import { tmpDirectory } from '@/config/upload'
import User from '@/modules/users/infra/typeorm/entities/User'
import usersTransformer, { TransformedUser } from '@/modules/users/infra/http/transformers/users.transformer'
import AppError from '@/shared/errors/AppError'

interface Request {
  user_id: string
  avatarFilename: string
}

export default class UpdateUserAvatarService {

  public async execute({ user_id, avatarFilename }: Request): Promise<TransformedUser> {
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

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

    await usersRepository.save(user)

    return usersTransformer.renderOne(user)
  }

}
