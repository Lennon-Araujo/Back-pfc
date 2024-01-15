import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/prisma/users-repository'
import { LogoutUseCase } from '../use-cases/logout'

export class LogoutController {
  async handle(req: Request, res: Response): Promise<Response> {
    const cookies = req.cookies

    const usersRepository = new UsersRepository()
    const logoutUseCase = new LogoutUseCase(usersRepository)

    const newRefreshToken = await logoutUseCase.execute(cookies.refreshToken)

    res.cookie('refreshToken', newRefreshToken.refreshToken, {
      path: '/',
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      maxAge: 0,
    })

    return res.status(204).send()
  }
}
