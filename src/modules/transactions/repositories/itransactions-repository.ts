import { UpdateTransactionDto } from '../dtos/update-transaction-dto'
import { CreateTransactionDto } from '../dtos/create-transaction-dto'
import { Transaction } from '@prisma/client'

export interface ITransactionsRepository {
  create(data: CreateTransactionDto): Promise<Transaction>
  findAll(): Promise<Transaction[]>
  findById(id: string): Promise<Transaction | null>
  update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction>
  delete(id: string): Promise<Transaction>
}
