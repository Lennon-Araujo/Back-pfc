import { User } from '@prisma/client'
import { CreateUserDTO } from '../dtos/create-user-dto'
import { ResetPasswordDTO } from '../dtos/reset-password-dto'

export interface IUsersRepository {
  create({ name, email, password }: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  resetPassword({ id, password }: ResetPasswordDTO): Promise<User | null>
}
