import { CategoriesRepository } from '../../repositories/prisma/categories-repository'
import { CreateCategoryUseCase } from '../create'

export function makeCreateCategoryUseCase() {
  const categoriesRepository = new CategoriesRepository()
  const useCase = new CreateCategoryUseCase(categoriesRepository)

  return useCase
}
