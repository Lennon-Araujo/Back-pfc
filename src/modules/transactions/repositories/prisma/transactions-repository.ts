import { prisma } from '@/lib/prisma'
import { CreateTransactionDto } from '../../dtos/create-transaction-dto'
import { UpdateTransactionDto } from '../../dtos/update-transaction-dto'
import { ITransactionsRepository } from '../itransactions-repository'

export class TransactionsRepository implements ITransactionsRepository {
  async create(data: CreateTransactionDto) {
    const transaction = await prisma.transaction.create({
      data,
    })

    return transaction
  }

  async findAll(userId: string) {
    return await prisma.transaction.findMany({
      orderBy: {
        when: 'asc',
      },
      where: {
        users: {
          some: {
            userId: {
              in: [userId],
            },
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
