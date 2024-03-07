import { IDateProvider } from '../idate-provider'

class DateProvider implements IDateProvider {
  compareInHours(firstDate: Date, secondDate: Date): number {
    const comparisonInMs =
      new Date(firstDate).getTime() - new Date(secondDate).getTime()

    return comparisonInMs / (1000 * 60 * 60)
  }

  compareInDays(firstDate: Date, secondDate: Date): number {
    const comparisonInMs =
      new Date(firstDate).getTime() - new Date(secondDate).getTime()

    return Math.round(comparisonInMs / (1000 * 60 * 60 * 24))
  }

  addDays(date: Date, quantityDaysToAdd: number): Date {
    date.setDate(date.getDate() + quantityDaysToAdd)
    const addedDays = date

    return addedDays
  }

  addHours(date: Date, quantityHoursToAdd: number): Date {
    date.setHours(date.getHours() + quantityHoursToAdd)
    const addedHours = date

    return addedHours
  }

  compareIfExpired(firstDate: Date, secondDate: Date): boolean {
    const comparisonInMs =
      new Date(firstDate).getTime() - new Date(secondDate).getTime()

    return comparisonInMs < 0
  }
}

export { DateProvider }
