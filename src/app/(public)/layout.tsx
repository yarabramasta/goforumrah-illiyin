import { redirect } from 'next/navigation'

import { auth } from '@/lib/auth'

export default async function PublicLayout({
  children
}: React.PropsWithChildren) {
  const session = await auth()

  if (session?.user) {
    redirect('/dashboard')
  }

  return <div className="h-dvh w-screen overflow-x-hidden">{children}</div>
}
