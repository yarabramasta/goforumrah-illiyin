import FormContainer from '@/components/auth/form-container'
import ForgotPasswordForm from '@/components/auth/form-forgot-password'

export default function ForgotPassword() {
  return (
    <FormContainer title="Forgot your password?" backUrl="/sign-in">
      <ForgotPasswordForm />
    </FormContainer>
  )
}
