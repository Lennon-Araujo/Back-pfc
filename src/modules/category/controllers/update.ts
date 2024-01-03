import { Request, Response } from 'express'
import { z } from 'zod'
import { CategoriesRepository } from '../repositories/prisma/categories-repository'
import { UpdateCategoryUseCase } from '../use-cases/update'

export class UpdateCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerParamsSchema = z.object({
      id: z.string(),
    })

    const registerBodySchema = z.object({
      name: z.string(),
    })

    const { id } = registerParamsSchema.parse(req.params)
    const { name } = registerBodySchema.parse(req.body)

    const categoryRepository = new CategoriesRepository()
    const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)

    await updateCategoryUseCase.execute(id, name)

    return res.status(201).send()
  }
}
