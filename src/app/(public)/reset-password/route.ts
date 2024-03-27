import { NextRequest, NextResponse } from 'next/server'

import { getBaseUrl } from '@/lib/utils'

export const GET = async (request: NextRequest) => {
  // same reason as src/lib/auth.ts L79...L81
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { redirect: getBaseUrl() + '/sign-in?error=dev_only_feature' },
      { status: 400 }
    )
  }

  // type=business-hotel&email=neyajam496@sentrau.com&code=RGmMNcJVHdbsS9ZWYs96XZX4u
  const type = request.nextUrl.searchParams.get('type')
  const email = request.nextUrl.searchParams.get('email')
  const code = request.nextUrl.searchParams.get('code')

  if (!type || !email || !code) {
    return NextResponse.json(
      {
        error:
          'Could not process the request. Please check your email for the verification link.'
      },
      { status: 400 }
    )
  }

  return NextResponse.redirect(
    `${getBaseUrl()}/sign-up?step=create_password&reset=true&code=${code}email=${email}`,
    { status: 302 }
  )
}
