"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Settings } from "lucide-react"
import DashboardOverview from "@/components/dashboard-overview"
import DocumentProcessing from "@/components/document-processing"
import JournalEntryGeneration from "@/components/journal-entry-generation"
import AnomalyDetection from "@/components/anomaly-detection"
import ERPIntegration from "@/components/erp-integration"
import AIEngineManagement from "@/components/ai-engine-management"

export default function JournalEntryAgent() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">AI전표 처리 및 자동분개 에이전트</h1>
              <p className="text-sm text-gray-500">Journal Entry Automation Agent</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              시스템 정상
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              설정
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">대시보드</TabsTrigger>
            <TabsTrigger value="document">증빙처리</TabsTrigger>
            <TabsTrigger value="journal">전표 처리</TabsTrigger>
            <TabsTrigger value="ai-engine">AI 자동 분개엔진</TabsTrigger>
            <TabsTrigger value="anomaly">이상탐지</TabsTrigger>
            <TabsTrigger value="erp">ERP연동</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="document">
            <DocumentProcessing />
          </TabsContent>

          <TabsContent value="journal">
            <JournalEntryGeneration />
          </TabsContent>

          <TabsContent value="ai-engine">
            <AIEngineManagement />
          </TabsContent>

          <TabsContent value="anomaly">
            <AnomalyDetection />
          </TabsContent>

          <TabsContent value="erp">
            <ERPIntegration />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
