import { CheckIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

export default function VerifyEmailCallbackPage({
  searchParams
}: {
  searchParams?: Readonly<Record<string, string | null | undefined>>
}) {
  const email = searchParams?.email

  return (
    <main className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center p-8">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500">
        <CheckIcon className="size-6 text-background" />
      </div>
      <h1 className="mt-4 text-center text-3xl font-semibold">
        Verify your email address
      </h1>
      <p className="mt-4 text-center text-sm">
        We sent you an email with a verification link to{' '}
        {email ?? <strong>blank</strong>}. To confirm your account please follow
        the link in the email we just sent.
      </p>
      <Button asChild className="mt-8 w-full max-w-md">
        <a href="mailto:" target="_blank" rel="noreferrer noopener">
          Open your email
        </a>
      </Button>
    </main>
  )
}
