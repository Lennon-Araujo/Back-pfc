import { Router } from 'express'
import { categoriesRoutes } from './category.routes'

export const router = Router()

router.use('/categories', categoriesRoutes)
