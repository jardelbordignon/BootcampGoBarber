import { container as dependencyInjector } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

dependencyInjector.registerSingleton<IStorageProvider> (
  'StorageProvider', DiskStorageProvider
)
