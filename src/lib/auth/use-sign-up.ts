// I SHOULD USE "Jotai" or "Zustand" LMAO

'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

import { useAuth } from './use-auth'
import {
  ContactDetailsFormSchema,
  CreatePasswordFormSchema
} from './validations'

export function useSignUp() {
  const router = useRouter()
  const { loading } = useAuth('sign-up')

  const [_, setContactDetails] = useLocalStorage<z.infer<
    typeof ContactDetailsFormSchema
  > | null>('data_form_step_contact_details', null)

  const contactDetailsForm = useForm<z.infer<typeof ContactDetailsFormSchema>>({
    resolver: zodResolver(ContactDetailsFormSchema)
  })

  const createPasswordForm = useForm<z.infer<typeof CreatePasswordFormSchema>>({
    resolver: zodResolver(CreatePasswordFormSchema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    },
    disabled: loading
  })

  const handleContactDetailsStep = useCallback(
    (data: z.infer<typeof ContactDetailsFormSchema>) => {
      setContactDetails(data)
      router.push('/sign-up?step=create_password')
    },
    [setContactDetails, router]
  )

  return {
    forms: {
      contactDetailsForm,
      createPasswordForm
    },
    handler: {
      contactDetails: handleContactDetailsStep
    }
  }
}
