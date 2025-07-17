"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface WebComponentWrapperProps {
  tagName: string
  attributes?: Record<string, string>
  children?: React.ReactNode
  className?: string
}

export default function WebComponentWrapper({
  tagName,
  attributes = {},
  children,
  className,
}: WebComponentWrapperProps) {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // 속성 설정
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
  }, [attributes])

  const CustomElement = tagName as any

  return (
    <CustomElement ref={elementRef} className={className}>
      {children}
    </CustomElement>
  )
}
