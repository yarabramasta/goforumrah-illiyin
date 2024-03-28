import './globals.css'

import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'

import NextAuthProvider from '@/components/next-auth-provider'
import { Toaster } from '@/components/ui/sonner'
import { generalSans } from '@/fonts'
import { auth } from '@/lib/auth'

export const metadata: Metadata = { title: 'Go for Umrah' }

export default async function RootLayout({
  children
}: React.PropsWithChildren) {
  const session = await auth()

  return (
    <NextAuthProvider session={session}>
      <CookiesProvider>
        <html lang="en">
          <body className={generalSans.variable}>
            {children}
            <Toaster />
          </body>
        </html>
      </CookiesProvider>
    </NextAuthProvider>
  )
}
