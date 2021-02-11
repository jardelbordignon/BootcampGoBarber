export const DI_CACHE_PROVIDER = 'DI_CACHE_PROVIDER'

import { container as dependencyInjector } from 'tsyringe'

import ICacheProvider from './models/ICacheProvider'

import RedisCacheProvider from './implementations/RedisCacheProvider'

const cacheProviders = {
  redis: RedisCacheProvider
}

dependencyInjector.registerSingleton<ICacheProvider> (
  DI_CACHE_PROVIDER, cacheProviders.redis
)

