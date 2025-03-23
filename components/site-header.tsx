"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { BarChart3, ClipboardCheck, FileText, Home, Menu, ShoppingBag, TrendingUp, X } from "lucide-react"

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
      title: "Domů",
      href: "/",
      icon: <Home className="h-4 w-4 mr-1" />,
    },
    {
      title: "Obchodní model",
      href: "/#business-plan",
      icon: <BarChart3 className="h-4 w-4 mr-1" />,
    },
    {
      title: "Analýza konkurence",
      href: "/#competition-analysis",
      icon: <TrendingUp className="h-4 w-4 mr-1" />,
    },
    {
      title: "Kontrolní seznam",
      href: "/#inspection-checklist",
      icon: <ClipboardCheck className="h-4 w-4 mr-1" />,
    },
    {
      title: "Provozní standardy",
      href: "/#operational-standards",
      icon: <ShoppingBag className="h-4 w-4 mr-1" />,
    },
    {
      title: "Analýza smlouvy",
      href: "/#franchise-agreement-analysis",
      icon: <FileText className="h-4 w-4 mr-1" />,
    },
  ]

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-background/95 backdrop-blur-md border-b shadow-sm" : "bg-background",
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ž</span>
            </div>
            <span className="font-heading font-bold text-lg sm:text-xl bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
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
                  pathname === item.href || (pathname === "/" && item.href === "/")
                    ? "text-foreground bg-accent"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-1">
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer" className="hidden sm:inline-flex">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href={siteConfig.links.developer} target="_blank" rel="noreferrer" className="hidden sm:inline-flex">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Icons.user className="h-5 w-5" />
                <span className="sr-only">Vývojář</span>
              </Button>
            </Link>
            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
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
                    pathname === item.href || (pathname === "/" && item.href === "/")
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  <Icons.gitHub className="h-4 w-4 mr-2" />
                  GitHub
                </Link>
                <Link
                  href={siteConfig.links.developer}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50"
                >
                  <Icons.user className="h-4 w-4 mr-2" />
                  Vývojář
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

