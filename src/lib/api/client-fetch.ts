// idk, just use @tanstack/react-query tbh

import { ApiResponse } from './types'

export async function clientFetch<T extends ApiResponse>(
  url: string,
  data: Record<string, unknown>,
  headers?: Record<string, string>
): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: JSON.stringify(data),
    cache: 'no-store'
  }).then(res => res.json())

  return response
}
