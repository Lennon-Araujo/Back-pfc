import { Request, Response } from 'express'
import { CategoriesRepository } from '../repositories/prisma/categories-repository'
import { GetAllCategoriesUseCase } from '../use-cases/get-all'

export class GetAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const categoryRepository = new CategoriesRepository()
    const getAllCategoriesUseCase = new GetAllCategoriesUseCase(
      categoryRepository,
    )

    const categories = await getAllCategoriesUseCase.execute()

    return res.json(categories)
  }
}
