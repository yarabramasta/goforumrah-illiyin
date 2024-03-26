import { ChevronLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { Button } from '../ui/button'

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
  return (
    <>
      {backUrl && (
        <Button variant="ghost" className="w-min mb-8" asChild>
          <Link href={backUrl}>
            <ChevronLeftIcon className="w-5 h-5 text-primary mr-2" />
            Back
          </Link>
        </Button>
      )}
      <h1 className="pl-4 text-3xl font-bold pb-[0.75rem] text-[#1B1B1B]">
        {title}
      </h1>
      <p className="pl-4 text-[#616161] pb-8">
        {description ?? 'Create an account to list and manage your property.'}
      </p>
      <div className="flex-1 pl-4 pb-8 h-full w-full">
        {children}
        <div className="text-[#616161] pt-8 text-sm text-center">
          By signing in or creating an account, you agree with our{' '}
          <Link className="hover:underline text-primary" href="#">
            Terms & Conditions
          </Link>{' '}
          and{' '}
          <Link className="hover:underline text-primary" href="#">
            Privacy statement
          </Link>
        </div>
      </div>
    </>
  )
}
