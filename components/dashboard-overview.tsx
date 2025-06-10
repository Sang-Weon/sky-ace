"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, CheckCircle, AlertTriangle, Clock, Eye, Filter } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function DashboardOverview() {
  const [showToBeProcessedDialog, setShowToBeProcessedDialog] = useState(false)
  const [showProcessedDialog, setShowProcessedDialog] = useState(false)
  const [showManualProcessDialog, setShowManualProcessDialog] = useState(false)
  const [selectedManualEntry, setSelectedManualEntry] = useState(null)
  const [manualFormData, setManualFormData] = useState({
    description: "",
    debitAccount: "",
    creditAccount: "",
    memo: "",
  })

  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [selectedDetailEntry, setSelectedDetailEntry] = useState(null)

  const stats = [
    {
      title: "오늘 처리될 전표",
      value: "371",
      change: "+8",
      icon: Clock,
      color: "text-blue-600",
      onClick: () => setShowToBeProcessedDialog(true),
    },
    {
      title: "오늘 처리된 전표",
      value: "247",
      change: "+12%",
      icon: FileText,
      color: "text-green-600",
      onClick: () => setShowProcessedDialog(true),
    },
    {
      title: "자동 승인률",
      value: "94.2%",
      change: "+2.1%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "이상 탐지 건수",
      value: "3",
      change: "-5",
      icon: AlertTriangle,
      color: "text-red-600",
    },
  ]

  const toBeProcessedEntries = [
    {
      id: "JE-2024-0125",
      description: "소프트웨어 라이선스 구매",
      amount: "₩1,100,000",
      dueTime: "10:30",
      priority: "높음",
      status: "대기중",
      type: "자동",
    },
    {
      id: "JE-2024-0126",
      description: "사무용품 구매",
      amount: "₩450,000",
      dueTime: "11:00",
      priority: "중간",
      status: "대기중",
      type: "자동",
    },
    {
      id: "JE-2024-0127",
      description: "출장비 정산",
      amount: "₩2,300,000",
      dueTime: "13:30",
      priority: "낮음",
      status: "대기중",
      type: "수동",
    },
    {
      id: "JE-2024-0128",
      description: "광고비 지급",
      amount: "₩15,000,000",
      dueTime: "14:00",
      priority: "높음",
      status: "검토필요",
      type: "자동",
    },
    {
      id: "JE-2024-0129",
      description: "임대료 지급",
      amount: "₩5,500,000",
      dueTime: "15:30",
      priority: "중간",
      status: "대기중",
      type: "자동",
    },
    // 366개의 추가 항목을 생성합니다
    ...Array.from({ length: 366 }, (_, i) => ({
      id: `JE-2024-${String(130 + i).padStart(4, "0")}`,
      description: [
        "매출 전표 처리",
        "구매 전표 처리",
        "급여 지급",
        "복리후생비",
        "통신비 지급",
        "전력비 지급",
        "수도료 지급",
        "가스비 지급",
        "보험료 지급",
        "세금 납부",
        "임대료 지급",
        "수선비",
        "소모품비",
        "교육훈련비",
        "회의비",
        "접대비",
        "광고선전비",
        "운송비",
        "여비교통비",
        "차량유지비",
        "감가상각비",
        "대손상각비",
        "퇴직급여",
        "상여금",
        "제수당",
        "법정복리비",
        "복리후생비",
        "산재보험료",
        "고용보험료",
        "국민연금",
        "건강보험료",
        "장기요양보험료",
        "소득세",
        "지방소득세",
        "부가가치세",
      ][i % 35],
      amount: `₩${(Math.floor(Math.random() * 50) + 1) * 100000}`,
      dueTime: `${Math.floor(Math.random() * 8) + 9}:${Math.floor(Math.random() * 6) * 10}`,
      priority: ["높음", "중간", "낮음"][Math.floor(Math.random() * 3)],
      status: ["대기중", "검토필요"][Math.floor(Math.random() * 2)],
      type: ["자동", "수동"][Math.floor(Math.random() * 2)],
    })),
  ]

  const processedEntries = [
    {
      id: "JE-2024-0120",
      description: "매출 전표 처리",
      amount: "₩1,250,000",
      processedTime: "09:15",
      status: "정상",
      type: "자동",
      approver: "시스템",
      rule: "매출인식 자동분개",
      aiWeights: { gpt4: 0.6, claude: 0.4 },
      confidence: 0.95,
    },
    {
      id: "JE-2024-0121",
      description: "급여 지급",
      amount: "₩8,500,000",
      processedTime: "09:30",
      status: "정상",
      type: "자동",
      approver: "시스템",
      rule: "급여 자동분개",
      aiWeights: { gpt4: 0.7, claude: 0.3 },
      confidence: 0.98,
    },
    {
      id: "JE-2024-0122",
      description: "접대비 처리",
      amount: "₩350,000",
      processedTime: "10:20",
      status: "이상",
      type: "수동",
      approver: "김재무",
      pdfUrl: "/documents/JE-2024-0122.pdf",
      reviewer: "김재무",
      reviewNotes: "한도 초과로 인한 수동 검토",
    },
    {
      id: "JE-2024-0123",
      description: "운송비 지급",
      amount: "₩780,000",
      processedTime: "11:05",
      status: "정상",
      type: "자동",
      approver: "시스템",
      rule: "운송비 자동분개",
      aiWeights: { gpt4: 0.5, claude: 0.5 },
      confidence: 0.92,
    },
    {
      id: "JE-2024-0124",
      description: "통신비 지급",
      amount: "₩2,100,000",
      processedTime: "11:45",
      status: "정상",
      type: "자동",
      approver: "시스템",
      rule: "통신비 자동분개",
      aiWeights: { gpt4: 0.8, claude: 0.2 },
      confidence: 0.97,
    },
    // 242개의 추가 항목을 생성합니다
    ...Array.from({ length: 242 }, (_, i) => ({
      id: `JE-2024-${String(125 + i).padStart(4, "0")}`,
      description: [
        "매출 전표 처리",
        "구매 전표 처리",
        "급여 지급",
        "복리후생비",
        "통신비 지급",
        "전력비 지급",
        "수도료 지급",
        "가스비 지급",
        "보험료 지급",
        "세금 납부",
        "임대료 지급",
        "수선비",
        "소모품비",
        "교육훈련비",
        "회의비",
        "접대비",
        "광고선전비",
        "운송비",
        "여비교통비",
        "차량유지비",
        "감가상각비",
        "대손상각비",
        "퇴직급여",
        "상여금",
        "제수당",
        "법정복리비",
        "복리후생비",
        "산재보험료",
        "고용보험료",
        "국민연금",
        "건강보험료",
        "장기요양보험료",
        "소득세",
        "지방소득세",
        "부가가치세",
      ][i % 35],
      amount: `₩${(Math.floor(Math.random() * 50) + 1) * 100000}`,
      processedTime: `${Math.floor(Math.random() * 8) + 9}:${Math.floor(Math.random() * 6) * 10}`,
      status: ["정상", "이상"][Math.floor(Math.random() * 10) > 8 ? 1 : 0],
      type: ["자동", "수동"][Math.floor(Math.random() * 10) > 7 ? 1 : 0],
      approver: Math.random() > 0.8 ? ["김재무", "이회계", "박관리"][Math.floor(Math.random() * 3)] : "시스템",
      rule: [
        "매출인식 자동분개",
        "구매비용 자동분개",
        "급여 자동분개",
        "복리후생비 자동분개",
        "통신비 자동분개",
        "공과금 자동분개",
        "세금 자동분개",
        "임대료 자동분개",
        "수선비 자동분개",
        "소모품비 자동분개",
      ][Math.floor(Math.random() * 10)],
      aiWeights: {
        gpt4: Math.round((Math.random() * 0.5 + 0.3) * 100) / 100,
        claude: Math.round((Math.random() * 0.5 + 0.2) * 100) / 100,
      },
      confidence: Math.round((Math.random() * 0.2 + 0.8) * 100) / 100,
      pdfUrl: Math.random() > 0.8 ? `/documents/JE-2024-${String(125 + i).padStart(4, "0")}.pdf` : null,
      reviewer: Math.random() > 0.8 ? ["김재무", "이회계", "박관리"][Math.floor(Math.random() * 3)] : null,
      reviewNotes: Math.random() > 0.8 ? "수동 검토 완료" : null,
    })),
  ]

  const recentActivities = [
    {
      type: "success",
      message: "매출 전표 자동 생성 완료",
      time: "2분 전",
      amount: "₩1,250,000",
    },
    {
      type: "warning",
      message: "계정과목 매칭 검토 필요",
      time: "5분 전",
      amount: "₩850,000",
    },
    {
      type: "info",
      message: "OCR 문서 처리 완료",
      time: "8분 전",
      amount: "₩2,100,000",
    },
    {
      type: "success",
      message: "ERP 전표 등록 승인",
      time: "12분 전",
      amount: "₩675,000",
    },
  ]

  return (
    <div className="space-y-6">
      {/* 주요 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={index < 2 ? "cursor-pointer hover:shadow-md transition-shadow" : ""}
            onClick={stat.onClick}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.change}</span>{" "}
                {index === 0 ? "전일 대비" : index === 1 ? "전일 대비" : "전일 대비"}
              </p>
              {index < 2 && (
                <div className="mt-2 text-xs text-blue-600">
                  <Eye className="inline h-3 w-3 mr-1" />
                  클릭하여 상세 내역 보기
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 처리 현황 */}
        <Card>
          <CardHeader>
            <CardTitle>실시간 처리 현황</CardTitle>
            <CardDescription>FCM 기준 업무별 진행 상황</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>회계전표 생성</span>
                <span>85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>ERP 전표 등록</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>자동 분개 로직</span>
                <span>78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>이상항목 탐지</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>증빙 OCR 처리</span>
                <span>89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* 최근 활동 */}
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>실시간 전표 처리 로그</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.type === "success"
                        ? "bg-green-500"
                        : activity.type === "warning"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">{activity.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 오늘 처리될 전표 다이얼로그 */}
      <Dialog open={showToBeProcessedDialog} onOpenChange={setShowToBeProcessedDialog}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span>오늘 처리될 전표 목록</span>
              <Badge variant="outline" className="ml-2">
                총 371건
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-3 w-3 mr-1" />
                필터
              </Button>
              <Button variant="outline" size="sm">
                전체
              </Button>
              <Button variant="outline" size="sm" className="bg-blue-50">
                우선순위 높음
              </Button>
            </div>
            <Button size="sm">일괄 처리</Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>전표 ID</TableHead>
                  <TableHead>내용</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>처리예정</TableHead>
                  <TableHead>우선순위</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>유형</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {toBeProcessedEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.id}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>{entry.amount}</TableCell>
                    <TableCell>{entry.dueTime}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          entry.priority === "높음"
                            ? "destructive"
                            : entry.priority === "중간"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {entry.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={entry.status === "검토필요" ? "text-orange-600 bg-orange-50" : ""}
                      >
                        {entry.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={entry.type === "자동" ? "default" : "secondary"}>{entry.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (entry.type === "수동") {
                            setSelectedManualEntry(entry)
                            setManualFormData({
                              description: entry.description,
                              debitAccount: "",
                              creditAccount: "",
                              memo: "",
                            })
                            setShowManualProcessDialog(true)
                          } else {
                            // 자동 처리 로직
                          }
                        }}
                      >
                        처리
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* 오늘 처리된 전표 다이얼로그 */}
      <Dialog open={showProcessedDialog} onOpenChange={setShowProcessedDialog}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-green-600" />
              <span>오늘 처리된 전표 목록</span>
              <Badge variant="outline" className="ml-2">
                총 247건
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Filter className="h-3 w-3 mr-1" />
                필터
              </Button>
              <Button variant="outline" size="sm">
                전체
              </Button>
              <Button variant="outline" size="sm" className="bg-red-50">
                이상 항목
              </Button>
            </div>
            <Button size="sm" variant="outline">
              내보내기
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>전표 ID</TableHead>
                  <TableHead>내용</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>처리시간</TableHead>
                  <TableHead>상태</TableHead>
                  <TableHead>처리유형</TableHead>
                  <TableHead>승인자</TableHead>
                  <TableHead className="text-right">작업</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.id}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>{entry.amount}</TableCell>
                    <TableCell>{entry.processedTime}</TableCell>
                    <TableCell>
                      <Badge variant={entry.status === "정상" ? "default" : "destructive"}>{entry.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={entry.type === "자동" ? "secondary" : "outline"}>{entry.type}</Badge>
                    </TableCell>
                    <TableCell>{entry.approver}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDetailEntry(entry)
                          setShowDetailDialog(true)
                        }}
                      >
                        상세
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* 수동 처리 입력 다이얼로그 */}
      <Dialog open={showManualProcessDialog} onOpenChange={setShowManualProcessDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>수동 전표 처리</DialogTitle>
          </DialogHeader>

          {selectedManualEntry && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>전표 ID</Label>
                  <Input value={selectedManualEntry.id} readOnly />
                </div>
                <div>
                  <Label>금액</Label>
                  <Input value={selectedManualEntry.amount} readOnly />
                </div>
              </div>

              <div>
                <Label>거래 내용</Label>
                <Input
                  value={manualFormData.description}
                  onChange={(e) => setManualFormData({ ...manualFormData, description: e.target.value })}
                  placeholder="거래 내용을 입력하세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>차변 계정</Label>
                  <Select
                    value={manualFormData.debitAccount}
                    onValueChange={(value) => setManualFormData({ ...manualFormData, debitAccount: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="계정과목 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">현금</SelectItem>
                      <SelectItem value="bank">보통예금</SelectItem>
                      <SelectItem value="receivable">매출채권</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>대변 계정</Label>
                  <Select
                    value={manualFormData.creditAccount}
                    onValueChange={(value) => setManualFormData({ ...manualFormData, creditAccount: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="계정과목 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="payable">매입채무</SelectItem>
                      <SelectItem value="revenue">매출</SelectItem>
                      <SelectItem value="expense">비용</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>적요</Label>
                <Textarea
                  value={manualFormData.memo}
                  onChange={(e) => setManualFormData({ ...manualFormData, memo: e.target.value })}
                  placeholder="전표 적요를 입력하세요"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowManualProcessDialog(false)
                    setManualFormData({ description: "", debitAccount: "", creditAccount: "", memo: "" })
                  }}
                >
                  취소
                </Button>
                <Button>전표 생성</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 전표 상세 정보 다이얼로그 */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <span>전표 상세 정보</span>
              {selectedDetailEntry && (
                <Badge variant="outline" className="ml-2">
                  {selectedDetailEntry.id}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>

          {selectedDetailEntry && (
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">전표 ID</Label>
                  <p className="text-lg font-semibold">{selectedDetailEntry.id}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">처리 시간</Label>
                  <p className="text-lg">{selectedDetailEntry.processedTime}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">거래 내용</Label>
                  <p className="text-lg">{selectedDetailEntry.description}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">금액</Label>
                  <p className="text-lg font-semibold text-green-600">{selectedDetailEntry.amount}</p>
                </div>
              </div>

              {/* 자동 처리 상세 정보 */}
              {selectedDetailEntry.type === "자동" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">자동 처리 상세</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">적용된 분개룰</Label>
                      <p className="text-base font-medium text-blue-600">{selectedDetailEntry.rule}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">신뢰도</Label>
                      <div className="flex items-center space-x-2">
                        <Progress value={selectedDetailEntry.confidence * 100} className="flex-1" />
                        <span className="text-sm font-medium">
                          {(selectedDetailEntry.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">AI 모델별 가중치</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">GPT-4</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={selectedDetailEntry.aiWeights.gpt4 * 100} className="w-32" />
                          <span className="text-sm font-medium w-12">
                            {(selectedDetailEntry.aiWeights.gpt4 * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Claude</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={selectedDetailEntry.aiWeights.claude * 100} className="w-32" />
                          <span className="text-sm font-medium w-12">
                            {(selectedDetailEntry.aiWeights.claude * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 수동 처리 상세 정보 */}
              {selectedDetailEntry.type === "수동" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold border-b pb-2">수동 처리 상세</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">검토자</Label>
                      <p className="text-base font-medium">
                        {selectedDetailEntry.reviewer || selectedDetailEntry.approver}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">검토 의견</Label>
                      <p className="text-base">{selectedDetailEntry.reviewNotes || "검토 완료"}</p>
                    </div>
                  </div>

                  {selectedDetailEntry.pdfUrl && (
                    <div>
                      <Label className="text-sm font-medium text-gray-500 mb-2 block">증빙 자료</Label>
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-5 w-5 text-red-600" />
                            <span className="font-medium">증빙서류.pdf</span>
                            <Badge variant="secondary" className="text-xs">
                              PDF
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(selectedDetailEntry.pdfUrl, "_blank")}
                            >
                              미리보기
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const link = document.createElement("a")
                                link.href = selectedDetailEntry.pdfUrl
                                link.download = `${selectedDetailEntry.id}_증빙서류.pdf`
                                link.click()
                              }}
                            >
                              다운로드
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowDetailDialog(false)}>
                  닫기
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
