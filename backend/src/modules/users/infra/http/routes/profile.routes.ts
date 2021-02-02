import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

import ensureAuthenticated from '@/modules/users/infra/http/middlewares/ensureAuthenticated'

import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get('/', profileController.show)

// password e password_confirmation são obrigatórios se old_password existir
profileRouter.put(
  '/',
  celebrate({
    'body': {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.when('old_password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      password_confirmation: Joi.when('password', {
        is: Joi.exist(),
        then: Joi.valid(Joi.ref('password')).required(),
      }),
    },
  }),
  profileController.update,
)

export default profileRouter
