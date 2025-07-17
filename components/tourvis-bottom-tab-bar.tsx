"use client"

import { useEffect, useState } from "react"
import WebComponentWrapper from "./web-component-wrapper"

interface TourvisBottomTabBarProps {
  env?: "production" | "development"
}

export default function TourvisBottomTabBar({ env = "production" }: TourvisBottomTabBarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      // 화면 너비가 768px 미만이면 모바일로 간주
      const isMobileSize = window.innerWidth < 768
      // User Agent로 모바일 기기 체크
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

      setIsMobile(isMobileSize || isMobileDevice)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // 모바일이 아니면 렌더링하지 않음
  if (!isMobile) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <WebComponentWrapper
        tagName="bottom-tab-bar-widget"
        attributes={{ env }}
        fallback={
          <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-center">
            <div className="text-sm text-gray-500">Loading...</div>
          </div>
        }
      />
    </div>
  )
}
