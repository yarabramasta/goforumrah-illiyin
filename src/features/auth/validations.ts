import { z } from 'zod'

export const DefaultFormSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email address.')
    .min(1, 'Email is required.')
})

export const ContactDetailsFormSchema = z.object({})

export const CreatePasswordFormSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long.'),
    confirmPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
  })
  .refine(data => data.confirmPassword === data.password, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export const EnterPasswordFormSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters long.')
})
