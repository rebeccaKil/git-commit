import type { Metadata } from 'next'
import './globals.css'
import Script from "next/script";
import TourvisPcGnb from "@/components/tourvis-pc-gnb";
import TourvisBottomTabBar from "@/components/tourvis-bottom-tab-bar";
import TourvisContTop from "@/components/tourvis-cont-top";
import PriviaHamburger from "@/components/privia-hamburger";
import PriviaPcGnb from "@/components/privia-pc-gnb";


export const metadata: Metadata = {
  title: '일본 소도시 여행',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_APP_BRAND === "tourvis" && (
          <>
            <Script
              src={`https://${
                process.env.NEXT_PUBLIC_APP_ENV === "development" ? "t" : ""
              }account.tourvis.com/api/v1/lgn/sc`}
              strategy="afterInteractive"
            />
            <Script
              id="tourvis-script"
              src={`https://${
                process.env.NEXT_PUBLIC_APP_ENV === "development"
                  ? "d1ad4gpy4661in"
                  : "d2um1hurm6o2hd"
              }.cloudfront.net/tourvis-static/activity/scripts/tourvis_script.js`}
              strategy={"afterInteractive"}
            />
            <Script
              src={`https://${
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "d2um1hurm6o2hd"
                  : "d1ad4gpy4661in"
              }.cloudfront.net/tourvis-static/common/common-widget.js?20250710`}
              strategy="afterInteractive"
            />
            <TourvisPcGnb
              env={
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "production"
                  : "development"
              }
            />
            <TourvisContTop
              title={
                typeof metadata.title === "string"
                  ? metadata.title
                  : String(metadata.title) ?? ""
              }
              env={
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "production"
                  : "development"
              }
            />
          </>
        )}
        {process.env.NEXT_PUBLIC_APP_BRAND === "privia" && (
          <>
            <Script
              src={`https://${
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "auth"
                  : "tauth"
              }.priviatravel.com/check`}
              strategy={"afterInteractive"}
            />
            <Script
              src={`https://${
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "www"
                  : "twww"
              }.priviatravel.com/common/sso/sc`}
              strategy={"afterInteractive"}
            />
            <Script id="sc1" type="text/javascript">
              {`
              var getCookie = function (name) {
                var dc = document.cookie;
                var prefix = name + "=";
                var begin = dc.indexOf("; " + prefix);

                if (begin == -1) {
                    begin = dc.indexOf(prefix);
                    if (begin != 0) { return null;}
                } else {
                    begin += 2;
                }

                var end = document.cookie.indexOf(";", begin);

                if (end == -1) {
                    end = dc.length;
                }

                return unescape(dc.substring(begin + prefix.length, end));
              }

              var gtmMemberId = getCookie("memberId");
              var gtmMemberNo = getCookie("gaUniqDemension1");
              var filter = "win16|win32|win64|mac|macintel";
              var agent = navigator.userAgent.toLowerCase();
              var platform = navigator.platform.toLowerCase();
              var appName = '';
              var device = "";

              if (agent.indexOf('privia_travel_android_app_ver') > -1) {
                appName = 'mobileApp';
                device = "moApp";
              } else if (agent.indexOf('privia_travel_ios_app_ver') > -1) {
                appName = 'mobileApp';
                device = "moApp";
              } else if (agent.indexOf('android') > -1) {
                appName = 'mobileWeb';
                device = "moWeb";
              } else if (agent.indexOf('iphone') > -1 || agent.indexOf('ipad') > -1 || agent.indexOf('ipod') > -1) {
                appName = 'mobileWeb';
                device = "moWeb";
              } else if (agent.indexOf('mobile') > -1) {
                appName = 'mobileWeb';
                device = "moWeb";
              } else {
                appName = 'desktop';
                device = "pcWeb";
              }

              window.dataLayer = window.dataLayer || [];
              dataLayer = [{
                'userID' : gtmMemberId != null ? gtmMemberId : "",
                'appName' : appName,
                'dimension1' : gtmMemberNo != null ? atob(gtmMemberNo) : "",
                'dimension10' : 'tna',
                'dimension11' : device
              }];
              `}
            </Script>
            <Script id="sc2" type="text/javascript">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WQKP64D');`}
            </Script>
            <Script id="sc3" type="text/javascript">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5HT7Z7K');`}
            </Script>
            <Script id="sc4" type="text/javascript">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M72MGBC');`}
            </Script>
            <Script id="sc5" type="text/javascript">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-WJ3CZHH');`}
            </Script>
            <Script
              src={`https://${
                process.env.NEXT_PUBLIC_APP_ENV === "production" ? "" : "t"
              }www.priviatravel.com/widget/common-wc-widget.bundle.js`}
              strategy="afterInteractive"
            />
            <PriviaPcGnb
              env={
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "production"
                  : "development"
              }
            />
            <PriviaHamburger
              env={
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "production"
                  : "development"
              }
            />
          </>
        )}
        {children}
        {process.env.NEXT_PUBLIC_APP_BRAND === "tourvis" && (
          <>
            <TourvisBottomTabBar
              env={
                process.env.NEXT_PUBLIC_APP_ENV === "production"
                  ? "production"
                  : "development"
              }
            />
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-P8NH3S5"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
            {/* End New Google Tag Manager (noscript) */}
            {/* Old Google Tag Manager (noscript) */}
            <noscript>
              <iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-5J7Q7XV"
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
              ></iframe>
            </noscript>
          </>
        )}
        {process.env.NEXT_PUBLIC_APP_BRAND === "privia" && (
          <>
            <noscript
              id="nsc1"
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WQKP64D" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            />

            <noscript
              id="nsc2"
              dangerouslySetInnerHTML={{
                __html:
                  '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5HT7Z7K" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
              }}
            />

            <noscript
              id="nsc3"
              dangerouslySetInnerHTML={{
                __html:
                  '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M72MGBC" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
              }}
            />

            <noscript
              id="nsc4"
              dangerouslySetInnerHTML={{
                __html:
                  '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WJ3CZHH" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
              }}
            />
          </>
        )}</body>
    </html>
  )
}
//주석 테스트
