import BlueHeader from '@/components/blue-header'

export default function CallbackLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <BlueHeader />
      <div className="relative flex h-full flex-col items-center justify-center">
        {children}
      </div>
    </>
  )
}
