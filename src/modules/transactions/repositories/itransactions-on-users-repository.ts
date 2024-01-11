import { TransactionsOnUsers } from '@prisma/client'

export interface ITransactionsOnUsersRepository {
  create(usersId: string, transactionId: string): Promise<TransactionsOnUsers>
}
