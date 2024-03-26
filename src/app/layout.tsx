import '@/shared/styles/globals.scss'

import type { Metadata } from 'next'

import { generalSans } from '@/fonts'

export const metadata: Metadata = { title: 'Go for Umrah' }

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={generalSans.className}>{children}</body>
    </html>
  )
}
