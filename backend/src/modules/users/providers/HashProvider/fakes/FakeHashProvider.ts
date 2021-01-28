
import IHashProvider from '../models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {

  public async generateHash(password: string): Promise<string> {
    return password
  }

  public async compareHash(password: string, hashedPassword: string): Promise<boolean> {
    return password === hashedPassword
  }

}
