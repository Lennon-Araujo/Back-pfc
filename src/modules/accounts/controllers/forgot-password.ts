import { Request, Response } from 'express'
import { z } from 'zod'
import { makeForgotPasswordUseCase } from '../use-cases/factories/make-forgot-password-use-case'
import { AppError } from '@/shared/errors/AppError'

export class ForgotPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const forgotPasswordBodySchema = z.object({
      email: z.string().email('E-mail inválido').trim(),
    })

    const { email } = forgotPasswordBodySchema.parse(req.body)

    const forgotPasswordUseCase = makeForgotPasswordUseCase()

    const defaultResponseMessage =
      'Se o contato informado estiver correto, você receberá um e-mail com instruções para recuperação de senha. Verifique sua caixa de entrada.'

    try {
      await forgotPasswordUseCase.execute({ email })
      return res.status(200).json({
        message: defaultResponseMessage,
      })
    } catch (error) {
      console.error(error)
      if (error instanceof AppError) {
        return res.status(200).json({
          message: defaultResponseMessage,
        })
      }

      return res.status(400).json({
        message: 'Ocorreu erro na recuperação de senha.',
      })
    }
  }
}
