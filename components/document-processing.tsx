"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Mail, Scan, FileText, CheckCircle, Clock, Link, Eye, X, RefreshCw } from "lucide-react"

export default function DocumentProcessing() {
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "세금계산서_2024001.pdf",
      type: "세금계산서",
      status: "처리완료",
      amount: "₩1,100,000",
      url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf", // 실제 PDF URL 추가
      extractedData: {
        supplier: "ABC 주식회사",
        date: "2024-01-15",
        items: "소프트웨어 라이선스",
      },
    },
    {
      id: 2,
      name: "영수증_카페_240115.jpg",
      type: "영수증",
      status: "처리중",
      amount: "₩45,000",
      url: "/placeholder.svg?height=400&width=300",
      extractedData: null,
    },
  ])

  const [emailSources, setEmailSources] = useState([
    {
      sender: "accounting@supplier.com",
      email: "accounting@supplier.com",
      subject: "세금계산서 발행 안내",
      received: "10분 전",
      status: "대기중",
      attachments: ["invoice_2024001.pdf"],
    },
    {
      sender: "김재무",
      email: "bills@vendor.co.kr",
      subject: "월 사용료 청구서",
      received: "1시간 전",
      status: "처리완료",
      attachments: ["monthly_bill.pdf", "usage_details.xlsx"],
    },
    {
      sender: "박경리",
      email: "park@partner.com",
      subject: "1월 거래명세서 발송",
      received: "3시간 전",
      status: "대기중",
      attachments: ["transaction_details_jan.pdf"],
    },
  ])

  const [selectedEmail, setSelectedEmail] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [ocrStatus, setOcrStatus] = useState({
    connected: true,
    provider: "ABBYY FlexiCapture",
    accuracy: "96.8%",
    lastSync: "2분 전",
    processingSpeed: "평균 2.5초/페이지",
    documentsToday: 47,
  })

  const [connectedAccounts, setConnectedAccounts] = useState([
    {
      name: "회계팀 공용",
      email: "accounting@company.com",
      lastSync: "5분 전",
      status: "연결됨",
    },
    {
      name: "김재무",
      email: "kim@company.com",
      lastSync: "30분 전",
      status: "연결됨",
    },
  ])

  const [emailFormData, setEmailFormData] = useState({
    name: "",
    email: "",
    provider: "",
  })

  const handleEmailClick = (email) => {
    setSelectedEmail(email)
  }

  const handleFileClick = (file) => {
    setSelectedFile(file)
  }

  return (
    <div className="space-y-6">
      {/* 문서 업로드 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>파일 업로드</span>
            </CardTitle>
            <CardDescription>증빙 문서를 직접 업로드</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-4">
                <Button variant="outline">파일 선택</Button>
                <p className="mt-2 text-sm text-gray-500">PDF, JPG, PNG 파일 지원</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>이메일 연동</span>
            </CardTitle>
            <CardDescription>이메일 자동 수집 설정</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="accounts">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="accounts">연결된 계정</TabsTrigger>
                <TabsTrigger value="add">계정 추가</TabsTrigger>
              </TabsList>
              <TabsContent value="accounts" className="space-y-4 pt-4">
                {connectedAccounts.map((account, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{account.name}</p>
                      <p className="text-sm text-blue-600 cursor-pointer hover:underline">{account.email}</p>
                      <p className="text-xs text-gray-500">마지막 동기화: {account.lastSync}</p>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      {account.status}
                    </Badge>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="add" className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="email-name">이름</Label>
                  <Input
                    id="email-name"
                    placeholder="홍길동"
                    value={emailFormData.name}
                    onChange={(e) => setEmailFormData({ ...emailFormData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">이메일 주소</Label>
                  <Input
                    id="email"
                    placeholder="email@company.com"
                    value={emailFormData.email}
                    onChange={(e) => setEmailFormData({ ...emailFormData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email-provider">이메일 제공자</Label>
                  <Select
                    value={emailFormData.provider}
                    onValueChange={(value) => setEmailFormData({ ...emailFormData, provider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="제공자 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gmail">Gmail</SelectItem>
                      <SelectItem value="outlook">Outlook</SelectItem>
                      <SelectItem value="naver">Naver</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">계정 연결</Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className={ocrStatus.connected ? "border-green-200" : "border-red-200"}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Scan className="h-5 w-5" />
                <span>OCR 연동 상태</span>
              </CardTitle>
              <Badge variant={ocrStatus.connected ? "default" : "destructive"}>
                {ocrStatus.connected ? "연결됨" : "오프라인"}
              </Badge>
            </div>
            <CardDescription>
              <span className="font-medium">{ocrStatus.provider}</span> OCR 엔진 연동 상태
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm space-y-2">
              <div className="flex justify-between mb-2">
                <span>인식 정확도</span>
                <span className="font-medium">{ocrStatus.accuracy}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>처리 속도</span>
                <span className="font-medium">{ocrStatus.processingSpeed}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>오늘 처리 문서</span>
                <span className="font-medium">{ocrStatus.documentsToday}건</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>마지막 동기화</span>
                <span className="font-medium">{ocrStatus.lastSync}</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                동기화
              </Button>
              <Button variant="outline" className="w-full">
                <Link className="h-4 w-4 mr-2" />
                OCR 대시보드
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 이메일 수집 현황 */}
      <Card>
        <CardHeader>
          <CardTitle>이메일 자동 수집 현황</CardTitle>
          <CardDescription>연동된 이메일 계정에서 수집된 문서들</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emailSources.map((email, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{email.subject}</p>
                    <p className="text-sm">
                      <span
                        className="text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handleEmailClick(email)}
                      >
                        {email.sender} &lt;{email.email}&gt;
                      </span>
                      <span className="text-gray-500"> • {email.received}</span>
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {email.attachments.map((attachment, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {attachment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={email.status === "처리완료" ? "default" : "secondary"}>{email.status}</Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 업로드된 파일 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>문서 처리 현황</CardTitle>
          <CardDescription>업로드된 문서의 OCR 처리 및 데이터 추출 결과</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <p
                        className="font-medium text-blue-600 cursor-pointer hover:underline"
                        onClick={() => handleFileClick(file)}
                      >
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">{file.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={file.status === "처리완료" ? "default" : "secondary"}>
                      {file.status === "처리완료" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {file.status}
                    </Badge>
                    <span className="font-medium">{file.amount}</span>
                  </div>
                </div>

                {file.extractedData && (
                  <div className="bg-gray-50 rounded p-3 mt-3">
                    <h4 className="font-medium mb-2">추출된 데이터</h4>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">공급업체:</span>
                        <p className="font-medium">{file.extractedData.supplier}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">날짜:</span>
                        <p className="font-medium">{file.extractedData.date}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">품목:</span>
                        <p className="font-medium">{file.extractedData.items}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 이메일 상세 보기 다이얼로그 */}
      <Dialog open={selectedEmail !== null} onOpenChange={(open) => !open && setSelectedEmail(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedEmail?.subject}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEmail(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedEmail && (
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-sm text-gray-500">보낸 사람:</p>
                    <p className="font-medium">
                      {selectedEmail.sender} &lt;{selectedEmail.email}&gt;
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">수신 시간:</p>
                    <p className="font-medium">{selectedEmail.received}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">첨부 파일</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedEmail.attachments.map((attachment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span>{attachment}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          보기
                        </Button>
                        <Button variant="outline" size="sm">
                          <Scan className="h-3 w-3 mr-1" />
                          OCR 처리
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  메일 열기
                </Button>
                <Button>
                  <Scan className="h-4 w-4 mr-2" />
                  모든 첨부파일 처리
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 파일 미리보기 다이얼로그 */}
      <Dialog open={selectedFile !== null} onOpenChange={(open) => !open && setSelectedFile(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedFile?.name}</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedFile && (
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-lg overflow-hidden min-h-[500px]">
                {selectedFile.name.endsWith(".pdf") ? (
                  <div className="h-[500px] w-full">
                    <iframe
                      src={selectedFile.url}
                      className="w-full h-full border-0"
                      title={`PDF 뷰어 - ${selectedFile.name}`}
                    />
                  </div>
                ) : (
                  <div className="h-[500px] flex items-center justify-center">
                    <img
                      src={selectedFile.url || "/placeholder.svg"}
                      alt="문서 미리보기"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {selectedFile.extractedData && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">OCR 추출 데이터</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">공급업체:</p>
                      <p className="font-medium">{selectedFile.extractedData.supplier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">날짜:</p>
                      <p className="font-medium">{selectedFile.extractedData.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">품목:</p>
                      <p className="font-medium">{selectedFile.extractedData.items}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">금액:</p>
                      <p className="font-medium">{selectedFile.amount}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                {selectedFile.status !== "처리완료" ? (
                  <Button>
                    <Scan className="h-4 w-4 mr-2" />
                    OCR 처리 시작
                  </Button>
                ) : (
                  <Button>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    전표 생성
                  </Button>
                )}
                {selectedFile.name.endsWith(".pdf") && (
                  <Button onClick={() => window.open(selectedFile.url, "_blank")}>
                    <Eye className="h-4 w-4 mr-2" />새 창에서 열기
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
