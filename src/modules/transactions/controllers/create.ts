import { z } from 'zod'
import { CreateTransactionsUseCase } from '../use-cases/create-transaction'
import { Request, Response } from 'express'
import { CategoriesRepository } from '@/modules/category/repositories/prisma/categories-repository'
import { TransactionsRepository } from '../repositories/prisma/transactions-repository'
import { TransactionsOnUsersRepository } from '../repositories/prisma/transactions-on-users-repository'
import { CreateSharedTransactionUseCase } from '../use-cases/create-shared-transaction'
import { UsersRepository } from '@/modules/accounts/repositories/prisma/users-repository'
import { SharedRepository } from '@/modules/accounts/repositories/prisma/shared-repository'

export class CreateTransactionsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createTransactionBodySchema = z.object({
      name: z.string(),
      categoryId: z.string().uuid(),
      when: z.coerce.date(),
      cost: z.number().nonnegative(),
      shared: z.boolean(),
    })

    const createTransactionBody = createTransactionBodySchema.parse(req.body)
    const { id: userId } = req.user

    const transactionsRepository = new TransactionsRepository()
    const categoriesRepository = new CategoriesRepository()
    const transactionsOnUsersRepository = new TransactionsOnUsersRepository()
    const createTransactionsUseCase = new CreateTransactionsUseCase(
      transactionsRepository,
      categoriesRepository,
      transactionsOnUsersRepository,
    )

    const transaction = await createTransactionsUseCase.execute(
      createTransactionBody,
      userId,
    )

    if (transaction.shared) {
      const sharedRepository = new SharedRepository()
      const usersRepository = new UsersRepository()
      const createSharedTransactionUseCase = new CreateSharedTransactionUseCase(
        transactionsOnUsersRepository,
        usersRepository,
        sharedRepository,
      )
      await createSharedTransactionUseCase.execute(transaction.id, userId)
    }

    return res.status(201).send()
  }
}
