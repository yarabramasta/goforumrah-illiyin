import { cookies } from 'next/headers'

import { ApiResponse } from './types'

export async function api<T extends ApiResponse>(
  url: string,
  data: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<T> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: cookies().get('x-access-token')?.value ?? '',
      ...headers
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  return response
}
