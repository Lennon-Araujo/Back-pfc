import { RegisterController } from '@/modules/accounts/controllers/register'
import { ShareControlController } from '@/modules/accounts/controllers/share-control'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { GetSharedEmailController } from '@/modules/accounts/controllers/get-shared-users'

export const usersRoutes = Router()

const registerController = new RegisterController()
const shareControlController = new ShareControlController()
const getSharedEmailController = new GetSharedEmailController()

usersRoutes.post('/register', registerController.handle)
usersRoutes.get(
  '/share-control',
  ensureAuthenticated,
  getSharedEmailController.handle,
)
usersRoutes.post(
  '/share-control',
  ensureAuthenticated,
  shareControlController.handle,
)
