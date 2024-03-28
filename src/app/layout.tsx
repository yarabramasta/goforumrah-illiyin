import './globals.css'

import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import localFont from 'next/font/local'

import NextAuthProvider from '@/components/next-auth-provider'
import { Toaster } from '@/components/ui/sonner'
import { auth } from '@/lib/auth'

const generalSans = localFont({
  src: './GeneralSans-Variable.woff2',
  display: 'swap',
  variable: '--font-sans'
})

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
