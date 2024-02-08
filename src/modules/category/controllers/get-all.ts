import { Request, Response } from 'express'
import { CategoriesRepository } from '../repositories/prisma/categories-repository'
import { FindManyCategoriesUseCase } from '../use-cases/find-many'

export class GetAllCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const categoryRepository = new CategoriesRepository()
    const findManyCategoriesUseCase = new FindManyCategoriesUseCase(
      categoryRepository,
    )

    const categories = await findManyCategoriesUseCase.execute()

    return res.json(categories)
  }
}
