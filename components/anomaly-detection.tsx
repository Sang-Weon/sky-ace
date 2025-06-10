"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Shield, TrendingUp, Eye, CheckCircle, XCircle, Clock, BarChart3, Users } from "lucide-react"

export default function AnomalyDetection() {
  const [anomalies, setAnomalies] = useState([
    {
      id: 1,
      type: "금액 이상",
      severity: "high",
      description: "평소 거래 금액 대비 300% 초과",
      amount: "₩15,000,000",
      account: "광고선전비",
      accountCode: "522000",
      date: "2024-01-15",
      confidence: 95,
      status: "검토중",
      details: {
        normalRange: { min: 2000000, max: 5000000, avg: 3500000 },
        historicalData: [
          { date: "2024-01-01", amount: 3200000, description: "온라인 광고비" },
          { date: "2024-01-08", amount: 4100000, description: "TV 광고비" },
          { date: "2024-01-12", amount: 2800000, description: "인쇄 광고비" },
        ],
        usagePattern: {
          frequency: "월 3-4회",
          peakPeriod: "분기말",
          commonVendors: ["광고대행사A", "미디어그룹B", "디지털마케팅C"],
        },
        riskFactors: ["금액이 평소 대비 428% 증가", "승인자 부재 시간대 거래", "신규 공급업체와의 거래"],
      },
    },
    {
      id: 2,
      type: "계정 패턴 이상",
      severity: "medium",
      description: "비정상적인 계정과목 조합 감지",
      amount: "₩2,500,000",
      account: "접대비 → 연구개발비",
      accountCode: "523000 → 611000",
      date: "2024-01-14",
      confidence: 78,
      status: "승인됨",
      details: {
        expectedAccount: {
          code: "523000",
          name: "접대비",
          confidence: 92,
          reason: "거래 내용 '고객 미팅' 키워드 매칭",
        },
        actualAccount: {
          code: "611000",
          name: "연구개발비",
          confidence: 23,
          reason: "일반적이지 않은 계정 선택",
        },
        ruleViolations: [
          {
            ruleId: "RULE_045",
            description: "접대비 관련 거래는 523000 계정 사용",
            violationType: "계정과목 불일치",
          },
        ],
        aiRecommendations: [
          { code: "523000", name: "접대비", confidence: 92 },
          { code: "521000", name: "사무용품비", confidence: 15 },
          { code: "611000", name: "연구개발비", confidence: 8 },
        ],
        similarTransactions: [
          { date: "2023-12-15", account: "523000", amount: 2200000, description: "고객 미팅비" },
          { date: "2023-11-20", account: "523000", amount: 1800000, description: "파트너 접대비" },
        ],
      },
    },
    {
      id: 3,
      type: "시간 패턴 이상",
      severity: "low",
      description: "업무시간 외 전표 생성",
      amount: "₩850,000",
      account: "사무용품비",
      accountCode: "521000",
      date: "2024-01-13 23:45",
      confidence: 65,
      status: "무시됨",
      details: {
        normalWorkingHours: "09:00 - 18:00",
        transactionTime: "23:45",
        userPattern: {
          userId: "user123",
          name: "김회계",
          normalHours: "09:00 - 18:00",
          recentActivity: [
            { date: "2024-01-10", time: "14:30", action: "전표 생성" },
            { date: "2024-01-09", time: "16:20", action: "전표 승인" },
            { date: "2024-01-08", time: "10:15", action: "전표 수정" },
          ],
        },
        riskAssessment: {
          level: "낮음",
          factors: ["소액 거래 (100만원 미만)", "일반적인 계정과목 사용", "정기 사용자의 거래"],
        },
        contextualInfo: {
          dayOfWeek: "토요일",
          isHoliday: false,
          systemLoad: "낮음",
          approvalStatus: "자동승인",
        },
      },
    },
  ])

  const [selectedAnomaly, setSelectedAnomaly] = useState(null)
  const [showAnomalyDialog, setShowAnomalyDialog] = useState(false)

  const mlMetrics = {
    accuracy: 94.2,
    precision: 91.8,
    recall: 96.5,
    f1Score: 94.1,
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-blue-600 bg-blue-50 border-blue-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "검토중":
        return <Clock className="h-4 w-4" />
      case "승인됨":
        return <CheckCircle className="h-4 w-4" />
      case "무시됨":
        return <XCircle className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  const handleAnomalyClick = (anomaly) => {
    setSelectedAnomaly(anomaly)
    setShowAnomalyDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* ML 모델 성능 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">정확도</CardTitle>
            <Shield className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlMetrics.accuracy}%</div>
            <Progress value={mlMetrics.accuracy} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">정밀도</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlMetrics.precision}%</div>
            <Progress value={mlMetrics.precision} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">재현율</CardTitle>
            <Eye className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlMetrics.recall}%</div>
            <Progress value={mlMetrics.recall} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">F1 점수</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mlMetrics.f1Score}%</div>
            <Progress value={mlMetrics.f1Score} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* 실시간 알림 */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>새로운 이상 징후 감지:</strong> 평소 거래 패턴과 다른 대규모 거래가 감지되었습니다. 즉시 검토가
          필요합니다.
        </AlertDescription>
      </Alert>

      {/* 이상 탐지 결과 */}
      <Card>
        <CardHeader>
          <CardTitle>이상 징후 탐지 결과</CardTitle>
          <CardDescription>머신러닝 알고리즘이 분석한 분개 항목의 이상 징후들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <div
                key={anomaly.id}
                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${getSeverityColor(anomaly.severity)}`}
                onClick={() => handleAnomalyClick(anomaly)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="outline" className={getSeverityColor(anomaly.severity)}>
                        {anomaly.type}
                      </Badge>
                      <Badge variant="secondary">신뢰도 {anomaly.confidence}%</Badge>
                      <Eye className="h-4 w-4 text-gray-400" />
                    </div>

                    <h4 className="font-medium mb-1">{anomaly.description}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">금액:</span>
                        <p className="font-medium">{anomaly.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">계정:</span>
                        <p className="font-medium">{anomaly.account}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">일시:</span>
                        <p className="font-medium">{anomaly.date}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(anomaly.status)}
                      <span className="text-sm font-medium">{anomaly.status}</span>
                    </div>
                    {anomaly.status === "검토중" && (
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                          승인
                        </Button>
                        <Button size="sm" variant="outline" onClick={(e) => e.stopPropagation()}>
                          거부
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 탐지 규칙 설정 */}
      <Card>
        <CardHeader>
          <CardTitle>탐지 규칙 설정</CardTitle>
          <CardDescription>이상 징후 탐지를 위한 임계값 및 규칙 설정</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">금액 기반 탐지</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>일반 거래 임계값</span>
                  <span>₩1,000,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>고액 거래 임계값</span>
                  <span>₩10,000,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>평균 대비 증가율</span>
                  <span>200%</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">패턴 기반 탐지</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>시간 패턴 분석</span>
                  <Badge variant="secondary">활성화</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>계정 조합 분석</span>
                  <Badge variant="secondary">활성화</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>빈도 패턴 분석</span>
                  <Badge variant="secondary">활성화</Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button>설정 저장</Button>
          </div>
        </CardContent>
      </Card>

      {/* 이상징후 상세 분석 다이얼로그 */}
      <Dialog open={showAnomalyDialog} onOpenChange={setShowAnomalyDialog}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>이상징후 상세 분석</span>
              <Badge variant="outline" className={getSeverityColor(selectedAnomaly?.severity)}>
                {selectedAnomaly?.type}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedAnomaly && (
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-gray-500">거래 금액</span>
                  <p className="text-xl font-bold">{selectedAnomaly.amount}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">계정과목</span>
                  <p className="text-lg font-medium">{selectedAnomaly.account}</p>
                  <p className="text-sm text-gray-500">{selectedAnomaly.accountCode}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">거래 일시</span>
                  <p className="text-lg font-medium">{selectedAnomaly.date}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">신뢰도</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={selectedAnomaly.confidence} className="flex-1" />
                    <span className="font-medium">{selectedAnomaly.confidence}%</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="analysis">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="analysis">상세 분석</TabsTrigger>
                  <TabsTrigger value="historical">과거 데이터</TabsTrigger>
                  <TabsTrigger value="recommendations">권장 조치</TabsTrigger>
                </TabsList>

                <TabsContent value="analysis" className="space-y-4">
                  {/* 금액 이상 분석 */}
                  {selectedAnomaly.type === "금액 이상" && (
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <BarChart3 className="h-4 w-4" />
                            <span>금액 분석</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <span className="text-sm text-gray-500">평소 최소 금액</span>
                              <p className="text-lg font-bold text-green-600">
                                ₩{selectedAnomaly.details.normalRange.min.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">평소 평균 금액</span>
                              <p className="text-lg font-bold text-blue-600">
                                ₩{selectedAnomaly.details.normalRange.avg.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-sm text-gray-500">평소 최대 금액</span>
                              <p className="text-lg font-bold text-orange-600">
                                ₩{selectedAnomaly.details.normalRange.max.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <h4 className="font-medium mb-2">사용 패턴</h4>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">거래 빈도:</span>
                                <span className="ml-2 font-medium">
                                  {selectedAnomaly.details.usagePattern.frequency}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-500">성수기:</span>
                                <span className="ml-2 font-medium">
                                  {selectedAnomaly.details.usagePattern.peakPeriod}
                                </span>
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm text-gray-500">주요 공급업체:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {selectedAnomaly.details.usagePattern.commonVendors.map((vendor, idx) => (
                                  <Badge key={idx} variant="outline">
                                    {vendor}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-red-600">위험 요소</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedAnomaly.details.riskFactors.map((factor, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                                <span className="text-sm">{factor}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* 계정 패턴 이상 분석 */}
                  {selectedAnomaly.type === "계정 패턴 이상" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-green-600">AI 추천 계정</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="font-medium">
                                {selectedAnomaly.details.expectedAccount.code} -{" "}
                                {selectedAnomaly.details.expectedAccount.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Progress
                                  value={selectedAnomaly.details.expectedAccount.confidence}
                                  className="flex-1"
                                />
                                <span className="text-sm">{selectedAnomaly.details.expectedAccount.confidence}%</span>
                              </div>
                              <p className="text-sm text-gray-600">{selectedAnomaly.details.expectedAccount.reason}</p>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-red-600">실제 사용 계정</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              <p className="font-medium">
                                {selectedAnomaly.details.actualAccount.code} -{" "}
                                {selectedAnomaly.details.actualAccount.name}
                              </p>
                              <div className="flex items-center space-x-2">
                                <Progress value={selectedAnomaly.details.actualAccount.confidence} className="flex-1" />
                                <span className="text-sm">{selectedAnomaly.details.actualAccount.confidence}%</span>
                              </div>
                              <p className="text-sm text-gray-600">{selectedAnomaly.details.actualAccount.reason}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>룰 위반 사항</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {selectedAnomaly.details.ruleViolations.map((violation, idx) => (
                            <div key={idx} className="p-3 border rounded-lg">
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="destructive">{violation.ruleId}</Badge>
                                <span className="font-medium">{violation.violationType}</span>
                              </div>
                              <p className="text-sm text-gray-600">{violation.description}</p>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>AI 계정과목 추천 순위</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {selectedAnomaly.details.aiRecommendations.map((rec, idx) => (
                              <div key={idx} className="flex items-center justify-between p-2 border rounded">
                                <div>
                                  <span className="font-medium">
                                    {rec.code} - {rec.name}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Progress value={rec.confidence} className="w-20" />
                                  <span className="text-sm w-12">{rec.confidence}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {/* 시간 패턴 이상 분석 */}
                  {selectedAnomaly.type === "시간 패턴 이상" && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Clock className="h-4 w-4" />
                              <span>시간 분석</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm text-gray-500">정상 업무시간</span>
                                <p className="font-medium">{selectedAnomaly.details.normalWorkingHours}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">거래 시간</span>
                                <p className="font-medium text-red-600">{selectedAnomaly.details.transactionTime}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">요일</span>
                                <p className="font-medium">{selectedAnomaly.details.contextualInfo.dayOfWeek}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                              <Users className="h-4 w-4" />
                              <span>사용자 정보</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div>
                                <span className="text-sm text-gray-500">사용자</span>
                                <p className="font-medium">{selectedAnomaly.details.userPattern.name}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">일반 근무시간</span>
                                <p className="font-medium">{selectedAnomaly.details.userPattern.normalHours}</p>
                              </div>
                              <div>
                                <span className="text-sm text-gray-500">위험도</span>
                                <Badge variant="secondary">{selectedAnomaly.details.riskAssessment.level}</Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle>위험 평가 요소</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedAnomaly.details.riskAssessment.factors.map((factor, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{factor}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="historical" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>과거 거래 이력</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedAnomaly.type === "금액 이상" && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>날짜</TableHead>
                              <TableHead>금액</TableHead>
                              <TableHead>거래 내용</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedAnomaly.details.historicalData.map((data, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>₩{data.amount.toLocaleString()}</TableCell>
                                <TableCell>{data.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}

                      {selectedAnomaly.type === "계정 패턴 이상" && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>날짜</TableHead>
                              <TableHead>계정과목</TableHead>
                              <TableHead>금액</TableHead>
                              <TableHead>거래 내용</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedAnomaly.details.similarTransactions.map((data, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{data.date}</TableCell>
                                <TableCell>{data.account}</TableCell>
                                <TableCell>₩{data.amount.toLocaleString()}</TableCell>
                                <TableCell>{data.description}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}

                      {selectedAnomaly.type === "시간 패턴 이상" && (
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>날짜</TableHead>
                              <TableHead>시간</TableHead>
                              <TableHead>작업</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {selectedAnomaly.details.userPattern.recentActivity.map((activity, idx) => (
                              <TableRow key={idx}>
                                <TableCell>{activity.date}</TableCell>
                                <TableCell>{activity.time}</TableCell>
                                <TableCell>{activity.action}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>권장 조치 사항</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedAnomaly.type === "금액 이상" && (
                          <div className="space-y-3">
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <h4 className="font-medium text-yellow-800">즉시 조치 필요</h4>
                              <p className="text-sm text-yellow-700">승인권자 확인 및 거래 목적 검증</p>
                            </div>
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="font-medium text-blue-800">추가 검토</h4>
                              <p className="text-sm text-blue-700">공급업체 신원 확인 및 계약서 검토</p>
                            </div>
                          </div>
                        )}

                        {selectedAnomaly.type === "계정 패턴 이상" && (
                          <div className="space-y-3">
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                              <h4 className="font-medium text-green-800">계정과목 수정</h4>
                              <p className="text-sm text-green-700">
                                {selectedAnomaly.details.expectedAccount.code} -{" "}
                                {selectedAnomaly.details.expectedAccount.name} 사용 권장
                              </p>
                            </div>
                            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <h4 className="font-medium text-orange-800">룰 업데이트</h4>
                              <p className="text-sm text-orange-700">분개 룰 재검토 및 업데이트 필요</p>
                            </div>
                          </div>
                        )}

                        {selectedAnomaly.type === "시간 패턴 이상" && (
                          <div className="space-y-3">
                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <h4 className="font-medium text-blue-800">모니터링 강화</h4>
                              <p className="text-sm text-blue-700">업무시간 외 거래에 대한 추가 승인 절차 고려</p>
                            </div>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                              <h4 className="font-medium text-gray-800">정책 검토</h4>
                              <p className="text-sm text-gray-700">야간 거래 정책 및 권한 재검토</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAnomalyDialog(false)}>
                  닫기
                </Button>
                <Button variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  거부
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  승인
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
