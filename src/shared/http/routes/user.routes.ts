import { RegisterController } from '@/modules/accounts/controllers/register'
import { ShareControlController } from '@/modules/accounts/controllers/share-control'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

export const usersRoutes = Router()

const registerController = new RegisterController()
const shareControlController = new ShareControlController()

usersRoutes.post('/register', registerController.handle)
usersRoutes.post(
  '/share-control',
  ensureAuthenticated,
  shareControlController.handle,
)
