export async function api<T extends Response>(
  url: string,
  data: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': process.env.API_CSRF_TOKEN!,
      Authorization: `Bearer ${process.env.API_KEY}`
    },
    body: JSON.stringify(data)
  })

  return await res.json()
}

export interface Response<T = string> {
  data?: T
  errors?: string | Record<string, unknown>
  success: boolean
  status_code: number
}
