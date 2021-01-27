import { getRepository, Repository } from 'typeorm'

import User from '@/modules/users/infra/typeorm/entities/User'
import IUserRepository from '@/modules/users/repositories/IUsersRepository'
import ICreateUsertDTO from '@/modules/users/dtos/ICreateUserDTO'

export default class UsersRepository implements IUserRepository {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne(id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({ where: { email } })
  }

  public async create({ name, email, password }: ICreateUsertDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password })

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user)
  }

}

