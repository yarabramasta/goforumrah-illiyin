import ContactDetailsForm from '@/components/auth/form-contact-details'
import FormContainer from '@/components/auth/form-container'
import CreatePasswordForm from '@/components/auth/form-create-password'
import DefaultAuthForm from '@/components/auth/form-default'

export default function SignIn({
  searchParams
}: {
  searchParams?: Readonly<Record<string, string | null | undefined>>
}) {
  const title = searchParams?.step
    ? searchParams?.step === 'contact_details'
      ? 'Contact details'
      : searchParams?.reset
        ? 'Forgot your password?'
        : 'Create password'
    : 'Create your partner account'

  const description =
    searchParams?.step === 'create_password'
      ? searchParams?.reset
        ? "Confirm your username and we'll send you a link to reset your password."
        : 'Use a minimum of 10 characters, including uppercase letters, lowercase letters and numbers.'
      : 'Create an account to list and manage your property.'

  return (
    <FormContainer
      title={title}
      description={description}
      backUrl={searchParams?.step ? '/sign-up' : undefined}
    >
      {!searchParams?.step && <DefaultAuthForm type="sign-up" />}
      {searchParams?.step === 'contact_details' && <ContactDetailsForm />}
      {searchParams?.step === 'create_password' && (
        <CreatePasswordForm
          type={searchParams?.reset ? 'reset-password' : 'create-password'}
        />
      )}
    </FormContainer>
  )
}
