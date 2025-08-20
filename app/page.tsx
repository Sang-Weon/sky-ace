import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, BarChart3, Settings, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-teal-600 rounded-lg">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI 자동 전표처리 에이전트</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">역할을 선택하여 맞춤형 업무 환경으로 접속하세요</p>
          <Badge className="bg-amber-500 text-white px-4 py-1 text-sm font-medium">역할 기반 접근 제어</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Journal Entry Processor */}
          <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-blue-900 text-center">전표처리 실무자</CardTitle>
              <CardDescription className="text-blue-700 text-center">증빙 수집 및 전표 생성 업무</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-blue-900 mb-3">주요 기능</h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>이메일/파일 증빙 자료 수집</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>AI 추천 계정과목 선택</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>신규 전표 생성</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>ERP 제출 처리</span>
                  </div>
                </div>
              </div>
              <Link href="/journal-entry">
                <Button className="w-full bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 flex items-center justify-center gap-2">
                  전표처리 실무자로 접속
                  <span>→</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Financial Accounting Manager */}
          <Card className="bg-green-50 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-green-900 text-center">재무회계 담당자</CardTitle>
              <CardDescription className="text-green-700 text-center">AI 이상징후 탐지 및 전표 승인</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-green-900 mb-3">주요 기능</h4>
                <div className="space-y-2 text-sm text-green-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>오늘 검토할 전표 리스트</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>이상징후 판단 근거 확인</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>승인/반려 처리</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>ERP 반영 관리</span>
                  </div>
                </div>
              </div>
              <Link href="/financial-management">
                <Button className="w-full bg-white text-green-700 border border-green-300 hover:bg-green-50 flex items-center justify-center gap-2">
                  재무회계 담당자로 접속
                  <span>→</span>
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Accounting Supervisor */}
          <Card className="bg-purple-50 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <Settings className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-purple-900 text-center">회계 책임자</CardTitle>
              <CardDescription className="text-purple-700 text-center">분개율 관리 및 AI 성능 분석</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-purple-900 mb-3">주요 기능</h4>
                <div className="space-y-2 text-sm text-purple-800">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>분개율 및 파라미터 등록</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>AI 추천 정확도 분석</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>이상징후 분석 리포트</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>월 기반 예외처리</span>
                  </div>
                </div>
              </div>
              <Link href="/accounting-supervisor">
                <Button className="w-full bg-white text-purple-700 border border-purple-300 hover:bg-purple-50 flex items-center justify-center gap-2">
                  회계 책임자로 접속
                  <span>→</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">시스템 정상 운영</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">OCR 엔진 활성</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">3건 검토 대기</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
