import { NextRequest, NextResponse } from 'next/server'

import { serverFetch } from '@/lib/api/server-fetch'
import { getBaseUrl } from '@/lib/utils'

export const GET = async (request: NextRequest) => {
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

  const res = await serverFetch(`/email-verification/verify`, { email, code })

  if (!res.success) {
    return NextResponse.json(
      { error: res.errors ?? res.data },
      { status: res.status_code }
    )
  }

  return NextResponse.redirect(getBaseUrl() + '/dashboard', { status: 302 })
}
