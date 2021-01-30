import { injectable, inject } from 'tsyringe'

import { DI_USERS_REPOSITORY, DI_USER_TOKENS_REPOSITORY} from '@/shared/DependencyInjectionContainer'
import { DI_MAIL_PROVIDER } from '@/shared/providers'

import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@/modules/users/repositories/IUserTokensRepository'
import IMailProvider from '@/shared/providers/MailProvider/models/IMailProvider'
import AppError from '@/shared/errors/AppError'

interface IRequest {
  email: string
}

@injectable()
export default class SendForgotPasswordEmailService {

  constructor(
    @inject(DI_USERS_REPOSITORY)
    private usersRepository: IUsersRepository,

    @inject(DI_MAIL_PROVIDER)
    private mailProvider: IMailProvider,

    @inject(DI_USER_TOKENS_REPOSITORY)
    private userTokensRepository: IUserTokensRepository,
  ) {}


  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        variables: {
          name: user.name,
          token
        },
        template: 'Olá, {{name}}: {{token}}'
      }
    })
  }

}
