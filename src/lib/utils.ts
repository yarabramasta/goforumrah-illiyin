import { randomBytes } from 'crypto'

import { faker } from '@faker-js/faker'
import { clsx, type ClassValue } from 'clsx'
import dayjs from 'dayjs'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NEXTPUBLIC_APP_BASE_URL)
    return `https://${process.env.NEXTPUBLIC_APP_BASE_URL}`

  return 'http://localhost:3000'
}

export function looper<T>(size: number, cb: (index: number) => T): T[] {
  return Array.from({ length: size }, (_, index) => cb(index))
}

export function splitter<T>(arr: T[], size: number) {
  return arr.reduce(
    (acc, item, index) => {
      acc[index % size].push(item as never)
      return acc
    },
    Array.from({ length: size }, () => [])
  ) as T[][]
}

export const random = {
  reservation: (size: number, rest = { status: false }) => {
    return looper(size, () => {
      const bookingId = randomBytes(4).toString('hex').toUpperCase()
      const name = faker.person.fullName()
      const totalSpent = faker.number.int({ min: 200, max: 999 })
      const totalNight = faker.number.int({ min: 1, max: 7 })
      const totalBedroom = faker.number.int({ min: 1, max: 7 })
      const bookedAt = faker.date.recent()
      const arrivalDate = faker.date.future()
      const departureDate = new Date(
        arrivalDate.getTime() +
          faker.number.int({ min: 0, max: 24 * 3 }) * 60 * 60 * 1000
      )
      const status: 'Confirmed' | 'Pending' | 'Cancelled' | undefined =
        rest.status
          ? faker.helpers.arrayElement(['Confirmed', 'Pending', 'Cancelled'])
          : undefined

      return {
        bookingId,
        name,
        totalSpent,
        totalNight,
        totalBedroom,
        stayDate: `${dayjs(arrivalDate).format('D MMM')} - ${dayjs(departureDate).format('D MMM')}`,
        stayTime: `Arrival ${dayjs(arrivalDate).format('h:mm A')} - Departure ${dayjs(departureDate).format('h:mm A')}`,
        bookedAt: dayjs(bookedAt).format('D MMM YYYY'),
        status
      }
    })
  }
}
