import { SharedRepository } from '../../repositories/prisma/shared-repository'
import { GetSharedEmailUseCase } from '../get-shared-users'

export function makeGetSharedEmailUseCase() {
  const sharedRepository = new SharedRepository()
  const useCase = new GetSharedEmailUseCase(sharedRepository)

  return useCase
}
