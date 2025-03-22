import { Tabs, TabsContent } from "@/components/ui/tabs"
import ZabkaBusinessPlan from "@/components/business-plan"
import FranchiseRequirements from "@/components/franchise-requirements"
import OperationalStandards from "@/components/operational-standards"
import FranchiseAgreementAnalysis from "@/components/franchise-agreement-analysis"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {/* <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight gradient-heading">Business Plan Žabka</h1>
        </div> */}
        
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsContent value="calculator" className="space-y-4 animate-fade-in">
            <ZabkaBusinessPlan />
          </TabsContent>
          <TabsContent value="operating-standards" className="space-y-4 animate-fade-in">
            <OperationalStandards />
          </TabsContent>
          <TabsContent value="franchise-requirements" className="space-y-4 animate-fade-in">
            <FranchiseRequirements />
          </TabsContent>
          <TabsContent value="agreement-analysis" className="space-y-4 animate-fade-in">
            <FranchiseAgreementAnalysis />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

