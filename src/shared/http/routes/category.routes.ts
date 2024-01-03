import { CreateCategoriesController } from '@/modules/category/controllers/create'
import { DeleteCategoryController } from '@/modules/category/controllers/delete'
import { GetAllCategoriesController } from '@/modules/category/controllers/get-all'
import { GetByIdCategoryController } from '@/modules/category/controllers/get-by-id'
import { UpdateCategoriesController } from '@/modules/category/controllers/update'
import { Router } from 'express'

export const categoriesRoutes = Router()

const createCategoriesController = new CreateCategoriesController()
const getAllCategoriesController = new GetAllCategoriesController()
const getByIdCategoryController = new GetByIdCategoryController()
const updateCategoriesController = new UpdateCategoriesController()
const deleteCategoryController = new DeleteCategoryController()

categoriesRoutes.get('/', getAllCategoriesController.handle)
categoriesRoutes.get('/:id', getByIdCategoryController.handle)
categoriesRoutes.post('/', createCategoriesController.handle)
categoriesRoutes.patch('/:id', updateCategoriesController.handle)
categoriesRoutes.delete('/:id', deleteCategoryController.handle)
