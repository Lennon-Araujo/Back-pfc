import { CategoriesRepository } from '../../repositories/prisma/categories-repository'
import { GetByIdCategoryUseCase } from '../get-by-id'

export function makeGetByIdCategoryUseCase() {
  const categoriesRepository = new CategoriesRepository()
  const useCase = new GetByIdCategoryUseCase(categoriesRepository)

  return useCase
}
