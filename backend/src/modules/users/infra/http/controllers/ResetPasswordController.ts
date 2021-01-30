import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'

import ResetPasswordService from '@/modules/users/services/ResetPasswordService'

export default class ResetPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const resetPasswordService = dependencyInjector.resolve(
      ResetPasswordService
    )

    await resetPasswordService.execute({ password, token })

    return response.status(204).json()
  }

}
