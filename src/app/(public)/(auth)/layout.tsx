import { GlobeIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[999] h-20 w-full bg-[#052C47]">
        <div className="container relative flex h-full items-center justify-between px-[4.5rem] py-[1.25rem]">
          <Link href="/" prefetch={false}>
            <div className="mr-2 flex aspect-video w-max max-w-[9.125rem] items-center justify-center">
              <Image
                src="/logo.png"
                alt="GoForUmrah.com"
                width={146}
                height={26}
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
      <main className="relative grid h-full flex-1 pt-20 sm:grid-cols-2">
        <section className="relative flex h-full min-h-dvh w-full flex-1 flex-col overflow-y-scroll p-8 pl-[1rem] md:pb-8 md:pl-[4.5rem] md:pr-[4.5rem] md:pt-[4.5rem] lg:pl-[6.5rem]">
          <div className="relative flex h-full w-full flex-1 flex-col">
            {children}
          </div>
          <footer className="text-sm text-[#9E9E9E]">
            All rights reserved. Copyright 2022 - GoForUmrah.com&trade;
          </footer>
        </section>
        <section className="hidden h-full w-full flex-1 overflow-hidden sm:flex">
          <div className="aspect-[9/16] w-max max-w-[43.75rem]">
            <Image
              src="/image.png"
              alt="Authentication"
              sizes="(max-width: 640px) 100vw, 86vw"
              width={2000}
              height={1285}
              quality={100}
              className="h-full object-cover"
            />
          </div>
        </section>
      </main>
    </>
  )
}
