"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Activity,
  Zap,
  Target,
  AlertTriangle,
  RefreshCw,
  Settings,
  ChevronRight,
  ChevronDown,
  Home,
  User,
  FileText,
  Users,
  X,
  Download,
} from "lucide-react"
import Link from "next/link"

export default function AccountingSupervisorModule() {
  const [anomalyDetection, setAnomalyDetection] = useState({
    salaryAnomaly: true,
    expenseAnomaly: true,
  })

  const [patternDetection, setPatternDetection] = useState({
    accountPattern: true,
    transactionTiming: true,
  })

  const [transactionAnalysis, setTransactionAnalysis] = useState({
    monthlyAnalysis: true,
  })

  const [isParameterDialogOpen, setIsParameterDialogOpen] = useState(false)
  const [parameterSettings, setParameterSettings] = useState({
    condition: "평균 대비 200% 초과",
    threshold: [85],
    immediateAlert: true,
    dailyReport: false,
  })

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Home className="h-4 w-4" strokeWidth={2} />
                <span>대시보드</span>
              </Button>
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
            <span className="text-sm text-muted-foreground">회계 책임자</span>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              회계 책임자
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
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">AI 시스템 관리 센터</h1>
          <p className="text-muted-foreground">분개를 예전과 AI 학습 파라미터를 관리하고 시스템 성능을 최적화하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="bg-green-50 border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-green-600" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold text-green-900">99.8%</div>
              <div className="text-sm text-green-700">시스템 가동률</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-blue-600" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold text-blue-900">96.8%</div>
              <div className="text-sm text-blue-700">AI 정확도</div>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-purple-600" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold text-purple-900">156</div>
              <div className="text-sm text-purple-700">오늘 처리</div>
            </CardContent>
          </Card>

          <Card className="bg-orange-50 border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold text-orange-900">14</div>
              <div className="text-sm text-orange-700">이상징후 탐지</div>
            </CardContent>
          </Card>

          <Card className="bg-cyan-50 border-l-4 border-l-cyan-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="h-5 w-5 text-cyan-600" strokeWidth={2} />
              </div>
              <div className="text-2xl font-bold text-cyan-900">1.2초/건</div>
              <div className="text-sm text-cyan-700">평균 처리속도</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="integrated" className="space-y-6">
          <TabsList className="w-full flex gap-4 mb-8 h-auto bg-transparent p-0">
            <TabsTrigger
              value="integrated"
              className="flex-1 h-16 flex flex-col items-center gap-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:border-blue-300"
            >
              <Settings className="h-6 w-6" strokeWidth={2} />
              <span>통합 관리</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-model"
              className="flex-1 h-16 flex flex-col items-center gap-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:border-blue-300"
            >
              <Zap className="h-6 w-6" strokeWidth={2} />
              <span>AI 모델 관리</span>
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="flex-1 h-16 flex flex-col items-center gap-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:border-blue-300"
            >
              <Activity className="h-6 w-6" strokeWidth={2} />
              <span>성능 분석</span>
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="flex-1 h-16 flex flex-col items-center gap-2 bg-transparent border border-input hover:bg-accent hover:text-accent-foreground data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700 data-[state=active]:border-blue-300"
            >
              <Settings className="h-6 w-6" strokeWidth={2} />
              <span>시스템 설정</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="integrated" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <CardTitle>급여 이상 탐지</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" strokeWidth={2} />
                  <span className="text-sm">카테고리 설정</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={anomalyDetection.salaryAnomaly}
                      onCheckedChange={(checked) =>
                        setAnomalyDetection((prev) => ({ ...prev, salaryAnomaly: checked }))
                      }
                    />
                    <div>
                      <div className="font-medium">매입비용 임계값</div>
                      <div className="text-sm text-muted-foreground">평균 대비 200% 초과</div>
                      <div className="text-sm text-muted-foreground">최종 수정: 2024-01-10</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      활성
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">정확도</div>
                      <div className="font-medium">92.3%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">기준치</div>
                      <div className="font-medium">85%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">발생 횟수</div>
                      <div className="font-medium">15회</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setIsParameterDialogOpen(true)}>
                        <Settings className="h-4 w-4 mr-1" strokeWidth={2} />
                        상세 설정
                      </Button>
                      <Button variant="outline" size="sm">
                        복제
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={anomalyDetection.expenseAnomaly}
                      onCheckedChange={(checked) =>
                        setAnomalyDetection((prev) => ({ ...prev, expenseAnomaly: checked }))
                      }
                    />
                    <div>
                      <div className="font-medium">급여 이상 증감</div>
                      <div className="text-sm text-muted-foreground">전월 대비 150% 초과</div>
                      <div className="text-sm text-muted-foreground">최종 수정: 2024-01-08</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      활성
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">정확도</div>
                      <div className="font-medium">89.7%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">기준치</div>
                      <div className="font-medium">75%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">발생 횟수</div>
                      <div className="font-medium">8회</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" strokeWidth={2} />
                        상세 설정
                      </Button>
                      <Button variant="outline" size="sm">
                        복제
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <Button variant="outline">+ 새 룰 추가</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <CardTitle>계정과목 패턴</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" strokeWidth={2} />
                  <span className="text-sm">카테고리 설정</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={patternDetection.accountPattern}
                      onCheckedChange={(checked) =>
                        setPatternDetection((prev) => ({ ...prev, accountPattern: checked }))
                      }
                    />
                    <div>
                      <div className="font-medium">계정과목 매칭</div>
                      <div className="text-sm text-muted-foreground">AI 신뢰도 85% 미만</div>
                      <div className="text-sm text-muted-foreground">최종 수정: 2024-01-12</div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      활성
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">정확도</div>
                      <div className="font-medium">88.7%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">기준치</div>
                      <div className="font-medium">90%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">발생 횟수</div>
                      <div className="font-medium">23회</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" strokeWidth={2} />
                        상세 설정
                      </Button>
                      <Button variant="outline" size="sm">
                        복제
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={patternDetection.transactionTiming}
                      onCheckedChange={(checked) =>
                        setPatternDetection((prev) => ({ ...prev, transactionTiming: checked }))
                      }
                    />
                    <div>
                      <div className="font-medium">거래처별 계정 패턴</div>
                      <div className="text-sm text-muted-foreground">과거 패턴과 불일치</div>
                      <div className="text-sm text-muted-foreground">최종 수정: 2024-01-11</div>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      주의필요
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">정확도</div>
                      <div className="font-medium">91.2%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">기준치</div>
                      <div className="font-medium">80%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">발생 횟수</div>
                      <div className="font-medium">12회</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" strokeWidth={2} />
                        상세 설정
                      </Button>
                      <Button variant="outline" size="sm">
                        복제
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <Button variant="outline">+ 새 룰 추가</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <CardTitle>거래 시점 분석</CardTitle>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" strokeWidth={2} />
                  <span className="text-sm">카테고리 설정</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={transactionAnalysis.monthlyAnalysis}
                      onCheckedChange={(checked) =>
                        setTransactionAnalysis((prev) => ({ ...prev, monthlyAnalysis: checked }))
                      }
                    />
                    <div>
                      <div className="font-medium">월말 집중 처리</div>
                      <div className="text-sm text-muted-foreground">월말 3일간 집중도 80% 초과</div>
                      <div className="text-sm text-muted-foreground">최종 수정: 2024-01-09</div>
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      주의필요
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">정확도</div>
                      <div className="font-medium">76.4%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">기준치</div>
                      <div className="font-medium">60%</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">발생 횟수</div>
                      <div className="font-medium">5회</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-1" strokeWidth={2} />
                        상세 설정
                      </Button>
                      <Button variant="outline" size="sm">
                        복제
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="text-center py-4">
                  <Button variant="outline">+ 새 룰 추가</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-model" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">AI 알고리즘 성능 관리</h2>
              <p className="text-muted-foreground">각 AI 모델의 성능을 모니터링하고 최적화하세요</p>
            </div>

            {/* 하이브리드 알고리즘 */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <h3 className="text-lg font-semibold">하이브리드 알고리즘</h3>
                      <p className="text-sm text-muted-foreground">룰 기반 + AI 학습 결합</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-green-600 text-white">권장</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">96.8%</div>
                    <div className="text-sm text-blue-700">정확도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">1.2초</div>
                    <div className="text-sm text-green-700">처리속도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">94%</div>
                    <div className="text-sm text-purple-700">신뢰도</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">2024-01-14</div>
                    <div className="text-sm text-muted-foreground">최종 학습</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">성능 트렌드: 지난주 대비 +2.3% 향상</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" strokeWidth={2} />
                      재학습
                    </Button>
                    <Button variant="outline" size="sm">
                      파라미터 조정
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 딥러닝 패턴 분석 */}
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div>
                      <h3 className="text-lg font-semibold">딥러닝 패턴 분석</h3>
                      <p className="text-sm text-muted-foreground">신경망 기반 패턴 학습</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange-500 text-white">AI</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">94.2%</div>
                    <div className="text-sm text-blue-700">정확도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">0.8초</div>
                    <div className="text-sm text-green-700">처리속도</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">89%</div>
                    <div className="text-sm text-purple-700">신뢰도</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">2024-01-13</div>
                    <div className="text-sm text-muted-foreground">최종 학습</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">성능 트렌드: 지난주 대비 +2.3% 향상</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" strokeWidth={2} />
                      재학습
                    </Button>
                    <Button variant="outline" size="sm">
                      파라미터 조정
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 룰 기반 엔진 */}
            <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <div>
                      <h3 className="text-lg font-semibold">룰 기반 엔진</h3>
                      <p className="text-sm text-muted-foreground">사전 정의된 비즈니스 룰</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-orange-500 text-white">룰</Badge>
                    <Switch defaultChecked />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 mb-4">
                  <div className="text-center">
                    <div className="text-sm text-blue-700">정확도</div>
                    <div className="text-3xl font-bold text-blue-600">87.5%</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-green-700">처리속도</div>
                    <div className="text-3xl font-bold text-green-600">0.3초</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-purple-700">신뢰도</div>
                    <div className="text-3xl font-bold text-purple-600">92%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">2024-01-10</div>
                    <div className="text-sm text-muted-foreground">최종 학습</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">성능 트렌드: 지난주 대비 +2.3% 향상</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-1" strokeWidth={2} />
                      재학습
                    </Button>
                    <Button variant="outline" size="sm">
                      파라미터 조정
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 외부 AI 에이전트 연동 섹션 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" strokeWidth={2} />
                  외부 AI 에이전트 연동
                </CardTitle>
                <CardDescription>API 및 MCP를 통한 외부 AI 모델 통합 관리</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-4 text-center">
                      <div className="mb-2">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Zap className="h-6 w-6 text-blue-600" strokeWidth={2} />
                        </div>
                        <h4 className="font-medium">OpenAI GPT-4</h4>
                        <p className="text-sm text-muted-foreground">자연어 처리 및 분석</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        + 연동 설정
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-4 text-center">
                      <div className="mb-2">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Target className="h-6 w-6 text-green-600" strokeWidth={2} />
                        </div>
                        <h4 className="font-medium">Claude Anthropic</h4>
                        <p className="text-sm text-muted-foreground">문서 분석 및 검증</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        + 연동 설정
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-4 text-center">
                      <div className="mb-2">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Activity className="h-6 w-6 text-purple-600" strokeWidth={2} />
                        </div>
                        <h4 className="font-medium">Custom MCP Agent</h4>
                        <p className="text-sm text-muted-foreground">맞춤형 모델 연동</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        + 연동 설정
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-dashed border-2 border-gray-300">
                    <CardContent className="p-4 text-center">
                      <div className="mb-2">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                          <Settings className="h-6 w-6 text-orange-600" strokeWidth={2} />
                        </div>
                        <h4 className="font-medium">통계 모델링</h4>
                        <p className="text-sm text-muted-foreground">R/Python 통계 엔진</p>
                      </div>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        + 연동 설정
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">하이브리드 AI 아키텍처</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    통계적 기법, 머신러닝, 외부 AI 에이전트를 조합하여 최적의 성능을 달성합니다.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      아키텍처 설정
                    </Button>
                    <Button variant="outline" size="sm">
                      성능 테스트
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* 주간 성능 트렌드 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" strokeWidth={2} />
                  주간 성능 트렌드
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">+2.3%</div>
                    <div className="text-sm text-green-700">정확도 개선</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">+15%</div>
                    <div className="text-sm text-blue-700">처리속도 향상</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600">-18%</div>
                    <div className="text-sm text-purple-700">오탐률 감소</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 상세 분석 리포트 */}
            <Card>
              <CardHeader>
                <CardTitle>상세 분석 리포트</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Activity className="h-5 w-5 text-blue-600" strokeWidth={2} />
                    <span className="font-medium">AI 모델별 성능 비교 분석</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-green-600" strokeWidth={2} />
                    <span className="font-medium">룰 엔진 효율성 분석</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-orange-600" strokeWidth={2} />
                    <span className="font-medium">이상징후 패턴 분석</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="h-5 w-5 text-purple-600" strokeWidth={2} />
                    <span className="font-medium">시스템 리소스 사용량 분석</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={2} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            {/* 시스템 전역 설정 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" strokeWidth={2} />
                  시스템 전역 설정
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 자동 학습 모드 */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">자동 학습 모드</h3>
                    <p className="text-sm text-muted-foreground">새로운 패턴을 자동으로 학습하여 모델을 개선합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* 실시간 알림 */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">실시간 알림</h3>
                    <p className="text-sm text-muted-foreground">중요한 이상징후 탐지 시 즉시 알림을 발송합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                {/* 성능 모니터링 */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">성능 모니터링</h3>
                    <p className="text-sm text-muted-foreground">시스템 성능을 지속적으로 모니터링합니다</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* 데이터 관리 */}
            <Card>
              <CardHeader>
                <CardTitle>데이터 관리</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                  <Download className="h-4 w-4 mr-2" strokeWidth={2} />룰 설정 가져오기
                </Button>

                <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                  <Download className="h-4 w-4 mr-2" strokeWidth={2} />룰 설정 내보내기
                </Button>

                <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" strokeWidth={2} />
                  시스템 초기화
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isParameterDialogOpen} onOpenChange={setIsParameterDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <DialogTitle className="text-xl font-bold">룰 파라미터 상세 설정</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">매입비용 임계값의 세부 파라미터를 조정하세요</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsParameterDialogOpen(false)} className="h-6 w-6 p-0">
              <X className="h-4 w-4" strokeWidth={2} />
            </Button>
          </DialogHeader>

          <div className="space-y-6">
            {/* 조건 설정 */}
            <div className="space-y-3">
              <h3 className="font-medium">조건 설정</h3>
              <Input
                value={parameterSettings.condition}
                onChange={(e) => setParameterSettings((prev) => ({ ...prev, condition: e.target.value }))}
                className="w-full"
              />
            </div>

            {/* 가중치 설정 */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">가중치 (%)</h3>
                <span className="text-2xl font-bold text-blue-600">{parameterSettings.threshold[0]}%</span>
              </div>
              <Slider
                value={parameterSettings.threshold}
                onValueChange={(value) => setParameterSettings((prev) => ({ ...prev, threshold: value }))}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
            </div>

            {/* 알림 설정 */}
            <div className="space-y-4">
              <h3 className="font-medium">알림 설정</h3>
              <div className="flex items-center space-x-3">
                <Switch
                  checked={parameterSettings.immediateAlert}
                  onCheckedChange={(checked) => setParameterSettings((prev) => ({ ...prev, immediateAlert: checked }))}
                />
                <span className="text-sm">이상징후 탐지 시 즉시 알림</span>
              </div>
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={parameterSettings.dailyReport}
                  onCheckedChange={(checked) => setParameterSettings((prev) => ({ ...prev, dailyReport: checked }))}
                />
                <span className="text-sm">일일 요약 리포트 포함</span>
              </div>
            </div>

            {/* 성능 지표 */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-4">성능 지표</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-blue-700">정확도</div>
                  <div className="text-2xl font-bold text-blue-900">92.3%</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-blue-700">발생 빈도</div>
                  <div className="text-2xl font-bold text-blue-900">15회/월</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-blue-700">오탐률</div>
                  <div className="text-2xl font-bold text-blue-900">2.1%</div>
                </div>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex justify-between pt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" strokeWidth={2} />룰 내보내기
                </Button>
                <Button variant="outline" size="sm">
                  테스트 실행
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsParameterDialogOpen(false)}>
                  취소
                </Button>
                <Button
                  className="bg-teal-600 hover:bg-teal-700 text-white"
                  onClick={() => setIsParameterDialogOpen(false)}
                >
                  저장 및 적용
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
