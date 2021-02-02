import * as dotenv from 'dotenv'

dotenv.config()
let path

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../.env.test`
    break;
  case "production":
    path = `${__dirname}/../.env.production`
    break;
  default:
    path = `${__dirname}/../.env`
}

dotenv.config({ path })

export const appSecret = process.env.APP_SECRET
export const appWebUrl = process.env.APP_WEB_URL
export const appApiUrl = process.env.APP_API_URL
