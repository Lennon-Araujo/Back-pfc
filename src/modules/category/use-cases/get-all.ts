import { ICategoriesRepository } from '../repositories/icategories-repository'

export class GetAllCategoriesUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute() {
    return await this.categoryRepository.getAll()
  }

  // update(id: number, updateCategoryDto: UpdateCategoryDto) {
  //   return this.prisma.category.update({
  //     where: {
  //       id,
  //     },
  //     data: updateCategoryDto,
  //   });
  // }

  // remove(id: number) {
  //   return this.prisma.category.delete({
  //     where: {
  //       id,
  //     },
  //   });
  // }
}
