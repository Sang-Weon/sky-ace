"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Brain,
  Cpu,
  Database,
  Settings,
  Network,
  Eye,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  Activity,
  Clock,
  Target,
} from "lucide-react"

export default function AIEngineManagement() {
  const [selectedEngine, setSelectedEngine] = useState("nlp")
  const [showEngineDialog, setShowEngineDialog] = useState(false)
  const [selectedEngineDetails, setSelectedEngineDetails] = useState(null)

  const [aiEngines, setAiEngines] = useState([
    {
      id: "nlp",
      name: "자연어 처리 엔진",
      type: "NLP",
      status: "running",
      accuracy: 94.2,
      performance: 87.5,
      lastTrained: "2024-01-15 14:30",
      models: [
        {
          name: "KoBERT",
          version: "v2.1",
          accuracy: 95.8,
          status: "active",
          description: "한국어 특화 BERT 모델로 거래 설명 텍스트 분석",
          useCases: ["거래 설명 분석", "계정과목 추천", "텍스트 분류"],
          trainingData: "150만 건의 한국어 전표 데이터",
          lastUpdate: "2024-01-10",
        },
        {
          name: "RoBERTa",
          version: "v1.8",
          accuracy: 93.4,
          status: "active",
          description: "강화된 BERT 모델로 복잡한 거래 패턴 인식",
          useCases: ["복잡한 거래 분석", "다중 계정 처리", "예외 상황 처리"],
          trainingData: "200만 건의 다국어 전표 데이터",
          lastUpdate: "2024-01-08",
        },
        {
          name: "NER 모델",
          version: "v3.0",
          accuracy: 91.7,
          status: "active",
          description: "개체명 인식으로 금액, 거래처, 지불수단 식별",
          useCases: ["개체명 추출", "구조화된 데이터 생성", "자동 태깅"],
          trainingData: "80만 건의 라벨링된 텍스트 데이터",
          lastUpdate: "2024-01-12",
        },
      ],
      metrics: {
        processedToday: 1247,
        avgProcessingTime: "0.8초",
        errorRate: 2.3,
        confidenceThreshold: 85,
      },
    },
    {
      id: "ml",
      name: "머신러닝 분류 엔진",
      type: "ML",
      status: "running",
      accuracy: 91.8,
      performance: 92.1,
      lastTrained: "2024-01-14 09:15",
      models: [
        {
          name: "XGBoost",
          version: "v1.7",
          accuracy: 93.2,
          status: "active",
          description: "그래디언트 부스팅 기반 계정 분류 모델",
          useCases: ["계정과목 분류", "거래 유형 예측", "부서별 배분"],
          trainingData: "300만 건의 과거 전표 데이터",
          lastUpdate: "2024-01-14",
        },
        {
          name: "LightGBM",
          version: "v3.3",
          accuracy: 90.8,
          status: "active",
          description: "경량화된 그래디언트 부스팅 모델",
          useCases: ["실시간 분류", "대용량 데이터 처리", "빠른 예측"],
          trainingData: "250만 건의 최근 3년 데이터",
          lastUpdate: "2024-01-13",
        },
        {
          name: "의사결정 트리",
          version: "v2.5",
          accuracy: 88.9,
          status: "active",
          description: "해석 가능한 규칙 기반 분류 모델",
          useCases: ["규칙 추출", "설명 가능한 AI", "감사 대응"],
          trainingData: "180만 건의 검증된 전표 데이터",
          lastUpdate: "2024-01-11",
        },
      ],
      metrics: {
        processedToday: 2156,
        avgProcessingTime: "0.3초",
        errorRate: 1.8,
        confidenceThreshold: 90,
      },
    },
    {
      id: "deep",
      name: "딥러닝 통합 엔진",
      type: "Deep Learning",
      status: "running",
      accuracy: 96.5,
      performance: 89.3,
      lastTrained: "2024-01-13 16:45",
      models: [
        {
          name: "AccountingBERT",
          version: "v1.2",
          accuracy: 97.1,
          status: "active",
          description: "회계 전용 사전학습된 Transformer 모델",
          useCases: ["복합 거래 분석", "다차원 입력 처리", "고정확도 분류"],
          trainingData: "500만 건의 글로벌 회계 데이터",
          lastUpdate: "2024-01-13",
        },
        {
          name: "MLP 분류기",
          version: "v2.8",
          accuracy: 95.3,
          status: "active",
          description: "다층 퍼셉트론 기반 통합 분류 모델",
          useCases: ["다차원 데이터 통합", "복합 특성 학습", "패턴 인식"],
          trainingData: "400만 건의 다차원 특성 데이터",
          lastUpdate: "2024-01-12",
        },
      ],
      metrics: {
        processedToday: 892,
        avgProcessingTime: "1.2초",
        errorRate: 1.2,
        confidenceThreshold: 95,
      },
    },
    {
      id: "anomaly",
      name: "이상탐지 엔진",
      type: "Anomaly Detection",
      status: "running",
      accuracy: 89.7,
      performance: 94.8,
      lastTrained: "2024-01-12 11:20",
      models: [
        {
          name: "AutoEncoder",
          version: "v1.5",
          accuracy: 91.2,
          status: "active",
          description: "오토인코더 기반 비정상 패턴 탐지",
          useCases: ["이상 거래 탐지", "사기 방지", "예외 상황 식별"],
          trainingData: "100만 건의 정상 거래 패턴",
          lastUpdate: "2024-01-12",
        },
        {
          name: "Isolation Forest",
          version: "v2.1",
          accuracy: 87.8,
          status: "active",
          description: "고립 숲 알고리즘 기반 이상치 탐지",
          useCases: ["실시간 이상 탐지", "빠른 스크리닝", "대용량 처리"],
          trainingData: "200만 건의 거래 로그 데이터",
          lastUpdate: "2024-01-10",
        },
      ],
      metrics: {
        processedToday: 3421,
        avgProcessingTime: "0.1초",
        errorRate: 3.2,
        confidenceThreshold: 80,
      },
    },
    {
      id: "timeseries",
      name: "시계열 예측 엔진",
      type: "Time Series",
      status: "running",
      accuracy: 85.4,
      performance: 91.2,
      lastTrained: "2024-01-11 13:30",
      models: [
        {
          name: "Prophet",
          version: "v1.1",
          accuracy: 87.3,
          status: "active",
          description: "Facebook Prophet 기반 전표 패턴 예측",
          useCases: ["월별 패턴 예측", "계절성 분석", "트렌드 예측"],
          trainingData: "5년간의 월별 전표 데이터",
          lastUpdate: "2024-01-11",
        },
        {
          name: "ARIMA",
          version: "v2.3",
          accuracy: 83.1,
          status: "active",
          description: "자기회귀 통합 이동평균 모델",
          useCases: ["단기 예측", "주기적 패턴", "자동 생성 참고"],
          trainingData: "3년간의 일별 거래 데이터",
          lastUpdate: "2024-01-09",
        },
      ],
      metrics: {
        processedToday: 156,
        avgProcessingTime: "2.1초",
        errorRate: 4.8,
        confidenceThreshold: 75,
      },
    },
    {
      id: "hybrid",
      name: "하이브리드 룰 엔진",
      type: "Rule + AI",
      status: "running",
      accuracy: 98.2,
      performance: 95.7,
      lastTrained: "2024-01-15 10:00",
      models: [
        {
          name: "Drools 룰 엔진",
          version: "v8.4",
          accuracy: 99.1,
          status: "active",
          description: "비즈니스 룰 기반 자동 분개 처리",
          useCases: ["법인카드 처리", "세금계산서 처리", "정형화된 거래"],
          trainingData: "1,200개의 비즈니스 룰",
          lastUpdate: "2024-01-15",
        },
        {
          name: "AI 보조 엔진",
          version: "v1.9",
          accuracy: 96.8,
          status: "active",
          description: "룰로 처리되지 않는 예외 상황 AI 처리",
          useCases: ["예외 상황 처리", "불확실한 거래", "복합 거래"],
          trainingData: "50만 건의 예외 거래 데이터",
          lastUpdate: "2024-01-14",
        },
      ],
      metrics: {
        processedToday: 4523,
        avgProcessingTime: "0.2초",
        errorRate: 0.8,
        confidenceThreshold: 98,
      },
    },
  ])

  const [hybridWeights, setHybridWeights] = useState({
    rules: 60,
    nlp: 15,
    ml: 15,
    deep: 10,
  })

  const [trainingJobs, setTrainingJobs] = useState([
    {
      id: "job_001",
      modelName: "KoBERT",
      status: "completed",
      progress: 100,
      startTime: "2024-01-15 14:00",
      endTime: "2024-01-15 14:30",
      accuracy: 95.8,
      dataSize: "150만 건",
    },
    {
      id: "job_002",
      modelName: "XGBoost",
      status: "running",
      progress: 67,
      startTime: "2024-01-15 15:00",
      endTime: null,
      accuracy: null,
      dataSize: "300만 건",
    },
    {
      id: "job_003",
      modelName: "AccountingBERT",
      status: "queued",
      progress: 0,
      startTime: null,
      endTime: null,
      accuracy: null,
      dataSize: "500만 건",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-100 text-green-800 border-green-200"
      case "stopped":
        return "bg-red-100 text-red-800 border-red-200"
      case "training":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4" />
      case "stopped":
        return <Pause className="h-4 w-4" />
      case "training":
        return <RotateCcw className="h-4 w-4 animate-spin" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const handleEngineClick = (engine) => {
    setSelectedEngineDetails(engine)
    setShowEngineDialog(true)
  }

  return (
    <div className="space-y-6">
      {/* AI 엔진 개요 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">활성 AI 엔진</CardTitle>
            <Brain className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6개</div>
            <p className="text-xs text-muted-foreground">전체 엔진 중 6개 실행 중</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">오늘 처리량</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,395건</div>
            <p className="text-xs text-muted-foreground">전일 대비 +12.3%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 정확도</CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">지난주 대비 +2.1%</p>
          </CardContent>
        </Card>
      </div>

      {/* AI 엔진 목록 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Cpu className="h-5 w-5" />
            <span>AI 엔진 현황</span>
          </CardTitle>
          <CardDescription>각 AI 엔진의 실시간 상태 및 성능 지표</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {aiEngines.map((engine) => (
              <div
                key={engine.id}
                className="border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleEngineClick(engine)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(engine.status)}>
                      {getStatusIcon(engine.status)}
                      <span className="ml-1">{engine.status === "running" ? "실행중" : "중지됨"}</span>
                    </Badge>
                  </div>
                  <Badge variant="secondary">{engine.type}</Badge>
                </div>

                <h3 className="font-semibold mb-2">{engine.name}</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>정확도:</span>
                    <span className="font-medium">{engine.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>성능:</span>
                    <span className="font-medium">{engine.performance}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>오늘 처리:</span>
                    <span className="font-medium">{engine.metrics.processedToday.toLocaleString()}건</span>
                  </div>
                  <div className="flex justify-between">
                    <span>평균 처리시간:</span>
                    <span className="font-medium">{engine.metrics.avgProcessingTime}</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>정확도</span>
                    <span>{engine.accuracy}%</span>
                  </div>
                  <Progress value={engine.accuracy} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 하이브리드 엔진 가중치 설정 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Network className="h-5 w-5" />
            <span>하이브리드 엔진 가중치 설정</span>
          </CardTitle>
          <CardDescription>각 AI 엔진의 최종 결정에 대한 가중치 조정</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <Label>룰 엔진: {hybridWeights.rules}%</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={hybridWeights.rules}
                onChange={(e) => setHybridWeights({ ...hybridWeights, rules: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-500">정형화된 거래 처리</div>
            </div>

            <div className="space-y-3">
              <Label>NLP 엔진: {hybridWeights.nlp}%</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={hybridWeights.nlp}
                onChange={(e) => setHybridWeights({ ...hybridWeights, nlp: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-500">텍스트 분석 기반</div>
            </div>

            <div className="space-y-3">
              <Label>ML 엔진: {hybridWeights.ml}%</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={hybridWeights.ml}
                onChange={(e) => setHybridWeights({ ...hybridWeights, ml: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-500">패턴 학습 기반</div>
            </div>

            <div className="space-y-3">
              <Label>딥러닝: {hybridWeights.deep}%</Label>
              <input
                type="range"
                min="0"
                max="100"
                value={hybridWeights.deep}
                onChange={(e) => setHybridWeights({ ...hybridWeights, deep: Number.parseInt(e.target.value) })}
                className="w-full"
              />
              <div className="text-sm text-gray-500">복합 분석 기반</div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span>총 가중치:</span>
              <span
                className={
                  hybridWeights.rules + hybridWeights.nlp + hybridWeights.ml + hybridWeights.deep === 100
                    ? "text-green-600 font-medium"
                    : "text-red-600 font-medium"
                }
              >
                {hybridWeights.rules + hybridWeights.nlp + hybridWeights.ml + hybridWeights.deep}%
              </span>
            </div>
            {hybridWeights.rules + hybridWeights.nlp + hybridWeights.ml + hybridWeights.deep !== 100 && (
              <p className="text-xs text-red-500 mt-1">가중치 합계가 100%가 되도록 조정해주세요.</p>
            )}
          </div>

          <div className="flex justify-end mt-4">
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              가중치 적용
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 모델 학습 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>모델 학습 현황</span>
          </CardTitle>
          <CardDescription>진행 중인 모델 학습 작업 및 대기열</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>모델명</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>진행률</TableHead>
                <TableHead>시작시간</TableHead>
                <TableHead>데이터 크기</TableHead>
                <TableHead>정확도</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.modelName}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        job.status === "completed" ? "default" : job.status === "running" ? "secondary" : "outline"
                      }
                    >
                      {job.status === "completed" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {job.status === "running" && <RotateCcw className="h-3 w-3 mr-1 animate-spin" />}
                      {job.status === "queued" && <Clock className="h-3 w-3 mr-1" />}
                      {job.status === "completed" ? "완료" : job.status === "running" ? "실행중" : "대기중"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={job.progress} className="w-16" />
                      <span className="text-sm">{job.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{job.startTime || "-"}</TableCell>
                  <TableCell>{job.dataSize}</TableCell>
                  <TableCell>{job.accuracy ? `${job.accuracy}%` : "-"}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {job.status === "running" && (
                        <Button variant="ghost" size="sm">
                          <Pause className="h-3 w-3" />
                        </Button>
                      )}
                      {job.status === "queued" && (
                        <Button variant="ghost" size="sm">
                          <Play className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI 엔진 상세 정보 다이얼로그 */}
      <Dialog open={showEngineDialog} onOpenChange={setShowEngineDialog}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>{selectedEngineDetails?.name} 상세 정보</span>
              <Badge variant="outline" className={getStatusColor(selectedEngineDetails?.status)}>
                {selectedEngineDetails?.status === "running" ? "실행중" : "중지됨"}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedEngineDetails && (
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label className="text-sm font-medium">엔진 유형</Label>
                  <p className="text-lg font-bold">{selectedEngineDetails.type}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">정확도</Label>
                  <p className="text-lg font-bold text-green-600">{selectedEngineDetails.accuracy}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">성능 지수</Label>
                  <p className="text-lg font-bold text-blue-600">{selectedEngineDetails.performance}%</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">마지막 학습</Label>
                  <p className="text-sm">{selectedEngineDetails.lastTrained}</p>
                </div>
              </div>

              <Tabs defaultValue="models">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="models">모델 정보</TabsTrigger>
                  <TabsTrigger value="metrics">성능 지표</TabsTrigger>
                  <TabsTrigger value="settings">설정</TabsTrigger>
                </TabsList>

                <TabsContent value="models" className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {selectedEngineDetails.models.map((model, idx) => (
                      <Card key={idx}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>{model.name}</span>
                            <Badge variant={model.status === "active" ? "default" : "secondary"}>
                              {model.status === "active" ? "활성" : "비활성"}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{model.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-500">버전:</span>
                              <span className="ml-2 font-medium">{model.version}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">정확도:</span>
                              <span className="ml-2 font-medium">{model.accuracy}%</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-500">학습 데이터:</span>
                              <span className="ml-2 font-medium">{model.trainingData}</span>
                            </div>
                            <div className="col-span-2">
                              <span className="text-gray-500">마지막 업데이트:</span>
                              <span className="ml-2 font-medium">{model.lastUpdate}</span>
                            </div>
                          </div>

                          <div>
                            <Label className="text-sm font-medium">주요 사용 사례</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {model.useCases.map((useCase, ucIdx) => (
                                <Badge key={ucIdx} variant="outline" className="text-xs">
                                  {useCase}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">오늘 처리량</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">
                          {selectedEngineDetails.metrics.processedToday.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500">건</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">평균 처리시간</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{selectedEngineDetails.metrics.avgProcessingTime}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">오류율</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-red-600">{selectedEngineDetails.metrics.errorRate}%</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">신뢰도 임계값</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{selectedEngineDetails.metrics.confidenceThreshold}%</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>신뢰도 임계값</Label>
                        <Input
                          type="number"
                          value={selectedEngineDetails.metrics.confidenceThreshold}
                          onChange={() => {}}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>배치 크기</Label>
                        <Select defaultValue="1000">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="500">500</SelectItem>
                            <SelectItem value="1000">1000</SelectItem>
                            <SelectItem value="2000">2000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label>자동 재학습</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch defaultChecked />
                        <Label>실시간 모니터링</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label>디버그 모드</Label>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEngineDialog(false)}>
                  닫기
                </Button>
                <Button variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  엔진 중지
                </Button>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  설정 저장
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
