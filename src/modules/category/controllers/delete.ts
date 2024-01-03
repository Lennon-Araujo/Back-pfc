import { Request, Response } from 'express'
import { CategoriesRepository } from '../repositories/prisma/categories-repository'
import { z } from 'zod'
import { DeleteCategoryUseCase } from '../use-cases/delete'

export class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = registerParamsSchema.parse(req.params)
    const categoryRepository = new CategoriesRepository()
    const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)

    await deleteCategoryUseCase.execute(id)

    return res.status(204).send()
  }
}
