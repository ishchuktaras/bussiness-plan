// This is a utility component to fix the attribute type issues with Radix UI components
// Import this in any file that's using the collapsible or type attributes

// Tato funkce převádí boolean hodnotu na string, aby byla kompatibilní s HTML atributy
export function fixCollapsibleAttribute(value: boolean | string): string {
  if (typeof value === "boolean") {
    return value.toString()
  }
  return value
}

// Tato funkce řeší problém s atributem type
export function fixTypeAttribute(value: string): string {
  return value
}

// Příklad použití:
// Místo: <Accordion type="single" collapsible={isCollapsible}>
// Použijte: <Accordion type={fixTypeAttribute("single")} collapsible={fixCollapsibleAttribute(isCollapsible)}>

// Usage example:
// Instead of: <Accordion type="single" collapsible={isCollapsible}>
// Use: <Accordion type={fixTypeAttribute("single")} collapsible={fixCollapsibleAttribute(isCollapsible)}>

