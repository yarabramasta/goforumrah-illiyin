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
    return reservations[0].map((item, index) => (
      <ReservationItem variant="list-item" key={index} {...item} />
    ))
  }

  return reservations.map((column, index) => (
    <div key={index} className="flex flex-col gap-4">
      {column.map((item, index) => (
        <ReservationItem variant="card" key={index} {...item} />
      ))}
    </div>
  ))
}
