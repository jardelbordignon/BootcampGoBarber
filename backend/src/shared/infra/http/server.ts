import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'

import { tmpDirectory } from '@/config/upload'
import AppError from '@/shared/errors/AppError'
import routes from '@/shared/infra/http/routes'
import '@/shared/infra/typeorm'

const app = express()

app.use(express.json())

app.use('/files', express.static(tmpDirectory))

app.use(routes)

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
