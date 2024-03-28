'use client'

import { useCookies } from 'next-client-cookies'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { clientFetch } from '@/lib/api/client-fetch'
import { ApiResponse } from '@/lib/api/types'

import { CreatePasswordFormSchema, DefaultFormSchema } from './validations'

export function useResetPassword() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const cookie = useCookies()

  const sendResetPasswordLink = useCallback(
    async (data: z.infer<typeof DefaultFormSchema>) => {
      setLoading(true)
      toast.promise(
        clientFetch<ApiResponse<string>>(
          `${process.env.NEXT_PUBLIC_API_URL}/forgot-password/request`,
          data,
          { Authorization: cookie.get('x-access-token') ?? '' }
        ),
        {
          loading: 'Sending reset password link...',
          success(_) {
            router.push(`/callback/reset-password?email=${data.email}`)
            return 'Check your email for the verification link.'
          },
          error(_) {
            router.push('/forgot-password?error=invalid_email')
            return 'Could not process the request. Please try again.'
          },
          finally() {
            setLoading(false)
          }
        }
      )
    },
    [router, cookie]
  )

  const submitNewPassword = useCallback(
    async (data: z.infer<typeof CreatePasswordFormSchema>) => {
      toast.promise(
        clientFetch<ApiResponse<string>>(
          `${process.env.NEXT_PUBLIC_API_URL}/forgot-password/submit`,
          {
            email: searchParams.get('email'),
            code: searchParams.get('code'),
            new_password: data.password
          },
          { Authorization: cookie.get('x-access-token') ?? '' }
        ),
        {
          loading: 'Submitting new password...',
          success(_) {
            router.push('/sign-in')
            return 'Password has been reset successfully. Please sign in.'
          },
          error(_) {
            router.push('/forgot-password?error=invalid_code')
            return 'Failed to reset password. Please try again.'
          },
          finally() {
            setLoading(false)
          }
        }
      )
    },
    [cookie, router, searchParams]
  )

  return {
    loading,
    sendResetPasswordLink,
    handleNewPassword: submitNewPassword
  }
}
