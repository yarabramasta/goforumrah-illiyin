'use client'

import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useLocalStorage } from 'usehooks-ts'

import { Button } from './button'

export default function FormContainer({
  children,
  title,
  description,
  backUrl
}: {
  title: string
  description?: string
  /**
   * <form> element
   */
  children: React.ReactNode
  backUrl?: string
}) {
  const [_, setEmail] = useLocalStorage<string | null>(
    'data_form_step_email',
    null
  )

  return (
    <>
      {backUrl && (
        <Button
          variant="ghost"
          className="mb-8 w-min"
          onClick={() => {
            setEmail(null)
          }}
          asChild
        >
          <Link href={backUrl}>
            <ChevronLeftIcon className="mr-2 h-5 w-5 text-primary" />
            Back
          </Link>
        </Button>
      )}
      <h1 className="pb-[0.75rem] pl-4 text-3xl font-bold text-[#1B1B1B]">
        {title}
      </h1>
      <p className="pb-8 pl-4 text-[#616161]">
        {description ?? 'Create an account to list and manage your property.'}
      </p>
      <div className="h-full w-full flex-1 pb-8 pl-4">
        {children}
        <div className="pt-8 text-center text-sm text-[#616161]">
          By signing in or creating an account, you agree with our{' '}
          <Link className="text-primary hover:underline" href="#">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link className="text-primary hover:underline" href="#">
            Privacy statement
          </Link>
        </div>
      </div>
    </>
  )
}
