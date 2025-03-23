import ZabkaBusinessPlan from "@/components/business-plan"
import CompetitionAnalysis from "@/components/competition-analysis"
import InspectionChecklist from "@/components/inspection-checklist"
import OperationalStandards from "@/components/operational-standards"
import { ResponsiveContainer } from "@/components/responsive-container"

export default function Home() {
  return (
    <ResponsiveContainer className="py-4 sm:py-6 md:py-8">
      <div className="space-y-12 md:space-y-16">
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
        <div id="franchise-agreement-analysis" className="py-6 md:py-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
            Analýza franšízové smlouvy
          </h2>
          <p className="text-center text-muted-foreground">
            Tato sekce je ve vývoji a bude brzy k dispozici.
          </p>
        </div>
      </div>
    </ResponsiveContainer>
  )
}
