import { hash, compare } from 'bcryptjs'

import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {

  public async generateHash(password: string): Promise<string> {
    return hash(password, 8)
  }

  public async compareHash(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }

}
