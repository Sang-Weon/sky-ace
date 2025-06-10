"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Bot,
  FileText,
  Brain,
  Settings,
  Zap,
  TrendingUp,
  BarChart3,
  Network,
  Building,
} from "lucide-react"

export default function JournalEntryGeneration() {
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      date: "2024-01-15",
      description: "소프트웨어 라이선스 구매",
      reference: "INV-2024-001",
      status: "승인대기",
      totalAmount: 1100000,
      appliedRules: ["RULE_001", "RULE_003"],
      confidence: 94,
      entries: [
        {
          account: "소프트웨어",
          accountCode: "132000",
          debit: 1100000,
          credit: 0,
          postingOrg: "본사",
          attributionOrg: "IT부서",
          budgetCode: "IT-2024-001",
          partnerType: "공급업체",
        },
        {
          account: "미지급금",
          accountCode: "213000",
          debit: 0,
          credit: 1000000,
          postingOrg: "본사",
          attributionOrg: "IT부서",
          budgetCode: "IT-2024-001",
          partnerType: "공급업체",
        },
        {
          account: "부가세대급금",
          accountCode: "214000",
          debit: 0,
          credit: 100000,
          postingOrg: "본사",
          attributionOrg: "IT부서",
          budgetCode: "IT-2024-001",
          partnerType: "공급업체",
        },
      ],
    },
  ])

  const [ruleEngine, setRuleEngine] = useState({
    connected: true,
    provider: "SAP Business Rules Framework",
    totalRules: 247,
    activeRules: 231,
    lastSync: "3분 전",
    performance: 96.8,
  })

  const [ruleParameters, setRuleParameters] = useState([
    {
      id: "PARAM_001",
      name: "거래금액_임계값",
      value: "1000000",
      type: "number",
      description: "고액거래 분류 기준",
      category: "금액기준",
      usage: 89,
    },
    {
      id: "PARAM_002",
      name: "공급업체_분류코드",
      value: "VENDOR_TYPE_A",
      type: "string",
      description: "공급업체 유형 분류",
      category: "거래처분류",
      usage: 76,
    },
    {
      id: "PARAM_003",
      name: "부서별_예산한도",
      value: "50000000",
      type: "number",
      description: "부서별 월 예산 한도",
      category: "예산관리",
      usage: 92,
    },
  ])

  const [aiAlgorithms, setAiAlgorithms] = useState([
    {
      name: "Rule-Based Engine",
      type: "rule",
      accuracy: 94.2,
      speed: "0.2초",
      confidence: 96,
      description: "기존 분개 룰 기반 매칭",
      pros: ["높은 정확도", "일관성", "투명성"],
      cons: ["유연성 부족", "새로운 패턴 대응 어려움"],
      icon: Settings,
    },
    {
      name: "Machine Learning",
      type: "ml",
      accuracy: 91.8,
      speed: "0.8초",
      confidence: 89,
      description: "과거 데이터 학습 기반 예측",
      pros: ["패턴 학습", "자동 개선", "새로운 거래 대응"],
      cons: ["블랙박스", "데이터 의존성"],
      icon: Brain,
    },
    {
      name: "Natural Language Processing",
      type: "nlp",
      accuracy: 87.5,
      speed: "1.2초",
      confidence: 82,
      description: "거래 내용 텍스트 분석",
      pros: ["자연어 이해", "맥락 파악", "유연한 해석"],
      cons: ["언어 의존성", "모호성 처리"],
      icon: FileText,
    },
    {
      name: "Hybrid Ensemble",
      type: "hybrid",
      accuracy: 97.1,
      speed: "1.5초",
      confidence: 98,
      description: "다중 알고리즘 조합 최적화",
      pros: ["최고 정확도", "강건성", "상호 보완"],
      cons: ["복잡성", "계산 비용"],
      icon: Network,
    },
  ])

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("hybrid")
  const [showRuleDialog, setShowRuleDialog] = useState(false)
  const [showAlgorithmDialog, setShowAlgorithmDialog] = useState(false)

  const [hybridWeights, setHybridWeights] = useState({
    rule: 40,
    ml: 35,
    nlp: 25,
  })

  const [aiRecommendations, setAiRecommendations] = useState({
    accounts: [
      {
        code: "132000",
        name: "소프트웨어",
        confidence: 95,
        reason: "Rule-Based: RULE_001 매칭",
        algorithm: "rule",
        ruleId: "RULE_001",
      },
      {
        code: "521000",
        name: "사무용품비",
        confidence: 87,
        reason: "ML: 유사 거래 패턴 분석",
        algorithm: "ml",
        similarity: 0.89,
      },
      {
        code: "522000",
        name: "통신비",
        confidence: 72,
        reason: "NLP: 키워드 '소프트웨어' 분석",
        algorithm: "nlp",
        keywords: ["소프트웨어", "라이선스"],
      },
    ],
    coaRecommendations: {
      postingOrg: [
        { code: "HQ", name: "본사", confidence: 92, description: "주요 거래 발생 조직" },
        { code: "BR01", name: "서울지점", confidence: 78, description: "지역별 분산 처리" },
      ],
      attributionOrg: [
        { code: "IT", name: "IT부서", confidence: 94, description: "소프트웨어 관련 비용 귀속" },
        { code: "ADM", name: "총무부서", confidence: 85, description: "일반 관리 비용" },
        { code: "FIN", name: "재무부서", confidence: 73, description: "재무 관련 업무" },
      ],
      budgetCodes: [
        { code: "IT-2024-001", name: "IT 인프라 구축", confidence: 89, budget: 50000000, used: 32000000 },
        { code: "ADM-2024-002", name: "일반관리비", confidence: 82, budget: 30000000, used: 18000000 },
        { code: "DEV-2024-003", name: "개발비용", confidence: 76, budget: 80000000, used: 45000000 },
      ],
      partnerTypes: [
        { code: "VENDOR", name: "공급업체", confidence: 91, description: "소프트웨어 공급업체" },
        { code: "CUSTOMER", name: "고객", confidence: 15, description: "일반 고객" },
        { code: "EMPLOYEE", name: "임직원", confidence: 8, description: "내부 직원" },
      ],
      customerGroups: [
        { code: "ENTERPRISE", name: "대기업", confidence: 88, description: "대규모 기업 고객" },
        { code: "SMB", name: "중소기업", confidence: 75, description: "중소기업 고객" },
        { code: "STARTUP", name: "스타트업", confidence: 65, description: "신생 기업" },
      ],
      productGroups: [
        { code: "SOFTWARE", name: "소프트웨어", confidence: 95, description: "소프트웨어 라이선스 및 서비스" },
        { code: "HARDWARE", name: "하드웨어", confidence: 25, description: "물리적 장비" },
        { code: "SERVICE", name: "서비스", confidence: 70, description: "컨설팅 및 지원 서비스" },
      ],
    },
    hybridRecommendation: {
      code: "132000",
      name: "소프트웨어",
      confidence: 97,
      breakdown: {
        rule: { score: 95, weight: 40 },
        ml: { score: 92, weight: 35 },
        nlp: { score: 88, weight: 25 },
      },
    },
  })

  const [learningMetrics, setLearningMetrics] = useState({
    totalTransactions: 15847,
    learnedPatterns: 1247,
    ruleOptimizations: 89,
    accuracyImprovement: 12.3,
    lastLearning: "1시간 전",
  })

  const [showCoaDialog, setShowCoaDialog] = useState(false)
  const [selectedCoaType, setSelectedCoaType] = useState(null)
  const [selectedCoaItem, setSelectedCoaItem] = useState(null)

  const updateRuleParameter = (id: string, newValue: string) => {
    setRuleParameters((prev) => prev.map((param) => (param.id === id ? { ...param, value: newValue } : param)))
  }

  const [aiFormData, setAiFormData] = useState({
    description: "",
    amount: "",
    vendor: "",
  })

  return (
    <div className="space-y-6">
      {/* 분개 룰 엔진 상태 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className={ruleEngine.connected ? "border-green-200" : "border-red-200"}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>분개 룰 엔진</span>
              </div>
              <Badge variant={ruleEngine.connected ? "default" : "destructive"}>
                {ruleEngine.connected ? "연결됨" : "오프라인"}
              </Badge>
            </CardTitle>
            <CardDescription>{ruleEngine.provider}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>총 룰 수:</span>
              <span className="font-medium">{ruleEngine.totalRules}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>활성 룰:</span>
              <span className="font-medium text-green-600">{ruleEngine.activeRules}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>성능 지수:</span>
              <span className="font-medium">{ruleEngine.performance}%</span>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setShowRuleDialog(true)}>
              <Settings className="h-4 w-4 mr-2" />룰 관리
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>AI 학습 현황</span>
            </CardTitle>
            <CardDescription>시스템 학습 및 최적화 상태</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>학습 거래:</span>
              <span className="font-medium">{learningMetrics.totalTransactions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>패턴 수:</span>
              <span className="font-medium">{learningMetrics.learnedPatterns}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>정확도 향상:</span>
              <span className="font-medium text-green-600">+{learningMetrics.accuracyImprovement}%</span>
            </div>
            <Button variant="outline" className="w-full">
              <TrendingUp className="h-4 w-4 mr-2" />
              학습 리포트
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="h-5 w-5" />
              <span>하이브리드 엔진</span>
            </CardTitle>
            <CardDescription>다중 알고리즘 조합 상태</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Rule-Based:</span>
                <span>{hybridWeights.rule}%</span>
              </div>
              <Progress value={hybridWeights.rule} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>ML:</span>
                <span>{hybridWeights.ml}%</span>
              </div>
              <Progress value={hybridWeights.ml} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>NLP:</span>
                <span>{hybridWeights.nlp}%</span>
              </div>
              <Progress value={hybridWeights.nlp} className="h-2" />
            </div>
            <Button variant="outline" className="w-full" onClick={() => setShowAlgorithmDialog(true)}>
              <BarChart3 className="h-4 w-4 mr-2" />
              알고리즘 비교
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI 자동 전표 생성 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <span>AI 자동 전표 생성</span>
          </CardTitle>
          <CardDescription>
            하이브리드 AI 엔진을 통한 최적화된 분개 전표 생성 (정확도:{" "}
            {aiRecommendations.hybridRecommendation.confidence}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="description">거래 내용</Label>
              <Input
                id="description"
                placeholder="예: 소프트웨어 라이선스 구매"
                value={aiFormData.description}
                onChange={(e) => setAiFormData({ ...aiFormData, description: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="amount">금액</Label>
              <Input
                id="amount"
                type="number"
                placeholder="1100000"
                value={aiFormData.amount}
                onChange={(e) => setAiFormData({ ...aiFormData, amount: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="vendor">공급업체</Label>
              <Input
                id="vendor"
                placeholder="ABC 주식회사"
                value={aiFormData.vendor}
                onChange={(e) => setAiFormData({ ...aiFormData, vendor: e.target.value })}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                <Network className="h-4 w-4 mr-2" />
                하이브리드 AI 생성
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 다중 알고리즘 추천 결과 */}
      <Card>
        <CardHeader>
          <CardTitle>다중 알고리즘 추천 결과</CardTitle>
          <CardDescription>각 AI 알고리즘별 계정과목 추천 및 하이브리드 최종 추천</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="individual">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="individual">개별 알고리즘</TabsTrigger>
              <TabsTrigger value="hybrid">하이브리드 추천</TabsTrigger>
            </TabsList>

            <TabsContent value="individual" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {aiRecommendations.accounts.map((account, idx) => (
                  <div key={idx} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="capitalize">
                        {account.algorithm}
                      </Badge>
                      <Badge variant={account.confidence > 90 ? "default" : "secondary"}>{account.confidence}%</Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium">
                        {account.code} - {account.name}
                      </p>
                      <p className="text-sm text-gray-500">{account.reason}</p>
                      {account.ruleId && (
                        <Badge variant="outline" className="text-xs">
                          룰: {account.ruleId}
                        </Badge>
                      )}
                      {account.similarity && (
                        <Badge variant="outline" className="text-xs">
                          유사도: {(account.similarity * 100).toFixed(1)}%
                        </Badge>
                      )}
                      {account.keywords && (
                        <div className="flex flex-wrap gap-1">
                          {account.keywords.map((keyword, kidx) => (
                            <Badge key={kidx} variant="outline" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      선택
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hybrid" className="space-y-4">
              <div className="p-6 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold flex items-center space-x-2">
                    <Network className="h-5 w-5" />
                    <span>하이브리드 최종 추천</span>
                  </h3>
                  <Badge className="bg-green-600">{aiRecommendations.hybridRecommendation.confidence}% 신뢰도</Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xl font-bold mb-2">
                      {aiRecommendations.hybridRecommendation.code} - {aiRecommendations.hybridRecommendation.name}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">3개 알고리즘의 가중 평균을 통한 최적 추천</p>
                    <Button className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      하이브리드 추천 적용
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">알고리즘별 기여도</h4>
                    {Object.entries(aiRecommendations.hybridRecommendation.breakdown).map(([algo, data]) => (
                      <div key={algo} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{algo}:</span>
                          <span>
                            {data.score}% × {data.weight}% = {((data.score * data.weight) / 100).toFixed(1)}점
                          </span>
                        </div>
                        <Progress value={(data.score * data.weight) / 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* 조직 및 예산 추천 */}
      <div className="space-y-4">
        <h4 className="font-medium flex items-center space-x-2">
          <Building className="h-4 w-4" />
          <span>CoA 정보 추천</span>
        </h4>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">기표조직</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {aiRecommendations.coaRecommendations.postingOrg.map((org, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => {
                    setSelectedCoaType("postingOrg")
                    setSelectedCoaItem(org)
                    setShowCoaDialog(true)
                  }}
                >
                  {org.name} ({org.confidence}%)
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">귀속조직</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {aiRecommendations.coaRecommendations.attributionOrg.map((org, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-green-50 hover:border-green-300"
                  onClick={() => {
                    setSelectedCoaType("attributionOrg")
                    setSelectedCoaItem(org)
                    setShowCoaDialog(true)
                  }}
                >
                  {org.name} ({org.confidence}%)
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">예산코드</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {aiRecommendations.coaRecommendations.budgetCodes.map((budget, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-50 hover:border-purple-300"
                  onClick={() => {
                    setSelectedCoaType("budgetCodes")
                    setSelectedCoaItem(budget)
                    setShowCoaDialog(true)
                  }}
                >
                  {budget.code} ({budget.confidence}%)
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">거래처 유형</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {aiRecommendations.coaRecommendations.partnerTypes.map((type, idx) => (
                <Badge
                  key={idx}
                  variant={type.confidence > 80 ? "default" : "outline"}
                  className="cursor-pointer hover:bg-orange-50 hover:border-orange-300"
                  onClick={() => {
                    setSelectedCoaType("partnerTypes")
                    setSelectedCoaItem(type)
                    setShowCoaDialog(true)
                  }}
                >
                  {type.name} ({type.confidence}%)
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">고객군</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {aiRecommendations.coaRecommendations.customerGroups.map((group, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-cyan-50 hover:border-cyan-300"
                  onClick={() => {
                    setSelectedCoaType("customerGroups")
                    setSelectedCoaItem(group)
                    setShowCoaDialog(true)
                  }}
                >
                  {group.name} ({group.confidence}%)
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium">상품군</Label>
            <div className="flex flex-wrap gap-2 mt-1">
              {aiRecommendations.coaRecommendations.productGroups.map((product, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover:bg-yellow-50 hover:border-yellow-300"
                  onClick={() => {
                    setSelectedCoaType("productGroups")
                    setSelectedCoaItem(product)
                    setShowCoaDialog(true)
                  }}
                >
                  {product.name} ({product.confidence}%)
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 생성된 전표 목록 */}
      <Card>
        <CardHeader>
          <CardTitle>생성된 전표 목록</CardTitle>
          <CardDescription>AI가 생성한 분개 전표들의 검토 및 승인 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {journalEntries.map((journal) => (
              <div key={journal.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <div>
                      <h4 className="font-medium">{journal.description}</h4>
                      <p className="text-sm text-gray-500">
                        {journal.date} • {journal.reference}
                      </p>
                      <div className="flex space-x-2 mt-1">
                        {journal.appliedRules.map((rule, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {rule}
                          </Badge>
                        ))}
                        <Badge variant="secondary" className="text-xs">
                          신뢰도: {journal.confidence}%
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={journal.status === "자동승인" ? "default" : "secondary"}>
                      {journal.status === "자동승인" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 mr-1" />
                      )}
                      {journal.status}
                    </Badge>
                    <span className="font-medium">₩{journal.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>계정과목</TableHead>
                      <TableHead>계정코드</TableHead>
                      <TableHead className="text-right">차변</TableHead>
                      <TableHead className="text-right">대변</TableHead>
                      <TableHead>CoA 정보</TableHead>
                      <TableHead className="w-[100px]">작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {journal.entries.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{entry.account}</TableCell>
                        <TableCell>{entry.accountCode}</TableCell>
                        <TableCell className="text-right">
                          {entry.debit > 0 ? `₩${entry.debit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell className="text-right">
                          {entry.credit > 0 ? `₩${entry.credit.toLocaleString()}` : "-"}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            <Badge
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-blue-50"
                              onClick={() => {
                                setSelectedCoaType("postingOrg")
                                setSelectedCoaItem({ code: "HQ", name: entry.postingOrg, confidence: 92 })
                                setShowCoaDialog(true)
                              }}
                            >
                              기표: {entry.postingOrg}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-green-50"
                              onClick={() => {
                                setSelectedCoaType("attributionOrg")
                                setSelectedCoaItem({ code: "IT", name: entry.attributionOrg, confidence: 94 })
                                setShowCoaDialog(true)
                              }}
                            >
                              귀속: {entry.attributionOrg}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-purple-50"
                              onClick={() => {
                                setSelectedCoaType("budgetCodes")
                                setSelectedCoaItem({
                                  code: entry.budgetCode,
                                  name: "IT 인프라 구축",
                                  confidence: 89,
                                  budget: 50000000,
                                  used: 32000000,
                                })
                                setShowCoaDialog(true)
                              }}
                            >
                              예산: {entry.budgetCode}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs cursor-pointer hover:bg-orange-50"
                              onClick={() => {
                                setSelectedCoaType("partnerTypes")
                                setSelectedCoaItem({ code: "VENDOR", name: entry.partnerType, confidence: 91 })
                                setShowCoaDialog(true)
                              }}
                            >
                              거래처: {entry.partnerType}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-end space-x-2 mt-4">
                  {journal.status === "승인대기" && (
                    <>
                      <Button variant="outline">수정</Button>
                      <Button>승인</Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 분개 룰 관리 다이얼로그 */}
      <Dialog open={showRuleDialog} onOpenChange={setShowRuleDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>분개 룰 엔진 관리</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="parameters">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="parameters">파라미터 관리</TabsTrigger>
              <TabsTrigger value="rules">룰 현황</TabsTrigger>
            </TabsList>

            <TabsContent value="parameters" className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">분개 파라미터 설정</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>파라미터명</TableHead>
                      <TableHead>현재값</TableHead>
                      <TableHead>카테고리</TableHead>
                      <TableHead>사용률</TableHead>
                      <TableHead>작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ruleParameters.map((param) => (
                      <TableRow key={param.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{param.name}</p>
                            <p className="text-sm text-gray-500">{param.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Input
                            value={param.value}
                            className="w-32"
                            onChange={(e) => updateRuleParameter(param.id, e.target.value)}
                          />
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{param.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Progress value={param.usage} className="w-16 h-2" />
                            <span className="text-sm">{param.usage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>룰 엔진 연동 상태</Label>
                  <div className="flex items-center space-x-2">
                    <Switch checked={ruleEngine.connected} />
                    <span className="text-sm">자동 동기화</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>AI 학습 모드</Label>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <span className="text-sm">실시간 학습</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowRuleDialog(false)}>
              취소
            </Button>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              설정 저장
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 알고리즘 비교 다이얼로그 */}
      <Dialog open={showAlgorithmDialog} onOpenChange={setShowAlgorithmDialog}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>AI 알고리즘 성능 비교</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
              {aiAlgorithms.map((algo, idx) => (
                <Card key={idx} className={selectedAlgorithm === algo.type ? "border-blue-500" : ""}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center space-x-2 text-sm">
                      <algo.icon className="h-4 w-4" />
                      <span>{algo.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>정확도:</span>
                        <span className="font-medium">{algo.accuracy}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>속도:</span>
                        <span className="font-medium">{algo.speed}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>신뢰도:</span>
                        <span className="font-medium">{algo.confidence}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-600">{algo.description}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-green-600">장점:</p>
                        {algo.pros.map((pro, pidx) => (
                          <p key={pidx} className="text-xs text-gray-500">
                            • {pro}
                          </p>
                        ))}
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-red-600">단점:</p>
                        {algo.cons.map((con, cidx) => (
                          <p key={cidx} className="text-xs text-gray-500">
                            • {con}
                          </p>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant={selectedAlgorithm === algo.type ? "default" : "outline"}
                      size="sm"
                      className="w-full"
                      onClick={() => setSelectedAlgorithm(algo.type)}
                    >
                      {selectedAlgorithm === algo.type ? "선택됨" : "선택"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {selectedAlgorithm === "hybrid" && (
              <Card>
                <CardHeader>
                  <CardTitle>하이브리드 가중치 조정</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Rule-Based: {hybridWeights.rule}%</Label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={hybridWeights.rule}
                        onChange={(e) => setHybridWeights({ ...hybridWeights, rule: Number.parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Machine Learning: {hybridWeights.ml}%</Label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={hybridWeights.ml}
                        onChange={(e) => setHybridWeights({ ...hybridWeights, ml: Number.parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>NLP: {hybridWeights.nlp}%</Label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={hybridWeights.nlp}
                        onChange={(e) => setHybridWeights({ ...hybridWeights, nlp: Number.parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    총합: {hybridWeights.rule + hybridWeights.ml + hybridWeights.nlp}%
                    {hybridWeights.rule + hybridWeights.ml + hybridWeights.nlp !== 100 && (
                      <span className="text-red-500"> (100%가 되도록 조정해주세요)</span>
                    )}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowAlgorithmDialog(false)}>
              취소
            </Button>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              설정 적용
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* CoA 상세 정보 다이얼로그 */}
      <Dialog open={showCoaDialog} onOpenChange={setShowCoaDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedCoaType === "postingOrg" && "기표조직 상세 정보"}
              {selectedCoaType === "attributionOrg" && "귀속조직 상세 정보"}
              {selectedCoaType === "budgetCodes" && "예산코드 상세 정보"}
              {selectedCoaType === "partnerTypes" && "거래처 유형 상세 정보"}
              {selectedCoaType === "customerGroups" && "고객군 상세 정보"}
              {selectedCoaType === "productGroups" && "상품군 상세 정보"}
            </DialogTitle>
          </DialogHeader>

          {selectedCoaItem && (
            <div className="space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">코드</Label>
                  <p className="text-lg font-bold">{selectedCoaItem.code}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">명칭</Label>
                  <p className="text-lg font-bold">{selectedCoaItem.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">AI 신뢰도</Label>
                  <div className="flex items-center space-x-2">
                    <Progress value={selectedCoaItem.confidence} className="flex-1" />
                    <span className="font-medium">{selectedCoaItem.confidence}%</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">설명</Label>
                  <p className="text-sm text-gray-600">{selectedCoaItem.description}</p>
                </div>
              </div>

              {/* 예산 정보 (예산코드인 경우) */}
              {selectedCoaType === "budgetCodes" && selectedCoaItem.budget && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">예산 현황</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label className="text-sm">총 예산</Label>
                          <p className="text-xl font-bold text-blue-600">₩{selectedCoaItem.budget.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-sm">사용 금액</Label>
                          <p className="text-xl font-bold text-green-600">₩{selectedCoaItem.used.toLocaleString()}</p>
                        </div>
                        <div>
                          <Label className="text-sm">잔여 예산</Label>
                          <p className="text-xl font-bold text-orange-600">
                            ₩{(selectedCoaItem.budget - selectedCoaItem.used).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>예산 사용률</span>
                          <span>{((selectedCoaItem.used / selectedCoaItem.budget) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress value={(selectedCoaItem.used / selectedCoaItem.budget) * 100} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 사용 통계 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">사용 통계</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm">이번 달 사용 횟수</Label>
                      <p className="text-2xl font-bold">47회</p>
                    </div>
                    <div>
                      <Label className="text-sm">평균 거래 금액</Label>
                      <p className="text-2xl font-bold">₩2,340,000</p>
                    </div>
                    <div>
                      <Label className="text-sm">최근 사용일</Label>
                      <p className="text-lg">2024-01-15</p>
                    </div>
                    <div>
                      <Label className="text-sm">관련 계정과목</Label>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline">132000</Badge>
                        <Badge variant="outline">521000</Badge>
                        <Badge variant="outline">213000</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI 추천 근거 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI 추천 근거</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">과거 패턴</Badge>
                      <span className="text-sm">유사한 거래에서 89% 사용됨</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">키워드 매칭</Badge>
                      <span className="text-sm">'소프트웨어', '라이선스' 키워드 감지</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">룰 기반</Badge>
                      <span className="text-sm">RULE_001: IT 관련 구매 → IT부서 귀속</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCoaDialog(false)}>
                  닫기
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />이 항목 선택
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
