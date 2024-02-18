import { AppError } from '@/shared/errors/AppError'
import { ITransactionsRepository } from '../repositories/itransactions-repository'

export interface GetAllTransactionsUseCaseRequest {
  userId: string
  query: {
    from?: string
    to?: string
  }
}
export class GetAllTransactionsUseCase {
  constructor(private transactionsRepository: ITransactionsRepository) {}

  async execute({ userId, query }: GetAllTransactionsUseCaseRequest) {
    if (query.to && query.from && query.to <= query.from) {
      throw new AppError('Invalid query', 422)
    }

    const summaries = await this.transactionsRepository.getSummary({
      userId,
      query,
    })

    const transactions = await this.transactionsRepository.findAll({
      userId,
      query,
    })

    return {
      transactions,
      summaries,
    }
  }
}
