export const DI_APPOINTMENTS_REPOSITORY = 'DI_APPOINTMENTS_REPOSITORY'
export const DI_USERS_REPOSITORY = 'DI_USERS_REPOSITORY'
export const DI_USER_TOKENS_REPOSITORY = 'DI_USER_TOKENS_REPOSITORY'
export const DI_NOTIFICATIONS_REPOSITORY = 'DI_NOTIFICATIONS_REPOSITORY'

import { container as dependencyInjector } from 'tsyringe'

import '@/modules/users/providers'
import '@/shared/providers'

import IAppointmentsRepository from '@/modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@/modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import UsersRepository from '@/modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@/modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@/modules/users/infra/typeorm/repositories/UserTokensRepository'

import INotificationsRepository from '@/modules/notifications/repositories/INotificationsRepository'
import NotificationsRepository from '@/modules/notifications/infra/typeorm/repositories/NotificationsRepository'

dependencyInjector.registerSingleton<IAppointmentsRepository>(
  DI_APPOINTMENTS_REPOSITORY, AppointmentsRepository
)

dependencyInjector.registerSingleton<IUsersRepository>(
  DI_USERS_REPOSITORY, UsersRepository
)

dependencyInjector.registerSingleton<IUserTokensRepository>(
  DI_USER_TOKENS_REPOSITORY, UserTokensRepository
)

dependencyInjector.registerSingleton<INotificationsRepository>(
  DI_NOTIFICATIONS_REPOSITORY, NotificationsRepository
)
