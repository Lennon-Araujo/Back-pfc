import { ICategoriesRepository } from '../repositories/icategories-repository'

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(name: string) {
    await this.categoryRepository.create(name)
  }

  // findAll() {
  //   return this.prisma.category.findMany({
  //     orderBy: {
  //       created_at: 'asc',
  //     },
  //     include: {
  //       transactions: true
  //     }
  //   });
  // }

  // findOne(id: number) {
  //   return this.prisma.category.findUniqueOrThrow({
  //     where: {
  //       id,
  //     },
  //   });
  // }

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
