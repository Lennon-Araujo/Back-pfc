import { Request, Response } from 'express'
import { z } from 'zod'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'
import { UpdateTransactionsUseCase } from '../use-cases/update'

export class UpdateTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerParamsSchema = z.object({
      id: z.string(),
    })

    const registerBodySchema = z
      .object({
        name: z.string(),
        categoryId: z.string().uuid(),
        when: z.coerce.date(),
        cost: z.number().nonnegative(),
        shared: z.boolean(),
      })
      .partial()

    const { id } = registerParamsSchema.parse(req.params)
    const data = registerBodySchema.parse(req.body)

    const transactionsRepository = new TransactionsRepository()
    const updateTransactionsUseCase = new UpdateTransactionsUseCase(
      transactionsRepository,
    )

    await updateTransactionsUseCase.execute(id, data)

    return res.status(204).send()
  }
}
