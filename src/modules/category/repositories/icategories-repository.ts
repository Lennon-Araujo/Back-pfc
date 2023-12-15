import { Category } from '@prisma/client'

export interface ICategoriesRepository {
  create(name: string): Promise<void>
  findById(id: string): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
}
