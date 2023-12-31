import { Request, Response } from 'express'
import { AuthenticateUserUseCase } from '../use-cases/authenticate'
import { UsersRepository } from '../repositories/prisma/users-repository'
import { z } from 'zod'

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const authBodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    })

    const { email, password } = authBodySchema.parse(req.body)

    const usersRepository = new UsersRepository()
    const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

    const { user, token, refresh_token } =
      await authenticateUserUseCase.execute({ email, password })

    res.cookie('refreshToken', refresh_token, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })

    return res.json({
      token,
      user,
    })
  }
}

export { AuthenticateUserController }
