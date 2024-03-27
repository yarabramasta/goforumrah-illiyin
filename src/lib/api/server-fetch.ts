import { cookies } from 'next/headers'

import { ApiResponse } from './types'

export async function serverFetch<T extends ApiResponse>(
  url: string,
  data: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<T> {
  const { Authorization, ...restHeaders } = headers ?? {
    Authorization: cookies().get('x-access-token')?.value ?? ''
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
      ...restHeaders
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  }).then(res => res.json())

  return response
}
