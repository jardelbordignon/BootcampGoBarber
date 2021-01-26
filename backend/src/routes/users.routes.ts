import { Router } from 'express'

import usersTransformer from '../transformers/users.transformer'
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router()

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const createUserService = new CreateUserService()

    const user = await createUserService.execute({ name, email, password })

    return response.json(usersTransformer.renderOne(user))
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

export default usersRouter
