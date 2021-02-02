import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'

import ForgotPasswordController from '../controllers/ForgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'

const passwordRouter = Router()
const forgotPasswordController = new ForgotPasswordController()
const resetPasswordController = new ResetPasswordController()

passwordRouter.post('/forgot',
  celebrate({
    'body': {
      email: Joi.string().email().required()
    }
  }),
  forgotPasswordController.create
)

passwordRouter.post('/reset',
  celebrate({
    'body': {
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
      token: Joi.string().uuid().required()
    }
  }),
  resetPasswordController.create
)

export default passwordRouter
