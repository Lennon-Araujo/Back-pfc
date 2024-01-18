import { prisma } from '@/lib/prisma'
import { ICategoriesRepository } from '../icategories-repository'

export class CategoriesRepository implements ICategoriesRepository {
  async create(name: string, userId: string) {
    await prisma.category.create({
      data: {
        name,
        userId,
      },
    })
  }

  async getAll() {
    return await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        transactions: true,
      },
    })
  }

  async getByUser(userId: string) {
    return await prisma.category.findMany({
      where: {
        userId,
      },
      orderBy: {
        name: 'asc',
      },
      include: {
        transactions: true,
      },
    })
  }

  async getBySharedTransaction(userId: string) {
    return await prisma.category.findMany({
      where: {
        transactions: {
          some: {
            users: {
              some: {
                userId: {
                  in: [userId],
                },
              },
            },
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })
  }

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
      include: {
        transactions: true,
      },
    })

    return category
  }

  async findByName(name: string, userId: string) {
    const category = await prisma.category.findUnique({
      where: {
        name_userId: {
          name,
          userId,
        },
      },
    })

    return category
  }

  async update(id: string, name: string) {
    await prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    })
  }

  async delete(id: string) {
    return await prisma.category.delete({
      where: {
        id,
      },
    })
  }
}
