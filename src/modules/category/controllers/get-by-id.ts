import { Request, Response } from 'express'
import { CategoriesRepository } from '../repositories/prisma/categories-repository'
import { z } from 'zod'
import { GetByIdCategoryUseCase } from '../use-cases/find'

export class GetByIdCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      id: z.string(),
    })

    const { id } = registerBodySchema.parse(req.params)
    const categoryRepository = new CategoriesRepository()
    const getByIdCategoryUseCase = new GetByIdCategoryUseCase(
      categoryRepository,
    )

    const category = await getByIdCategoryUseCase.execute(id)

    return res.json(category)
  }
}
