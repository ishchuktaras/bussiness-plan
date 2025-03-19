import ZabkaBusinessPlan from "@/components/business-plan"
import InspectionChecklist from "@/components/inspection-checklist"
import OperationalStandards from "@/components/operational-standards"

export default function Home() {
  return (
    <div className="space-y-8 py-8">
      <ZabkaBusinessPlan />
      <InspectionChecklist />
      <OperationalStandards />
    </div>
  )
}

