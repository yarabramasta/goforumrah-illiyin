'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

import { useResetPassword } from '../hooks/use-reset-password'
import { DefaultFormSchema } from '../validations'

export default function ForgotPasswordForm() {
  const { loading, sendResetPasswordLink } = useResetPassword()

  const form = useForm<z.infer<typeof DefaultFormSchema>>({
    resolver: zodResolver(DefaultFormSchema),
    defaultValues: {
      email: ''
    },
    disabled: loading
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(sendResetPasswordLink)}
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
  )
}
