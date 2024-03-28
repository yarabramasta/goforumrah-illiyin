import FormContainer from '../_components/form-container'
import ForgotPasswordForm from '../_components/form-forgot-password'

export default function ForgotPassword() {
  return (
    <FormContainer title="Forgot your password?" backUrl="/sign-in">
      <ForgotPasswordForm />
    </FormContainer>
  )
}
