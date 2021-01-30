import User from '@/modules/users/infra/typeorm/entities/User';

export interface TransformedUser {
  id: string
  name: string
  email: string
  avatar: string
  created_at: Date
  updated_at: Date
}


export default {

  renderOne(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      //password: user.password,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at
    }
  },

  renderMany(users: User[]) {
    return users.map((user => this.renderOne(user)))
  }

}
