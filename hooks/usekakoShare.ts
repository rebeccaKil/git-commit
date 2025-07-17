"use client"

import { useEffect } from "react"

interface KakaoShareParams {
  title: string
  description: string
  imageUrl?: string
  link?: string
}

declare global {
  interface Window {
    Kakao: any
  }
}

const useKakaoShare = () => {
  useEffect(() => {
    // Kakao SDK 스크립트 로드
    if (!window.Kakao) {
      const script = document.createElement("script")
      script.src = "https://developers.kakao.com/sdk/js/kakao.js"
      script.async = true
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          // 실제 앱 키로 교체해야 합니다
          window.Kakao.init("YOUR_KAKAO_APP_KEY")
        }
      }
      document.head.appendChild(script)
    }
  }, [])

  const onShareKakao = ({ title, description, imageUrl, link }: KakaoShareParams) => {
    if (!window.Kakao) {
      alert("카카오톡 공유 기능을 사용할 수 없습니다.")
      return
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl || window.location.origin + "/placeholder.jpg",
          link: {
            mobileWebUrl: link || window.location.href,
            webUrl: link || window.location.href,
          },
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: link || window.location.href,
              webUrl: link || window.location.href,
            },
          },
        ],
      })
    } catch (error) {
      console.error("카카오톡 공유 실패:", error)
      alert("카카오톡 공유에 실패했습니다.")
    }
  }

  return { onShareKakao }
}

export default useKakaoShare
