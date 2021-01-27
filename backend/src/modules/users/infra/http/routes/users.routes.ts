import { Router } from 'express'
import multer from 'multer'
import { container as dependencyInjector } from 'tsyringe'

import uploadConfig from '@/config/upload'
import usersTransformer from '@/modules/users/infra/http/transformers/users.transformer'
import CreateUserService from '@/modules/users/services/CreateUserService'
import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '@/modules/users/services/UpdateUserAvatarService'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body

    const createUserService = dependencyInjector.resolve(CreateUserService)

    const user = await createUserService.execute({ name, email, password })

    return response.json(usersTransformer.renderOne(user))
})


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {

      const updatedUserAvatar = dependencyInjector.resolve(UpdateUserAvatarService)

      const user = await updatedUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
      })

      return response.json(user)
  }
)

export default usersRouter
