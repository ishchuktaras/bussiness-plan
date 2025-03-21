import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ZabkaBusinessPlan from "@/components/business-plan"
import FranchiseRequirements from "@/components/franchise-requirements"
import OperationalStandards from "@/components/operational-standards"
import FranchiseAgreementAnalysis from "@/components/franchise-agreement-analysis"

export default function Home() {
  return (
    <main className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Business Plan Žabka</h2>
        </div>
        <Tabs defaultValue="calculator" className="space-y-4">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="calculator">Kalkulačka</TabsTrigger>
            <TabsTrigger value="operating-standards">Provozní standardy</TabsTrigger>
            <TabsTrigger value="franchise-requirements">Požadavky na franšízanta</TabsTrigger>
            <TabsTrigger value="agreement-analysis">Analýza smlouvy</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="space-y-4">
            <ZabkaBusinessPlan />
          </TabsContent>
          <TabsContent value="operating-standards" className="space-y-4">
            <OperationalStandards />
          </TabsContent>
          <TabsContent value="franchise-requirements" className="space-y-4">
            <FranchiseRequirements />
          </TabsContent>
          <TabsContent value="agreement-analysis" className="space-y-4">
            <FranchiseAgreementAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

