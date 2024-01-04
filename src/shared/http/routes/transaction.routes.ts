import { CreateTransactionsController } from '@/modules/transactions/controllers/create'
import { DeleteTransactionController } from '@/modules/transactions/controllers/delete'
import { GetAllTransactionsController } from '@/modules/transactions/controllers/get-all'
import { UpdateTransactionController } from '@/modules/transactions/controllers/update'
import { Router } from 'express'

export const transactionsRoutes = Router()

const createTransactionsController = new CreateTransactionsController()
const getAllTransactionsController = new GetAllTransactionsController()
const updateTransactionController = new UpdateTransactionController()
const deleteTransactionController = new DeleteTransactionController()

transactionsRoutes.get('/', getAllTransactionsController.handle)
transactionsRoutes.post('/', createTransactionsController.handle)
transactionsRoutes.patch('/:id', updateTransactionController.handle)
transactionsRoutes.delete('/:id', deleteTransactionController.handle)
