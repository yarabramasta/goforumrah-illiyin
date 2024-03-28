import { faker } from '@faker-js/faker'

import { random } from '@/lib/utils'

import DashboardContent from './_components/dashboard-content'
import Reservations from './_components/dashboard-content-reservations'
import DashboardHeader from './_components/dashboard-header'
import Sidebar from './_components/dashboard-sidebar'

export default async function Dashboard() {
  const reservationItems = await getReservationItems()

  return (
    <main className="relative flex h-dvh w-screen flex-col overflow-hidden overflow-x-hidden">
      <Sidebar />
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
        <DashboardContent title="Latest Booking" />
      </div>
    </main>
  )
}

async function getReservationItems() {
  const seed = faker.number.int({ min: 5, max: 20 })
  return Promise.resolve(random.reservation(seed))
}
