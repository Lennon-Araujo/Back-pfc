import { CreateTransactionDto } from '../dtos/create-transaction-dto'
import { ITransactionsRepository } from '../repositories/itransactions-repository'

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(data: CreateTransactionDto) {
    return await this.transactionsRepository.create(data)
  }
}
