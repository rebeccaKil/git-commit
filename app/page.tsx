"use client"
import { Badge } from "@/components/ui/badge"
import { TorusIcon as Torii } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, Users, Mountain, Cherry, Plane, Wifi, Coffee, Shield } from "lucide-react"

export default function JapanTravelLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50 max-w-[750px] mx-auto">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-red-100 sticky top-0 z-50">
        <div className="container px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Torii className="h-8 w-8 text-red-600" />
              <span className="text-lg font-bold text-gray-900">일본여행</span>
            </div>
            <nav className="flex items-center space-x-6">
              <Link href="#cities" className="text-gray-700 hover:text-red-600 transition-colors text-sm">
                추천 도시
              </Link>
              <Link href="#offers" className="text-gray-700 hover:text-red-600 transition-colors text-sm">
                특별 혜택
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 z-10" />
        <Image src="/images/japan-landscape-hero.png" alt="일본 소도시 풍경" fill className="object-cover" priority />
        <div className="relative z-20 text-center text-white max-w-4xl px-4">
          <Badge className="mb-4 bg-red-600/90 text-white border-0 text-xs px-4 py-2 shadow-lg">
            ✨ 좀 더 특별한 여행
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
            일본 소도시 여행
            <br />
            <span className="text-red-300">특가 프로모션</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 drop-shadow-md">
            숨겨진 보석 같은 일본의 소도시에서 특별한 추억을 만들어보세요
          </p>
          <div className="flex justify-center">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cities Section */}
      <section id="cities" className="py-12 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">추천 소도시 여행지</h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              각각의 독특한 매력을 가진 일본의 아름다운 소도시들을 만나보세요
            </p>
          </div>

          {[
            {
              name: "다카야마",
              description: "일본 알프스의 아름다운 산간 마을",
              image: "/placeholder.svg?height=300&width=400",
              highlights: ["산마치스지 거리", "다카야마 진야", "온천 체험"],
              price: "349,000원",
              flight: {
                route: "인천 ICN ✈ 다카야마 TAK",
                period: "탑승 기간: 25년 6월 1일 ~ 7월 24일",
                price: "89,900원 부터",
                note: "*성인 1인 총액 요금 (왕복)",
                outbound: { departure: "08:45", arrival: "10:30", duration: "1시간 45분 소요" },
                inbound: { departure: "11:30", arrival: "13:05", duration: "1시간 45분 소요" },
              },
              products: [
                {
                  type: "hotel",
                  image: "/placeholder.svg?height=200&width=300",
                  stars: 4,
                  title: "다카야마 그린 호텔",
                  originalPrice: 180000,
                  discountedPrice: 172800,
                  discount: 4,
                },
                {
                  type: "tour",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "문화체험",
                  title: "다카야마 전통마을 투어",
                  originalPrice: 85000,
                  discountedPrice: 80750,
                  discount: 5,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.04.15",
                  nights: "2박3일",
                  title: "다카야마 온천 힐링 패키지",
                  originalPrice: 450000,
                  discountedPrice: 441000,
                  discount: 2,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.04.20",
                  nights: "3박4일",
                  title: "일본 알프스 완전정복",
                  originalPrice: 680000,
                  discountedPrice: 666400,
                  discount: 2,
                },
              ],
            },
            {
              name: "이시가키",
              description: "오키나와의 열대 낙원",
              image: "/placeholder.svg?height=300&width=400",
              highlights: ["카비라만", "스노클링", "망고 체험"],
              price: "429,000원",
              flight: {
                route: "인천 ICN ✈ 이시가키 ISG",
                period: "탑승 기간: 25년 6월 1일 ~ 7월 24일",
                price: "79,900원 부터",
                note: "*성인 1인 총액 요금 (왕복)",
                outbound: { departure: "08:45", arrival: "10:30", duration: "1시간 45분 소요" },
                inbound: { departure: "11:30", arrival: "13:05", duration: "1시간 45분 소요" },
              },
              products: [
                {
                  type: "hotel",
                  image: "/placeholder.svg?height=200&width=300",
                  stars: 5,
                  title: "이시가키 리조트 호텔",
                  originalPrice: 320000,
                  discountedPrice: 307200,
                  discount: 4,
                },
                {
                  type: "tour",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "해양액티비티",
                  title: "카비라만 스노클링 투어",
                  originalPrice: 120000,
                  discountedPrice: 114000,
                  discount: 5,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.05.01",
                  nights: "3박4일",
                  title: "이시가키 해양 패키지",
                  originalPrice: 780000,
                  discountedPrice: 764400,
                  discount: 2,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.05.10",
                  nights: "4박5일",
                  title: "오키나와 아일랜드 호핑",
                  originalPrice: 950000,
                  discountedPrice: 931000,
                  discount: 2,
                },
              ],
            },
            {
              name: "도쿠시마",
              description: "자연과 전통이 어우러진 시코쿠의 보석",
              image: "/placeholder.svg?height=300&width=400",
              highlights: ["나루토 소용돌이", "아와오도리", "이야계곡"],
              price: "289,000원",
              flight: {
                route: "인천 ICN ✈ 도쿠시마 TKS",
                period: "탑승 기간: 25년 6월 1일 ~ 7월 24일",
                price: "69,900원 부터",
                note: "*성인 1인 총액 요금 (왕복)",
                outbound: { departure: "08:45", arrival: "10:30", duration: "1시간 45분 소요" },
                inbound: { departure: "11:30", arrival: "13:05", duration: "1시간 45분 소요" },
              },
              products: [
                {
                  type: "hotel",
                  image: "/placeholder.svg?height=200&width=300",
                  stars: 3,
                  title: "도쿠시마 시티 호텔",
                  originalPrice: 140000,
                  discountedPrice: 134400,
                  discount: 4,
                },
                {
                  type: "tour",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "자연관광",
                  title: "나루토 소용돌이 크루즈",
                  originalPrice: 65000,
                  discountedPrice: 61750,
                  discount: 5,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.04.25",
                  nights: "2박3일",
                  title: "도쿠시마 자연 탐방",
                  originalPrice: 380000,
                  discountedPrice: 372400,
                  discount: 2,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.05.05",
                  nights: "3박4일",
                  title: "시코쿠 순례길 여행",
                  originalPrice: 520000,
                  discountedPrice: 509600,
                  discount: 2,
                },
              ],
            },
            {
              name: "다카마쓰",
              description: "우동과 예술의 도시",
              image: "/placeholder.svg?height=300&width=400",
              highlights: ["리쓰린공원", "사누키우동", "나오시마"],
              price: "319,000원",
              flight: {
                route: "인천 ICN ✈ 다카마쓰 TAK",
                period: "탑승 기간: 25년 6월 1일 ~ 7월 24일",
                price: "74,900원 부터",
                note: "*성인 1인 총액 요금 (왕복)",
                outbound: { departure: "08:45", arrival: "10:30", duration: "1시간 45분 소요" },
                inbound: { departure: "11:30", arrival: "13:05", duration: "1시간 45분 소요" },
              },
              products: [
                {
                  type: "hotel",
                  image: "/placeholder.svg?height=200&width=300",
                  stars: 4,
                  title: "다카마쓰 로얄 호텔",
                  originalPrice: 200000,
                  discountedPrice: 192000,
                  discount: 4,
                },
                {
                  type: "tour",
                  image: "/placeholder.svg?height=200&width=300",
                  category: "미식투어",
                  title: "사누키 우동 맛집 투어",
                  originalPrice: 75000,
                  discountedPrice: 71250,
                  discount: 5,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.04.30",
                  nights: "2박3일",
                  title: "다카마쓰 예술섬 투어",
                  originalPrice: 420000,
                  discountedPrice: 411600,
                  discount: 2,
                },
                {
                  type: "package",
                  image: "/placeholder.svg?height=200&width=300",
                  departure: "2024.05.15",
                  nights: "3박4일",
                  title: "세토내해 아트 여행",
                  originalPrice: 580000,
                  discountedPrice: 568400,
                  discount: 2,
                },
              ],
            },
          ].map((city, cityIndex) => (
            <div key={cityIndex} className="mb-12">
              {/* City Card - 먼저 표시 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden lg:col-span-4">
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-48 md:h-auto md:w-1/3 overflow-hidden">
                      <Image
                        src={city.image || "/placeholder.svg"}
                        alt={city.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-600 text-white">{city.price}부터</Badge>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <CardHeader className="p-0 mb-4">
                        <CardTitle className="flex items-center gap-2 text-xl">
                          <MapPin className="h-5 w-5 text-red-600" />
                          {city.name}
                        </CardTitle>
                        <CardDescription className="text-base">{city.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ul className="flex flex-wrap gap-4">
                          {city.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <Cherry className="h-4 w-4 text-pink-500 mr-2" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Flight Card - 두 번째로 표시 */}
              <div className="mb-8">
                <Card className="border-2 border-pink-200 bg-gradient-to-r from-pink-500 to-red-500 text-white overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Plane className="h-5 w-5" />
                      <span className="font-semibold">{city.flight.route}</span>
                    </div>
                    <p className="text-sm mb-4">{city.flight.period}</p>
                    <div className="text-right mb-4">
                      <div className="text-2xl font-bold">{city.flight.price}</div>
                      <div className="text-xs opacity-90">{city.flight.note}</div>
                    </div>
                    <Button className="w-full bg-black hover:bg-gray-800 text-white mb-4">특가 항공권 예약하기</Button>

                    {/* Flight Schedule */}
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="font-semibold mb-3">항공 스케줄</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium mb-1">출발편</div>
                          <div className="flex items-center gap-2 mb-1">
                            <span>ICN</span>
                            <Plane className="h-3 w-3" />
                            <span>TAK</span>
                          </div>
                          <div>
                            {city.flight.outbound.departure} → {city.flight.outbound.arrival}
                          </div>
                          <div className="text-xs opacity-90">{city.flight.outbound.duration}</div>
                        </div>
                        <div>
                          <div className="font-medium mb-1">오는편</div>
                          <div className="flex items-center gap-2 mb-1">
                            <span>TAK</span>
                            <Plane className="h-3 w-3" />
                            <span>ICN</span>
                          </div>
                          <div>
                            {city.flight.inbound.departure} → {city.flight.inbound.arrival}
                          </div>
                          <div className="text-xs opacity-90">{city.flight.inbound.duration}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Products Grid - 마지막에 표시 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {city.products.map((product, productIndex) => (
                  <Card
                    key={productIndex}
                    className="group hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2">
                        <Badge
                          className={`text-xs ${
                            product.type === "hotel"
                              ? "bg-blue-600"
                              : product.type === "tour"
                                ? "bg-green-600"
                                : "bg-purple-600"
                          } text-white`}
                        >
                          {product.type === "hotel" ? "호텔" : product.type === "tour" ? "투어" : "패키지"}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      {/* Hotel specific info */}
                      {product.type === "hotel" && (
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < product.stars ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Tour specific info */}
                      {product.type === "tour" && (
                        <Badge variant="outline" className="mb-2 text-xs">
                          {product.category}
                        </Badge>
                      )}

                      {/* Package specific info */}
                      {product.type === "package" && (
                        <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
                          <span>{product.departure}</span>
                          <span>•</span>
                          <span>{product.nights}</span>
                        </div>
                      )}

                      <h4 className="font-semibold text-sm mb-3 line-clamp-2">{product.title}</h4>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 line-through">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                          <Badge className="bg-red-100 text-red-600 text-xs">{product.discount}% 할인</Badge>
                        </div>
                        <div className="text-base font-bold text-red-600">
                          {product.discountedPrice.toLocaleString()}원
                        </div>
                      </div>

                      <Button
                        className="w-full mt-3 bg-red-600 hover:bg-red-700 text-xs h-8"
                        onClick={() => {
                          // 상품별 상세 페이지로 이동
                          console.log(`${city.name} - ${product.title} 상세보기`)
                        }}
                      >
                        상세보기
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Services Section */}
      <section className="py-8 bg-gray-50">
        <div className="container px-4">
          <div className="space-y-4">
            {/* 유심/와이파이 */}
            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm mb-2">전세계 이심/유심/와이파이</p>
                  <h3 className="text-xl font-bold mb-1">해외여행 필수 준비물</h3>
                  <h3 className="text-xl font-bold">데이터 로밍 하셨나요?</h3>
                </div>
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Wifi className="h-12 w-12" />
                </div>
              </CardContent>
            </Card>

            {/* 라운지 */}
            <Card className="bg-gradient-to-r from-blue-800 to-blue-600 text-white overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm mb-2">전 세계 1,300여개 라운지 제휴!</p>
                  <h3 className="text-xl font-bold mb-1">여행의 시작과 끝을 편하게</h3>
                  <h3 className="text-xl font-bold">전 세계 공항 라운지 특가</h3>
                </div>
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <Coffee className="h-12 w-12" />
                </div>
              </CardContent>
            </Card>

            {/* 여행자보험 */}
            <Card className="bg-gradient-to-r from-cyan-200 to-blue-200 text-gray-800 overflow-hidden">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm mb-2">꼼꼼한 여행이 얼마 남지 않았어요</p>
                  <h3 className="text-xl font-bold mb-2">24시간 안전한 여행자보험</h3>
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white">바로가입 →</Button>
                </div>
                <div className="w-24 h-24 bg-orange-400 rounded-full flex items-center justify-center">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section id="offers" className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">특별 혜택 안내</h2>
            <p className="text-base text-red-100 max-w-2xl mx-auto">
              지금 예약하시면 다양한 특별 혜택을 받으실 수 있습니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Calendar className="h-12 w-12" />,
                title: "다이렉트 요금",
                description: "중간 수수료 없는 직접 예약",
                benefit: "평균 5.5% 저렴",
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: "제휴카드 즉시 할인",
                description: "제휴 카드 결제 시 즉시 할인",
                benefit: "최대 4만원",
              },
              {
                icon: <Mountain className="h-12 w-12" />,
                title: "포인트 증정",
                description: "예약 완료 시 포인트 적립",
                benefit: "최대 3,000포인트",
              },
            ].map((offer, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 text-red-200">{offer.icon}</div>
                  <CardTitle className="text-lg">{offer.title}</CardTitle>
                  <CardDescription className="text-red-100 text-sm">{offer.description}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge className="bg-yellow-500 text-yellow-900 text-base px-4 py-2">{offer.benefit}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
