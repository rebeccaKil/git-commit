"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import TourvisModal from "./tourvis-modal";
import useKakaoShare from "@/hooks/usekakoShare";

interface TourvisContTopProps {
  title: string;
  env?: "production" | "development";
}

const IconKakao = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="18" fill="#FBE64D" />
      <path
        d="M18 10.5625C13.3055 10.5625 9.5 13.4076 9.5 16.9172C9.5 19.1863 11.091 21.1772 13.4842 22.3015C13.354 22.7273 12.6475 25.0405 12.6194 25.2223C12.6194 25.2223 12.6025 25.3588 12.6958 25.4109C12.789 25.463 12.8987 25.4225 12.8987 25.4225C13.1661 25.3871 15.9998 23.4998 16.4903 23.172C16.9802 23.2378 17.4848 23.272 18 23.272C22.6945 23.272 26.5 20.4269 26.5 16.9172C26.5 13.4076 22.6945 10.5625 18 10.5625Z"
        fill="#341F20"
      />
    </svg>
  );
};

const IconFacebook = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill="#4267B2" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.0904 13.1667C21.636 13.0758 21.0222 13.0079 20.6362 13.0079C19.591 13.0079 19.5231 13.4623 19.5231 14.1894V15.4838H22.1359L21.9081 18.1649H19.5231V26.3202H16.2517V18.1649H14.5703V15.4838H16.2517V13.8253C16.2517 11.5537 17.3194 10.2812 20 10.2812C20.9313 10.2812 21.613 10.4176 22.4989 10.5994L22.0904 13.1667Z"
        fill="white"
      />
    </svg>
  );
};

const IconCopy = () => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="18" cy="18" r="18" fill="#555555" />
      <path
        d="M15.859 22.691L15.049 23.496C14.7097 23.83 14.2526 24.0172 13.7765 24.0172C13.3004 24.0172 12.8433 23.83 12.504 23.496C12.3386 23.3322 12.2072 23.1372 12.1176 22.9223C12.028 22.7074 11.9818 22.4769 11.9818 22.244C11.9818 22.0112 12.028 21.7807 12.1176 21.5658C12.2072 21.3509 12.3386 21.1559 12.504 20.992L15.484 18.037C16.101 17.424 17.263 16.522 18.11 17.362C18.2012 17.4592 18.311 17.5371 18.4328 17.5909C18.5547 17.6447 18.6862 17.6734 18.8195 17.6753C18.9527 17.6772 19.0849 17.6523 19.2083 17.6019C19.3317 17.5516 19.4437 17.4769 19.5375 17.3824C19.6314 17.2878 19.7053 17.1753 19.7548 17.0516C19.8042 16.9279 19.8282 16.7954 19.8254 16.6622C19.8225 16.529 19.7929 16.3977 19.7382 16.2762C19.6835 16.1547 19.6049 16.0455 19.507 15.955C18.069 14.527 15.941 14.791 14.088 16.63L11.108 19.586C10.7559 19.9332 10.4766 20.347 10.2863 20.8034C10.0961 21.2598 9.99873 21.7496 10 22.244C9.99878 22.7385 10.0961 23.2282 10.2864 23.6846C10.4766 24.141 10.7559 24.5549 11.108 24.902C11.8177 25.606 12.7774 26.0001 13.777 25.998C14.744 25.998 15.711 25.633 16.446 24.902L17.257 24.097C17.3495 24.0056 17.423 23.8967 17.4733 23.7768C17.5237 23.6568 17.5498 23.5281 17.5503 23.3981C17.5507 23.268 17.5255 23.1391 17.476 23.0188C17.4266 22.8985 17.3538 22.7892 17.262 22.697C17.0764 22.5109 16.8246 22.4058 16.5617 22.4047C16.2989 22.4035 16.0462 22.5065 15.859 22.691ZM24.891 11.207C23.344 9.67303 21.182 9.59003 19.752 11.01L18.743 12.012C18.5566 12.1971 18.4513 12.4488 18.4504 12.7115C18.4494 12.9742 18.5529 13.2266 18.738 13.413C18.9231 13.5995 19.1747 13.7047 19.4375 13.7057C19.7002 13.7066 19.9526 13.6031 20.139 13.418L21.149 12.417C21.889 11.681 22.86 11.986 23.495 12.614C23.831 12.949 24.017 13.393 24.017 13.866C24.017 14.339 23.831 14.783 23.495 15.117L20.315 18.271C18.861 19.712 18.179 19.037 17.888 18.748C17.7957 18.6564 17.6862 18.5838 17.5659 18.5344C17.4455 18.4851 17.3166 18.4599 17.1865 18.4604C17.0564 18.4608 16.9277 18.4869 16.8076 18.5371C16.6876 18.5873 16.5787 18.6607 16.487 18.753C16.3953 18.8453 16.3228 18.9548 16.2734 19.0752C16.2241 19.1956 16.1989 19.3245 16.1994 19.4546C16.1998 19.5847 16.2259 19.7134 16.2761 19.8334C16.3263 19.9534 16.3997 20.0624 16.492 20.154C17.16 20.816 17.922 21.144 18.72 21.144C19.697 21.144 20.73 20.652 21.713 19.677L24.893 16.524C25.2444 16.1764 25.5231 15.7624 25.7132 15.3061C25.9032 14.8498 26.0007 14.3603 26 13.866C26.0009 13.3714 25.9033 12.8815 25.7129 12.425C25.5225 11.9685 25.2431 11.5544 24.891 11.207Z"
        fill="white"
      />
    </svg>
  );
};

