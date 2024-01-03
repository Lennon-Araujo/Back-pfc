import { prisma } from '@/lib/prisma'
import { ICategoriesRepository } from '../icategories-repository'

export class CategoriesRepository implements ICategoriesRepository {
  async create(name: string) {
    await prisma.category.create({
      data: {
        name,
      },
    })
  }

  async getAll() {
    return prisma.category.findMany({
      orderBy: {
        created_at: 'asc',
      },
      include: {
        transactions: true,
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

  async findByName(name: string) {
    const category = await prisma.category.findUnique({
      where: {
        name,
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
    return prisma.category.delete({
      where: {
        id,
      },
    })
  }
}
