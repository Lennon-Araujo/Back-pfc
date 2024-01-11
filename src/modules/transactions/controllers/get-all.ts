import { Request, Response } from 'express'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'
import { GetAllTransactionsUseCase } from '../use-cases/get-all'

export class GetAllTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const transactionsRepository = new TransactionsRepository()
    const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
      transactionsRepository,
    )

    const transactions = await getAllTransactionsUseCase.execute(userId)

    return res.json(transactions)
  }
}
