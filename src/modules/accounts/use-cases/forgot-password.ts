import { sign } from 'jsonwebtoken'

import { IUsersRepository } from '../repositories/iusers-repository'
import { AppError } from '@/shared/errors/AppError'
import { MailerProvider } from '@/shared/providers/mailer/mailer-provider'
import { resolve } from 'path'

interface IRequest {
  email: string
}

export class ForgotPasswordUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailerProvider: MailerProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid credentials', 403)
    }

    const templatePath = resolve(
      __dirname,
      '../views/email/forgot-password.hbs',
    )

    try {
      const { SECRET_TOKEN: secret_token } = process.env

      const forgotPasswordExpiresToken = '10m'

      const token = sign({}, secret_token!, {
        subject: user.id,
        expiresIn: forgotPasswordExpiresToken,
      })
      await this.mailerProvider.sendForgotPasswordEmail(
        email,
        user.name,
        token,
        templatePath,
      )
    } catch (error) {
      console.error(error)
      throw new Error()
    }
  }
}
