import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function PublicLayout({
  children
}: React.PropsWithChildren) {
  const session = await auth()

  if (!session?.user) {
    redirect('/sign-in')
  }

  return <>{children}</>
}
