interface IDateProvider {
  compareInHours(firstDate: Date, secondDate: Date): number
  compareInDays(firstDate: Date, secondDate: Date): number
  addDays(date: Date, quantityDaysToAdd: number): Date
  addHours(date: Date, quantityHoursToAdd: number): Date
  compareIfExpired(firstDate: Date, secondDate: Date): boolean
}

export { IDateProvider }
