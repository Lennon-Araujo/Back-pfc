import { Request, Response } from 'express'
import { z } from 'zod'
import { SharedRepository } from '../repositories/prisma/shared-repository'
import { ShareControlUseCase } from '../use-cases/share-control'
import { UsersRepository } from '../repositories/prisma/users-repository'

export class ShareControlController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      email: z.string().email(),
    })

    const { email } = registerBodySchema.parse(req.body)
    const { id: userId } = req.user

    const sharedRepository = new SharedRepository()
    const usersRepository = new UsersRepository()
    const shareControlUseCase = new ShareControlUseCase(
      sharedRepository,
      usersRepository,
    )

    await shareControlUseCase.execute(userId, email)

    return res.status(201).send()
  }
}
