export const DI_MAIL_PROVIDER = 'DI_MAIL_PROVIDER'

import { container as dependencyInjector } from 'tsyringe'

import mailConfig from '@/config/mail'
import IMailProvider from './models/IMailProvider'

import EtherealMailProvider from './implementations/EtherealMailProvider'
import SESMailProvider from './implementations/SESMailProvider'


const mailProviders = {
  ethereal: dependencyInjector.resolve(EtherealMailProvider),
  ses:      dependencyInjector.resolve(SESMailProvider),
}


dependencyInjector.registerInstance<IMailProvider> (
  DI_MAIL_PROVIDER, mailProviders[mailConfig.driver]
)
