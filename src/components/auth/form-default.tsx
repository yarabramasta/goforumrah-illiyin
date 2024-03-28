'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/lib/auth/use-auth'

export default function DefaultAuthForm({
  type
}: {
  type: 'sign-in' | 'sign-up'
}) {
  const { form, loading, handleInitialStep } = useAuth(type)

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleInitialStep)}
          className="flex w-full flex-col items-start gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-start">
                <FormLabel className="pb-1 text-left">Email Address</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter your email address"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={loading} type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Form>
      <Button
        disabled={loading}
        variant="outline"
        className="mt-14 w-full"
        asChild
      >
        <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
          {type === 'sign-in' ? 'Create your partner account' : 'Login'}
        </Link>
      </Button>
    </>
  )
}
