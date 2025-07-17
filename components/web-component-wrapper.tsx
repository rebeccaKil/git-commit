"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface WebComponentWrapperProps {
  tagName: string
  attributes?: Record<string, any>
  fallback?: ReactNode
}

export default function WebComponentWrapper({ tagName, attributes = {}, fallback }: WebComponentWrapperProps) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Set attributes on the web component
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        element.setAttribute(key, String(value))
      }
    })
  }, [attributes])

  // Create the custom element using React.createElement
  const CustomElement = tagName as any

  return (
    <div>
      <CustomElement ref={elementRef} {...attributes} />
      {fallback && <noscript>{fallback}</noscript>}
    </div>
  )
}
