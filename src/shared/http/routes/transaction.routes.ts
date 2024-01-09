import { CreateTransactionsController } from '@/modules/transactions/controllers/create'
import { DeleteTransactionController } from '@/modules/transactions/controllers/delete'
import { GetAllTransactionsController } from '@/modules/transactions/controllers/get-all'
import { UpdateTransactionController } from '@/modules/transactions/controllers/update'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

export const transactionsRoutes = Router()

const createTransactionsController = new CreateTransactionsController()
const getAllTransactionsController = new GetAllTransactionsController()
const updateTransactionController = new UpdateTransactionController()
const deleteTransactionController = new DeleteTransactionController()

transactionsRoutes.get(
  '/',
  ensureAuthenticated,
  getAllTransactionsController.handle,
)
transactionsRoutes.post(
  '/',
  ensureAuthenticated,
  createTransactionsController.handle,
)
transactionsRoutes.patch(
  '/:id',
  ensureAuthenticated,
  updateTransactionController.handle,
)
transactionsRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteTransactionController.handle,
)
