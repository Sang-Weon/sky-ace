"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  ChevronRight,
  Upload,
  FileText,
  Send,
  AlertTriangle,
  Mail,
  Receipt,
  ChevronDown,
  User,
  Users,
  Settings,
  Database,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  AlertCircle,
  Check,
  X,
  Edit,
  Save,
  RefreshCw,
  Bot,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function JournalEntryModule() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [showAITooltips, setShowAITooltips] = useState(true)
  const [manualEntry, setManualEntry] = useState({
    debitAccount: "",
    creditAccount: "",
    amount: "",
    description: "",
  })
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      debitAccount: "4110",
      debitAccountName: "매입비용",
      creditAccount: "1110",
      creditAccountName: "현금",
      amount: 1000000,
      description: "사무용품 구매",
      aiConfidence: 95,
      approved: false,
    },
  ])

  const workflowSteps = [
    { id: 1, name: "증빙 수집", icon: Upload, active: currentStep === 1 },
    { id: 2, name: "전표 작성", icon: FileText, active: currentStep === 2 },
    { id: 3, name: "ERP 전송", icon: Send, active: currentStep === 3 },
  ]

  const pendingDocuments = [
    {
      id: 1,
      type: "세금계산서",
      vendor: "ABC 공급업체",
      amount: "1,100,000원",
      date: "2024-01-15",
      confidence: 95,
      accounts: [
        { code: "4110", name: "매입비용", confidence: 95 },
        { code: "4120", name: "외주비", confidence: 78 },
      ],
      status: "Model Context Protocol 처리 완료",
      apiSource: "국세청 홈택스",
    },
    {
      id: 2,
      type: "영수증",
      vendor: "한국철도공사",
      amount: "45,000원",
      date: "2024-01-15",
      confidence: 92,
      accounts: [{ code: "6110", name: "여비교통비", confidence: 92 }],
      status: "Model Context Protocol 처리 완료",
      apiSource: "카드사 API",
    },
  ]

  const sapModules = [
    {
      module: "FI-GL (General Ledger)",
      tcode: "FB01",
      description: "일반전표 입력",
      confidence: 98,
      recommended: true,
    },
    {
      module: "FI-AP (Accounts Payable)",
      tcode: "FB60",
      description: "매입처 송장 입력",
      confidence: 85,
      recommended: false,
    },
  ]

  const AITooltip = ({ children, content }) => {
    if (!showAITooltips) return children

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="relative">
              {children}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 rounded-full flex items-center justify-center">
                <Bot className="h-2.5 w-2.5 text-white" strokeWidth={2} />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-pink-100 border-pink-300 text-pink-800 max-w-xs">
            <div className="flex items-start gap-2">
              <Bot className="h-4 w-4 text-pink-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
              <p className="text-sm">{content}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <AITooltip content="실시간 API 연동을 통해 국세청, 카드사 등에서 증빙서류를 자동 수집합니다. OCR과 NLP 기술로 문서 내용을 자동 분석하여 정확도 95% 이상의 데이터 추출을 제공합니다.">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    거래처 API 연동 현황
                  </CardTitle>
                  <CardDescription>실시간 증빙서류 자동 수집</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <AITooltip content="국세청 홈택스 API를 통해 세금계산서, 현금영수증 등을 실시간으로 수집합니다. 블록체인 기반 무결성 검증을 통해 위변조를 방지합니다.">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">국세청 홈택스</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          연결됨
                        </Badge>
                      </div>
                    </AITooltip>
                    <AITooltip content="카드사 API 연동으로 카드 매출전표를 자동 수집하고, 머신러닝 기반 거래 분류를 통해 계정과목을 자동 추천합니다.">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm font-medium">카드사 API</span>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          연결됨
                        </Badge>
                      </div>
                    </AITooltip>
                  </div>
                  <AITooltip content="AI 스케줄러가 설정된 주기에 따라 자동으로 최신 증빙서류를 동기화하고, 중복 제거 및 데이터 정합성을 검증합니다.">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <RefreshCw className="h-4 w-4 mr-2" strokeWidth={2} />
                      최신 증빙 동기화
                    </Button>
                  </AITooltip>
                </CardContent>
              </Card>
            </AITooltip>

            <AITooltip content="Model Context Protocol을 통해 이메일, 모바일 앱, 클라우드 스토리지 등 다양한 채널에서 증빙서류를 자동 수집하고 통합 관리합니다.">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" strokeWidth={2} />
                    Model Context Protocol
                  </CardTitle>
                  <CardDescription>다중 채널 증빙 수집 및 처리</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AITooltip content="이메일 첨부파일을 AI가 자동 스캔하여 증빙서류를 식별하고 추출합니다. 자연어 처리를 통해 이메일 본문의 거래 정보도 함께 분석합니다.">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">이메일 자동 스캔</span>
                        <Switch defaultChecked />
                      </div>
                    </AITooltip>
                    <AITooltip content="모바일 앱을 통해 촬영된 영수증을 실시간으로 OCR 처리하고, 위치 정보와 시간 정보를 결합하여 거래의 진위성을 검증합니다.">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">모바일 앱 연동</span>
                        <Switch defaultChecked />
                      </div>
                    </AITooltip>
                    <AITooltip content="Google Drive, Dropbox 등 클라우드 스토리지를 모니터링하여 새로 업로드된 증빙서류를 자동으로 감지하고 처리합니다.">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">클라우드 스토리지 모니터링</span>
                        <Switch />
                      </div>
                    </AITooltip>
                  </div>
                </CardContent>
              </Card>
            </AITooltip>

            <AITooltip content="수집된 증빙서류를 AI가 자동 분석하여 거래처, 금액, 날짜 등을 추출하고 계정과목을 추천합니다. 신뢰도 점수를 통해 검토 우선순위를 결정합니다.">
              <Card>
                <CardHeader>
                  <CardTitle>수집된 증빙서류 ({pendingDocuments.length}건)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingDocuments.map((doc) => (
                    <AITooltip
                      key={doc.id}
                      content={`${doc.apiSource}에서 수집된 ${doc.type}입니다. AI 신뢰도 ${doc.confidence}%로 분석되었으며, 자동 계정과목 분류가 완료되었습니다.`}
                    >
                      <Card className="border border-gray-200">
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {doc.type === "세금계산서" ? (
                                <Mail className="h-8 w-8 text-blue-600" strokeWidth={2} />
                              ) : (
                                <Receipt className="h-8 w-8 text-green-600" strokeWidth={2} />
                              )}
                              <div>
                                <h3 className="font-semibold">
                                  {doc.vendor} - {doc.type}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {doc.amount} • {doc.date}
                                </p>
                                <p className="text-xs text-blue-600">출처: {doc.apiSource}</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              {doc.status}
                            </Badge>
                          </div>
                          <Button size="sm" onClick={() => setCurrentStep(2)} className="bg-blue-600 hover:bg-blue-700">
                            전표 작성으로 이동
                          </Button>
                        </CardContent>
                      </Card>
                    </AITooltip>
                  ))}
                </CardContent>
              </Card>
            </AITooltip>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <AITooltip content="회사의 회계처리 지침과 과거 거래 패턴을 학습한 AI가 최적의 전표를 자동 생성합니다. Human-in-the-Loop 방식으로 담당자의 최종 검토와 승인을 거쳐 안전성을 보장합니다.">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" strokeWidth={2} />
                    표준 전표 입력
                  </CardTitle>
                  <CardDescription>AI 권고사항을 검토하고 승인하세요</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="ai-recommended" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <AITooltip content="딥러닝 모델이 과거 전표 데이터와 회계기준을 학습하여 생성한 권고 전표입니다. 95% 이상의 정확도를 보장합니다.">
                        <TabsTrigger value="ai-recommended">AI 권고 전표</TabsTrigger>
                      </AITooltip>
                      <AITooltip content="담당자가 직접 전표를 입력할 수 있습니다. AI가 실시간으로 계정과목을 추천하고 오류를 검증합니다.">
                        <TabsTrigger value="manual-entry">수동 입력</TabsTrigger>
                      </AITooltip>
                    </TabsList>

                    <TabsContent value="ai-recommended" className="space-y-4">
                      <AITooltip content="사내 RAG 시스템과 외부 LLM을 결합하여 회계기준 변경사항과 사내 지침을 실시간 반영한 AI 분석 결과입니다.">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-blue-600" strokeWidth={2} />
                            <span className="text-sm font-medium text-blue-800">AI 분석 결과</span>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                              신뢰도 95%
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-700">회사 회계처리 지침에 따라 다음 전표를 권고합니다.</p>
                        </div>
                      </AITooltip>

                      {journalEntries.map((entry, index) => (
                        <AITooltip
                          key={index}
                          content="AI가 생성한 전표입니다. 계정과목은 머신러닝 분류 모델로, 금액은 OCR 추출로, 적요는 NLP 분석으로 자동 생성되었습니다."
                        >
                          <Card className="border-2 border-blue-200">
                            <CardContent className="pt-4">
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Label className="text-sm font-medium">차변</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Input
                                      value={`${entry.debitAccount} - ${entry.debitAccountName}`}
                                      readOnly
                                      className="bg-gray-50"
                                    />
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                      AI {entry.aiConfidence}%
                                    </Badge>
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">대변</Label>
                                  <div className="flex items-center gap-2 mt-1">
                                    <Input
                                      value={`${entry.creditAccount} - ${entry.creditAccountName}`}
                                      readOnly
                                      className="bg-gray-50"
                                    />
                                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                                      AI {entry.aiConfidence}%
                                    </Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Label className="text-sm font-medium">금액</Label>
                                  <Input value={entry.amount.toLocaleString()} readOnly className="bg-gray-50 mt-1" />
                                </div>
                                <div>
                                  <Label className="text-sm font-medium">적요</Label>
                                  <Input
                                    value={entry.description}
                                    onChange={(e) => {
                                      const updated = [...journalEntries]
                                      updated[index].description = e.target.value
                                      setJournalEntries(updated)
                                    }}
                                    className="mt-1"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <AITooltip content="Human-in-the-Loop 방식으로 AI 생성 전표에 대한 담당자의 최종 검토와 승인이 필요합니다. 이를 통해 AI의 효율성과 인간의 판단력을 결합합니다.">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Human-in-the-Loop 검토:</span>
                                    {entry.approved ? (
                                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                                        <Check className="h-3 w-3 mr-1" strokeWidth={2} />
                                        승인됨
                                      </Badge>
                                    ) : (
                                      <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                        <Clock className="h-3 w-3 mr-1" strokeWidth={2} />
                                        검토 대기
                                      </Badge>
                                    )}
                                  </div>
                                </AITooltip>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-1" strokeWidth={2} />
                                    수정
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => {
                                      const updated = [...journalEntries]
                                      updated[index].approved = true
                                      setJournalEntries(updated)
                                    }}
                                  >
                                    <Check className="h-4 w-4 mr-1" strokeWidth={2} />
                                    승인
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </AITooltip>
                      ))}
                    </TabsContent>

                    <TabsContent value="manual-entry" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>차변 계정</Label>
                          <AITooltip content="입력하는 동안 AI가 실시간으로 계정과목을 추천하고 자동완성을 제공합니다.">
                            <Input
                              placeholder="계정코드 - 계정명"
                              className="mt-1"
                              value={manualEntry.debitAccount}
                              onChange={(e) => setManualEntry({ ...manualEntry, debitAccount: e.target.value })}
                            />
                          </AITooltip>
                        </div>
                        <div>
                          <Label>대변 계정</Label>
                          <AITooltip content="차변 계정 선택 시 AI가 가장 적합한 대변 계정을 자동으로 추천합니다.">
                            <Input
                              placeholder="계정코드 - 계정명"
                              className="mt-1"
                              value={manualEntry.creditAccount}
                              onChange={(e) => setManualEntry({ ...manualEntry, creditAccount: e.target.value })}
                            />
                          </AITooltip>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>금액</Label>
                          <AITooltip content="금액 입력 시 AI가 이상 거래를 감지하고 경고를 표시합니다.">
                            <Input
                              placeholder="0"
                              className="mt-1"
                              value={manualEntry.amount}
                              onChange={(e) => setManualEntry({ ...manualEntry, amount: e.target.value })}
                            />
                          </AITooltip>
                        </div>
                        <div>
                          <Label>적요</Label>
                          <AITooltip content="NLP 기반으로 적요를 자동 생성하고, 유사한 과거 거래의 적요를 추천합니다.">
                            <Input
                              placeholder="거래 내용"
                              className="mt-1"
                              value={manualEntry.description}
                              onChange={(e) => setManualEntry({ ...manualEntry, description: e.target.value })}
                            />
                          </AITooltip>
                        </div>
                      </div>
                      <AITooltip content="저장 전 AI가 전표의 정합성을 검증하고 오류나 이상 패턴을 감지합니다.">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Save className="h-4 w-4 mr-2" strokeWidth={2} />
                          전표 저장
                        </Button>
                      </AITooltip>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </AITooltip>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <AITooltip content="AI가 전표 내용을 분석하여 SAP의 최적 모듈과 T-Code를 자동으로 식별하고 매핑합니다. 과거 처리 이력과 회사 설정을 학습하여 98% 정확도를 달성합니다.">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-purple-600" strokeWidth={2} />
                    SAP 모듈 자동 인식
                  </CardTitle>
                  <CardDescription>AI가 분석한 최적 ERP 연동 방안</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sapModules.map((module, index) => (
                      <AITooltip
                        key={index}
                        content={`AI가 전표 유형과 계정과목을 분석하여 ${module.module} 모듈의 ${module.tcode} T-Code를 추천했습니다. 신뢰도 ${module.confidence}%로 분석되었습니다.`}
                      >
                        <Card
                          className={`border-2 ${module.recommended ? "border-green-200 bg-green-50" : "border-gray-200"}`}
                        >
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="font-semibold text-lg">{module.module}</h3>
                                <p className="text-sm text-gray-600">{module.description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    T-Code: {module.tcode}
                                  </Badge>
                                  <Badge
                                    variant="secondary"
                                    className={`${module.confidence >= 95 ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                                  >
                                    AI {module.confidence}%
                                  </Badge>
                                </div>
                              </div>
                              {module.recommended && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  <Check className="h-3 w-3 mr-1" strokeWidth={2} />
                                  AI 권고
                                </Badge>
                              )}
                            </div>

                            <AITooltip content="AI가 회사 설정과 전표 정보를 기반으로 SAP 매핑 정보를 자동 생성했습니다. 참조번호는 중복 방지를 위해 타임스탬프 기반으로 생성됩니다.">
                              <div className="bg-white p-3 rounded border mb-3">
                                <h4 className="text-sm font-medium mb-2">매핑 정보</h4>
                                <div className="text-xs space-y-1">
                                  <div>• 회사코드: 1000 (본사)</div>
                                  <div>• 전기일: {new Date().toLocaleDateString()}</div>
                                  <div>• 통화: KRW</div>
                                  <div>• 참조번호: JE-{Date.now()}</div>
                                </div>
                              </div>
                            </AITooltip>

                            <div className="flex items-center justify-between">
                              <AITooltip content="ERP 시스템 반영 전 담당자의 최종 승인이 필요합니다. 이는 시스템 안정성과 데이터 무결성을 보장하기 위한 안전장치입니다.">
                                <div className="flex items-center gap-2">
                                  <AlertCircle className="h-4 w-4 text-amber-500" strokeWidth={2} />
                                  <span className="text-sm text-amber-700">Human-in-the-Loop 승인 필요</span>
                                </div>
                              </AITooltip>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <X className="h-4 w-4 mr-1" strokeWidth={2} />
                                  거부
                                </Button>
                                <Button
                                  size="sm"
                                  className={
                                    module.recommended
                                      ? "bg-green-600 hover:bg-green-700"
                                      : "bg-blue-600 hover:bg-blue-700"
                                  }
                                >
                                  <Check className="h-4 w-4 mr-1" strokeWidth={2} />
                                  승인 및 전송
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </AITooltip>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AITooltip>

            <AITooltip content="AI 시스템이 제공하는 다중 안전장치입니다. 전표 검증, 중복 확인, 권한 검사 등을 통해 ERP 반영 전 최종 안전성을 보장합니다.">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-red-600" strokeWidth={2} />
                    안전 장치
                  </CardTitle>
                  <CardDescription>ERP 반영 전 최종 확인</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" strokeWidth={2} />
                      <span className="text-sm font-medium text-red-800">중요 안내</span>
                    </div>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• ERP 시스템 반영 후에는 수정이 어려울 수 있습니다</li>
                      <li>• 전표 내용과 금액을 다시 한 번 확인해주세요</li>
                      <li>• 승인 후 자동으로 SAP 시스템에 반영됩니다</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </AITooltip>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={showAITooltips}
              onCheckedChange={setShowAITooltips}
              className="data-[state=checked]:bg-pink-500"
            />
            <span className="text-sm font-medium text-gray-700">AI적용 내역</span>
            <Bot className="h-4 w-4 text-pink-500" strokeWidth={2} />
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Home className="h-4 w-4" strokeWidth={2} />
                <span>대시보드</span>
              </Button>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
            <span className="text-sm text-muted-foreground">전표처리 실무자</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              전표처리 실무자
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                  <User className="h-4 w-4" strokeWidth={2} />
                  <span>역할 전환</span>
                  <ChevronDown className="h-4 w-4" strokeWidth={2} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/journal-entry" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" strokeWidth={2} />
                    <span>전표처리 실무자</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/financial-management" className="flex items-center gap-2">
                    <Users className="h-4 w-4" strokeWidth={2} />
                    <span>재무회계 담당자</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/accounting-supervisor" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" strokeWidth={2} />
                    <span>회계 책임자</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전표처리 워크플로우</h1>
          <p className="text-gray-600">3단계 워크플로우로 효율적이고 안전한 전표 처리</p>
        </div>

        <AITooltip content="AI 기반 3단계 워크플로우입니다. 각 단계는 머신러닝과 자동화 기술을 활용하여 효율성과 정확성을 극대화합니다.">
          <div className="grid grid-cols-3 gap-4 mb-8">
            {workflowSteps.map((step) => {
              const Icon = step.icon
              return (
                <Button
                  key={step.id}
                  variant={step.active ? "default" : "outline"}
                  className={`h-16 flex items-center justify-center gap-3 ${
                    step.active ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={() => setCurrentStep(step.id)}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  <span className="font-medium">{step.name}</span>
                  <ChevronRight className="h-4 w-4" strokeWidth={2} />
                </Button>
              )
            })}
          </div>
        </AITooltip>

        {renderStepContent()}
      </div>
    </div>
  )
}
