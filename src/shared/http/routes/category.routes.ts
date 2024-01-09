import { CreateCategoriesController } from '@/modules/category/controllers/create'
import { DeleteCategoryController } from '@/modules/category/controllers/delete'
import { GetAllCategoriesController } from '@/modules/category/controllers/get-all'
import { GetByIdCategoryController } from '@/modules/category/controllers/get-by-id'
import { UpdateCategoriesController } from '@/modules/category/controllers/update'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

export const categoriesRoutes = Router()

const createCategoriesController = new CreateCategoriesController()
const getAllCategoriesController = new GetAllCategoriesController()
const getByIdCategoryController = new GetByIdCategoryController()
const updateCategoriesController = new UpdateCategoriesController()
const deleteCategoryController = new DeleteCategoryController()

categoriesRoutes.get(
  '/',
  ensureAuthenticated,
  getAllCategoriesController.handle,
)
categoriesRoutes.get(
  '/:id',
  ensureAuthenticated,
  getByIdCategoryController.handle,
)
categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  createCategoriesController.handle,
)
categoriesRoutes.patch(
  '/:id',
  ensureAuthenticated,
  updateCategoriesController.handle,
)
categoriesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  deleteCategoryController.handle,
)
