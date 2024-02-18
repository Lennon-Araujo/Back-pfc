import { AppError } from '@/shared/errors/AppError'
import { ITransactionsRepository } from '../repositories/itransactions-repository'

export interface GetSummaryUseCaseRequest {
  userId: string
  query: {
    from?: string
    to?: string
  }
}
export class GetSummaryUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({ userId, query }: GetSummaryUseCaseRequest) {
    if (query.to && query.from && query.to <= query.from) {
      throw new AppError('Invalid query', 422)
    }

    return await this.transactionsRepository.getSummary({ userId, query })
  }
}
