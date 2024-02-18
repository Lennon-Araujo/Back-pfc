import { prisma } from '@/lib/prisma'
import { CreateTransactionDto } from '../../dtos/create-transaction-dto'
import { UpdateTransactionDto } from '../../dtos/update-transaction-dto'
import { ITransactionsRepository } from '../itransactions-repository'
import { GetAllTransactionsUseCaseRequest } from '../../use-cases/get-all'
import { GetSummaryUseCaseRequest } from '../../use-cases/get-summary'

export class TransactionsRepository implements ITransactionsRepository {
  async create(data: CreateTransactionDto) {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }

  async findAll({ userId, query }: GetAllTransactionsUseCaseRequest) {
    return await prisma.transaction.findMany({
      orderBy: {
        when: 'desc',
      },
      where: {
        users: {
          some: {
            userId: {
              in: [userId],
            },
          },
        },
        AND: {
          when: {
            gte: query.from,
            lte: query.to,
          },
        },
      },
    })
  }

  async findById(id: string) {
    return await prisma.transaction.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        category: true,
      },
    })
  }

  async getSummary({ userId, query }: GetSummaryUseCaseRequest) {
    const generalSummary = await prisma.transaction.aggregate({
      where: {
        users: {
          some: {
            userId: {
              in: [userId],
            },
          },
        },
        AND: {
          when: {
            gte: query.from,
            lte: query.to,
          },
        },
      },
      _sum: {
        cost: true,
      },
    })

    const categorySummary = await prisma.transaction.groupBy({
      by: ['categoryId'],
      _sum: {
        cost: true,
      },
      where: {
        users: {
          some: {
            userId: {
              in: [userId],
            },
          },
        },
        when: {
          gte: query.from,
          lte: query.to,
        },
      },
    })

    return {
      generalSummary,
      categorySummary,
    }
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return await prisma.transaction.update({
      where: {
        id,
      },
      data: updateTransactionDto,
    })
  }

  async delete(id: string) {
    return await prisma.transaction.delete({
      where: {
        id,
      },
    })
  }
}
