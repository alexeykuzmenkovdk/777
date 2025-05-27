"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    icon: React.ReactNode
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-6 h-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-r from-orange-50 to-red-50 rounded-lg"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex flex-col items-center space-y-4 z-10 relative h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-center">{item.title}</h3>
              <p className="text-center text-gray-600">{item.description}</p>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white p-6 shadow-md transition-all duration-200 hover:shadow-lg relative z-10",
        className,
      )}
    >
      {children}
    </div>
  )
}
