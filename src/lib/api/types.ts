export interface SignUpResponseData {
  id_hotel_business: number
  firstname: string
  lastname: string
  email: string
  username: string
  phone: string
  password: string
  status: number
  email_code: string
  phone_code: string | null
  forgot_password: string | null
  soft_delete: number
  created_at: Date
  updated_at: Date
}

export interface ApiResponse<T = unknown> {
  data?: T
  errors?: string | Record<string, unknown>
  success: boolean
  status_code: number
}
