'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/lib/api/client'
import { ApiResponse } from '@/lib/api/types'

import { CreatePasswordFormSchema, DefaultFormSchema } from '../validations'

export function useResetPassword() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const sendResetPasswordLink = useCallback(
    async (data: z.infer<typeof DefaultFormSchema>) => {
      setLoading(true)
      toast.promise(
        api<ApiResponse<string>>('/forgot-password/request', data),
        {
          loading: 'Sending reset password link...',
          success(_) {
            router.push('/callback/reset-password')
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
    [router]
  )

  const submitNewPassword = useCallback(
    async (data: z.infer<typeof CreatePasswordFormSchema>) => {
      toast.promise(
        api<ApiResponse<string>>(`/forgot-password/submit`, {
          email: searchParams.get('email'),
          code: searchParams.get('code'),
          new_password: data.password
        }),
        {
          loading: 'Submitting new password...',
          success(_) {
            router.push('/sign-in')
            return 'Password has been reset successfully.'
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
    [router, searchParams]
  )

  return {
    loading,
    sendResetPasswordLink,
    handleNewPassword: submitNewPassword
  }
}
