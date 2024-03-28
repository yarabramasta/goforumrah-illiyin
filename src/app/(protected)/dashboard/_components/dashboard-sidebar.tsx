'use client'

import LogoText from '@/components/logo-text'

import DashboardSidebarNavItem, { items } from './dashboard-sidebar-nav-item'

export default function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-[999] hidden h-dvh w-[240px] flex-col border-r bg-card lg:flex">
      <div className="flex h-20 w-full items-center justify-center border-b px-8 py-[1.25rem]">
        <LogoText />
      </div>
      <nav className="w-full flex-1">
        <ul className="flex h-full w-full flex-col gap-2 px-4 py-8">
          {items.map(item => (
            <li key={item.href} title={`Navigation item ${item.title}`}>
              <DashboardSidebarNavItem {...item} />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
