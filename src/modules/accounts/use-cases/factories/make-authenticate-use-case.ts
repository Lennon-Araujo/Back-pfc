import { UsersRepository } from '../../repositories/prisma/users-repository'
import { AuthenticateUserUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const usersRepository = new UsersRepository()
  const useCase = new AuthenticateUserUseCase(usersRepository)

  return useCase
}
