import Redis, { Redis as RedisProps } from 'ioredis'

import cacheConfig from '@/config/cache'
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {

  private redis: RedisProps

  constructor() {
    this.redis = new Redis(cacheConfig.redis)
  }

  public async set(key: string, value:any): Promise<void> {
    await this.redis.set(key, JSON.stringify(value))
  }

  public async get(key: string): Promise<any> {
    const data = await this.redis.get(key)
    return data
  }

  public async invalidate(key: string): Promise<void> {

  }

}
