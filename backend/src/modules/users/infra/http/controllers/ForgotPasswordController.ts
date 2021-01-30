import { Request, Response } from 'express'
import { container as dependencyInjector } from 'tsyringe'

import SendForgotPasswordEmailService from '@/modules/users/services/SendForgotPasswordEmailService'

export default class ForgotPasswordController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body

    const sendForgotPasswordEmailService = dependencyInjector.resolve(
      SendForgotPasswordEmailService
    )

    await sendForgotPasswordEmailService.execute({ email })

    return response.status(204).json()
  }

}
