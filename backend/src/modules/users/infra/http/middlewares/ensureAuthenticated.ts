import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@/config/auth'
import AppError from '@/shared/errors/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request, response: Response,next: NextFunction
): void {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('JWT token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: id } = verify(token, authConfig.jwt.secret) as ITokenPayload

    request.user = { id }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }
}
