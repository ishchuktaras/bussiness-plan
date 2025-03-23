"use client"

import { cn } from "@/lib/utils"
import type React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TabItem {
  value: string
  label: React.ReactNode
  content: React.ReactNode
}

interface ResponsiveTabsProps extends React.ComponentProps<typeof Tabs> {
  items: TabItem[]
  tabsListClassName?: string
  tabsTriggerClassName?: string
  tabsContentClassName?: string
  scrollable?: boolean
}

export function ResponsiveTabs({
  items,
  tabsListClassName,
  tabsTriggerClassName,
  tabsContentClassName,
  scrollable = true,
  className,
  ...props
}: ResponsiveTabsProps) {
  return (
    <Tabs className={className} {...props}>
      <div className={cn(scrollable && "tab-scroll-container")}>
        <TabsList className={cn("flex w-full", tabsListClassName)}>
          {items.map((item) => (
            <TabsTrigger
              key={item.value}
              value={item.value}
              className={cn("flex-1 min-w-[100px] whitespace-nowrap", tabsTriggerClassName)}
            >
              {item.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value} className={tabsContentClassName}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

