import { NodeMailer } from '@/shared/providers/mailer/implementations/nodemailer'
import { UsersRepository } from '../../repositories/prisma/users-repository'
import { ForgotPasswordUseCase } from '../forgot-password'

export function makeForgotPasswordUseCase() {
  const usersRepository = new UsersRepository()
  const mailerProvider = new NodeMailer()
  const useCase = new ForgotPasswordUseCase(usersRepository, mailerProvider)

  return useCase
}
