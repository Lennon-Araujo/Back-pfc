import { ISharedRepository } from '../repositories/ishared-repository'

export class ShareControlUseCase {
  constructor(private sharedRepository: ISharedRepository) {}

  async execute(userId: string, email: string) {
    return await this.sharedRepository.create(userId, email)
  }
}
