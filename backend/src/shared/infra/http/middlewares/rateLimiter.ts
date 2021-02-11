// o sistema vai salvar o ip do usuário e quantas requisições ele fez em um terminado intervalo de tempo

import { Request, Response, NextFunction } from 'express'
import redis from 'redis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

import { redis as redisDotEnv } from '@/config/dotenv'
import AppError from '@/shared/errors/AppError'

const redisClient = redis.createClient(redisDotEnv)

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5, // max 5 requests por 1 segundo por ip
  duration: 5
})

export default async function rateLimiter(
  request: Request, response: Response, next: NextFunction
): Promise<void> {
  try {
    await limiter.consume(request.ip)

    return next()
  } catch (error) {
    throw new AppError('Too many requests', 429)
  }
}
