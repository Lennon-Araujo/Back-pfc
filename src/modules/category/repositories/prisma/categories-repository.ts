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

  async findById(id: string) {
    const category = await prisma.category.findUnique({
      where: {
        id,
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
}
