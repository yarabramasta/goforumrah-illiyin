'use client'

import { ChevronDownIcon } from '@radix-ui/react-icons'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import UserAvatar from './user-avatar'

export default function AccountDropdown() {
  const session = useSession()

  return (
    <>
      <div className="flex items-center sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="relative h-8 w-8 overflow-hidden rounded-full p-0"
              disabled={session.status === 'loading'}
            >
              <UserAvatar {...session} />
            </Button>
          </DropdownMenuTrigger>
          <Items />
        </DropdownMenu>
      </div>
      <div className="hidden items-center sm:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              disabled={session.status === 'loading'}
            >
              <div className="mr-2 aspect-square size-6 overflow-hidden rounded-full border">
                <UserAvatar size={24} {...session} />
              </div>
              <div className="mr-4">
                <span className="text-sm font-medium">
                  {session.data?.user?.name ?? ''}
                </span>
              </div>
              <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <Items />
        </DropdownMenu>
      </div>
    </>
  )
}

function Items() {
  const router = useRouter()

  return (
    <DropdownMenuContent className="w-56" align="end" forceMount>
      <DropdownMenuGroup>
        <DropdownMenuItem className="flex sm:hidden">
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            toast.promise(signOut({ redirect: false }), {
              loading: 'Logging out...',
              success: () => {
                router.push('/sign-in')
                return 'Logged out successfully'
              },
              error: 'Failed to log out'
            })
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  )
}
