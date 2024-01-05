import { Router } from 'express'
import { categoriesRoutes } from './category.routes'
import { transactionsRoutes } from './transaction.routes'
import { usersRoutes } from './user.routes'
import { authRoutes } from './auth.routes'

export const router = Router()

router.use('/category', categoriesRoutes)
router.use('/transactions', transactionsRoutes)
router.use('/users', usersRoutes)
router.use(authRoutes)
