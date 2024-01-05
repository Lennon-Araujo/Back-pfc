import { AuthenticateUserController } from '@/modules/accounts/controllers/authenticate'
import { RefreshTokenController } from '@/modules/accounts/controllers/refresh'
import { Router } from 'express'

export const authRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authRoutes.post('/sessions', authenticateUserController.handle)
authRoutes.post('/refresh-token', refreshTokenController.handle)
