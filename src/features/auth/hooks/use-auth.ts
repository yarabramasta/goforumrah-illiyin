'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

import {
  ContactDetailsFormSchema,
  CreatePasswordFormSchema,
  DefaultFormSchema,
  EnterPasswordFormSchema
} from '../validations'

export function useAuth(type: 'sign-in' | 'sign-up') {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [email, setEmail] = useLocalStorage<string | null>(
    'data_form_step_email',
    null
  )
  const [contactDetails, setContactDetails] = useLocalStorage<z.infer<
    typeof ContactDetailsFormSchema
  > | null>('data_form_step_contact_details', null)

  const handler = useCallback(
    (
      data: typeof type extends 'sign-in'
        ? z.infer<typeof EnterPasswordFormSchema>
        : z.infer<typeof CreatePasswordFormSchema>,
      callback?: () => Promise<void>
    ) => {
      setLoading(true)

      toast.promise(
        async () => {
          const [res] = await Promise.all([
            signIn('credentials', {
              email,
              contactDetails,
              password: type === 'sign-up' ? undefined : data.password,
              redirect: false
            }),
            callback?.()
          ])

          return res
        },
        {
          loading: 'Logging in...',
          success(data) {
            if (!!data?.ok) {
              toast.error(data.error)
              return
            }

            const redirectUrl =
              process.env.NODE_ENV === 'production'
                ? '/dashboard'
                : type === 'sign-up'
                  ? '/verify-email'
                  : '/dashboard'

            router.push(redirectUrl)

            return 'Logged in successfully.'
          },
          error(error) {
            return (
              error.message ?? 'Authentication failed, an error has occurred.'
            )
          },
          finally() {
            setEmail(null)
            setContactDetails(null)
            setLoading(false)
          }
        }
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const handleInitialStep = useCallback(
    (data: z.infer<typeof DefaultFormSchema>) => {
      setEmail(data.email)
      const nextStep = type === 'sign-in' ? 'enter_password' : 'contact_details'
      router.push(`/${type}?step=${nextStep}`)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [type]
  )

  const form = useForm<z.infer<typeof DefaultFormSchema>>({
    resolver: zodResolver(DefaultFormSchema),
    defaultValues: {
      email: ''
    }
  })

  return { loading, authenticate: handler, handleInitialStep, form }
}
