import { AppError } from '@/shared/errors/AppError'
import { ICategoriesRepository } from '../repositories/icategories-repository'

export class CreateCategoryUseCase {
  constructor(private categoryRepository: ICategoriesRepository) {}

  async execute(name: string) {
    const categoryAlreadyExists = await this.categoryRepository.findByName(name)

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', 409)
    }

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
