import { Request, Response } from 'express'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'
import { GetAllTransactionsUseCase } from '../use-cases/get-all'

export class GetAllTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const transactionsRepository = new TransactionsRepository()
    const getAllTransactionsUseCase = new GetAllTransactionsUseCase(
      transactionsRepository,
    )

    const transactions = await getAllTransactionsUseCase.execute()

    return res.json(transactions)
  }
}
