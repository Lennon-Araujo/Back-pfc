import { prisma } from '@/lib/prisma'
import { ITransactionsOnUsersRepository } from '../itransactions-on-users-repository'

export class TransactionsOnUsersRepository
  implements ITransactionsOnUsersRepository
{
  async create(userId: string, transactionId: string) {
    return await prisma.transactionsOnUsers.create({
      data: {
        userId,
        transactionId,
      },
    })
  }
}
