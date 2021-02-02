import fs from 'fs'
import path from 'path'

import uploadConfig from '@/config/upload'
import IStorageProvider from '../models/IStorageProvider'

export default class DiskStorageProvider implements IStorageProvider{

  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file)
    )

    return file
  }

  public async deleteFile(file: string): Promise<void> {
    const tmpFilePath = path.resolve(uploadConfig.tmpFolder, file)
    const oldFilePath = path.resolve(uploadConfig.uploadsFolder, file)

    if (fs.existsSync(tmpFilePath))
      await fs.promises.unlink(tmpFilePath)

    if (fs.existsSync(oldFilePath))
      await fs.promises.unlink(oldFilePath)
  }

}
