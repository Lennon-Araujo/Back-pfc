import { AppError } from '@/shared/errors/AppError'
import { ICategoriesRepository } from '../repositories/icategories-repository'

export class GetByIdCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new AppError("Category doesn't exist.", 404)
    }

    return category
  }
}
