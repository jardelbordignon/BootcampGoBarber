export const DI_MAIL_TEMPLATE_PROVIDER = 'DI_MAIL_TEMPLATE_PROVIDER'

import { container as dependencyInjector } from 'tsyringe'

import IMailTemplateProvider from './models/IMailTemplateProvider'

import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider'

const mailTemplateProviders = {
  handlebars: HandlebarsMailTemplateProvider
}

dependencyInjector.registerSingleton<IMailTemplateProvider> (
  DI_MAIL_TEMPLATE_PROVIDER, mailTemplateProviders.handlebars
)
