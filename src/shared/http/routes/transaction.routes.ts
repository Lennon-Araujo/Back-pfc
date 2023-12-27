import { TransactionsController } from '@/modules/transactions/controllers/create'
import { Router } from 'express'

export const transactionsRoutes = Router()

const transactionsController = new TransactionsController()

transactionsRoutes.post('/', transactionsController.handle)
