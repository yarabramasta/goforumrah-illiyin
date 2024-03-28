'use client'

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
import { useResetPassword } from '@/lib/auth/use-reset-password'
import { useSignUp } from '@/lib/auth/use-sign-up'

export default function CreatePasswordForm(
  {
    type
  }: {
    type: 'reset-password' | 'create-password'
  } = { type: 'create-password' }
) {
  const { loading: authLoading, authenticate } = useAuth('sign-up')

  const {
    forms: { createPasswordForm: form }
  } = useSignUp()

  const { loading: resetPasswordLoading, handleNewPassword } =
    useResetPassword()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          type === 'reset-password' ? handleNewPassword : authenticate
        )}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="pb-1 text-left">Confirm Password</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="Enter your confirm password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={resetPasswordLoading || authLoading}
          type="submit"
          className="w-full"
        >
          Continue
        </Button>
      </form>
    </Form>
  )
}
