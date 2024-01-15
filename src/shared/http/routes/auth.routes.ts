import { AuthenticateUserController } from '@/modules/accounts/controllers/authenticate'
import { LogoutController } from '@/modules/accounts/controllers/logout'
import { RefreshTokenController } from '@/modules/accounts/controllers/refresh'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'

export const authRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()
const logoutController = new LogoutController()

authRoutes.post('/sessions', authenticateUserController.handle)
authRoutes.post(
  '/sessions/logout',
  ensureAuthenticated,
  logoutController.handle,
)
authRoutes.post('/refresh-token', refreshTokenController.handle)
