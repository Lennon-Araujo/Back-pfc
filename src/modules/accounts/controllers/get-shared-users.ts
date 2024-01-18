import { Request, Response } from 'express'
import { SharedRepository } from '../repositories/prisma/shared-repository'
import { GetSharedEmailUseCase } from '../use-cases/get-shared-users'

export class GetSharedEmailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: userId } = req.user

    const sharedRepository = new SharedRepository()
    const getSharedEmailUseCase = new GetSharedEmailUseCase(sharedRepository)

    const emails = await getSharedEmailUseCase.execute(userId)

    if (!emails.length) {
      return res.status(404).json({ message: 'Not found any shared email' })
    }
    return res.json(emails)
  }
}
