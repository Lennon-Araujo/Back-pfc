import { CreateCategoriesController } from '@/modules/category/controllers/create'
import { Router } from 'express'

export const categoriesRoutes = Router()

const categoriesController = new CreateCategoriesController()

categoriesRoutes.post('/', categoriesController.handle)
