import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateUserAvatarService from '@/modules/users/services/UpdateUserAvatarService'

export default class UserAvatarController {

  public async update(request: Request, response: Response): Promise<Response> {
    const updatedUserAvatar = dependencyInjector.resolve(UpdateUserAvatarService)

    const user = await updatedUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    return response.json(classToClass(user))
  }

}
