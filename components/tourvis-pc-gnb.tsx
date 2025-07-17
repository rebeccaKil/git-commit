"use client"

import { useEffect, useState } from "react"
import WebComponentWrapper from "./web-component-wrapper"

interface TourvisPcGnbProps {
  env?: "production" | "development"
}

export default function TourvisPcGnb({ env = "production" }: TourvisPcGnbProps) {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      // 화면 너비가 768px 이상이면 데스크톱으로 간주
      const isDesktopSize = window.innerWidth >= 768
      // User Agent로 모바일 기기 체크
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      setIsDesktop(isDesktopSize && !isMobileDevice)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // PC 브라우저가 아니면 렌더링하지 않음
  if (!isDesktop) {
    return null
  }

  return (
    <WebComponentWrapper
      tagName="gnb-widget"
      attributes={{ env }}
      fallback={
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-center">
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      }
    />
  )
}
