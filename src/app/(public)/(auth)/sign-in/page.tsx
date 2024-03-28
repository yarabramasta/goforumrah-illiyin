import FormContainer from '@/components/auth/form-container'
import DefaultAuthForm from '@/components/auth/form-default'
import EnterPasswordForm from '@/components/auth/form-enter-password'

export default function SignIn({
  searchParams
}: {
  searchParams?: Readonly<Record<string, string | null | undefined>>
}) {
  return (
    <FormContainer title="Sign in to manage your property">
      {searchParams?.step === 'enter_password' ? (
        <EnterPasswordForm />
      ) : (
        <DefaultAuthForm type="sign-in" />
      )}
    </FormContainer>
  )
}
