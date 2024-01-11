import { prisma } from '@/lib/prisma'
import { ISharedRepository } from '../ishared-repository'

export class SharedRepository implements ISharedRepository {
  async create(userId: string, email: string) {
    return await prisma.shared.create({
      data: {
        userId,
        email,
      },
    })
  }

  async findByUser(userId: string) {
    return await prisma.shared.findMany({
      where: {
        userId,
      },
      orderBy: {
        email: 'asc',
      },
    })
  }
}
