// idk, just use @tanstack/react-query tbh

'use client'

import { useCookies } from 'next-client-cookies'

import { ApiResponse } from './types'

export async function clientFetch<T extends ApiResponse>(
  url: string,
  data: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<T> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const cookie = useCookies()

  const { Authorization, ...restHeaders } = headers ?? {
    Authorization: cookie.get('x-access-token') ?? ''
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization,
      ...restHeaders
    },
    body: JSON.stringify(data)
  }).then(res => res.json())

  return response
}
