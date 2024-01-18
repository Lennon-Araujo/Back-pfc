import { Category } from '@prisma/client'

export interface ICategoriesRepository {
  create(name: string, userId: string): Promise<void>
  getAll(): Promise<Category[]>
  getByUser(userId: string): Promise<Category[]>
  getBySharedTransaction(userId: string): Promise<Category[]>
  findById(id: string): Promise<Category | null>
  findByName(name: string, userId: string): Promise<Category | null>
  update(id: string, name: string): Promise<void>
  delete(id: string): Promise<Category | null>
}
