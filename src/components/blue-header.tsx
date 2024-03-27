import { GlobeIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from './ui/button'

export default function BlueHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[999] h-20 w-full bg-[#052C47]">
      <div className="container relative flex h-full items-center justify-between px-[4.5rem] py-[1.25rem]">
        <Link href="/" prefetch={false}>
          <div className="mr-2 flex aspect-video w-max max-w-[9.125rem] items-center justify-center">
            <Image
              src="/logo.svg"
              alt="GoForUmrah.com"
              quality={100}
              width={146 * 2}
              height={26 * 2}
            />
          </div>
        </Link>
        <div className="invisible flex h-full items-center justify-end sm:visible">
          <Button
            variant="ghost"
            className="mr-[1.25rem] text-background"
            size="sm"
          >
            <GlobeIcon className="mr-1" />
            <span>En</span>
          </Button>
          <div className="mr-8 h-full w-px rounded-full bg-[#8295A3]" />
          <Button
            variant="outline"
            className="border-primary text-background"
            size="sm"
          >
            Help
          </Button>
        </div>
      </div>
    </header>
  )
}
