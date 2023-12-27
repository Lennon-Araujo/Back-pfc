import { CreateCategoriesController } from '@/modules/category/controllers/create'
import { GetAllCategoriesController } from '@/modules/category/controllers/get-all'
import { Router } from 'express'

export const categoriesRoutes = Router()

const categoriesController = new CreateCategoriesController()
const getAllCategoriesController = new GetAllCategoriesController()

categoriesRoutes.get('/', getAllCategoriesController.handle)
categoriesRoutes.post('/', categoriesController.handle)
