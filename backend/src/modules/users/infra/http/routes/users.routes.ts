import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '@/config/upload'
import usersTransformer from '@/modules/users/infra/http/transformers/users.transformer'
import CreateUserService from '@/modules/users/services/CreateUserService'
import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '@/modules/users/services/UpdateUserAvatarService'
import UsersRepository from '@/modules/users/infra/typeorm/repositories/UsersRepository'

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()
    const createUserService = new CreateUserService(usersRepository)

    const user = await createUserService.execute({ name, email, password })

    return response.json(usersTransformer.renderOne(user))
})


usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {

      const usersRepository = new UsersRepository()
      const updatedUserAvatar = new UpdateUserAvatarService(usersRepository)

      const user = await updatedUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename
      })

      return response.json(user)
  }
)

export default usersRouter
