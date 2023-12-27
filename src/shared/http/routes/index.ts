import { Router } from 'express'
import { categoriesRoutes } from './category.routes'
import { transactionsRoutes } from './transaction.routes'

export const router = Router()

router.use('/category', categoriesRoutes)
router.use('/transactions', transactionsRoutes)