export default function TourvisContTop({
  title,
  env = "production",
}: TourvisContTopProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { onShareKakao } = useKakaoShare();

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

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      location.href
    )}`;

    window.open(url, "_blank");
  };

  const handleClickCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었습니다.");
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-between gap-[16px] h-[54px] px-[20px] bg-white border-b border-solid border-[#ebebeb]",
        isMobile && "sticky top-0 z-[100] ",
        !isMobile && "max-w-[800px] mx-auto border-x"
      )}
    >
      {isMobile && (
        <button
          className="w-[24px] h-[24px] bg-[url(https://cdns.tourvis.com/common/dist/images/svg/ico-back.svg)] bg-center bg-no-repeat"
          onClick={() => history.back()}
        >
          <span className="absolute w-0 h-0 text-0 hidden">뒤로가기</span>
        </button>
      )}
      <h2
        className={clsx(
          "leading-normal text-[18px] font-[500] grow",
          !isMobile && "text-center"
        )}
      >
        기획전
      </h2>
      {isMobile && (
        <button
          className="w-[24px] h-[24px] bg-[url(https://cdns.tourvis.com/common/dist/images/svg/ico-share.svg)] bg-center bg-no-repeat"
          onClick={() => setIsOpen(true)}
        >
          <span className="absolute w-0 h-0 text-0 hidden">공유</span>
        </button>
      )}
      <TourvisModal
        type={"app"}
        title={"공유"}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ul>
          <li>
            <button
              className="flex items-center justify-between w-full text-[16px] font-medium"
              onClick={() => {
                onShareKakao({ title: title, description: "" });
              }}
            >
              <span>카카오톡</span>
              <IconKakao />
            </button>
          </li>
          <li className="mt-[28px]">
            <button
              className="flex items-center justify-between w-full text-[16px] font-medium"
              onClick={handleShareFacebook}
            >
              <span>페이스북</span>
              <IconFacebook />
            </button>
          </li>
          <li className="mt-[28px]">
            <button
              className="flex items-center justify-between w-full text-[16px] font-medium"
              onClick={() => handleClickCopyClipBoard(location.href)}
            >
              <span>클립보드에 링크 복사</span>
              <IconCopy />
            </button>
          </li>
        </ul>
      </TourvisModal>
    </div>
  );
}
