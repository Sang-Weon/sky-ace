"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { FileText, BarChart3, Settings, CheckCircle, AlertTriangle, Bot, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const AITooltip = ({ children, content }: { children: React.ReactNode; content: string }) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-50 px-3 py-2 text-sm text-white bg-pink-500 rounded-lg shadow-lg -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>{content}</span>
          </div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-500"></div>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [showAITooltips, setShowAITooltips] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-start mb-4">
          <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border">
            <Sparkles className="h-5 w-5 text-pink-500" />
            <span className="text-sm font-medium text-gray-700">AI적용 내역</span>
            <Switch
              checked={showAITooltips}
              onCheckedChange={setShowAITooltips}
              className="data-[state=checked]:bg-pink-500"
            />
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-teal-600 rounded-lg">
              {showAITooltips ? (
                <AITooltip content="AI 기반 역할별 접근 제어 및 권한 관리">
                  <Settings className="h-8 w-8 text-white" />
                </AITooltip>
              ) : (
                <Settings className="h-8 w-8 text-white" />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">AI 자동 전표처리 에이전트</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">역할을 선택하여 맞춤형 업무 환경으로 접속하세요</p>
          {showAITooltips ? (
            <AITooltip content="머신러닝 기반 역할 분류 및 개인화된 업무 환경 제공">
              <Badge className="bg-amber-500 text-white px-4 py-1 text-sm font-medium">역할 기반 접근 제어</Badge>
            </AITooltip>
          ) : (
            <Badge className="bg-amber-500 text-white px-4 py-1 text-sm font-medium">역할 기반 접근 제어</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Journal Entry Processor */}
          <Card className="bg-blue-50 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-blue-500 rounded-lg">
                  {showAITooltips ? (
                    <AITooltip content="OCR + NLP 기반 증빙서류 자동 인식 및 분류">
                      <FileText className="h-8 w-8 text-white" />
                    </AITooltip>
                  ) : (
                    <FileText className="h-8 w-8 text-white" />
                  )}
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
                    {showAITooltips ? (
                      <AITooltip content="API 연동 및 Model Context Protocol을 통한 자동 증빙 수집">
                        <span>이메일/파일 증빙 자료 수집</span>
                      </AITooltip>
                    ) : (
                      <span>이메일/파일 증빙 자료 수집</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="RAG + LLM 기반 회계기준 적용 계정과목 추천">
                        <span>AI 추천 계정과목 선택</span>
                      </AITooltip>
                    ) : (
                      <span>AI 추천 계정과목 선택</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="AI Agent 기반 자동 전표 생성 및 검증">
                        <span>신규 전표 생성</span>
                      </AITooltip>
                    ) : (
                      <span>신규 전표 생성</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="SAP T-Code 자동 매핑 및 ERP 연동">
                        <span>ERP 제출 처리</span>
                      </AITooltip>
                    ) : (
                      <span>ERP 제출 처리</span>
                    )}
                  </div>
                </div>
              </div>
              <Link href="/journal-entry">
                {showAITooltips ? (
                  <AITooltip content="개인화된 AI 워크플로우 환경으로 이동">
                    <Button className="w-full bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 flex items-center justify-center gap-2">
                      전표처리 실무자로 접속
                      <span>→</span>
                    </Button>
                  </AITooltip>
                ) : (
                  <Button className="w-full bg-white text-blue-700 border border-blue-300 hover:bg-blue-50 flex items-center justify-center gap-2">
                    전표처리 실무자로 접속
                    <span>→</span>
                  </Button>
                )}
              </Link>
            </CardContent>
          </Card>

          {/* Financial Accounting Manager */}
          <Card className="bg-green-50 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-green-500 rounded-lg">
                  {showAITooltips ? (
                    <AITooltip content="ML 기반 이상징후 탐지 및 위험도 분석">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </AITooltip>
                  ) : (
                    <BarChart3 className="h-8 w-8 text-white" />
                  )}
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
                    {showAITooltips ? (
                      <AITooltip content="AI 우선순위 알고리즘 기반 검토 대상 선별">
                        <span>오늘 검토할 전표 리스트</span>
                      </AITooltip>
                    ) : (
                      <span>오늘 검토할 전표 리스트</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="설명 가능한 AI를 통한 이상징후 근거 제시">
                        <span>이상징후 판단 근거 확인</span>
                      </AITooltip>
                    ) : (
                      <span>이상징후 판단 근거 확인</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="Human-in-the-loop 방식의 AI 지원 의사결정">
                        <span>승인/반려 처리</span>
                      </AITooltip>
                    ) : (
                      <span>승인/반려 처리</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="실시간 ERP 연동 상태 모니터링 및 자동 처리">
                        <span>ERP 반영 관리</span>
                      </AITooltip>
                    ) : (
                      <span>ERP 반영 관리</span>
                    )}
                  </div>
                </div>
              </div>
              <Link href="/financial-management">
                {showAITooltips ? (
                  <AITooltip content="AI 분석 대시보드 및 승인 워크플로우 환경">
                    <Button className="w-full bg-white text-green-700 border border-green-300 hover:bg-green-50 flex items-center justify-center gap-2">
                      재무회계 담당자로 접속
                      <span>→</span>
                    </Button>
                  </AITooltip>
                ) : (
                  <Button className="w-full bg-white text-green-700 border border-green-300 hover:bg-green-50 flex items-center justify-center gap-2">
                    재무회계 담당자로 접속
                    <span>→</span>
                  </Button>
                )}
              </Link>
            </CardContent>
          </Card>

          {/* Accounting Supervisor */}
          <Card className="bg-purple-50 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-purple-500 rounded-lg">
                  {showAITooltips ? (
                    <AITooltip content="AI 모델 성능 관리 및 하이브리드 알고리즘 최적화">
                      <Settings className="h-8 w-8 text-white" />
                    </AITooltip>
                  ) : (
                    <Settings className="h-8 w-8 text-white" />
                  )}
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
                    {showAITooltips ? (
                      <AITooltip content="ML 기반 동적 파라미터 조정 및 룰 엔진 관리">
                        <span>분개율 및 파라미터 등록</span>
                      </AITooltip>
                    ) : (
                      <span>분개율 및 파라미터 등록</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="실시간 AI 모델 성능 평가 및 정확도 분석">
                        <span>AI 추천 정확도 분석</span>
                      </AITooltip>
                    ) : (
                      <span>AI 추천 정확도 분석</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="통계적 기법과 AI를 결합한 종합 이상징후 분석">
                        <span>이상징후 분석 리포트</span>
                      </AITooltip>
                    ) : (
                      <span>이상징후 분석 리포트</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    {showAITooltips ? (
                      <AITooltip content="시계열 분석 및 예측 모델 기반 월별 트렌드 예측">
                        <span>월 기반 예외처리</span>
                      </AITooltip>
                    ) : (
                      <span>월 기반 예외처리</span>
                    )}
                  </div>
                </div>
              </div>
              <Link href="/accounting-supervisor">
                {showAITooltips ? (
                  <AITooltip content="AI 시스템 관리 센터 및 성능 최적화 환경">
                    <Button className="w-full bg-white text-purple-700 border border-purple-300 hover:bg-purple-50 flex items-center justify-center gap-2">
                      회계 책임자로 접속
                      <span>→</span>
                    </Button>
                  </AITooltip>
                ) : (
                  <Button className="w-full bg-white text-purple-700 border border-purple-300 hover:bg-purple-50 flex items-center justify-center gap-2">
                    회계 책임자로 접속
                    <span>→</span>
                  </Button>
                )}
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                {showAITooltips ? (
                  <AITooltip content="AI 모니터링 시스템을 통한 실시간 상태 감시">
                    <span className="text-sm font-medium text-gray-700">시스템 정상 운영</span>
                  </AITooltip>
                ) : (
                  <span className="text-sm font-medium text-gray-700">시스템 정상 운영</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                {showAITooltips ? (
                  <AITooltip content="딥러닝 기반 OCR 엔진 실시간 활성 상태">
                    <span className="text-sm font-medium text-gray-700">OCR 엔진 활성</span>
                  </AITooltip>
                ) : (
                  <span className="text-sm font-medium text-gray-700">OCR 엔진 활성</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {showAITooltips ? (
                  <AITooltip content="AI 우선순위 알고리즘이 선별한 검토 필요 항목">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                  </AITooltip>
                ) : (
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                )}
                <span className="text-sm font-medium text-gray-700">3건 검토 대기</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
