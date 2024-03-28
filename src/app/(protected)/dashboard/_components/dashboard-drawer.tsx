'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

export default function Drawer() {
  return (
    <Button variant="outline" size="icon" className="not-sr-only lg:sr-only">
      <HamburgerMenuIcon />
    </Button>
  )
}
