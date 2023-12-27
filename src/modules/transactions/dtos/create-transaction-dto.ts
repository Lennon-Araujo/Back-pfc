export interface CreateTransactionDto {
  name: string
  categoryId: string
  when: Date
  cost: number
  shared: boolean
}
