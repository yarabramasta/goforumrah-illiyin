import { CheckIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

export default function ResetPasswordCallbackPage({
  searchParams
}: {
  searchParams?: Readonly<Record<string, string | null | undefined>>
}) {
  const email = searchParams?.email
  const maskedEmail = email?.replace(
    /(?<=.)[^@](?=[^@]*?@)|(?:(?<=@.)|(?!^)\\G(?=[^@]*$)).(?!$)/g,
    '*'
  )

  return (
    <main className="mx-auto flex w-full max-w-screen-sm flex-col items-center justify-center p-8">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-500">
        <CheckIcon className="size-6 text-background" />
      </div>
      <h1 className="mt-4 text-center text-3xl font-semibold">
        Check your inbox
      </h1>
      <p className="mt-4 text-center text-sm">
        We just emailed instructions and a reset password link to{' '}
        {maskedEmail ?? <strong>blank</strong>}. It might take a few minutes to
        arrive.
      </p>
      <Button asChild className="mt-8 w-full max-w-md">
        <a href="mailto:" target="_blank" rel="noreferrer noopener">
          Open your email
        </a>
      </Button>
    </main>
  )
}
