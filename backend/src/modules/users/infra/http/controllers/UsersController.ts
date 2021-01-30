import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'

import usersTransformer from '@/modules/users/views/users_transformer'
import CreateUserService from '@/modules/users/services/CreateUserService'

export default class UsersController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    const createUserService = dependencyInjector.resolve(CreateUserService)

    const user = await createUserService.execute({ name, email, password })

    return response.json(usersTransformer.renderOne(user))
  }

}
