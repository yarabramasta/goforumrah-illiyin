'use client'

import { GlobeIcon } from '@radix-ui/react-icons'

import LogoText from './logo-text'
import { Button } from './ui/button'

export default function BlueHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-[999] h-20 w-full bg-[#052C47]">
      <div className="container relative flex h-full items-center justify-between px-8 py-[1.25rem] md:px-[4.5rem]">
        <LogoText variant="light" />
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
