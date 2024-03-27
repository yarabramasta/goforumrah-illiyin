import FormContainer from '@/components/form-container'
import DefaultAuthForm from '@/features/auth/components/form-default'
import EnterPasswordForm from '@/features/auth/components/form-enter-password'

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
