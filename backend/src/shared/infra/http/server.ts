import 'reflect-metadata'
import * as dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { errors } from 'celebrate'
import 'express-async-errors'

import uploadConfig from '@/config/upload'
import AppError from '@/shared/errors/AppError'
import rateLimiter from './middlewares/rateLimiter'
import routes from '@/shared/infra/http/routes'

import '@/shared/infra/typeorm' // database
import '../../DependencyInjectionContainer'

dotenv.config()

const app = express()

app.use(cors()) // acesso via browser

app.use(express.json())

app.use('/files', express.static(uploadConfig.uploadsFolder))

app.use(rateLimiter)

app.use(routes)

app.use(errors()) // celebrate routes validations errors

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  // se o erro for gerado num AppError em qualquer lugar da aplicação
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
})

const port = 3333
app.listen(port, () => console.log('✨ Server running on port '+port))
