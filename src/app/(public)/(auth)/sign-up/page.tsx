import AuthForm from '@/components/auth/form'
import FormContainer from '@/components/auth/form-container'

export default function SignIn() {
  return (
    <FormContainer title="Create your partner account">
      <AuthForm type="sign-up" />
    </FormContainer>
  )
}
