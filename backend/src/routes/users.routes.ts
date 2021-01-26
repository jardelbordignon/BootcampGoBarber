import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../config/upload'
import usersTransformer from '../transformers/users.transformer'
import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

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


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {
    try {
      const updatedUserAvatar = new UpdateUserAvatarService()

      const user = await updatedUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
      })

      return response.json(user)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }

    return response.json({ok: true})
  }
)

export default usersRouter
