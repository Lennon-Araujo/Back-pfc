import { AppError } from '@/shared/errors/AppError'
import { ITransactionsRepository } from '../repositories/itransactions-repository'

export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction) {
      throw new AppError("Transaction doesn't exist.", 404)
    }

    const deletedTransaction = await this.transactionsRepository.delete(id)
    return deletedTransaction
  }
}
