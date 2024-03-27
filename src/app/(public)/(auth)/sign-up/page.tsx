import FormContainer from '@/components/form-container'
import ContactDetailsForm from '@/features/auth/components/form-contact-details'
import CreatePasswordForm from '@/features/auth/components/form-create-password'
import DefaultAuthForm from '@/features/auth/components/form-default'

export default function SignIn({
  searchParams
}: {
  searchParams?: Readonly<Record<string, string | null | undefined>>
}) {
  return (
    <FormContainer
      title="Create your partner account"
      backUrl={searchParams?.step ? '/sign-up' : undefined}
    >
      {!searchParams?.step && <DefaultAuthForm type="sign-up" />}
      {searchParams?.step === 'contact_details' && <ContactDetailsForm />}
      {searchParams?.step === 'create_password' && <CreatePasswordForm />}
    </FormContainer>
  )
}
