export const DI_STORAGE_PROVIDER = 'DI_STORAGE_PROVIDER'
export const DI_MAIL_PROVIDER = 'DI_MAIL_PROVIDER'
export const DI_MAIL_TEMPLATE_PROVIDER = 'DI_MAIL_TEMPLATE_PROVIDER'

import { container as dependencyInjector } from 'tsyringe'

import IStorageProvider from './StorageProvider/models/IStorageProvider'
import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'


dependencyInjector.registerSingleton<IStorageProvider> (
  DI_STORAGE_PROVIDER, DiskStorageProvider
)

dependencyInjector.registerSingleton<IMailTemplateProvider> (
  DI_MAIL_TEMPLATE_PROVIDER, HandlebarsMailTemplateProvider
)

dependencyInjector.registerInstance<IMailProvider> (
  DI_MAIL_PROVIDER, dependencyInjector.resolve(EtherealMailProvider)
)
