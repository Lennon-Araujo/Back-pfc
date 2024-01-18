import { AppError } from '@/shared/errors/AppError'
import { ICategoriesRepository } from '../repositories/icategories-repository'

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(name: string, userId: string) {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      name,
      userId,
    )

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', 409)
    }

    await this.categoryRepository.create(name, userId)
  }
}
