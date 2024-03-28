'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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
import { EnterPasswordFormSchema } from '@/lib/auth/validations'

export default function EnterPasswordForm() {
  const { loading, authenticate } = useAuth('sign-in')

  const form = useForm<z.infer<typeof EnterPasswordFormSchema>>({
    resolver: zodResolver(EnterPasswordFormSchema),
    defaultValues: {
      password: ''
    },
    disabled: loading
  })

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(authenticate)}
          className="flex w-full flex-col items-start gap-6"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-start">
                <FormLabel className="pb-1 text-left">Password</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter your password"
                    type="password"
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
      <Button disabled={loading} variant="link" className="mt-14 w-min" asChild>
        <Link href="/forgot-password">Forgot your password?</Link>
      </Button>
    </>
  )
}
