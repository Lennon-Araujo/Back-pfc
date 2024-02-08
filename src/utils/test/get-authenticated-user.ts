import { InMemoryUsersRepository } from '@/modules/accounts/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUserUseCase } from '@/modules/accounts/use-cases/authenticate'
import { RegisterUseCase } from '@/modules/accounts/use-cases/register'

interface getAuthenticatedUserProps {
  name: string
  email: string
  password: string
}

export async function getAuthenticatedUser({
  name,
  email,
  password,
}: getAuthenticatedUserProps) {
  const newUser = {
    name,
    email,
    password,
  }

  const inMemoryUsersRepository = new InMemoryUsersRepository()
  const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    inMemoryUsersRepository,
  )

  await registerUseCase.execute(newUser)

  const response = await authenticateUserUseCase.execute({
    email: newUser.email,
    password: newUser.password,
  })

  return response
}
