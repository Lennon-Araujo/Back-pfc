import { prisma } from '@/lib/prisma'
import { ITransactionsRepository } from '../itransactions-repository'
import { CreateTransactionDto } from '../../dtos/create-transaction-dto'
import { UpdateTransactionDto } from '../../dtos/update-transaction-dto'

export class TransactionsRepository implements ITransactionsRepository {
  async create(data: CreateTransactionDto) {
    const transaction = await prisma.transactions.create({
      data,
    })

    return transaction
  }

  async findAll() {
    return await prisma.transactions.findMany({
      orderBy: {
        created_at: 'asc',
      },
    })
  }

  async findById(id: string) {
    return await prisma.transactions.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        category: true,
      },
    })
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return await prisma.transactions.update({
      where: {
        id,
      },
      data: updateTransactionDto,
    })
  }

  async delete(id: string) {
    return await prisma.transactions.delete({
      where: {
        id,
      },
    })
  }
}
