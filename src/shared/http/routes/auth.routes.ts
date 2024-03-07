import { AuthenticateUserController } from '@/modules/accounts/controllers/authenticate'
import { LogoutController } from '@/modules/accounts/controllers/logout'
import { Router } from 'express'
import { ensureAuthenticated } from '../middlewares/ensure-authenticated'
import { RefreshTokenController } from '@/modules/accounts/controllers/refresh-token'
import { ForgotPasswordController } from '@/modules/accounts/controllers/forgot-password'
import { ResetPasswordController } from '@/modules/accounts/controllers/reset-password'

export const authRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()
const logoutController = new LogoutController()
const forgotPasswordControler = new ForgotPasswordController()
const resetPasswordControler = new ResetPasswordController()

authRoutes.post('/sessions', authenticateUserController.handle)
authRoutes.post(
  '/sessions/logout',
  ensureAuthenticated,
  logoutController.handle,
)
authRoutes.post('/refresh-token', refreshTokenController.handle)
authRoutes.post('/forgot-password', forgotPasswordControler.handle)
authRoutes.post('/reset-password', resetPasswordControler.handle)
