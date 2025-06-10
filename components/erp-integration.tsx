"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Database,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Settings,
  Zap,
  Clock,
  Building,
  Globe,
  Code,
} from "lucide-react"

export default function ERPIntegration() {
  const [erpSystems, setErpSystems] = useState([
    {
      id: 1,
      name: "SAP ERP",
      entity: "본사 (한국)",
      entityCode: "KR01",
      status: "연결됨",
      lastSync: "2분 전",
      autoApproval: true,
      syncProgress: 100,
      totalEntries: 1247,
      approvedEntries: 1175,
      pendingEntries: 72,
      modules: ["FI", "CO", "MM", "SD"],
      version: "S/4HANA 2023",
      server: "sap-kr.company.com",
    },
    {
      id: 2,
      name: "SAP ERP",
      entity: "미국 법인",
      entityCode: "US01",
      status: "연결됨",
      lastSync: "5분 전",
      autoApproval: false,
      syncProgress: 85,
      totalEntries: 856,
      approvedEntries: 823,
      pendingEntries: 33,
      modules: ["FI", "CO", "PP", "PS"],
      version: "SAP ECC 6.0",
      server: "sap-us.company.com",
    },
    {
      id: 3,
      name: "Microsoft Dynamics 365",
      entity: "유럽 법인",
      entityCode: "EU01",
      status: "오프라인",
      lastSync: "2시간 전",
      autoApproval: true,
      syncProgress: 0,
      totalEntries: 0,
      approvedEntries: 0,
      pendingEntries: 0,
      modules: ["Finance", "Supply Chain", "Project Operations"],
      version: "Dynamics 365 F&O",
      server: "dynamics-eu.company.com",
    },
    {
      id: 4,
      name: "더존 iCUBE",
      entity: "국내 자회사",
      entityCode: "KR02",
      status: "연결됨",
      lastSync: "10분 전",
      autoApproval: true,
      syncProgress: 95,
      totalEntries: 324,
      approvedEntries: 310,
      pendingEntries: 14,
      modules: ["회계", "급여", "자산"],
      version: "iCUBE 7.0",
      server: "icube.subsidiary.co.kr",
    },
  ])

  const [sapModules, setSapModules] = useState([
    {
      code: "FI",
      name: "Financial Accounting",
      description: "재무회계",
      tCodes: ["FB01", "FB02", "FB03", "F-02", "F-03", "FS00", "FSP0"],
      status: "연결됨",
      lastSync: "3분 전",
      entities: ["KR01", "US01"],
    },
    {
      code: "CO",
      name: "Controlling",
      description: "관리회계",
      tCodes: ["KS01", "KS02", "KS03", "KB11N", "KB13", "KSU5", "S_ALR_87013611"],
      status: "연결됨",
      lastSync: "3분 전",
      entities: ["KR01", "US01"],
    },
    {
      code: "MM",
      name: "Materials Management",
      description: "자재관리",
      tCodes: ["ME21N", "ME22N", "ME23N", "MIGO", "MB51", "MM03", "ME2L"],
      status: "연결됨",
      lastSync: "5분 전",
      entities: ["KR01"],
    },
    {
      code: "SD",
      name: "Sales & Distribution",
      description: "영업관리",
      tCodes: ["VA01", "VA02", "VA03", "VF01", "VF02", "VF03", "VL01N"],
      status: "연결됨",
      lastSync: "5분 전",
      entities: ["KR01"],
    },
    {
      code: "PP",
      name: "Production Planning",
      description: "생산계획",
      tCodes: ["MD01", "MD02", "MD04", "CO01", "CO02", "CO03", "COOIS"],
      status: "연결됨",
      lastSync: "8분 전",
      entities: ["US01"],
    },
    {
      code: "PS",
      name: "Project System",
      description: "프로젝트관리",
      tCodes: ["CJ01", "CJ02", "CJ03", "CJ20N", "CN41", "CN42", "S_ALR_87013542"],
      status: "연결됨",
      lastSync: "8분 전",
      entities: ["US01"],
    },
  ])

  const [entityMapping, setEntityMapping] = useState([
    {
      entityCode: "KR01",
      entityName: "본사 (한국)",
      erpSystem: "SAP ERP",
      chartOfAccounts: "KR-GAAP",
      currency: "KRW",
      fiscalYear: "1월-12월",
      companyCode: "1000",
      controllingArea: "1000",
    },
    {
      entityCode: "US01",
      entityName: "미국 법인",
      erpSystem: "SAP ERP",
      chartOfAccounts: "US-GAAP",
      currency: "USD",
      fiscalYear: "1월-12월",
      companyCode: "2000",
      controllingArea: "2000",
    },
    {
      entityCode: "EU01",
      entityName: "유럽 법인",
      erpSystem: "Microsoft Dynamics 365",
      chartOfAccounts: "IFRS",
      currency: "EUR",
      fiscalYear: "1월-12월",
      companyCode: "3000",
      controllingArea: "3000",
    },
    {
      entityCode: "KR02",
      entityName: "국내 자회사",
      erpSystem: "더존 iCUBE",
      chartOfAccounts: "K-IFRS",
      currency: "KRW",
      fiscalYear: "1월-12월",
      companyCode: "4000",
      controllingArea: "4000",
    },
  ])

  const [syncHistory, setSyncHistory] = useState([
    {
      time: "14:30",
      entity: "본사 (한국)",
      system: "SAP ERP",
      module: "FI",
      tCode: "FB01",
      action: "전표 등록",
      count: 15,
      status: "성공",
    },
    {
      time: "14:25",
      entity: "미국 법인",
      system: "SAP ERP",
      module: "CO",
      tCode: "KB11N",
      action: "원가 배부",
      count: 8,
      status: "성공",
    },
    {
      time: "14:20",
      entity: "본사 (한국)",
      system: "SAP ERP",
      module: "MM",
      tCode: "MIGO",
      action: "입고 처리",
      count: 23,
      status: "성공",
    },
    {
      time: "14:15",
      entity: "유럽 법인",
      system: "Microsoft Dynamics 365",
      module: "Finance",
      tCode: "N/A",
      action: "연결 시도",
      count: 0,
      status: "실패",
    },
  ])

  const [selectedEntity, setSelectedEntity] = useState(null)
  const [selectedModule, setSelectedModule] = useState(null)
  const [showEntityDialog, setShowEntityDialog] = useState(false)
  const [showModuleDialog, setShowModuleDialog] = useState(false)
  const [showMappingDialog, setShowMappingDialog] = useState(false)

  // 컴포넌트 상단에 상태 추가
  const [newEntityForm, setNewEntityForm] = useState({
    entityCode: "",
    entityName: "",
    erpSystem: "",
    chartOfAccounts: "",
    currency: "",
    companyCode: "",
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "연결됨":
        return "bg-green-500"
      case "오프라인":
        return "bg-red-500"
      case "연결중":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getERPIcon = (erpName: string) => {
    if (erpName.includes("SAP")) return "🟦"
    if (erpName.includes("Microsoft")) return "🟨"
    if (erpName.includes("더존")) return "🟩"
    return "⚪"
  }

  return (
    <div className="space-y-6">
      {/* 법인별 ERP 시스템 현황 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {erpSystems.map((system, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => {
              setSelectedEntity(system)
              setShowEntityDialog(true)
            }}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getERPIcon(system.name)}</span>
                  <div>
                    <div className="text-sm font-medium">{system.name}</div>
                    <div className="text-xs text-gray-500">{system.version}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(system.status)}`} />
                  <Badge variant={system.status === "연결됨" ? "default" : "secondary"}>{system.status}</Badge>
                </div>
              </CardTitle>
              <CardDescription>
                <div className="flex items-center space-x-1">
                  <Building className="h-3 w-3" />
                  <span>{system.entity}</span>
                  <Badge variant="outline" className="text-xs">
                    {system.entityCode}
                  </Badge>
                </div>
                <div className="text-xs mt-1">마지막 동기화: {system.lastSync}</div>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {system.status === "연결됨" && (
                <>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>동기화 진행률</span>
                      <span>{system.syncProgress}%</span>
                    </div>
                    <Progress value={system.syncProgress} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-gray-500">총 전표</span>
                      <div className="font-medium">{system.totalEntries}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">승인됨</span>
                      <div className="font-medium text-green-600">{system.approvedEntries}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs text-gray-500">연결된 모듈</span>
                    <div className="flex flex-wrap gap-1">
                      {system.modules.map((module, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={system.autoApproval}
                        onCheckedChange={(checked) => {
                          const updated = [...erpSystems]
                          updated[index].autoApproval = checked
                          setErpSystems(updated)
                        }}
                      />
                      <span className="text-xs">자동 승인</span>
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </>
              )}

              {system.status === "오프라인" && (
                <div className="text-center py-4">
                  <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <div className="text-sm text-gray-500 mb-3">연결이 끊어졌습니다</div>
                  <Button size="sm" className="w-full">
                    <RefreshCw className="h-3 w-3 mr-2" />
                    재연결
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SAP 모듈 연동 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>SAP 모듈 연동 현황</span>
          </CardTitle>
          <CardDescription>SAP 모듈별 T-Code 연계 및 법인 매핑 상태</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {sapModules.map((module, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => {
                  setSelectedModule(module)
                  setShowModuleDialog(true)
                }}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-blue-600">{module.code}</span>
                      <div className="text-sm font-medium">{module.description}</div>
                      <div className="text-xs text-gray-500">{module.name}</div>
                    </div>
                    <Badge variant={module.status === "연결됨" ? "default" : "secondary"}>{module.status}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-xs text-gray-500">연결된 법인</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {module.entities.map((entity, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {entity}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-gray-500">주요 T-Code ({module.tCodes.length}개)</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {module.tCodes.slice(0, 3).map((tCode, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs font-mono">
                          {tCode}
                        </Badge>
                      ))}
                      {module.tCodes.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{module.tCodes.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">마지막 동기화: {module.lastSync}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 법인별 매핑 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>법인별 ERP 매핑 현황</span>
            </div>
            <Button onClick={() => setShowMappingDialog(true)}>
              <Settings className="h-4 w-4 mr-2" />
              매핑 관리
            </Button>
          </CardTitle>
          <CardDescription>각 법인별 ERP 시스템 및 회계 기준 매핑</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>법인</TableHead>
                <TableHead>ERP 시스템</TableHead>
                <TableHead>회계기준</TableHead>
                <TableHead>통화</TableHead>
                <TableHead>회계연도</TableHead>
                <TableHead>회사코드</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entityMapping.map((mapping, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{mapping.entityCode}</Badge>
                      <span className="font-medium">{mapping.entityName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span>{getERPIcon(mapping.erpSystem)}</span>
                      <span>{mapping.erpSystem}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{mapping.chartOfAccounts}</Badge>
                  </TableCell>
                  <TableCell>{mapping.currency}</TableCell>
                  <TableCell>{mapping.fiscalYear}</TableCell>
                  <TableCell className="font-mono">{mapping.companyCode}</TableCell>
                  <TableCell>
                    <Badge variant="default">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      연결됨
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 실시간 동기화 현황 */}
      <Card>
        <CardHeader>
          <CardTitle>실시간 동기화 현황</CardTitle>
          <CardDescription>법인별 ERP 시스템과의 데이터 동기화 및 전표 등록 현황</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {syncHistory.map((sync, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">{sync.time}</span>
                  </div>
                  <div>
                    <div className="font-medium">{sync.action}</div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{sync.entity}</span>
                      <span>•</span>
                      <span>{sync.system}</span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {sync.module}
                      </Badge>
                      {sync.tCode !== "N/A" && (
                        <>
                          <span>•</span>
                          <Badge variant="secondary" className="text-xs font-mono">
                            {sync.tCode}
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {sync.count > 0 && <span className="text-sm font-medium">{sync.count}건</span>}
                  <Badge variant={sync.status === "성공" ? "default" : "destructive"}>
                    {sync.status === "성공" ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 mr-1" />
                    )}
                    {sync.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 법인 상세 정보 다이얼로그 */}
      <Dialog open={showEntityDialog} onOpenChange={setShowEntityDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span className="text-lg">{selectedEntity && getERPIcon(selectedEntity.name)}</span>
              <span>
                {selectedEntity?.name} - {selectedEntity?.entity}
              </span>
            </DialogTitle>
          </DialogHeader>

          {selectedEntity && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>연결 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm">서버 주소</Label>
                      <div className="font-mono text-sm">{selectedEntity.server}</div>
                    </div>
                    <div>
                      <Label className="text-sm">버전</Label>
                      <div className="font-medium">{selectedEntity.version}</div>
                    </div>
                    <div>
                      <Label className="text-sm">법인 코드</Label>
                      <Badge variant="outline">{selectedEntity.entityCode}</Badge>
                    </div>
                    <div>
                      <Label className="text-sm">마지막 동기화</Label>
                      <div className="text-sm">{selectedEntity.lastSync}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>처리 현황</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm">총 전표</Label>
                        <div className="text-2xl font-bold">{selectedEntity.totalEntries}</div>
                      </div>
                      <div>
                        <Label className="text-sm">승인됨</Label>
                        <div className="text-2xl font-bold text-green-600">{selectedEntity.approvedEntries}</div>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm">대기 중</Label>
                      <div className="text-xl font-bold text-orange-600">{selectedEntity.pendingEntries}</div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">진행률</Label>
                      <Progress value={selectedEntity.syncProgress} />
                      <div className="text-sm text-gray-500">{selectedEntity.syncProgress}%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>연결된 모듈</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedEntity.modules.map((module, idx) => (
                      <div key={idx} className="p-3 border rounded-lg text-center">
                        <Badge variant="default" className="mb-2">
                          {module}
                        </Badge>
                        <div className="text-xs text-gray-500">활성화</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowEntityDialog(false)}>
                  닫기
                </Button>
                <Button>
                  <Settings className="h-4 w-4 mr-2" />
                  설정 수정
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* SAP 모듈 상세 정보 다이얼로그 */}
      <Dialog open={showModuleDialog} onOpenChange={setShowModuleDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">{selectedModule?.code}</span>
              <span>{selectedModule?.name}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedModule && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>모듈 정보</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label className="text-sm">모듈명 (한글)</Label>
                      <div className="font-medium">{selectedModule.description}</div>
                    </div>
                    <div>
                      <Label className="text-sm">모듈명 (영문)</Label>
                      <div className="font-medium">{selectedModule.name}</div>
                    </div>
                    <div>
                      <Label className="text-sm">상태</Label>
                      <Badge variant="default">{selectedModule.status}</Badge>
                    </div>
                    <div>
                      <Label className="text-sm">마지막 동기화</Label>
                      <div className="text-sm">{selectedModule.lastSync}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>연결된 법인</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedModule.entities.map((entityCode, idx) => {
                        const entity = entityMapping.find((e) => e.entityCode === entityCode)
                        return (
                          <div key={idx} className="flex items-center justify-between p-2 border rounded">
                            <div>
                              <Badge variant="outline">{entityCode}</Badge>
                              <span className="ml-2 text-sm">{entity?.entityName}</span>
                            </div>
                            <Badge variant="secondary">활성</Badge>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>연결된 T-Code ({selectedModule.tCodes.length}개)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {selectedModule.tCodes.map((tCode, idx) => (
                      <div key={idx} className="p-3 border rounded-lg">
                        <Badge variant="secondary" className="font-mono mb-2">
                          {tCode}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {tCode === "FB01" && "회계전표 입력"}
                          {tCode === "FB02" && "회계전표 변경"}
                          {tCode === "FB03" && "회계전표 조회"}
                          {tCode === "ME21N" && "구매오더 생성"}
                          {tCode === "MIGO" && "입출고 처리"}
                          {tCode === "VA01" && "판매오더 생성"}
                          {tCode === "KS01" && "통계지표 생성"}
                          {tCode === "KB11N" && "원가센터 계획"}
                          {tCode === "CO01" && "생산오더 생성"}
                          {tCode === "CJ01" && "프로젝트 생성"}
                          {!["FB01", "FB02", "FB03", "ME21N", "MIGO", "VA01", "KS01", "KB11N", "CO01", "CJ01"].includes(
                            tCode,
                          ) && "SAP 트랜잭션"}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowModuleDialog(false)}>
                  닫기
                </Button>
                <Button>
                  <Code className="h-4 w-4 mr-2" />
                  T-Code 관리
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* 법인 매핑 관리 다이얼로그 */}
      <Dialog open={showMappingDialog} onOpenChange={setShowMappingDialog}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>법인별 ERP 매핑 관리</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="mapping">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mapping">매핑 현황</TabsTrigger>
              <TabsTrigger value="add">새 법인 추가</TabsTrigger>
            </TabsList>

            <TabsContent value="mapping" className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>법인코드</TableHead>
                    <TableHead>법인명</TableHead>
                    <TableHead>ERP 시스템</TableHead>
                    <TableHead>회계기준</TableHead>
                    <TableHead>통화</TableHead>
                    <TableHead>회사코드</TableHead>
                    <TableHead>작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {entityMapping.map((mapping, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Badge variant="outline">{mapping.entityCode}</Badge>
                      </TableCell>
                      <TableCell>{mapping.entityName}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span>{getERPIcon(mapping.erpSystem)}</span>
                          <span>{mapping.erpSystem}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{mapping.chartOfAccounts}</Badge>
                      </TableCell>
                      <TableCell>{mapping.currency}</TableCell>
                      <TableCell className="font-mono">{mapping.companyCode}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <RefreshCw className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="add" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entity-code">법인 코드</Label>
                  <Input
                    id="entity-code"
                    placeholder="예: JP01"
                    value={newEntityForm.entityCode}
                    onChange={(e) => setNewEntityForm({ ...newEntityForm, entityCode: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="entity-name">법인명</Label>
                  <Input
                    id="entity-name"
                    placeholder="예: 일본 법인"
                    value={newEntityForm.entityName}
                    onChange={(e) => setNewEntityForm({ ...newEntityForm, entityName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="erp-system">ERP 시스템</Label>
                  <Select
                    value={newEntityForm.erpSystem}
                    onValueChange={(value) => setNewEntityForm({ ...newEntityForm, erpSystem: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ERP 시스템 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sap">SAP ERP</SelectItem>
                      <SelectItem value="dynamics">Microsoft Dynamics 365</SelectItem>
                      <SelectItem value="icube">더존 iCUBE</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="chart-accounts">회계기준</Label>
                  <Select
                    value={newEntityForm.chartOfAccounts}
                    onValueChange={(value) => setNewEntityForm({ ...newEntityForm, chartOfAccounts: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="회계기준 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kr-gaap">KR-GAAP</SelectItem>
                      <SelectItem value="k-ifrs">K-IFRS</SelectItem>
                      <SelectItem value="us-gaap">US-GAAP</SelectItem>
                      <SelectItem value="ifrs">IFRS</SelectItem>
                      <SelectItem value="jp-gaap">JP-GAAP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currency">통화</Label>
                  <Select
                    value={newEntityForm.currency}
                    onValueChange={(value) => setNewEntityForm({ ...newEntityForm, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="통화 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="krw">KRW (원)</SelectItem>
                      <SelectItem value="usd">USD (달러)</SelectItem>
                      <SelectItem value="eur">EUR (유로)</SelectItem>
                      <SelectItem value="jpy">JPY (엔)</SelectItem>
                      <SelectItem value="cny">CNY (위안)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="company-code">회사코드</Label>
                  <Input
                    id="company-code"
                    placeholder="예: 5000"
                    value={newEntityForm.companyCode}
                    onChange={(e) => setNewEntityForm({ ...newEntityForm, companyCode: e.target.value })}
                  />
                </div>
              </div>
              <Button className="w-full">
                <Zap className="h-4 w-4 mr-2" />
                법인 추가 및 연결 테스트
              </Button>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowMappingDialog(false)}>
              닫기
            </Button>
            <Button>
              <Database className="h-4 w-4 mr-2" />
              설정 저장
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
