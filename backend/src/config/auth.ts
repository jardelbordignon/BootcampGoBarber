import { appSecret } from './dotenv'

export default {

  jwt: {
    secret: appSecret!,
    expiresIn: '1d'
  }

}
