import { TokenExpiredError, sign, verify } from 'jsonwebtoken'
import { IUsersRepository } from '../repositories/iusers-repository'
import { AppError } from '@/shared/errors/AppError'

export class LogoutUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(old_refresh_token: string) {
    const {
      SECRET_TOKEN: secret_token,
      SECRET_REFRESH_TOKEN: secret_refresh_token,
    } = process.env

    try {
      const { sub } = verify(old_refresh_token, secret_refresh_token!)

      const userId = sub?.toString()

      if (!userId) {
        throw new AppError('Invalid token')
      }

      const userExists = this.usersRepository.findById(userId)

      if (!userExists) {
        throw new AppError('Invalid token')
      }

      const refreshToken = sign({}, secret_refresh_token!, {
        subject: userId,
        expiresIn: 0,
      })

      const token = sign({}, secret_token!, {
        subject: userId,
        expiresIn: 0,
      })

      return { token, refreshToken }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError('Invalid token')
      }

      throw error
    }
  }
}
