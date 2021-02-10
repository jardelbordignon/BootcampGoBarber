export const DI_STORAGE_PROVIDER = 'DI_STORAGE_PROVIDER'

import { container as dependencyInjector } from 'tsyringe'

import uploadConfig from '@/config/upload'

import IStorageProvider from './models/IStorageProvider'

import DiskStorageProvider from './implementations/DiskStorageProvider'
import S3StorageProvider from './implementations/S3StorageProvider'

const storageProviders = {
  disk: DiskStorageProvider,
  s3: S3StorageProvider
}

dependencyInjector.registerSingleton<IStorageProvider> (
  DI_STORAGE_PROVIDER, storageProviders[uploadConfig.driver]
)

