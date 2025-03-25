"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/ui/icons"

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      title: "Analýza smlouvy",
      href: "/#franchise-agreement-analysis",
      // icon: <FileText className="h-4 w-4 mr-1" />,
    },

    {
      title: "Analýza konkurence",
      href: "/#competition-analysis",
      // icon: <TrendingUp className="h-4 w-4 mr-1" />,
    },
    {
      title: "Obchodní model",
      href: "/#business-plan",
      // icon: <BarChart3 className="h-4 w-4 mr-1" />,
    },

    {
      title: "Kontrolní seznam",
      href: "/#inspection-checklist",
      // icon: <ClipboardCheck className="h-4 w-4 mr-1" />,
    },
    {
      title: "Provozní standardy",
      href: "/#operational-standards",
      // icon: <ShoppingBag className="h-4 w-4 mr-1" />,
    },
    {
      title: "Harmonogram Projektu",
      href: "/#project-timeline",
      // icon: <ShoppingBag className="h-4 w-4 mr-1" />,
    },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b shadow-sm"
          : "bg-background"
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-purple-400 to-purple-800 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ž</span>
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-600 dark:from-green-400 dark:to-emerald-400">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                  pathname === item.href ||
                    (pathname === "/" && item.href === "/")
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                )}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container px-4 py-3">
            <nav className="grid gap-2">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center",
                    pathname === item.href ||
                      (pathname === "/" && item.href === "/")
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
