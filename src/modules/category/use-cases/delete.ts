import { AppError } from '@/shared/errors/AppError'
import { ICategoriesRepository } from '../repositories/icategories-repository'

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(id: string) {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new AppError("Category doesn't exist.", 404)
    }

    const deletedCategory = await this.categoryRepository.delete(id)
    return deletedCategory
  }
}
