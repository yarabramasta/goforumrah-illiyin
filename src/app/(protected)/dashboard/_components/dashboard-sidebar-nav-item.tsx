'use client'

import {
  ClipboardIcon,
  DashboardIcon,
  GearIcon,
  StarIcon
} from '@radix-ui/react-icons'
import { Bed, Calendar } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DashboardSidebarNavItemProps {
  title: string
  href: string
  icon: React.ReactNode
  disabled?: boolean
}

export default function DashboardSidebarNavItem(
  props: DashboardSidebarNavItemProps
) {
  const pathname = usePathname()

  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start',
        pathname === props.href && 'bg-accent text-primary hover:text-primary'
      )}
      disabled={props.disabled ?? false}
      asChild
    >
      <Link href={props.href} prefetch={false}>
        {props.icon}
        {props.title}
      </Link>
    </Button>
  )
}

export const items: DashboardSidebarNavItemProps[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <DashboardIcon className="mr-2 h-5 w-5" />,
    disabled: false
  },
  {
    title: 'Rates & Availability',
    href: '/dashboard/rates',
    icon: <Calendar className="mr-2 h-5 w-5" />,
    disabled: true
  },
  {
    title: 'Reservations',
    href: '/dashboard/reservations',
    icon: <ClipboardIcon className="mr-2 h-5 w-5" />,
    disabled: true
  },
  {
    title: 'Rooms',
    href: '/dashboard/rooms',
    icon: <Bed className="mr-2 h-5 w-5" />,
    disabled: true
  },
  {
    title: 'Guest Reviews',
    href: '/dashboard/reviews',
    icon: <StarIcon className="mr-2 h-5 w-5" />,
    disabled: true
  },
  {
    title: 'Setting',
    href: '/dashboard/settings',
    icon: <GearIcon className="mr-2 h-5 w-5" />,
    disabled: true
  }
]
