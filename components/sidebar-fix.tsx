// This is a utility component to fix the collapsible attribute issue
// Import this in any file that's using the collapsible attribute

export function fixCollapsibleAttribute(value: boolean | string): string {
  if (typeof value === "boolean") {
    return value.toString()
  }
  return value
}

// Usage example:
// Instead of: <div collapsible={isCollapsible}>
// Use: <div collapsible={fixCollapsibleAttribute(isCollapsible)}>

