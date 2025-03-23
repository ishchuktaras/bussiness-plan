"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"

interface MobileTabScrollerProps {
  children: React.ReactNode
  showScrollIndicators?: boolean
  value?: string
}

export const MobileTabScroller: React.FC<MobileTabScrollerProps> = ({
  children,
  showScrollIndicators = true,
  value,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)

  const updateScrollIndicators = () => {
    if (!containerRef.current) return

    const container = containerRef.current
    setShowLeft(container.scrollLeft > 0)
    setShowRight(
      container.scrollWidth > container.clientWidth &&
        container.scrollLeft + container.clientWidth < container.scrollWidth,
    )
  }

  useEffect(() => {
    updateScrollIndicators()

    const handleScroll = () => {
      updateScrollIndicators()
    }

    const container = containerRef.current
    container?.addEventListener("scroll", handleScroll)

    return () => {
      container?.removeEventListener("scroll", handleScroll)
    }
  }, [value])

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -100, behavior: "smooth" })
  }

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 100, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div ref={containerRef} className="flex overflow-x-auto scroll-smooth scrollbar-hide">
        {children}
      </div>

      {showScrollIndicators && (
        <>
          {showLeft && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-700 rounded-full p-2"
            >
              &lt;
            </button>
          )}

          {showRight && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 text-gray-700 rounded-full p-2"
            >
              &gt;
            </button>
          )}
        </>
      )}
    </div>
  )
}

