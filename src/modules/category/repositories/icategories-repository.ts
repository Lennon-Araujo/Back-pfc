import { Category } from '@prisma/client'

export interface ICategoriesRepository {
  create(name: string): Promise<void>
  getAll(): Promise<Category[]>
  findById(id: string): Promise<Category | null>
  findByName(name: string): Promise<Category | null>
  delete(id: string): Promise<Category | null>
}
