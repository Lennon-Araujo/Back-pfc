import { Request, Response } from 'express'
import { RefreshTokenUseCase } from '../use-cases/refresh'
import { UsersRepository } from '../repositories/prisma/users-repository'
import auth from '@/config/auth'

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const cookies = req.cookies

    const usersRepository = new UsersRepository()
    const refreshTokenUseCase = new RefreshTokenUseCase(usersRepository)

    const newRefreshToken = await refreshTokenUseCase.execute(
      cookies.refreshToken,
    )

    res.cookie('refreshToken', newRefreshToken.refreshToken, {
      path: '/',
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: auth.expiresRefreshTokenCookie,
    })

    return res.json({ token: newRefreshToken.token })
  }
}
