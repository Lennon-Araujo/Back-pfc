import { UsersRepository } from '../../repositories/prisma/users-repository'
import { LogoutUseCase } from '../logout'

export function makeLogoutUseCase() {
  const usersRepository = new UsersRepository()
  const useCase = new LogoutUseCase(usersRepository)

  return useCase
}
