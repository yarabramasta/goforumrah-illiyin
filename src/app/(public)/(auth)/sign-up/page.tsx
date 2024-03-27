import FormContainer from '@/components/form-container'
import ContactDetailsForm from '@/features/auth/components/form-contact-details'
import CreatePasswordForm from '@/features/auth/components/form-create-password'
import DefaultAuthForm from '@/features/auth/components/form-default'

export default function SignIn({
  searchParams
}: {
  searchParams?: Readonly<Record<string, string | null | undefined>>
}) {
  const title = searchParams?.step
    ? searchParams?.step === 'contact_details'
      ? 'Contact details'
      : 'Create password'
    : 'Create your partner account'

  return (
    <FormContainer
      title={title}
      description={
        searchParams?.step === 'create_password'
          ? 'Use a minimum of 10 characters, including uppercase letters, lowercase letters and numbers.'
          : 'Create an account to list and manage your property.'
      }
      backUrl={searchParams?.step ? '/sign-up' : undefined}
    >
      {!searchParams?.step && <DefaultAuthForm type="sign-up" />}
      {searchParams?.step === 'contact_details' && <ContactDetailsForm />}
      {searchParams?.step === 'create_password' && <CreatePasswordForm />}
    </FormContainer>
  )
}
