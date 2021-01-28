import { container as dependencyInjector } from 'tsyringe'

import IHashProvider from '@/modules/users/providers/HashProvider/models/IHashProvider'
import BCryptHashProvider from '@/modules/users/providers/HashProvider/implementations/BCryptHashProvider'

dependencyInjector.registerSingleton<IHashProvider>(
  'HashProvider', BCryptHashProvider
)
