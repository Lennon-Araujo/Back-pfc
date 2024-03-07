import { Request, Response } from 'express'
import { z } from 'zod'
import { makeResetPasswordUseCase } from '../use-cases/factories/make-reset-password-use-case'
import { AppError } from '@/shared/errors/AppError'
import { TokenExpiredError } from 'jsonwebtoken'

export class ResetPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])\w+/g

    const resetPasswordBodySchema = z.object({
      token: z.string(),
      password: z
        .string()
        .trim()
        .min(6, 'A senha deve ter no mínimo 6 caracteres.')
        .regex(
          regex,
          'A senha deve conter ao menos: 1 letra maiúscula, 1 letra minúscula e 1 número',
        ),
    })

    const { token, password } = resetPasswordBodySchema.parse(req.body)

    const resetPasswordUseCase = makeResetPasswordUseCase()

    try {
      await resetPasswordUseCase.execute(token, password)
      return res.status(200).json({
        message: 'Senha resetada com sucesso. Faça login com a nova senha.',
      })
    } catch (error) {
      let errorMessage = 'Ocorreu erro no reset de senha.'

      if (error instanceof AppError) {
        errorMessage = error.message
      }

      if (error instanceof TokenExpiredError) {
        errorMessage = 'Tempo para reset de senha foi expirado!'
      }
      console.error(error)
      return res.status(400).json({
        message: errorMessage,
      })
    }
  }
}
