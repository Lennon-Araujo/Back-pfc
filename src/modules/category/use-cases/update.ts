import { AppError } from '@/shared/errors/AppError'
import { ICategoriesRepository } from '../repositories/icategories-repository'

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(id: string, name: string) {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new AppError("Category doesn't exist!", 404)
    }

    const categoryNameAlreadyExists =
      await this.categoryRepository.findByName(name)

    if (categoryNameAlreadyExists) {
      throw new AppError(
        "Category's name already exist! Please choose another one",
        409,
      )
    }

    await this.categoryRepository.update(id, name)
  }
}
