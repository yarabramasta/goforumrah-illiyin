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
import { PhoneInput } from '@/components/ui/phone-input'
import { useSignUp } from '@/lib/auth/use-sign-up'

export default function ContactDetailsForm() {
  const {
    forms: { contactDetailsForm: form },
    handler
  } = useSignUp()

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handler.contactDetails)}
        className="flex h-full w-full flex-col items-start gap-6"
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="pb-1 text-left">First Name</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="Enter your first name"
                  type="text"
                  autoComplete="given-name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="pb-1 text-left">Last Name</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="Enter your last name"
                  type="text"
                  autoComplete="family-name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="pb-1 text-left">Userame</FormLabel>
              <FormControl className="w-full">
                <Input
                  placeholder="Enter your username"
                  type="text"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col items-start">
              <FormLabel className="text-left">Phone Number</FormLabel>
              <FormControl className="w-full">
                <PhoneInput
                  defaultCountry="ID"
                  placeholder="(888) 888-8888"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </Form>
  )
}
