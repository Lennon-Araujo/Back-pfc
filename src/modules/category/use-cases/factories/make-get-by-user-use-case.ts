import { CategoriesRepository } from '../../repositories/prisma/categories-repository'
import { GetCategoriesByUserUseCase } from '../get-by-user'

export function makeGetCategoriesByUserUseCase() {
  const categoriesRepository = new CategoriesRepository()
  const useCase = new GetCategoriesByUserUseCase(categoriesRepository)

  return useCase
}
