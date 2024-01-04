import { Request, Response } from 'express'
import { z } from 'zod'
import { UsersRepository } from '../repositories/prisma/users-repository'
import { RegisterUseCase } from '../use-cases/register'

export class RegisterController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    })

    const { name, email, password } = registerBodySchema.parse(req.body)

    const usersRepository = new UsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    await registerUseCase.execute({ name, email, password })

    return res.status(201).send()
  }
}
