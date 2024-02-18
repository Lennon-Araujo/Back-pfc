import { Request, Response } from 'express'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'
import { GetAllTransactionsUseCase } from '../use-cases/get-all'
import { z } from 'zod'

export class GetAllTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const getTransactionsQuerySchema = z.object({
      from: z.string().optional(),
      to: z.string().optional(),
    })

    const { id: userId } = req.user

    const query = getTransactionsQuerySchema.parse(req.query)

    const transactionsRepository = new TransactionsRepository()
    const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
      transactionsRepository,
    )

    const { transactions, summaries } = await getAllTransactionsUseCase.execute(
      {
        userId,
        query,
      },
    )

    return res.json({
      transactions,
      summaries,
    })
  }
}
