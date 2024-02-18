import { UpdateTransactionDto } from '../dtos/update-transaction-dto'
import { CreateTransactionDto } from '../dtos/create-transaction-dto'
import { Transaction } from '@prisma/client'
import { GetAllTransactionsUseCaseRequest } from '../use-cases/get-all'
import { GetSummaryUseCaseRequest } from '../use-cases/get-summary'
import { SummaryResult } from '../dtos/get-summary-dto'

export interface ITransactionsRepository {
  create(data: CreateTransactionDto): Promise<Transaction>
  findAll({
    userId,
    query,
  }: GetAllTransactionsUseCaseRequest): Promise<Transaction[]>
  findById(id: string): Promise<Transaction | null>
  getSummary({
    userId,
    query,
  }: GetSummaryUseCaseRequest): Promise<SummaryResult>
  update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction>
  delete(id: string): Promise<Transaction>
}
