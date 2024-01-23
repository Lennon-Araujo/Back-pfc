import { Request, Response } from 'express'
import { RefreshTokenUseCase } from '../use-cases/refresh'
import { UsersRepository } from '../repositories/prisma/users-repository'
import { z } from 'zod'

export class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const refreshTokenBodySchema = z.object({
      refreshToken: z.string(),
    })

    const { refreshToken: oldRefreshToken } = refreshTokenBodySchema.parse(
      req.body,
    )

    const usersRepository = new UsersRepository()
    const refreshTokenUseCase = new RefreshTokenUseCase(usersRepository)

    const { token, refreshToken } =
      await refreshTokenUseCase.execute(oldRefreshToken)

    return res.json({
      token,
      refreshToken,
    })
  }
}
