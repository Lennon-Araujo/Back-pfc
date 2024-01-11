import { AppError } from '@/shared/errors/AppError'
import { ISharedRepository } from '../repositories/ishared-repository'
import { IUsersRepository } from '../repositories/iusers-repository'

export class ShareControlUseCase {
  constructor(
    private sharedRepository: ISharedRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string, email: string) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Error creating Share Control')
    }
    return await this.sharedRepository.create(userId, email)
  }
}
