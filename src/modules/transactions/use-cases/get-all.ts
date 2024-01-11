import { ITransactionsRepository } from '../repositories/itransactions-repository'

export class GetAllTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute(userId: string) {
    return await this.transactionsRepository.findAll(userId)
  }
}
