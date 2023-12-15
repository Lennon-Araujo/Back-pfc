import { CategoriesRepository } from '@/modules/category/repositories/prisma/category/categories-repository'
import { CreateCategoryUseCase } from '@/modules/category/use-cases/create-category'
import { Request, Response } from 'express'

export class CategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name } = req.body

    const categoryRepository = new CategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

    await createCategoryUseCase.execute(name)

    return res.status(201).send()
  }
}
