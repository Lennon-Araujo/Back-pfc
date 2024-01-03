import { Transactions } from '@prisma/client'
import { UpdateTransactionDto } from '../dtos/update-transaction-dto'
import { CreateTransactionDto } from '../dtos/create-transaction-dto'

export interface ITransactionsRepository {
  create(data: CreateTransactionDto): Promise<Transactions>
  findAll(): Promise<Transactions[]>
  findById(id: string): Promise<Transactions | null>
  update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transactions>
  delete(id: string): Promise<Transactions>
}
