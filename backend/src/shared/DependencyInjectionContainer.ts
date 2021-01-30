import { container as dependencyInjector } from 'tsyringe'

import '@/shared/providers'
import '@/modules/users/providers'

import IAppointmentsRepository from '@/modules/appointments/repositories/IAppointmentsRepository'
import AppointmentsRepository from '@/modules/appointments/infra/typeorm/repositories/AppointmentsRepository'

import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import UsersRepository from '@/modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@/modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@/modules/users/infra/typeorm/repositories/UserTokensRepository'

dependencyInjector.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository', AppointmentsRepository
)

dependencyInjector.registerSingleton<IUsersRepository>(
  'UsersRepository', UsersRepository
)

dependencyInjector.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository', UserTokensRepository
)
