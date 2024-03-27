import { NextRequest, NextResponse } from 'next/server'

import { api } from '@/lib/api/client'
import { auth } from '@/lib/auth'
import { getBaseUrl } from '@/lib/utils'

export const GET = async (request: NextRequest) => {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.redirect(getBaseUrl() + '/sign-in', {
      status: 302
    })
  }

  // type=business-hotel&email=neyajam496@sentrau.com&code=s6t3VH1Q0Kz1ykwJQjYYtXNF3
  const type = request.nextUrl.searchParams.get('type')
  const email = request.nextUrl.searchParams.get('email')
  const code = request.nextUrl.searchParams.get('code')

  if (!type || !email || !code) {
    return NextResponse.json(
      {
        error:
          'Could not verify account. Please check your email for the verification link.'
      },
      { status: 400 }
    )
  }

  const res = await api(`/email-verification/verify`, { email, code })

  if (!res.success) {
    return NextResponse.json(
      { error: res.errors ?? res.data },
      { status: res.status_code }
    )
  }

  return NextResponse.redirect(getBaseUrl() + '/dashboard', { status: 302 })
}
