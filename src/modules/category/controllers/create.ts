import { Request, Response } from 'express'
import { z } from 'zod'
import { CategoriesRepository } from '../repositories/prisma/categories-repository'
import { CreateCategoryUseCase } from '../use-cases/create'

export class CreateCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      name: z.string(),
    })

    const { name } = registerBodySchema.parse(req.body)

    const categoryRepository = new CategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

    await createCategoryUseCase.execute(name)

    return res.status(201).send()
  }
}
