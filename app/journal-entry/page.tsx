"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function JournalEntryModule() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDocument, setSelectedDocument] = useState(null)
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
      status: "API 연동 완료",
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
      status: "MCP 처리 완료",
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-600" />
                  거래처 API 연동 현황
                </CardTitle>
                <CardDescription>실시간 증빙서류 자동 수집</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">국세청 홈택스</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      연결됨
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">카드사 API</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      연결됨
                    </Badge>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  최신 증빙 동기화
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-600" />
                  MCP (Multi-Channel Processing)
                </CardTitle>
                <CardDescription>다중 채널 증빙 수집 및 처리</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">이메일 자동 스캔</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">모바일 앱 연동</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">클라우드 스토리지 모니터링</span>
                    <Switch />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>수집된 증빙서류 ({pendingDocuments.length}건)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingDocuments.map((doc) => (
                  <Card key={doc.id} className="border border-gray-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {doc.type === "세금계산서" ? (
                            <Mail className="h-8 w-8 text-blue-600" />
                          ) : (
                            <Receipt className="h-8 w-8 text-green-600" />
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
                ))}
              </CardContent>
            </Card>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  표준 전표 입력
                </CardTitle>
                <CardDescription>AI 권고사항을 검토하고 승인하세요</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ai-recommended" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="ai-recommended">AI 권고 전표</TabsTrigger>
                    <TabsTrigger value="manual-entry">수동 입력</TabsTrigger>
                  </TabsList>

                  <TabsContent value="ai-recommended" className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">AI 분석 결과</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          신뢰도 95%
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700">회사 회계처리 지침에 따라 다음 전표를 권고합니다.</p>
                    </div>

                    {journalEntries.map((entry, index) => (
                      <Card key={index} className="border-2 border-blue-200">
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
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Human-in-the-Loop 검토:</span>
                              {entry.approved ? (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  <Check className="h-3 w-3 mr-1" />
                                  승인됨
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                                  <Clock className="h-3 w-3 mr-1" />
                                  검토 대기
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
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
                                <Check className="h-4 w-4 mr-1" />
                                승인
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="manual-entry" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>차변 계정</Label>
                        <Input
                          placeholder="계정코드 - 계정명"
                          className="mt-1"
                          value={manualEntry.debitAccount}
                          onChange={(e) => setManualEntry({ ...manualEntry, debitAccount: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>대변 계정</Label>
                        <Input
                          placeholder="계정코드 - 계정명"
                          className="mt-1"
                          value={manualEntry.creditAccount}
                          onChange={(e) => setManualEntry({ ...manualEntry, creditAccount: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>금액</Label>
                        <Input
                          placeholder="0"
                          className="mt-1"
                          value={manualEntry.amount}
                          onChange={(e) => setManualEntry({ ...manualEntry, amount: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>적요</Label>
                        <Input
                          placeholder="거래 내용"
                          className="mt-1"
                          value={manualEntry.description}
                          onChange={(e) => setManualEntry({ ...manualEntry, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      전표 저장
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  SAP 모듈 자동 인식
                </CardTitle>
                <CardDescription>AI가 분석한 최적 ERP 연동 방안</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sapModules.map((module, index) => (
                    <Card
                      key={index}
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
                              <Check className="h-3 w-3 mr-1" />
                              AI 권고
                            </Badge>
                          )}
                        </div>

                        <div className="bg-white p-3 rounded border mb-3">
                          <h4 className="text-sm font-medium mb-2">매핑 정보</h4>
                          <div className="text-xs space-y-1">
                            <div>• 회사코드: 1000 (본사)</div>
                            <div>• 전기일: {new Date().toLocaleDateString()}</div>
                            <div>• 통화: KRW</div>
                            <div>• 참조번호: JE-{Date.now()}</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-500" />
                            <span className="text-sm text-amber-700">Human-in-the-Loop 승인 필요</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <X className="h-4 w-4 mr-1" />
                              거부
                            </Button>
                            <Button
                              size="sm"
                              className={
                                module.recommended ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                              }
                            >
                              <Check className="h-4 w-4 mr-1" />
                              승인 및 전송
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-600" />
                  안전 장치
                </CardTitle>
                <CardDescription>ERP 반영 전 최종 확인</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
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
          </div>
        )

      default:
        return null
    }
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
            <span className="text-sm text-muted-foreground">전표처리 실무자</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              전표처리 실무자
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">전표처리 워크플로우</h1>
          <p className="text-gray-600">3단계 워크플로우로 효율적이고 안전한 전표 처리</p>
        </div>

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
                <Icon className="h-5 w-5" />
                <span className="font-medium">{step.name}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            )
          })}
        </div>

        {renderStepContent()}
      </div>
    </div>
  )
}
