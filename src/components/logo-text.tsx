'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function LogoText({
  variant = 'dark'
}: {
  variant?: 'dark' | 'light'
}) {
  return (
    <Link href="/" prefetch={false}>
      <div className="mr-2 flex aspect-video w-max max-w-[9.125rem] items-center justify-center">
        <Image
          src={
            variant === 'dark' ? '/logo-text-dark.svg' : '/logo-text-light.svg'
          }
          alt="GoForUmrah.com"
          quality={100}
          width={146 * 2}
          height={26 * 2}
        />
      </div>
    </Link>
  )
}
