"use client"

import { Logo } from "@/components/logo-component"
import { ContactButtons } from "@/components/contact-buttons"
import { Navigation } from "@/components/navigation"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container flex h-20 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Logo size="medium" />
        </div>
        <Navigation />
        <div className="flex items-center gap-4">
          <ContactButtons variant="header" />
        </div>
      </div>
    </header>
  )
}
