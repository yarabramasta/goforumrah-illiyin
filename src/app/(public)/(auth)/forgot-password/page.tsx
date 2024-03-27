import FormContainer from '@/components/form-container'
import ForgotPasswordForm from '@/features/auth/components/form-forgot-password'

export default function ForgotPassword() {
  return (
    <FormContainer title="Forgot your password?" backUrl="/sign-in">
      <ForgotPasswordForm />
    </FormContainer>
  )
}
