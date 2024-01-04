import { hash } from 'bcryptjs'
import { IUsersRepository } from '../repositories/iusers-repository'
import { CreateUserDTO } from '../dtos/create-user-dto'
import { AppError } from '@/shared/errors/AppError'

export class RegisterUseCase {
  constructor(private usersrepository: IUsersRepository) {}

  async execute({ name, email, password }: CreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersrepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists!')
    }

    const passwordHash = await hash(password, 8)
    await this.usersrepository.create({ name, email, password: passwordHash })
  }
}
