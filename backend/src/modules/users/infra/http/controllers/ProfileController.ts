import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowProfileService from '@/modules/users/services/ShowProfileService'
import UpdateProfileService from '@/modules/users/services/UpdateProfileService'

export default class ProfileController {

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfileService = dependencyInjector.resolve(ShowProfileService)

    const user = await showProfileService.execute({ user_id })

    return response.json(classToClass(user))
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { name, email, old_password, password } = request.body

    const updateProfileService = dependencyInjector.resolve(UpdateProfileService)

    const user = await updateProfileService.execute({
      user_id, name, email, old_password, password
    })

    return response.json(classToClass(user))
  }

}
