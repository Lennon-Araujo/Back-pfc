import { CategoriesController } from '@/modules/category/controllers/create'
import { Router } from 'express'

export const categoriesRoutes = Router()

const categoriesController = new CategoriesController()

categoriesRoutes.post('/', categoriesController.handle)
