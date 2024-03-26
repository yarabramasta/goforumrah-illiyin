import './globals.css'

import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/sonner'
import { generalSans } from '@/fonts'

export const metadata: Metadata = { title: 'Go for Umrah' }

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={generalSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
