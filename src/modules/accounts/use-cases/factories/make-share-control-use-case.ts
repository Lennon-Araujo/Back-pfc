import { SharedRepository } from '../../repositories/prisma/shared-repository'
import { ShareControlUseCase } from '../share-control'

export function makeShareControlUseCase() {
  const sharedRepository = new SharedRepository()
  const useCase = new ShareControlUseCase(sharedRepository)

  return useCase
}
