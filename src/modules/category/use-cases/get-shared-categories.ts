import { ICategoriesRepository } from '../repositories/icategories-repository'

export class GetSharedCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(userId: string) {
    return await this.categoryRepository.getBySharedTransaction(userId)
  }
}
