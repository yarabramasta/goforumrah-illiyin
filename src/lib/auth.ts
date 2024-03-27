import NextAuth, { CredentialsSignin } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { ContactDetailsFormSchema } from '@/features/auth/validations'

import { api } from './api/client'
import { ApiResponse, SignUpResponseData } from './api/types'

export const {
  handlers: { GET, POST },
  auth
} = NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          name: 'email',
          id: 'email',
          required: true
        },
        password: {
          label: 'Password',
          name: 'password',
          id: 'password',
          type: 'password',
          required: true
        }
      },
      async authorize(credentials) {
        const data = credentials as unknown as {
          email: string
          password: string
          contactDetails?: z.infer<typeof ContactDetailsFormSchema>
        }

        return data.contactDetails
          ? signUp(data as Required<typeof data>)
          : signIn(data as Required<Omit<typeof data, 'contactDetails'>>)
      }
    })
  ]
})

class CustomError extends CredentialsSignin {
  public readonly code: string

  constructor(message: string, code?: string) {
    super(message)
    this.code = code ?? 'auth_error'
  }
}

function serializeUser(
  user: Pick<
    SignUpResponseData,
    'email' | 'firstname' | 'lastname' | 'id_hotel_business'
  >
) {
  return {
    id: String(user.id_hotel_business),
    email: user.email,
    name: `${user.firstname} ${user.lastname}`
  }
}

async function signUp(data: {
  email: string
  password: string
  contactDetails: z.infer<typeof ContactDetailsFormSchema>
}) {
  const { contactDetails, ...rest } = data
  const res = await api<ApiResponse<SignUpResponseData>>('/store', {
    ...contactDetails,
    // status (0 = need verification, 1 = verified)
    // production should be 1 because response from email:
    // http://localhost:3000/verif-account?type=business-hotel&email=neyajam496@sentrau.com&code=s6t3VH1Q0Kz1ykwJQjYYtXNF3
    status: process.env.NODE_ENV === 'production' ? 1 : 0,
    soft_delete: 0,
    rest
  })

  if (!res.success) {
    throw new CustomError(
      (res.errors as string) ?? 'Failed to send verification email.',
      'verification_email_error'
    )
  }

  const user =
    typeof res.data === 'string'
      ? res.data
      : {
          id_hotel_business: 1,
          email: data.email,
          firstname: contactDetails.firstname,
          lastname: contactDetails.lastname
        }

  return serializeUser(user)
}

async function signIn(data: { email: string; password: string }) {
  const res = await api<
    ApiResponse<{ email: string; id: number; token: string }>
  >('/login', {
    email: data.email,
    password: data.password
  })

  cookies().set('x-access-token', res.data!.token)

  if (!res.success) {
    throw new CustomError(
      (res.errors as string) ??
        'Login failed. Please check your email and password.',
      'login_error'
    )
  }

  const user = await api<
    ApiResponse<
      Pick<
        SignUpResponseData,
        'email' | 'firstname' | 'lastname' | 'id_hotel_business'
      >
    >
  >(
    '/show',
    { id_hotel_business: res.data?.id },
    { Authorization: res.data!.token }
  )

  return serializeUser(user.data!)
}