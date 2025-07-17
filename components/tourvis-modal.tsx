"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type modalType = "base" | "app";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: modalType;
  title?: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  type = "base",
  title,
  children,
}: ModalProps) {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const isMobileSize = window.innerWidth < 768;
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

  useEffect(() => {
    let openTimer: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      openTimer = setTimeout(() => {
        setVisible(true);
      }, 10);

      document.body.style.overflow = "hidden";
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      window.addEventListener("keydown", handleKeyDown);
    } else {
      setVisible(false);
    }

    return () => {
      clearTimeout(openTimer);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={clsx(
        "fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className="absolute inset-0"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className={clsx(
          "z-10 w-full max-w-lg bg-white transition-all duration-300 shadow-xl",
          visible ? "opacity-100" : "opacity-0",
          type === "app" && isMobile
            ? [
                "fixed bottom-0 rounded-t-2xl translate-y-0",
                visible ? "translate-y-0" : "translate-y-full",
                "transform",
              ]
            : [
                "fixed top-1/2 left-1/2 rounded-2xl",
                "transform -translate-x-1/2",
                visible ? "-translate-y-1/2" : "-translate-y-1/2 opacity-0",
              ]
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex justify-between px-[20px] py-[27px]">
          <div className="flex-1">
            {title && <h2 className="text-[18px] font-semibold">{title}</h2>}
          </div>
          <button
            onClick={handleClose}
            className="w-[24px] h-[24px] bg-[url(https://cdns.tourvis.com/common/dist/images/svg/ico-close.svg)] bg-center bg-no-repeat"
            aria-label="모달 닫기"
          ></button>
        </div>
        <div className="px-[20px] pb-[40px]">{children}</div>
      </div>
    </div>,
    document.body
  );
}
