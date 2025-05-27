"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBackgroundProps {
  className?: string
  children: React.ReactNode
}

export function AnimatedGradientBackground({ className, children }: AnimatedGradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect()
      const x = (e.clientX - left) / width
      const y = (e.clientY - top) / height

      container.style.setProperty("--x-position", `${x * 100}%`)
      container.style.setProperty("--y-position", `${y * 100}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-orange-100",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_var(--x-position,25%)_var(--y-position,25%),rgba(255,85,0,0.15),transparent_50%)] before:opacity-0 before:transition-opacity before:duration-1000 hover:before:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  )
}
