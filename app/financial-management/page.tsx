"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertTriangle,
  Clock,
  CheckCircle,
  TrendingUp,
  XCircle,
  BarChart3,
  Eye,
  Home,
  ChevronRight,
  ChevronDown,
  User,
  FileText,
  Users,
  Settings,
  X,
} from "lucide-react"
import Link from "next/link"

export default function FinancialManagementModule() {
  const [activeTab, setActiveTab] = useState("priority")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedReview, setSelectedReview] = useState<any>(null)

  const stats = [
    { label: "긴급 검토", value: "1", color: "border-l-red-500", icon: AlertTriangle, iconColor: "text-red-500" },
    { label: "검토 대기", value: "12", color: "border-l-orange-500", icon: Clock, iconColor: "text-orange-500" },
    { label: "오늘 처리", value: "8", color: "border-l-green-500", icon: CheckCircle, iconColor: "text-green-500" },
    { label: "총 승인", value: "45", color: "border-l-blue-500", icon: TrendingUp, iconColor: "text-blue-500" },
    { label: "반려", value: "3", color: "border-l-gray-500", icon: XCircle, iconColor: "text-gray-500" },
    {
      label: "평균 처리시간",
      value: "12분",
      color: "border-l-purple-500",
      icon: BarChart3,
      iconColor: "text-purple-500",
    },
  ]

  const pendingReviews = [
    {
      id: "JE-2024-001",
      type: "긴급",
      typeColor: "bg-red-100 text-red-800",
      description: "매입비용 급액 대비 300% 증가",
      account: "4110 - 매입비용",
      amount: "15,000,000원",
      submitter: "김실무",
      time: "2024-01-15 09:30",
      aiConfidence: 94,
      riskLevel: 25,
    },
    {
      id: "JE-2024-002",
      type: "보통",
      typeColor: "bg-orange-100 text-orange-800",
      description: "계정과목 패턴 이상 - 통상적이지 않은 계정 조합",
      account: "6210 - 컨설팅",
      amount: "800,000원",
      submitter: "이직원",
      time: "2024-01-15 10:15",
      aiConfidence: 78,
      riskLevel: 65,
    },
    {
      id: "JE-2024-003",
      type: "낮음",
      typeColor: "bg-green-100 text-green-800",
      description: "월말 집중 전표 처리 패턴",
      account: "5110 - 급여",
      amount: "25,000,000원",
      submitter: "박직원",
      time: "2024-01-15 11:00",
      aiConfidence: 92,
      riskLevel: 8,
    },
  ]

  const handleDetailedReview = (review: any) => {
    setSelectedReview(review)
    setIsDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Home className="h-4 w-4" />
                <span>대시보드</span>
              </Button>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">재무회계 담당자</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              재무회계 담당자
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <User className="h-4 w-4" />
                  <span>역할 전환</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/journal-entry" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>전표처리 실무자</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/financial-management" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>재무회계 담당자</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/accounting-supervisor" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>회계 책임자</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전표 검토 및 승인 관리</h1>
          <p className="text-gray-600">AI 이상징후 탐지 결과를 검토하고 전표 승인을 관리하세요</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className={`${stat.color} border-l-4`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className={`h-4 w-4 ${stat.iconColor}`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="flex gap-4 sm:gap-8 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("priority")}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
              activeTab === "priority"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="h-4 w-4" />
            우선순위 검토
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
              activeTab === "team"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <Users className="h-4 w-4" />팀 성과 현황
          </button>
          <button
            onClick={() => setActiveTab("reports")}
            className={`flex items-center gap-2 pb-2 border-b-2 transition-colors ${
              activeTab === "reports"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            분석 리포트
          </button>
        </div>

        {activeTab === "priority" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <CardTitle>AI 이상징후 검토 대기열</CardTitle>
                <Badge variant="secondary">3건 대기</Badge>
              </div>
              <CardDescription>우선순위별로 정렬된 검토 대상 전표를 확인하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingReviews.map((review) => (
                <Card key={review.id} className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-semibold text-gray-900">{review.id}</div>
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-green-600">AI {review.aiConfidence}%</span>
                        </div>
                        <Badge className={review.typeColor}>{review.type}</Badge>
                        <span className="text-sm text-gray-600">위험도 {review.riskLevel}%</span>
                      </div>
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDetailedReview(review)}
                          className="flex-1 sm:flex-none"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          상세 검토
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                        >
                          반려
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          승인
                        </Button>
                      </div>
                    </div>

                    <div className="text-gray-900 font-medium mb-2">{review.description}</div>
                    <div className="text-gray-600 mb-3">
                      {review.account} • {review.amount}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>
                        제출자: {review.submitter} • {review.time}
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <span>AI 신뢰도:</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${review.aiConfidence}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-gray-600 mt-1">{review.aiConfidence}%</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {activeTab === "team" && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                <CardTitle>팀 성과 현황</CardTitle>
              </div>
              <CardDescription>실무자별 처리 현황과 정확도를 확인하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-900 mb-1">김실무</div>
                        <div className="text-sm text-gray-600">오늘 처리: 15건</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">정확도</div>
                          <div className="text-lg font-semibold text-green-600">94%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">평균 처리시간</div>
                          <div className="text-lg font-semibold text-blue-600">8분</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-900 mb-1">이실무</div>
                        <div className="text-sm text-gray-600">오늘 처리: 12건</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">정확도</div>
                          <div className="text-lg font-semibold text-green-600">89%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">평균 처리시간</div>
                          <div className="text-lg font-semibold text-blue-600">10분</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-semibold text-gray-900 mb-1">박실무</div>
                        <div className="text-sm text-gray-600">오늘 처리: 18건</div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">정확도</div>
                          <div className="text-lg font-semibold text-green-600">96%</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">평균 처리시간</div>
                          <div className="text-lg font-semibold text-blue-600">7분</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === "reports" && (
          <Card>
            <CardHeader>
              <CardTitle>AI 기반 분석 리포트</CardTitle>
              <CardDescription>부서별, 계정과목별, 거래유형별 상세 분석 및 드릴다운 기능을 제공합니다</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 1. 주요 부서별/계정과목별/거래유형별 거래처리 현황 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  거래처리 현황 분석
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">부서별 처리 현황</h4>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">재무팀</span>
                        <span className="font-medium">156건 (45%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">영업팀</span>
                        <span className="font-medium">89건 (26%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">구매팀</span>
                        <span className="font-medium">67건 (19%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">기타</span>
                        <span className="font-medium">34건 (10%)</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">계정과목별 분석</h4>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">매입비용</span>
                        <span className="font-medium">₩2.1억 (38%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">급여</span>
                        <span className="font-medium">₩1.8억 (32%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">외주비</span>
                        <span className="font-medium">₩0.9억 (16%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">기타</span>
                        <span className="font-medium">₩0.8억 (14%)</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">거래유형별 분석</h4>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">정기거래</span>
                        <span className="font-medium">234건 (67%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">단발거래</span>
                        <span className="font-medium">78건 (22%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">긴급거래</span>
                        <span className="font-medium">25건 (7%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">수정거래</span>
                        <span className="font-medium">13건 (4%)</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* 2. 평균 대비 비경상적인 분개처리 분석 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  비경상적 분개처리 분석
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4 bg-green-50 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">하이브리드 AI</span>
                      <Badge className="bg-teal-800 text-white">94%</Badge>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2 mb-3">
                      <div className="bg-teal-600 h-2 rounded-full" style={{ width: "94%" }}></div>
                    </div>
                    <div className="text-sm text-green-700 mb-1">분석 근거:</div>
                    <div className="text-sm text-green-800 font-medium">
                      긴급 검토 필요 - 계약서 및 승인서류 확인 권장
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-2">위험 요소</div>
                    <div className="space-y-2">
                      <Badge variant="outline" className="mr-2">
                        금액 이상
                      </Badge>
                      <Badge variant="outline" className="mr-2">
                        거래 빈도 이상
                      </Badge>
                      <Badge variant="outline">신규 거래처</Badge>
                    </div>
                  </Card>
                </div>
              </div>

              {/* 3. 분개처리 대상 및 완료 항목 리스트 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  분개처리 현황 조회
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">처리 대상 항목</h4>
                      <Badge className="bg-orange-100 text-orange-800">15건 대기</Badge>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                        <div>
                          <div className="text-sm font-medium">JE-2024-004</div>
                          <div className="text-xs text-gray-600">매입비용 - ABC업체</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₩5,200,000</div>
                          <div className="text-xs text-orange-600">긴급</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                        <div>
                          <div className="text-sm font-medium">JE-2024-005</div>
                          <div className="text-xs text-gray-600">외주비 - XYZ업체</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₩1,800,000</div>
                          <div className="text-xs text-yellow-600">보통</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div>
                          <div className="text-sm font-medium">JE-2024-006</div>
                          <div className="text-xs text-gray-600">급여 - 정기지급</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₩25,000,000</div>
                          <div className="text-xs text-green-600">낮음</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                      전체 목록 보기
                    </Button>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-900">완료 항목</h4>
                      <Badge className="bg-green-100 text-green-800">오늘 8건 완료</Badge>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div>
                          <div className="text-sm font-medium">JE-2024-001</div>
                          <div className="text-xs text-gray-600">매입비용 - 승인완료</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₩15,000,000</div>
                          <div className="text-xs text-green-600">09:45</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div>
                          <div className="text-sm font-medium">JE-2024-002</div>
                          <div className="text-xs text-gray-600">컨설팅비 - 승인완료</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₩800,000</div>
                          <div className="text-xs text-green-600">10:20</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                        <div>
                          <div className="text-sm font-medium">JE-2024-003</div>
                          <div className="text-xs text-gray-600">급여 - 승인완료</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₩25,000,000</div>
                          <div className="text-xs text-green-600">11:15</div>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                      처리 이력 보기
                    </Button>
                  </Card>
                </div>
              </div>

              {/* AI 분석 요약 */}
              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-3 w-3 text-blue-600" />
                  </div>
                  <h4 className="font-medium text-blue-900">AI 분석 요약</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-blue-700 font-medium">처리 효율성</div>
                    <div className="text-blue-800">평균 처리시간 12분 (전월 대비 -15%)</div>
                  </div>
                  <div>
                    <div className="text-blue-700 font-medium">위험도 평가</div>
                    <div className="text-blue-800">고위험 3.5%, 중위험 7.3% 탐지</div>
                  </div>
                  <div>
                    <div className="text-blue-700 font-medium">정확도</div>
                    <div className="text-blue-800">AI 분석 정확도 94% 달성</div>
                  </div>
                </div>
              </Card>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[95vw] max-w-7xl h-auto max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">종합 위험 분석 - {selectedReview?.id}</DialogTitle>
                <p className="text-sm text-gray-600 mt-1">AI 분석 결과와 위험 요소를 종합적으로 검토하세요</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </DialogHeader>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">전표 정보</h3>
              </div>

              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">계정과목</div>
                <div className="font-semibold text-gray-900">{selectedReview?.account}</div>
              </Card>

              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">거래 금액</div>
                <div className="font-semibold text-gray-900">{selectedReview?.amount}</div>
              </Card>

              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">제출자</div>
                <div className="font-semibold text-gray-900">{selectedReview?.submitter}</div>
              </Card>

              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">제출 시간</div>
                <div className="font-semibold text-gray-900">{selectedReview?.time}</div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                  <BarChart3 className="h-3 w-3 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">AI 위험 분석</h3>
              </div>

              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">하이브리드 AI</span>
                  <Badge className="bg-teal-800 text-white">{selectedReview?.aiConfidence}%</Badge>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-teal-600 h-2 rounded-full"
                    style={{ width: `${selectedReview?.aiConfidence}%` }}
                  ></div>
                </div>
                <div className="text-sm text-green-700 mb-1">분석 근거:</div>
                <div className="text-sm text-green-800 font-medium">긴급 검토 필요 - 계약서 및 승인서류 확인 권장</div>
              </Card>

              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-2">위험 요소</div>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">
                    금액 이상
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    거래 빈도 이상
                  </Badge>
                  <Badge variant="outline">신규 거래처</Badge>
                </div>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-gray-900">상세 근거</h3>
              </div>

              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">과거 평균</div>
                <div className="font-semibold text-gray-900">4,200,000원</div>
              </Card>

              <Card className="p-4">
                <div className="text-sm text-gray-600 mb-1">거래처</div>
                <div className="font-semibold text-gray-900">ABC 공급업체</div>
              </Card>

              <Card className="p-4 bg-red-50 border-red-200">
                <div className="text-sm text-red-600 mb-1">특이 패턴</div>
                <div className="text-sm text-red-800 font-medium">동일 업체 3회 연속 대량 거래</div>
              </Card>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="text-sm text-blue-600 mb-1">AI 권장사항</div>
                <div className="text-sm text-blue-800 font-medium">긴급 검토 필요 - 계약서 및 승인서류 확인 권장</div>
              </Card>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t">
            <Button variant="outline" className="flex-1 bg-transparent">
              실무자에게 문의
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              추가 증빙 요청
            </Button>
            <Button variant="destructive" className="flex-1">
              반려 및 수정 요청
            </Button>
            <Button className="flex-1 bg-teal-600 hover:bg-teal-700">승인 및 ERP 반영</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
