import { CategoriesRepository } from '../../repositories/prisma/categories-repository'
import { FindManyCategoriesUseCase } from '../find-many'

export function makeFindManyCategoriesUseCase() {
  const categoriesRepository = new CategoriesRepository()
  const useCase = new FindManyCategoriesUseCase(categoriesRepository)

  return useCase
}
