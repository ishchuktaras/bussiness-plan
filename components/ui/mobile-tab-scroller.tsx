"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface MobileTabScrollerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  showScrollIndicators?: boolean
  value?: string // Add this prop to fix the TypeScript error
}

export function MobileTabScroller({
  children,
  className,
  showScrollIndicators = false,
  value, // Accept the value prop but we don't need to use it
  ...props
}: MobileTabScrollerProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Function to scroll active tab into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeTab = scrollRef.current.querySelector('[data-state="active"]')
      if (activeTab) {
        const scrollerRect = scrollRef.current.getBoundingClientRect()
        const activeTabRect = activeTab.getBoundingClientRect()

        // Calculate the scroll position to center the active tab
        const scrollLeft =
          activeTabRect.left +
          scrollRef.current.scrollLeft -
          scrollerRect.left -
          (scrollerRect.width - activeTabRect.width) / 2

        scrollRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        })
      }
    }
  }, [value]) // Re-run when value changes

  return (
    <div
      className={cn(
        "relative",
        showScrollIndicators &&
          "before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-8 before:bg-gradient-to-r before:from-background before:to-transparent before:opacity-0 before:transition-opacity hover:before:opacity-100 after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-8 after:bg-gradient-to-l after:from-background after:to-transparent after:opacity-0 after:transition-opacity hover:after:opacity-100",
        className,
      )}
      {...props}
    >
      <div ref={scrollRef} className="overflow-x-auto scrollbar-none pb-2 -mb-2">
        {children}
      </div>
    </div>
  )
}

