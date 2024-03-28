import { faker } from '@faker-js/faker'

import { random } from '@/lib/utils'

import DashboardContent from './_components/dashboard-content'
import Reservations from './_components/dashboard-content-reservations'
import DashboardHeader from './_components/dashboard-header'
import DashboardSidebar from './_components/dashboard-sidebar'

async function getReservationItems() {
  const seed = faker.number.int({ min: 10, max: 20 })
  return Promise.resolve(random.reservation(seed))
}

async function getLatestBookingItems() {
  const seed = faker.number.int({ min: 5, max: 5 })
  return Promise.resolve(random.reservation(seed))
}

export default async function Dashboard() {
  // simulate parallel data fetching
  const [reservationItems, latestBookingItems] = await Promise.all([
    getReservationItems(),
    getLatestBookingItems()
  ])

  return (
    <main className="relative flex h-dvh w-screen flex-col overflow-hidden overflow-x-hidden">
      <DashboardSidebar />
      <DashboardHeader />
      <div className="relative ml-auto w-full flex-1 overflow-y-scroll p-8 lg:w-[calc(100vw-240px)]">
        <DashboardContent
          title="Reservation Overview"
          tabs={[
            { title: 'Departure' },
            { title: 'Arrival', count: 1 },
            { title: 'Stay-over' }
          ]}
        >
          <ul className="grid w-full grid-cols-1 flex-col gap-6 sm:grid-cols-2 md:grid-cols-3 lg:flex">
            <Reservations items={reservationItems} />
          </ul>
        </DashboardContent>
        <div className="mt-8"></div>
        <DashboardContent title="Latest Booking">
          <ul className="grid w-full grid-cols-1 flex-col gap-6 sm:grid-cols-2 md:grid-cols-3 lg:flex">
            <Reservations items={latestBookingItems} />
          </ul>
        </DashboardContent>
      </div>
    </main>
  )
}
