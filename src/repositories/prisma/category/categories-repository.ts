import { prisma } from '@/lib/prisma'
import { ICategoriesRepository } from '@/repositories/icategories-repository'

export class CategoriesRepository implements ICategoriesRepository {
  async create(name: string): Promise<void> {
    await prisma.category.create({
      data: {
        name,
      },
    })
  }
}
