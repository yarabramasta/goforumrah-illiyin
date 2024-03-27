// please check lucia auth rather than next-auth@5 or just implement custom auth with Jotai / Zustand combo with react-query
// also, sometimes it is better to use auth entirely on the nextjs side rather than on server(ur backend) side

import NextAuth, { CredentialsSignin } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

// import { ContactDetailsFormSchema } from '@/features/auth/validations'

import { serverFetch } from './api/server-fetch'
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
          contactDetails?: string
        }

        return data.contactDetails
          ? signUp(data as Required<typeof data>)
          : signIn(data as Required<Omit<typeof data, 'contactDetails'>>)
      }
    })
  ]
})

// even tho CredentialsSignin accept message, there is no way passing that message into client or as a response, so i handled it with custom message
// see src/features/auth/hooks/use-auth.ts L54
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
  contactDetails: string
}) {
  const { contactDetails, ...rest } = data
  const parsedContactDetails = JSON.parse(contactDetails)

  const res = await serverFetch<ApiResponse<SignUpResponseData>>('/store', {
    ...parsedContactDetails,
    ...rest,
    // status (0 = need verification, 1 = verified)
    // production should be 1 because response from email:
    // http://localhost:3000/verif-account?type=business-hotel&email=neyajam496@sentrau.com&code=s6t3VH1Q0Kz1ykwJQjYYtXNF3
    status: process.env.NODE_ENV === 'production' ? 1 : 0,
    soft_delete: 0
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
          firstname: parsedContactDetails.firstname,
          lastname: parsedContactDetails.lastname
        }

  return serializeUser(user)
}

async function signIn(data: { email: string; password: string }) {
  const res = await serverFetch<
    ApiResponse<{ email: string; id: number; token: string }>
  >('/login', {
    email: data.email,
    password: data.password
  })

  if (res.data?.token) {
    cookies().set('x-access-token', res.data.token)
  }

  if (!res.success) {
    throw new CustomError(
      (res.errors as string) ??
        'Login failed. Please check your email and password.',
      'login_error'
    )
  }

  const user = await serverFetch<
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
