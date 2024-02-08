import { UsersRepository } from '../../repositories/prisma/users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new UsersRepository()
  const useCase = new RegisterUseCase(usersRepository)

  return useCase
}
