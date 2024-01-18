import { ICategoriesRepository } from '../repositories/icategories-repository'

export class GetCategoriesByUserUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(userId: string) {
    return await this.categoryRepository.getByUser(userId)
  }
}
