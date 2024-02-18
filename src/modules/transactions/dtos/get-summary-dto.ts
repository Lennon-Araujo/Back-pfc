interface TransactionSummary {
  cost: number | null
}

interface CategorySummary {
  categoryId: string | null
  _sum: TransactionSummary
}

export interface SummaryResult {
  generalSummary: { _sum: TransactionSummary }
  categorySummary: CategorySummary[]
}
