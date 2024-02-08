import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from './register'
import { AppError } from '@/shared/errors/AppError'

let inMemoryUsersRepository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('Should to register a user', async () => {
    const newUser = {
      name: 'Teste Register',
      email: 'teste@register.com',
      password: '123456',
    }
    await registerUseCase.execute(newUser)

    const createdUser = await inMemoryUsersRepository.findByEmail(newUser.email)

    expect(createdUser).toHaveProperty('id')
    expect(createdUser?.email).toBe(newUser.email)
    expect(createdUser?.password).not.toBe(newUser.password)
  })

  it('Should not to register an user with an existent email', async () => {
    const newUser = {
      name: 'Teste Register',
      email: 'teste@register.com',
      password: '123456',
    }

    const userWithAnExistentEmail = {
      name: 'Teste Register 2',
      email: 'teste@register.com',
      password: '654321',
    }

    await registerUseCase.execute(newUser)

    await expect(
      registerUseCase.execute(userWithAnExistentEmail),
    ).rejects.toEqual(new AppError('User already exists!'))
  })
})
