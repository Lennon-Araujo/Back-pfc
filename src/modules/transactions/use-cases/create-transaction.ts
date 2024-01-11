import { ICategoriesRepository } from '@/modules/category/repositories/icategories-repository'
import { CreateTransactionDto } from '../dtos/create-transaction-dto'
import { ITransactionsRepository } from '../repositories/itransactions-repository'
import { AppError } from '@/shared/errors/AppError'
import { ITransactionsOnUsersRepository } from '../repositories/itransactions-on-users-repository'

export class CreateTransactionsUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private categoriesRepository: ICategoriesRepository,
    private transactionsOnUsersRepository: ITransactionsOnUsersRepository,
  ) {}

  async execute(data: CreateTransactionDto, userId: string) {
    try {
      const category = await this.categoriesRepository.findById(data.categoryId)

      if (!category) {
        throw new AppError("Category doesn't exists!", 404)
      }

      const transaction = await this.transactionsRepository.create(data)
      await this.transactionsOnUsersRepository.create(userId, transaction.id)

      return transaction
    } catch (error) {
      throw new AppError('Error creating transaction', 500)
    }
  }
}
