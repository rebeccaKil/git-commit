"use client";

import { useEffect, useState } from "react";
import WebComponentWrapper from "./web-component-wrapper";

interface PriviaHamburgerProps {
  env?: "production" | "development";
}

export default function PriviaHamburger({
  env = "production",
}: PriviaHamburgerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // 화면 너비가 768px 미만이면 모바일로 간주
      const isMobileSize = window.innerWidth < 768;
      // User Agent로 모바일 기기 체크
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      setIsMobile(isMobileSize || isMobileDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // 위젯 닫기 이벤트 핸들러 추가
  useEffect(() => {
    const gnbCloseHandler = () => {
      setIsMenuOpen(false);
    };
    window.addEventListener("gnb-close", gnbCloseHandler);
    return () => window.removeEventListener("gnb-close", gnbCloseHandler);
  }, []);

  // 모바일이 아니면 렌더링하지 않음
  if (!isMobile) {
    return null;
  }

  return (
    <div className="z-50">
      <div className="h-[50px] bg-white flex items-center justify-center">
        <div className="absolute left-[20px] top-[0px]">
          <button
            className="relative before:w-[28px] before:h-[10px] before:bg-[url('https://static.priviatravel.com/images/front/mtravel/contents/icon-common-secM.png')] before:bg-[length:160px] before:bg-[position:-45px_0] before:bg-[content:''] before:absolute before:left-[0] before:top-[6px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="absolute w-[1px] h-[1px] hidden">메뉴보기</span>
          </button>
        </div>
        <a href="https://tmw.priviatravel.com" className="w-[95px]">
          <img
            src="https://static.priviatravel.com/images/front/mtravel/contents/logo-privia-2.png"
            alt="Privia"
          />
        </a>
      </div>
      {isMenuOpen && (
        <WebComponentWrapper
          tagName="mo-global-nav-bar"
          attributes={{ env, visible: "Y", dim: "Y" }}
          fallback={
            <div className="h-16 bg-white border-t border-gray-200 flex items-center justify-center">
              <div className="text-sm text-gray-500">Loading...</div>
            </div>
          }
        />
      )}
    </div>
  );
}
