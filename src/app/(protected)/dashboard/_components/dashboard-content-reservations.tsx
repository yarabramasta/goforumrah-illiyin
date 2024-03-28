'use client'

import { useMemo } from 'react'
import { useWindowSize } from 'usehooks-ts'

import { splitter } from '@/lib/utils'

import ReservationItem, {
  ReservationItemProps
} from './dashboard-content-reservation-item'

export default function Reservations({
  items
}: {
  items: ReservationItemProps[]
}) {
  const { width } = useWindowSize()
  const reservations = useMemo(() => {
    if (width >= 768 && width <= 1024) {
      return splitter(items, 3)
    }

    if (width < 768 && width >= 640) {
      return splitter(items, 2)
    }

    return [items]
  }, [items, width])

  if (width > 1024) {
    return reservations[0].map(item => (
      <li key={item.bookingId} title={`Reservation by ${item.name}`}>
        <ReservationItem variant="list-item" {...item} />
      </li>
    ))
  }

  return reservations.map((column, index) => (
    <div key={index} className="flex flex-col gap-4">
      {column.map(item => (
        <li key={item.bookingId} title={`Reservation by ${item.name}`}>
          <ReservationItem variant="card" {...item} />
        </li>
      ))}
    </div>
  ))
}
