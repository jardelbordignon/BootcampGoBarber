import { injectable, inject } from 'tsyringe'

import IUsersRepository from '@/modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@/modules/users/repositories/IUserTokensRepository'
import AppError from '@/shared/errors/AppError'

interface IRequest {
  token: string
  password: string
}

@injectable()
export default class ResetPasswordService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}


  public async execute({ token, password }: IRequest): Promise<void> {
    const userTokens = await this.userTokensRepository.findByToken(token)

    if (!userTokens) {
      throw new AppError('User token does not exists')
    }

    const user = await this.usersRepository.findById(userTokens.user_id)

    if (!user) {
      throw new AppError('User does not exists')
    }

    user.password = password

    await this.usersRepository.save(user)
  }

}
