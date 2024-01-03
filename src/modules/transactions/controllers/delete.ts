import { Request, Response } from 'express'
import { z } from 'zod'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'
import { DeleteTransactionUseCase } from '../use-cases/delete'

export class DeleteTransactionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerParamsSchema = z.object({
      id: z.string(),
    })

    const { id } = registerParamsSchema.parse(req.params)
    const transactionRepository = new TransactionsRepository()
    const deleteTransactionUseCase = new DeleteTransactionUseCase(
      transactionRepository,
    )

    await deleteTransactionUseCase.execute(id)

    return res.status(204).send()
  }
}
