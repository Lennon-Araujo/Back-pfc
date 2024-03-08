import { Request, Response } from 'express'
import { CategoriesRepository } from '../repositories/prisma/categories-repository'
import { GetSharedCategoriesUseCase } from '../use-cases/get-shared-categories'
import { Category } from '@prisma/client'
import { GetCategoriesByUserUseCase } from '../use-cases/get-by-user'

export class GetAllUserCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user
    const categoryRepository = new CategoriesRepository()
    const getCategoriesByUserUseCase = new GetCategoriesByUserUseCase(
      categoryRepository,
    )

    const getSharedCategoriesUseCase = new GetSharedCategoriesUseCase(
      categoryRepository,
    )

    const userCategories = await getCategoriesByUserUseCase.execute(userId)
    const sharedCategories = await getSharedCategoriesUseCase.execute(userId)

    const allCategories: Category[] | null = []

    if (userCategories) {
      userCategories.forEach((element) => allCategories.push(element))
    }

    if (sharedCategories) {
      sharedCategories.forEach((element) => allCategories.push(element))
    }

    if (!allCategories.length) {
      return res.status(400).json({
        message: "I didn't find any categories. Please create one!",
      })
    }

    const idsValidation = new Set()
    const categories = allCategories.filter((category) => {
      if (!idsValidation.has(category.id)) {
        idsValidation.add(category.id)
        return true
      }
      return false
    })

    const sortedByName = Array.from(categories).sort((a, b) => {
      return a.name.localeCompare(b.name, 'pt-BR')
    })

    return res.json(sortedByName)
  }
}
