import AuthForm from '@/components/auth/form'
import FormContainer from '@/components/auth/form-container'

export default function SignIn() {
  return (
    <FormContainer title="Sign in to manage your property">
      <AuthForm type="sign-in" />
    </FormContainer>
  )
}
