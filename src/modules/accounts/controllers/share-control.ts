import { Request, Response } from 'express'
import { z } from 'zod'
import { SharedRepository } from '../repositories/prisma/shared-repository'
import { ShareControlUseCase } from '../use-cases/share-control'

export class ShareControlController {
  async handle(req: Request, res: Response): Promise<Response> {
    const registerBodySchema = z.object({
      email: z.string().email(),
    })

    const { email } = registerBodySchema.parse(req.body)
    const { id: userId } = req.user

    const sharedRepository = new SharedRepository()
    const shareControlUseCase = new ShareControlUseCase(sharedRepository)

    await shareControlUseCase.execute(userId, email)

    return res.status(201).send()
  }
}
