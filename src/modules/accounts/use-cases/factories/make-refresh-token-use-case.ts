import { UsersRepository } from '../../repositories/prisma/users-repository'
import { RefreshTokenUseCase } from '../refresh-token'

export function makeRefreshTokenUseCase() {
  const usersRepository = new UsersRepository()
  const useCase = new RefreshTokenUseCase(usersRepository)

  return useCase
}
