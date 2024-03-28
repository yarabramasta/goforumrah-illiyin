import AuthPageBanner from '@/components/auth/page-banner'
import BlueHeader from '@/components/blue-header'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <BlueHeader />
      <main className="relative grid h-dvh flex-1 pt-20 sm:grid-cols-2">
        <section className="flex h-full w-full flex-col overflow-x-hidden overflow-y-scroll p-8 pl-[1rem] md:pb-8 md:pl-[4.5rem] md:pr-[4.5rem] md:pt-[4.5rem] lg:pl-[6.5rem]">
          {children}
        </section>
        <AuthPageBanner />
      </main>
    </>
  )
}
