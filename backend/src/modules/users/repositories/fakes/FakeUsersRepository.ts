import { generate } from 'shortid'

import IUserRepository from '@/modules/users/repositories/IUsersRepository'
import ICreateUsertDTO from '@/modules/users/dtos/ICreateUserDTO'

import User from '@/modules/users/infra/typeorm/entities/User'

export default class UsersRepository implements IUserRepository {

  private users: User[] = []

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }


  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)

    return findUser
  }


  public async create({ name, email, password }: ICreateUsertDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: generate(), name, email, password })

    this.users.push(user)

    return user
  }


  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[userIndex] = user

    return user
  }

}

