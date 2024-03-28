'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

export default function NextAuthProvider({
  children,
  ...rest
}: React.PropsWithChildren<SessionProviderProps>) {
  return <SessionProvider {...rest}>{children}</SessionProvider>
}
