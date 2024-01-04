import { ICategoriesRepository } from '@/modules/category/repositories/icategories-repository'
import { CreateTransactionDto } from '../dtos/create-transaction-dto'
import { ITransactionsRepository } from '../repositories/itransactions-repository'
import { AppError } from '@/shared/errors/AppError'

export class CreateTransactionUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute(data: CreateTransactionDto) {
    const category = await this.categoriesRepository.findById(data.categoryId)

    if (!category) {
      throw new AppError("Category doesn't exists!", 404)
    }

    return await this.transactionsRepository.create(data)
  }
}
