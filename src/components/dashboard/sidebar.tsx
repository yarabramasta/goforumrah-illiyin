import LogoText from '@/components/logo-text'

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-[999] hidden h-dvh w-[240px] flex-col border-r bg-card lg:flex">
      <div className="flex h-20 w-full items-center justify-center border-b px-8 py-[1.25rem]">
        <LogoText />
      </div>
      <ul className="flex h-full w-full flex-col space-y-4 p-8"></ul>
    </aside>
  )
}
