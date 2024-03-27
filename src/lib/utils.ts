import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return window.location.origin

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.NEXTPUBLIC_APP_BASE_URL)
    return `https://${process.env.NEXTPUBLIC_APP_BASE_URL}`

  return 'http://localhost:3000'
}
