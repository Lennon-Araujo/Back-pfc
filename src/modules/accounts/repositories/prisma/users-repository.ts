import { prisma } from '@/lib/prisma'
import { CreateUserDTO } from '../../dtos/create-user-dto'
import { IUsersRepository } from '../iusers-repository'

export class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: CreateUserDTO) {
    const user = await prisma.user.create({
      data: { name, email, password },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
