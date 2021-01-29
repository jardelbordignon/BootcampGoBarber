import { injectable, inject } from 'tsyringe'

//import AppError from '@/shared/errors/AppError'
import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import IMailProvider from '@/shared/providers/MailProvider/models/IMailProvider'
import AppError from '@/shared/errors/AppError'
//import User from '@/modules/users/infra/typeorm/entities/User'

interface IRequest {
  email: string
}

@injectable()
export default class SendForgotPasswordEmailService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}


  public async execute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (!checkUserExists) {
      throw new AppError('User does not exists')
    }

    this.mailProvider.sendEmail(email, 'Recuperação de senha')
  }

}
