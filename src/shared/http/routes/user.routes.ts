import { RegisterController } from '@/modules/accounts/controllers/register'
import { Router } from 'express'

export const usersRoutes = Router()

const registerController = new RegisterController()

usersRoutes.post('/register', registerController.handle)
