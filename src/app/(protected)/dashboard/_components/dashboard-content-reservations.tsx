'use client'

import { useEffect, useMemo, useState } from 'react'
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

  // Fixing SSR hydration issues
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || !width || width === 0) {
    return null
  }

  if (width > 1024) {
    return reservations[0].map(item => (
      <ReservationItem key={item.bookingId} variant="list-item" {...item} />
    ))
  }

  return reservations.map((column, index) => (
    <div key={index} className="flex flex-col gap-4">
      {column.map(item => (
        <ReservationItem key={item.bookingId} variant="card" {...item} />
      ))}
    </div>
  ))
}
