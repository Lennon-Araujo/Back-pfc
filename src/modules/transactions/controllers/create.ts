import { z } from 'zod'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'
import { CreateTransactionUseCase } from '../use-cases/create-transaction'
import { Request, Response } from 'express'

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
    const createTransactionUseCase = new CreateTransactionUseCase(
      transactionsRepository,
    )

    await createTransactionUseCase.execute(data)

    return res.status(201).send()
  }
}
