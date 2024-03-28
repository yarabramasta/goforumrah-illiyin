'use client'

import { CaretSortIcon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

import LogoText from '@/components/logo-text'
import { Button } from '@/components/ui/button'
import {
  SheetContent,
  SheetHeader,
  Sheet as SheetPrimitive,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'

import DashboardSidebarNavItem, { items } from './dashboard-sidebar-nav-item'

export default function DashboardSidebarSheet() {
  return (
    <SheetPrimitive>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="not-sr-only lg:sr-only"
        >
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="max-w-sm">
        <SheetHeader className="border-b">
          <SheetTitle className="h-16">
            <LogoText variant="dark" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-y-auto py-8">
          <h4 className="mb-2 text-xs font-medium text-muted-foreground">
            Properties
          </h4>
          <Button variant="outline" className="w-full justify-start">
            <div className="mr-2 flex aspect-square h-5 w-5 items-center justify-center overflow-hidden rounded-md">
              <Image
                src="/hotel.png"
                alt="Hotel Logo"
                width={80}
                height={80}
                quality={80}
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 240px"
                className="h-full w-full scale-150 object-cover"
              />
            </div>
            <span className="flex-1 text-left">
              Big Makkah Hotel
            </span>
            <CaretSortIcon className="ml-2" />
          </Button>
          <h4 className="mb-2 mt-4 text-xs font-medium text-muted-foreground">
            Menu
          </h4>
          <nav className="w-full flex-1">
            <ul className="flex h-full w-full flex-col gap-2">
              {items.map(item => (
                <li key={item.href} title={`Navigation item ${item.title}`}>
                  <DashboardSidebarNavItem {...item} />
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </SheetPrimitive>
  )
}
