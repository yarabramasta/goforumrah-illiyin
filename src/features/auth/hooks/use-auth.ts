'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

import { ContactDetailsFormSchema, DefaultFormSchema } from '../validations'

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

  const form = useForm<z.infer<typeof DefaultFormSchema>>({
    resolver: zodResolver(DefaultFormSchema),
    defaultValues: {
      email: ''
    }
  })

  const handler = useCallback(
    (data: { password: string; confirmPassword?: string }) => {
      setLoading(true)

      toast.promise(
        signIn('credentials', {
          email,
          ...(contactDetails ? { contactDetails } : undefined),
          password: data.password,
          redirect: false
        }),
        {
          loading: 'Logging in...',
          success(data) {
            if (!!data?.ok) {
              toast.error(
                'Oops!!! an error has occurred. Please check your credentials and try again.'
              )
              router.push(`/${type}?error=auth_error`)
              return
            }

            const redirectUrl =
              process.env.NODE_ENV === 'production'
                ? '/dashboard'
                : type === 'sign-up'
                  ? `/callback/verify-email?email=${email}`
                  : '/dashboard'

            router.push(redirectUrl)

            return 'Logged in successfully.'
          },
          error(_error) {
            router.push(`/${type}?error=auth_error`)
            return 'Oops!!! an error has occurred. Please check your credentials and try again.'
          },
          finally() {
            setEmail(null)
            setContactDetails(null)
            form.reset()
            setLoading(false)
          }
        }
      )
    },
    [email, contactDetails, type, router, setEmail, setContactDetails, form]
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

  return { loading, authenticate: handler, handleInitialStep, form }
}
