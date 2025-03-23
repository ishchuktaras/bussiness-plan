"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MobileTabScrollerProps {
  children: React.ReactNode
  className?: string
  spacing?: "normal" | "compact"
}

export function MobileTabScroller({ children, className, spacing = "normal" }: MobileTabScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to active tab when it changes
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const activeTab = scrollContainer.querySelector('[data-state="active"]')
    if (!activeTab) return

    // Calculate scroll position to center the active tab
    const containerWidth = scrollContainer.offsetWidth
    const tabWidth = (activeTab as HTMLElement).offsetWidth
    const tabLeft = (activeTab as HTMLElement).offsetLeft
    const scrollPosition = tabLeft - containerWidth / 2 + tabWidth / 2

    scrollContainer.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    })
  }, [children])

  return (
    <div
      ref={scrollRef}
      className={cn(
        "overflow-x-auto scrollbar-none -mx-4 px-4 pb-1",
        spacing === "compact" ? "mb-2" : "mb-4",
        className,
      )}
    >
      {children}
    </div>
  )
}

