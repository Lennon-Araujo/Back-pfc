import { CreateTransactionsController } from '@/modules/transactions/controllers/create'
import { DeleteTransactionController } from '@/modules/transactions/controllers/delete'
import { GetAllTransactionsController } from '@/modules/transactions/controllers/get-all'
import { Router } from 'express'

export const transactionsRoutes = Router()

const createTransactionsController = new CreateTransactionsController()
const getAllTransactionsController = new GetAllTransactionsController()
const deleteTransactionController = new DeleteTransactionController()

transactionsRoutes.get('/', getAllTransactionsController.handle)
transactionsRoutes.post('/', createTransactionsController.handle)
transactionsRoutes.delete('/:id', deleteTransactionController.handle)
