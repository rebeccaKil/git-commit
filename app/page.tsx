"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Users, Star, Plane, Camera, Mountain, Utensils } from "lucide-react"

export default function JapanTravelLanding() {
  const [selectedPackage, setSelectedPackage] = useState(null)

  const hotels = [
    {
      name: "료칸 사쿠라",
      location: "교토",
      rating: 4.8,
      price: "180,000원",
      image: "/placeholder.svg?height=200&width=300",
      features: ["온천", "전통 가이세키", "정원뷰"],
    },
    {
      name: "호텔 후지산",
      location: "가와구치코",
      rating: 4.6,
      price: "150,000원",
      image: "/placeholder.svg?height=200&width=300",
      features: ["후지산뷰", "온천", "조식포함"],
    },
    {
      name: "시티 호텔 도쿄",
      location: "신주쿠",
      rating: 4.4,
      price: "120,000원",
      image: "/placeholder.svg?height=200&width=300",
      features: ["역세권", "무료WiFi", "24시간 프런트"],
    },
  ]

  const tours = [
    {
      title: "교토 전통문화 체험",
      duration: "6시간",
      price: "85,000원",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["기모노 체험", "다도 체험", "전통 사원 투어"],
    },
    {
      title: "후지산 5합목 & 하코네",
      duration: "10시간",
      price: "120,000원",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["후지산 전망", "하코네 온천", "아시노코 유람선"],
    },
    {
      title: "오사카 미식 투어",
      duration: "4시간",
      price: "65,000원",
      image: "/placeholder.svg?height=200&width=300",
      highlights: ["도톤보리 탐방", "타코야키 체험", "현지 맛집"],
    },
  ]

  const packages = [
    {
      id: 1,
      title: "교토 & 오사카 3박4일",
      price: "899,000원",
      originalPrice: "1,200,000원",
      image: "/placeholder.svg?height=250&width=400",
      features: ["항공료 포함", "호텔 3박", "가이드 투어", "식사 6회"],
      itinerary: [
        "1일차: 인천→간사이공항, 오사카 도착",
        "2일차: 교토 전통문화 체험",
        "3일차: 나라 & 우지 투어",
        "4일차: 오사카 자유시간, 귀국",
      ],
    },
    {
      id: 2,
      title: "도쿄 & 후지산 4박5일",
      price: "1,299,000원",
      originalPrice: "1,600,000원",
      image: "/placeholder.svg?height=250&width=400",
      features: ["항공료 포함", "호텔 4박", "전용 가이드", "식사 8회"],
      itinerary: [
        "1일차: 인천→나리타공항, 도쿄 도착",
        "2일차: 도쿄 시내 관광",
        "3일차: 후지산 & 하코네",
        "4일차: 디즈니랜드",
        "5일차: 자유시간, 귀국",
      ],
    },
    {
      id: 3,
      title: "일본 완전정복 7박8일",
      price: "2,199,000원",
      originalPrice: "2,800,000원",
      image: "/placeholder.svg?height=250&width=400",
      features: ["항공료 포함", "호텔 7박", "전문 가이드", "식사 14회"],
      itinerary: [
        "1-2일차: 도쿄 관광",
        "3-4일차: 후지산 & 하코네",
        "5-6일차: 교토 & 나라",
        "7일차: 오사카 관광",
        "8일차: 귀국",
      ],
    },
  ]

  const flights = [
    {
      airline: "대한항공",
      route: "인천 → 나리타",
      departure: "09:30",
      arrival: "13:00",
      price: "450,000원",
      duration: "2시간 30분",
    },
    {
      airline: "아시아나항공",
      route: "인천 → 간사이",
      departure: "14:20",
      arrival: "17:30",
      price: "420,000원",
      duration: "2시간 10분",
    },
    {
      airline: "제주항공",
      route: "인천 → 나고야",
      departure: "11:15",
      arrival: "14:45",
      price: "280,000원",
      duration: "2시간 30분",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">일본 소도시 여행</h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            숨겨진 보석 같은 일본의 소도시에서 진정한 일본을 만나보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-3">
              여행 패키지 보기
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-3 bg-transparent"
            >
              맞춤 여행 상담
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">왜 일본 소도시 여행인가요?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mountain className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <CardTitle className="text-xl">진정한 일본 문화</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">관광지가 아닌 현지인들의 실제 생활과 전통문화를 체험할 수 있습니다.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <CardTitle className="text-xl">숨겨진 명소</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">아직 많이 알려지지 않은 아름다운 풍경과 특별한 장소들을 발견하세요.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Utensils className="w-12 h-12 mx-auto text-red-600 mb-4" />
                <CardTitle className="text-xl">현지 맛집</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">현지인만 아는 진짜 맛집에서 정통 일본 요리를 맛보실 수 있습니다.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">추천 숙소</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {hotels.map((hotel, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={hotel.image || "/placeholder.svg"} alt={hotel.name} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-red-600">★ {hotel.rating}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {hotel.name}
                    <span className="text-red-600 font-bold">{hotel.price}</span>
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {hotel.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {hotel.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full mt-4 bg-red-600 hover:bg-red-700">예약하기</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">추천 투어</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {tours.map((tour, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={tour.image || "/placeholder.svg"} alt={tour.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-orange-600">{tour.duration}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {tour.title}
                    <span className="text-orange-600 font-bold">{tour.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {tour.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <Star className="w-4 h-4 mr-2 text-yellow-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-orange-600 hover:bg-orange-700">투어 신청</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">여행 패키지</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src={pkg.image || "/placeholder.svg"} alt={pkg.title} className="w-full h-48 object-cover" />
                  <Badge className="absolute top-4 right-4 bg-green-600">특가</Badge>
                </div>
                <CardHeader>
                  <CardTitle>{pkg.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">{pkg.price}</span>
                    <span className="text-sm line-through text-gray-500">{pkg.originalPrice}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Star className="w-4 h-4 mr-2 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 mb-2"
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    패키지 상세보기
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Flights Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">항공편 정보</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {flights.map((flight, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{flight.airline}</span>
                    <Plane className="w-5 h-5 text-blue-600" />
                  </CardTitle>
                  <CardDescription>{flight.route}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>출발:</span>
                      <span className="font-semibold">{flight.departure}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>도착:</span>
                      <span className="font-semibold">{flight.arrival}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>소요시간:</span>
                      <span className="font-semibold">{flight.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>가격:</span>
                      <span className="font-bold text-blue-600">{flight.price}</span>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">항공편 예약</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Package Detail Modal */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {selectedPackage.title}
                <Button variant="ghost" size="sm" onClick={() => setSelectedPackage(null)}>
                  ✕
                </Button>
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600">{selectedPackage.price}</span>
                <span className="text-sm line-through text-gray-500">{selectedPackage.originalPrice}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={selectedPackage.image || "/placeholder.svg"}
                alt={selectedPackage.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />

              <h3 className="text-lg font-semibold mb-3">포함사항</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {selectedPackage.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm">
                    <Star className="w-4 h-4 mr-2 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-3">여행 일정</h3>
              <div className="space-y-2 mb-6">
                {selectedPackage.itinerary.map((day, idx) => (
                  <div key={idx} className="flex items-start text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500 mt-0.5" />
                    {day}
                  </div>
                ))}
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">지금 예약하기</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">지금 바로 일본 소도시 여행을 시작하세요!</h2>
          <p className="text-xl mb-8 opacity-90">특별한 할인 혜택과 함께 잊지 못할 여행의 추억을 만들어보세요</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              <Users className="w-5 h-5 mr-2" />
              단체 여행 문의
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-3 bg-transparent"
            >
              <Calendar className="w-5 h-5 mr-2" />
              여행 상담 예약
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">일본 소도시 여행</h3>
              <p className="text-gray-400 text-sm">진정한 일본을 경험할 수 있는 특별한 여행을 제공합니다.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">여행 정보</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>여행 패키지</li>
                <li>맞춤 여행</li>
                <li>단체 여행</li>
                <li>여행 가이드</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">고객 서비스</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>예약 문의</li>
                <li>여행 상담</li>
                <li>취소/환불</li>
                <li>자주 묻는 질문</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">연락처</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📞 02-1234-5678</li>
                <li>✉️ info@japantravel.co.kr</li>
                <li>🏢 서울시 강남구 테헤란로 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 일본 소도시 여행. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
