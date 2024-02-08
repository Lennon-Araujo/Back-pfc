import { CategoriesRepository } from '../../repositories/prisma/categories-repository'
import { DeleteCategoryUseCase } from '../delete'

export function makeDeleteCategoryUseCase() {
  const categoriesRepository = new CategoriesRepository()
  const useCase = new DeleteCategoryUseCase(categoriesRepository)

  return useCase
}
