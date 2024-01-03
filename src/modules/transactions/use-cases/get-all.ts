import { ITransactionsRepository } from '../repositories/itransactions-repository'

export class GetAllTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute() {
    return await this.transactionsRepository.findAll()
  }
}
