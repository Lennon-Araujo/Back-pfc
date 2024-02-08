import { ICategoriesRepository } from '../repositories/icategories-repository'

export class FindManyCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute() {
    return await this.categoryRepository.getAll()
  }
}
