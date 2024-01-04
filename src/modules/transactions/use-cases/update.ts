import { AppError } from '@/shared/errors/AppError'
import { ITransactionsRepository } from '../repositories/itransactions-repository'
import { UpdateTransactionDto } from '../dtos/update-transaction-dto'

export class UpdateTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionsRepository.findById(id)

    if (!transaction) {
      throw new AppError("Transaction doesn't exist!", 404)
    }

    await this.transactionsRepository.update(id, updateTransactionDto)
  }
}
