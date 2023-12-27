import { CreateTransactionsController } from '@/modules/transactions/controllers/create'
import { Router } from 'express'

export const transactionsRoutes = Router()

const transactionsController = new CreateTransactionsController()

transactionsRoutes.post('/', transactionsController.handle)
