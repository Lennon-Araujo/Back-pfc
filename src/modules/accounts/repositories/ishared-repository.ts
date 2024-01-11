import { Shared } from '@prisma/client'

export interface ISharedRepository {
  create(userId: string, email: string): Promise<Shared>
  findByUser(userId: string): Promise<Shared[]>
}
