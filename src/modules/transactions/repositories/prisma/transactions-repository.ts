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

  async findAll() {
    return await prisma.transaction.findMany({
      orderBy: {
        created_at: 'asc',
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
