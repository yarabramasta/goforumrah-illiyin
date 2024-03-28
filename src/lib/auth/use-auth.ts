'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

import { ContactDetailsFormSchema, DefaultFormSchema } from './validations'

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
          ...(contactDetails
            ? { contactDetails: JSON.stringify(contactDetails) }
            : undefined),
          password: data.password,
          redirect: false
        }),
        {
          loading:
            type === 'sign-up'
              ? 'Creating your account...'
              : 'Logging you in...',
          success(data) {
            if (data?.error) {
              // toast.error(
              //   type === 'sign-up'
              //     ? 'Email already exists. Please try again.'
              //     : 'Email or password is incorrect. Please try again.'
              // )
              // router.push(`/${type}?error=auth_error`)
              throw new Error(
                type === 'sign-up'
                  ? 'Email or username already exists. Please try again.'
                  : 'Email or password is incorrect. Please try again.'
              )
              // return
            }

            const redirectUrl =
              process.env.NODE_ENV === 'production'
                ? '/dashboard'
                : type === 'sign-up'
                  ? `/callback/verify-email?email=${email}`
                  : '/dashboard'

            router.push(redirectUrl)

            return type === 'sign-up'
              ? 'Account created successfully. Please check your email to verify your account.'
              : 'Logged in successfully.'
          },
          error(error) {
            router.push(`/${type}?error=auth_error`)
            return (
              error.message ??
              'Oops!!! an error has occurred. Please try again.'
            )
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
