import { CategoriesRepository } from '../../repositories/prisma/categories-repository'
import { UpdateCategoryUseCase } from '../update'

export function makeUpdateCategoryUseCase() {
  const categoriesRepository = new CategoriesRepository()
  const useCase = new UpdateCategoryUseCase(categoriesRepository)

  return useCase
}
