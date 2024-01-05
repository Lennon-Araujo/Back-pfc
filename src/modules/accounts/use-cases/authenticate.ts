import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import auth from '@/config/auth'
import { IUsersRepository } from '../repositories/iusers-repository'
import { AppError } from '@/shared/errors/AppError'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
  refresh_token: string
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid credentials', 403)
    }

    const pwMatch = await compare(password, user.password)

    if (!pwMatch) {
      throw new AppError('Invalid credentials', 403)
    }

    const { expiresInToken, expiresInRefreshToken } = auth

    const {
      SECRET_TOKEN: secret_token,
      SECRET_REFRESH_TOKEN: secret_refresh_token,
    } = process.env

    const token = sign({}, secret_token!, {
      subject: user.id,
      expiresIn: expiresInToken,
    })

    const refresh_token = sign({}, secret_refresh_token!, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    })

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    }

    return {
      ...tokenReturn,
    }
  }
}
