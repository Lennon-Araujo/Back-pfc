import { CategoriesRepository } from '../../repositories/prisma/categories-repository'
import { GetSharedCategoriesUseCase } from '../get-shared-categories'

export function makeGetSharedCategoriesUseCase() {
  const categoriesRepository = new CategoriesRepository()
  const useCase = new GetSharedCategoriesUseCase(categoriesRepository)

  return useCase
}
