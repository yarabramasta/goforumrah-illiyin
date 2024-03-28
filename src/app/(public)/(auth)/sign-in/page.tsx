import FormContainer from '../_components/form-container'
import DefaultAuthForm from '../_components/form-default'
import EnterPasswordForm from '../_components/form-enter-password'

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
