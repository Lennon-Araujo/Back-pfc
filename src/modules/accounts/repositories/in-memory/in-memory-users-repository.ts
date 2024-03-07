import { User } from '@prisma/client'
import { CreateUserDTO } from '../../dtos/create-user-dto'
import { IUsersRepository } from '../iusers-repository'
import { randomUUID } from 'crypto'
import { ResetPasswordDTO } from '../../dtos/reset-password-dto'

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = []

  async create({ name, email, password }: CreateUserDTO) {
    const user = {
      id: randomUUID(),
      name,
      email,
      password,
      created_at: new Date(),
      updated_at: new Date(),
      transactionId: null,
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)
    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)
    if (!user) {
      return null
    }

    return user
  }

  async resetPassword({ id, password }: ResetPasswordDTO) {
    const user = this.users.find((user) => user.id === id)

    if (user) {
      user.password = password
      user.updated_at = new Date()
    } else {
      return null
    }

    return user
  }
}
