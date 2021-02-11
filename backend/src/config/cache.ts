import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'

  redis: RedisOptions
}


export default {
  driver: 'redis',

  redis: {
    host: '127.0.0.1',
    port: 6379,
    password: undefined
  },

} as ICacheConfig
