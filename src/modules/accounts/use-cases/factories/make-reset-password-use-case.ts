import { UsersRepository } from '../../repositories/prisma/users-repository'
import { ResetPasswordUseCase } from '../reset-password'

export function makeResetPasswordUseCase() {
  const usersRepository = new UsersRepository()
  const useCase = new ResetPasswordUseCase(usersRepository)

  return useCase
}
