import { UsersRepository } from '@/modules/accounts/repositories/prisma/users-repository'
import { AppError } from '@/shared/errors/AppError'
import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction,
): Promise<Response | void> {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      process.env.SECRET_TOKEN!,
    ) as IPayload

    const usersrepository = new UsersRepository()

    const user = await usersrepository.findById(user_id)

    if (!user) {
      throw new AppError(`User ${user_id} not found`, 404)
    }

    req.user = {
      id: user_id,
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token', 401)
  }
}
