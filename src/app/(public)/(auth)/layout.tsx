import Image from 'next/image'

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <main className="h-full grid sm:grid-cols-2 flex-1 relative">
      <section className="flex h-full w-full min-h-dvh overflow-y-scroll flex-col flex-1 lg:pl-[6.5rem] md:pr-[4.5rem] md:pb-8 md:pt-[4.5rem] p-8 md:pl-[4.5rem] relative pl-[1rem]">
        <div className="flex-1 flex h-full flex-col relative w-full">
          {children}
        </div>
        <footer className="text-sm text-[#9E9E9E]">
          All rights reserved. Copyright 2022 - GoForUmrah.com&trade;
        </footer>
      </section>
      <section className="hidden h-full sm:flex w-full flex-1 overflow-hidden">
        <div className="aspect-[9/16] max-w-[43.75rem] w-max">
          <Image
            src="/image.png"
            alt="Authentication"
            sizes="(max-width: 640px) 100vw, 86vw"
            width={2000}
            height={1285}
            quality={100}
            className="object-cover h-full"
          />
        </div>
      </section>
    </main>
  )
}
