import { ISharedRepository } from '../repositories/ishared-repository'

export class GetSharedEmailUseCase {
  constructor(private sharedRepository: ISharedRepository) {}

  async execute(userId: string) {
    return await this.sharedRepository.findByUser(userId)
  }
}
