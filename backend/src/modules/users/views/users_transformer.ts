import User from '@/modules/users/infra/typeorm/entities/User';

import { appApiUrl, storageDriver, storageBucket } from '@/config/dotenv'

export interface TransformedUser {
  id: string
  name: string
  email: string
  avatar: string | null
  created_at: Date
  updated_at: Date
}


let url: string | undefined
switch (storageDriver) {
  case 'disk':
    url = `${appApiUrl}/files/`;
  case 's3':
    url = `https://${storageBucket}.s3.amazonaws.com/`;
}

export default {

  renderOne(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      //password: user.password,
      avatar: user.avatar ? url+user.avatar : null,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  },

  renderMany(users: User[]) {
    return users.map((user => this.renderOne(user)))
  }

}
