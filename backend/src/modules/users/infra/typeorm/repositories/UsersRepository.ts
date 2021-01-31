import { getRepository, Not, Repository } from 'typeorm'

import User from '@/modules/users/infra/typeorm/entities/User'
import IUserRepository from '@/modules/users/repositories/IUsersRepository'
import ICreateUsertDTO from '@/modules/users/dtos/ICreateUserDTO'
import IFindAllProvidersDTO from '@/modules/users/dtos/IFindAllProvidersDTO'

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

  public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]> {
    const condition = except_user_id ? { where: { id: Not(except_user_id) } } : {}

    const users = await this.ormRepository.find(condition)

    return users
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

