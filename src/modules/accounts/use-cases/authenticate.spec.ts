import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { AppError } from '@/shared/errors/AppError'
import { AuthenticateUserUseCase } from './authenticate'
import { RegisterUseCase } from './register'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase
let registerUseCase: RegisterUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
    )
  })

  it('Should to authenticate a user', async () => {
    const newUser = {
      name: 'Teste Register',
      email: 'teste@register.com',
      password: '123456',
    }

    await registerUseCase.execute(newUser)

    const response = await authenticateUserUseCase.execute({
      email: newUser.email,
      password: newUser.password,
    })

    expect(response.user.email).toBe(newUser.email)
    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('refreshToken')
  })

  it('Should not to authenticate a nonexistent user', async () => {
    const nonexistentUser = {
      email: 'teste@register.com',
      password: '123456',
    }
    await expect(
      authenticateUserUseCase.execute(nonexistentUser),
    ).rejects.toEqual(new AppError('Invalid credentials', 403))
  })

  it('Should not to authenticate wrong password', async () => {
    const newUser = {
      name: 'Teste Register',
      email: 'teste@register.com',
      password: '123456',
    }

    await inMemoryUsersRepository.create(newUser)

    await expect(
      authenticateUserUseCase.execute({
        email: newUser.email,
        password: 'wrong',
      }),
    ).rejects.toEqual(new AppError('Invalid credentials', 403))
  })
})
