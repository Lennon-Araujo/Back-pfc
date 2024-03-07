import { hash } from 'bcryptjs'
import { IUsersRepository } from '../repositories/iusers-repository'
import { AppError } from '@/shared/errors/AppError'
import { verify } from 'jsonwebtoken'
import { User } from '@prisma/client'

export class ResetPasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(token: string, password: string): Promise<User | null> {
    const { SECRET_TOKEN: secret_token } = process.env

    const { sub } = verify(token, secret_token!)
    const userId = sub?.toString()

    if (!userId) {
      throw new AppError('Invalid token')
    }

    const userExists = this.usersRepository.findById(userId)

    if (!userExists) {
      throw new AppError('Invalid token')
    }

    const passwordHash = await hash(password, 8)
    const user = await this.usersRepository.resetPassword({
      id: userId,
      password: passwordHash,
    })

    return user
  }
}
