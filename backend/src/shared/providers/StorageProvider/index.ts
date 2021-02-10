export const DI_STORAGE_PROVIDER = 'DI_STORAGE_PROVIDER'

import { container as dependencyInjector } from 'tsyringe'

import IStorageProvider from './models/IStorageProvider'

import DiskStorageProvider from './implementations/DiskStorageProvider'

const storageProviders = {
  disk: DiskStorageProvider,
}

dependencyInjector.registerSingleton<IStorageProvider> (
  DI_STORAGE_PROVIDER, storageProviders.disk
)

