import { ICategoriesRepository } from '../repositories/icategories-repository'

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute() {
    return await this.categoryRepository.getAll()
  }
}
