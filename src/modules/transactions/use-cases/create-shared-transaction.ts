import { AppError } from '@/shared/errors/AppError'
import { ITransactionsOnUsersRepository } from '../repositories/itransactions-on-users-repository'
import { IUsersRepository } from '@/modules/accounts/repositories/iusers-repository'
import { ISharedRepository } from '@/modules/accounts/repositories/ishared-repository'

export class CreateSharedTransactionUseCase {
  constructor(
    private transactionsOnUsersRepository: ITransactionsOnUsersRepository,
    private userRepository: IUsersRepository,
    private sharedRepository: ISharedRepository,
  ) {}

  async execute(transactionId: string, userId: string) {
    try {
      const sharedEmails = await this.sharedRepository.findByUser(userId)

      sharedEmails.forEach(async (sharedEmail) => {
        const usersWithSharing = await this.userRepository.findByEmail(
          sharedEmail.email,
        )

        if (usersWithSharing) {
          await this.transactionsOnUsersRepository.create(
            usersWithSharing?.id,
            transactionId,
          )
        }
      })
    } catch (error) {
      throw new AppError('Error creating shared transaction', 500)
    }
  }
}
