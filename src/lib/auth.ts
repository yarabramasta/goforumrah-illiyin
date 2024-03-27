import NextAuth, { CredentialsSignin } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { z } from 'zod'

import { ContactDetailsFormSchema } from '@/features/auth/validations'

import { api } from './api/client'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: false },
        contactDetails: {
          label: 'Contact Details',
          type: 'object',
          required: false
        }
      },
      async authorize(credentials) {
        const data = credentials as unknown as {
          email: string
          password?: string
          contactDetails?: z.infer<typeof ContactDetailsFormSchema>
        }

        return data.contactDetails
          ? signUp(data as Required<typeof data>)
          : signIn(data.email, data.password!)
      }
    })
  ]
})

class AuthError extends CredentialsSignin {
  public readonly code: string

  constructor(message: string, code?: string) {
    super(message)
    this.code = code ?? 'auth_error'
  }
}

async function signUp(data: {
  email: string
  password: string
  contactDetails: z.infer<typeof ContactDetailsFormSchema>
}) {
  const { contactDetails, ...rest } = data
  const res = await api('/store', {
    ...contactDetails,
    // status (0 = need verification, 1 = verified)
    // production should be 1 becuase response from email:
    // http://localhost:3000/verif-account?type=business-hotel&email=neyajam496@sentrau.com&code=s6t3VH1Q0Kz1ykwJQjYYtXNF3
    status: process.env.NODE_ENV === 'production' ? 1 : 0,
    soft_delete: 0,
    rest
  })

  if (!res.success) {
    throw new AuthError(
      (res.errors as string) ?? 'Failed to send verification email.',
      'verification_email_error'
    )
  }

  return { email: data.email, id: '1' }
}

async function signIn(email: string, password: string) {
  const res = await api('/login', { email, password })

  if (!res.success) {
    throw new AuthError(
      (res.errors as string) ??
        'Login failed. Please check your email and password.',
      'login_error'
    )
  }

  return { email, id: '1' }
}
