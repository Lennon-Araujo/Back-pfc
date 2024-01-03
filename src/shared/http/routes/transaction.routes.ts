import { CreateTransactionsController } from '@/modules/transactions/controllers/create'
import { GetAllTransactionsController } from '@/modules/transactions/controllers/get-all'
import { Router } from 'express'

export const transactionsRoutes = Router()

const createTransactionsController = new CreateTransactionsController()
const getAllTransactionsController = new GetAllTransactionsController()

transactionsRoutes.get('/', getAllTransactionsController.handle)
transactionsRoutes.post('/', createTransactionsController.handle)
