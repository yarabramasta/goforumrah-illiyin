'use client'

import Image from 'next/image'

export default function AuthPageBanner() {
  return (
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
  )
}
