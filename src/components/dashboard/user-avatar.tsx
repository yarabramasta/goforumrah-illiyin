import { useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export default function UserAvatar({
  data,
  status,
  size = 32
}: { size?: number } & ReturnType<typeof useSession>) {
  if (status === 'loading') {
    return <Skeleton className="h-8 w-8 rounded-full" />
  }

  return (
    <Avatar className="aspect-square" style={{ width: size, height: size }}>
      <AvatarImage
        src="https://api.dicebear.com/8.x/notionists-neutral/svg?seed=Leo"
        alt={data?.user?.email ?? ''}
      />
      <AvatarFallback>
        {data?.user?.email ? data.user.email[0].toUpperCase() : ''}
      </AvatarFallback>
    </Avatar>
  )
}
