import { generate } from 'shortid'

import IUserTokensRepository from '@/modules/users/repositories/IUserTokensRepository'
import UserToken from '@/modules/users/infra/typeorm/entities/UserToken'

export default class UserTokensRepository implements IUserTokensRepository {

  private userTokens: UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken()

    userToken.id = generate()
    userToken.token = generate()
    userToken.user_id = user_id

    this.userTokens.push(userToken)

    return userToken
  }


  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.userTokens.find(userToken => userToken.token === token)

    return userToken
  }

}

