import { Request, Response } from 'express'
import { UsersRepository } from '../repositories/prisma/users-repository'
import { LogoutUseCase } from '../use-cases/logout'
import { z } from 'zod'

export class LogoutController {
  async handle(req: Request, res: Response): Promise<Response> {
    const LogoutBodySchema = z.object({
      refreshToken: z.string(),
    })

    const { refreshToken } = LogoutBodySchema.parse(req.body)
    const usersRepository = new UsersRepository()
    const logoutUseCase = new LogoutUseCase(usersRepository)

    await logoutUseCase.execute(refreshToken)

    return res.status(204).send()
  }
}
