import { Router } from 'express'
import { container as dependencyInjector } from 'tsyringe'

import AuthenticateUserService from '@/modules/users/services/AuthenticateUserService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body

    const authenticateUserService = dependencyInjector.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUserService.execute({ email, password })

    return response.json({ user, token })
})

export default sessionsRouter
