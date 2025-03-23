import { ResponsiveContainer } from "@/components/ui/responsive-container"
import ZabkaBusinessPlan from "@/components/business-plan"
import CompetitionAnalysis from "@/components/competition-analysis"
import FranchiseAgreementAnalysis from "@/components/franchise-agreement-analysis"
import InspectionChecklist from "@/components/inspection-checklist"
import OperationalStandards from "@/components/operational-standards"
import FranchiseRequirements from "@/components/franchise-requirements"

export default function Home() {
  return (
    <ResponsiveContainer className="py-4 sm:py-6 md:py-8">
      <div className="space-y-12 md:space-y-16">
        <div id="franchise-agreement-analysis" className="py-6 md:py-8">
          <FranchiseAgreementAnalysis />
        </div>
        <div id="franchisee-requirements" className="py-6 md:py-8">
          <FranchiseRequirements />
        </div>
        <div id="business-plan">
          <ZabkaBusinessPlan />
        </div>
        <div id="competition-analysis">
          <CompetitionAnalysis />
        </div>
        <div id="inspection-checklist">
          <InspectionChecklist />
        </div>
        <div id="operational-standards">
          <OperationalStandards />
        </div>
      </div>
    </ResponsiveContainer>
  )
}
