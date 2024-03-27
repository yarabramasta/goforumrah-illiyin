import './globals.css'

import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'

import { Toaster } from '@/components/ui/sonner'
import { generalSans } from '@/fonts'

export const metadata: Metadata = { title: 'Go for Umrah' }

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <CookiesProvider>
      <html lang="en">
        <body className={generalSans.variable}>
          {children}
          <Toaster />
        </body>
      </html>
    </CookiesProvider>
  )
}
