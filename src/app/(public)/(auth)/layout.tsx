import Image from 'next/image'

import BlueHeader from '@/components/blue-header'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <BlueHeader />
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
