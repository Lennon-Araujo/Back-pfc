import { z } from 'zod'
import { CreateTransactionsUseCase } from '../use-cases/create-transaction'
import { Request, Response } from 'express'
import { CategoriesRepository } from '@/modules/category/repositories/prisma/categories-repository'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'

export class CreateTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      name: z.string(),
      categoryId: z.string().uuid(),
      when: z.coerce.date(),
      cost: z.number().nonnegative(),
      shared: z.boolean(),
    })

    const data = registerBodySchema.parse(req.body)

    const transactionsRepository = new TransactionsRepository()
    const categoriesRepository = new CategoriesRepository()
    const createTransactionsUseCase = new CreateTransactionsUseCase(
      transactionsRepository,
      categoriesRepository,
    )

    await createTransactionsUseCase.execute(data)

    return res.status(201).send()
  }
}
