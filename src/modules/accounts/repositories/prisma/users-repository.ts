import { prisma } from '@/lib/prisma'
import { CreateUserDTO } from '../../dtos/create-user-dto'
import { IUsersRepository } from '../iusers-repository'
import { ResetPasswordDTO } from '../../dtos/reset-password-dto'

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

  async resetPassword({ id, password }: ResetPasswordDTO) {
    const user = await prisma.user.update({
      where: { id },
      data: { password },
    })

    return user
  }
}
