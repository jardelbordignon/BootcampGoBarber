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


export const appSecret = process.env.APP_SECRET
export const appWebUrl = process.env.APP_WEB_URL
export const appApiUrl = process.env.APP_API_URL
export const storageDriver = process.env.STORAGE_DRIVER
export const storageBucket = process.env.STORAGE_BUCKET

export const storage = {
  driver: process.env.STORAGE_DRIVER,
  bucket: process.env.STORAGE_BUCKET,
  filesPath: process.env.STORAGE_DRIVER === 's3'
    ? `https://${process.env.STORAGE_BUCKET}.s3.amazonaws.com/`
    : `${process.env.APP_API_URL}/files/`
}

export const redis = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASS || undefined
}
