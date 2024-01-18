import { CreateCategoriesController } from '@/modules/category/controllers/create'
import { DeleteCategoryController } from '@/modules/category/controllers/delete'
import { GetByIdCategoryController } from '@/modules/category/controllers/get-by-id'
import { UpdateCategoriesController } from '@/modules/category/controllers/update'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { GetAllUserCategoriesController } from '@/modules/category/controllers/get-all-user-categories'

export const categoriesRoutes = Router()

const createCategoriesController = new CreateCategoriesController()
const getAllUserCategoriesController = new GetAllUserCategoriesController()
const getByIdCategoryController = new GetByIdCategoryController()
const updateCategoriesController = new UpdateCategoriesController()
const deleteCategoryController = new DeleteCategoryController()

categoriesRoutes.get(
  '/',
  ensureAuthenticated,
  getAllUserCategoriesController.handle,
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
