"use client"

import { useState } from "react"
import {
  Calculator,
  DollarSign,
  BarChart,
  Users,
  TrendingUp,
  ArrowUpDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts"

export default function ZabkaBusinessPlan() {
  // State variables remain the same
  const [dailyTurnover, setDailyTurnover] = useState(30000)
  const [monthlyTurnover, setMonthlyTurnover] = useState(dailyTurnover * 30)
  const [rent, setRent] = useState(0) // Hrazeno franšízorem
  const [utilities, setUtilities] = useState(0)
  const [staffCount, setStaffCount] = useState(2)
  const [staffCost, setStaffCost] = useState(28000)
  const [totalStaffCost, setTotalStaffCost] = useState(staffCount * staffCost)
  const [otherCosts, setOtherCosts] = useState(2000)
  const [seasonalityFactor, setSeasonalityFactor] = useState(1.0)
  const [wastageRate, setWastageRate] = useState(1.0)
  const [marketingCosts, setMarketingCosts] = useState(2000)
  const [maintenanceCosts, setMaintenanceCosts] = useState(0)
  const [insuranceCosts, setInsuranceCosts] = useState(2000)
  const [accountingCosts, setAccountingCosts] = useState(0)
  const [trainingCosts, setTrainingCosts] = useState(0)
  const [selectedScenario, setSelectedScenario] = useState<"pessimistic" | "realistic" | "optimistic">("realistic")
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  // Existing product categories
  const [productCategories, setProductCategories] = useState([
    { name: "Pekařské výrobky", percentage: 15, margin: 22 },
    { name: "Lahůdkový pult", percentage: 10, margin: 25.5 },
    { name: "Cigarety a tabák", percentage: 20, margin: 5.52 },
    { name: "Mléčné výrobky", percentage: 12, margin: 14 },
    { name: "Maso a drůbež", percentage: 8, margin: 14 },
    { name: "Potraviny a cukrovinky", percentage: 15, margin: 12.5 },
    { name: "Ovoce a zelenina", percentage: 5, margin: 20 },
    { name: "Nápoje", percentage: 15, margin: 11 },
  ])

  // Updated fixed commission variable
  const fixedCommission = 25000 // Příklad fixní částky
  const licensePercentage = 0.01 // 1% licenční poplatek
  const licenseFee = monthlyTurnover * licensePercentage

  // Výpočet variabilní provize podle kategorií produktů
  const calculateVariableCommission = () => {
    let commission = 0
    productCategories.forEach((category) => {
      const categoryTurnover = monthlyTurnover * (category.percentage / 100)
      commission += categoryTurnover * (category.margin / 100)
    })
    return commission
  }

  const variableCommission = calculateVariableCommission()

  // Výpočet celkových nákladů a zisku
  const totalCommission = fixedCommission + variableCommission
  const totalOperationalCosts =
    totalStaffCost +
    utilities +
    otherCosts +
    licenseFee +
    marketingCosts +
    maintenanceCosts +
    insuranceCosts +
    accountingCosts +
    trainingCosts
  const wastageAmount = monthlyTurnover * (wastageRate / 100)
  const totalCosts = totalOperationalCosts + wastageAmount
  const profit = totalCommission - totalCosts

  // Výpočet finančních ukazatelů
  const grossMarginPercentage = (totalCommission / monthlyTurnover) * 100
  const netMarginPercentage = (profit / monthlyTurnover) * 100
  const breakEvenTurnover = totalCosts / (grossMarginPercentage / 100)
  const initialInvestment = 180000 // Počáteční investice
  const roi = profit > 0 ? ((profit * 12) / initialInvestment) * 100 : 0
  const paybackPeriod = profit > 0 ? initialInvestment / profit : 0

  // Define scenario data
  const pessimisticScenario = {
    turnover: monthlyTurnover * 0.8,
    commission: monthlyTurnover * 0.8 * 0.1,
    costs: totalCosts * 1.1,
    profit: monthlyTurnover * 0.8 * 0.1 - totalCosts * 1.1,
  }

  const realisticScenario = {
    turnover: monthlyTurnover,
    commission: totalCommission,
    costs: totalCosts,
    profit: profit,
  }

  const optimisticScenario = {
    turnover: monthlyTurnover * 1.2,
    commission: monthlyTurnover * 1.2 * 0.15,
    costs: totalCosts * 0.9,
    profit: monthlyTurnover * 1.2 * 0.15 - totalCosts * 0.9,
  }

  const monthlyData = [
    { name: "Leden", turnover: monthlyTurnover * 0.9, costs: totalCosts * 1.1, profit: profit * 0.8 },
    { name: "Únor", turnover: monthlyTurnover * 0.95, costs: totalCosts * 1.05, profit: profit * 0.85 },
    { name: "Březen", turnover: monthlyTurnover * 1.0, costs: totalCosts * 1.0, profit: profit * 1.0 },
    { name: "Duben", turnover: monthlyTurnover * 1.05, costs: totalCosts * 0.95, profit: profit * 1.05 },
    { name: "Květen", turnover: monthlyTurnover * 1.1, costs: totalCosts * 0.9, profit: profit * 1.1 },
    { name: "Červen", turnover: monthlyTurnover * 1.15, costs: totalCosts * 0.85, profit: profit * 1.15 },
    { name: "Červenec", turnover: monthlyTurnover * 1.2, costs: totalCosts * 0.8, profit: profit * 1.2 },
    { name: "Srpen", turnover: monthlyTurnover * 1.15, costs: totalCosts * 0.85, profit: profit * 1.15 },
    { name: "Září", turnover: monthlyTurnover * 1.1, costs: totalCosts * 0.9, profit: profit * 1.1 },
    { name: "Říjen", turnover: monthlyTurnover * 1.05, costs: totalCosts * 0.95, profit: profit * 1.05 },
    { name: "Listopad", turnover: monthlyTurnover * 1.0, costs: totalCosts * 1.0, profit: profit * 1.0 },
    { name: "Prosinec", turnover: monthlyTurnover * 1.25, costs: totalCosts * 0.75, profit: profit * 1.3 },
  ]

  const competitorData = [
    { name: "Žabka", value: 35 },
    { name: "Konkurent A", value: 25 },
    { name: "Konkurent B", value: 20 },
    { name: "Ostatní", value: 20 },
  ]

  const customerDemographics = [
    { name: "18-25", muži: 15, ženy: 20 },
    { name: "26-35", muži: 25, ženy: 30 },
    { name: "36-45", muži: 15, ženy: 10 },
    { name: "46+", muži: 5, ženy: 5 },
  ]

  const marketGrowthData = [
    { name: "2022", růst: 3 },
    { name: "2023", růst: 4 },
    { name: "2024", růst: 5 },
    { name: "2025", růst: 6 },
  ]

  const cashFlowData = [
    {
      name: "Leden",
      příjmy: monthlyTurnover * 0.9,
      výdaje: totalCosts * 1.1,
      zisk: profit * 0.8,
      kumulativníCF: 10000,
    },
    {
      name: "Únor",
      příjmy: monthlyTurnover * 0.95,
      výdaje: totalCosts * 1.05,
      zisk: profit * 0.85,
      kumulativníCF: 18500,
    },
    {
      name: "Březen",
      příjmy: monthlyTurnover * 1.0,
      výdaje: totalCosts * 1.0,
      zisk: profit * 1.0,
      kumulativníCF: 28500,
    },
    {
      name: "Duben",
      příjmy: monthlyTurnover * 1.05,
      výdaje: totalCosts * 0.95,
      zisk: profit * 1.05,
      kumulativníCF: 39500,
    },
    {
      name: "Květen",
      příjmy: monthlyTurnover * 1.1,
      výdaje: totalCosts * 0.9,
      zisk: profit * 1.1,
      kumulativníCF: 51500,
    },
    {
      name: "Červen",
      příjmy: monthlyTurnover * 1.15,
      výdaje: totalCosts * 0.85,
      zisk: profit * 1.15,
      kumulativníCF: 64750,
    },
    {
      name: "Červenec",
      příjmy: monthlyTurnover * 1.2,
      výdaje: totalCosts * 0.8,
      zisk: profit * 1.2,
      kumulativníCF: 79150,
    },
    {
      name: "Srpen",
      příjmy: monthlyTurnover * 1.15,
      výdaje: totalCosts * 0.85,
      zisk: profit * 1.15,
      kumulativníCF: 93500,
    },
    {
      name: "Září",
      příjmy: monthlyTurnover * 1.1,
      výdaje: totalCosts * 0.9,
      zisk: profit * 1.1,
      kumulativníCF: 107850,
    },
    {
      name: "Říjen",
      příjmy: monthlyTurnover * 1.05,
      výdaje: totalCosts * 0.95,
      zisk: profit * 1.05,
      kumulativníCF: 121900,
    },
    {
      name: "Listopad",
      příjmy: monthlyTurnover * 1.0,
      výdaje: totalCosts * 1.0,
      zisk: profit * 1.0,
      kumulativníCF: 135250,
    },
    {
      name: "Prosinec",
      příjmy: monthlyTurnover * 1.25,
      výdaje: totalCosts * 0.75,
      zisk: profit * 1.3,
      kumulativníCF: 153500,
    },
  ]

  const breakEvenAnalysisData = [
    { name: "Leden", náklady: totalCosts * 1.1, příjmy: monthlyTurnover * 0.9 },
    { name: "Únor", náklady: totalCosts * 1.05, příjmy: monthlyTurnover * 0.95 },
    { name: "Březen", náklady: totalCosts * 1.0, příjmy: monthlyTurnover * 1.0 },
    { name: "Duben", náklady: totalCosts * 0.95, příjmy: monthlyTurnover * 1.05 },
    { name: "Květen", náklady: totalCosts * 0.9, příjmy: monthlyTurnover * 1.1 },
    { name: "Červen", náklady: totalCosts * 0.85, příjmy: monthlyTurnover * 1.15 },
    { name: "Červenec", náklady: totalCosts * 0.8, příjmy: monthlyTurnover * 1.2 },
    { name: "Srpen", náklady: totalCosts * 0.85, příjmy: monthlyTurnover * 1.15 },
    { name: "Září", náklady: totalCosts * 0.9, příjmy: monthlyTurnover * 1.1 },
    { name: "Říjen", náklady: totalCosts * 0.95, příjmy: monthlyTurnover * 1.05 },
    { name: "Listopad", náklady: totalCosts * 1.0, příjmy: monthlyTurnover * 1.0 },
    { name: "Prosinec", náklady: totalCosts * 0.75, příjmy: monthlyTurnover * 1.25 },
  ]

  const swotData = {
    strengths: ["Silná značka", "Široká síť poboček", "Zavedený systém franšízingu"],
    weaknesses: ["Vysoké poplatky za franšízu", "Závislost na dodavatelích", "Konkurence s velkými řetězci"],
    opportunities: ["Expanze do nových lokalit", "Rozšíření sortimentu", "Online prodej"],
    threats: ["Změny v legislativě", "Ekonomická krize", "Nové konkurenční subjekty"],
  }

  const sensitivityData = [
    { scénář: "Pesimistický", zisk: pessimisticScenario.profit },
    { scénář: "Realistický", zisk: realisticScenario.profit },
    { scénář: "Optimistický", zisk: optimisticScenario.profit },
  ]

  const supplierData = [
    { dodavatel: "Bidfood", kategorie: "Potraviny", podmínky: "30 dní" },
    { dodavatel: "Coca-Cola", kategorie: "Nápoje", podmínky: "60 dní" },
    { dodavatel: "Pekařství Kabát", kategorie: "Pekařské výrobky", podmínky: "Hotově" },
  ]

  const staffingPlan = [
    { pozice: "Vedoucí prodejny", počet: 1, náklady: 45000, zodpovědnosti: "Řízení prodejny, objednávky" },
    { pozice: "Prodavač/ka", počet: 2, náklady: 28000, zodpovědnosti: "Obsluha zákazníků, doplňování zboží" },
  ]

  const growthMilestones = [
    { milestone: "Otevření prodejny", timeline: "Q1 2024", popis: "Zahájení provozu nové prodejny" },
    { milestone: "Získání 1000 zákazníků", timeline: "Q2 2024", popis: "Dosažení 1000 stálých zákazníků" },
    { milestone: "Zvýšení obratu o 20%", timeline: "Q3 2024", popis: "Navýšení měsíčního obratu o 20%" },
  ]

  const marketingPlan = [
    {
      quarter: "Q1 2024",
      acquisitions: "Reklama na sociálních sítích",
      loyalty: "Věrnostní program",
      events: "Den otevřených dveří",
      costs: 10000, // Changed from náklady to costs
    },
    { quarter: "Q2 2024", acquisitions: "Letáky", loyalty: "Slevové kupony", events: "Ochutnávky", costs: 8000 },
    { quarter: "Q3 2024", acquisitions: "SEO", loyalty: "Email marketing", events: "Soutěže", costs: 12000 },
  ]

  const kpiData = [
    {
      category: "Finanční",
      metrics: [
        { name: "Obrat", target: "500 000 Kč", actual: "480 000 Kč", status: "warning" },
        { name: "Zisk", target: "50 000 Kč", actual: "55 000 Kč", status: "success" },
        { name: "Marže", target: "10%", actual: "9.5%", status: "warning" },
      ],
    },
    {
      category: "Zákaznická",
      metrics: [
        { name: "Počet zákazníků", target: "1000", actual: "1050", status: "success" },
        { name: "Spokojenost zákazníků", target: "4.5", actual: "4.2", status: "warning" },
        { name: "Retence zákazníků", target: "80%", actual: "75%", status: "warning" },
      ],
    },
    {
      category: "Provozní",
      metrics: [
        { name: "Produktivita", target: "1000 Kč/hod", actual: "950 Kč/hod", status: "warning" },
        { name: "Využití personálu", target: "90%", actual: "85%", status: "warning" },
        { name: "Rotace zásob", target: "10", actual: "11", status: "success" },
      ],
    },
  ]

  const satisfactionData = [
    { aspect: "Kvalita produktů", hodnocení: 4.5 },
    { aspect: "Obsluha", hodnocení: 4.2 },
    { aspect: "Atmosféra", hodnocení: 4.0 },
    { aspect: "Ceny", hodnocení: 3.8 },
  ]

  const efficiencyData = [
    { měsíc: "Leden", produktivita: 950, využitíPersonálu: 85, rotaceZáSob: 10 },
    { měsíc: "Únor", produktivita: 980, využitíPersonálu: 88, rotaceZáSob: 10.5 },
    { měsíc: "Březen", produktivita: 1020, využitíPersonálu: 92, rotaceZáSob: 11 },
  ]
  // All other calculations remain the same
  // ...

  // Scénáře and other calculations remain the same

  // Modernized UI colors for charts
  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"]

  // Functions for updating values
  const updateValues = ({ newDailyTurnover }: { newDailyTurnover: number }) => {
    const newMonthlyTurnover = newDailyTurnover * 30
    setDailyTurnover(newDailyTurnover)
    setMonthlyTurnover(newMonthlyTurnover)
  }

  const updateStaffCosts = ({ count, cost }: { count: number; cost: number }) => {
    setStaffCount(count)
    setStaffCost(cost)
    setTotalStaffCost(count * cost)
  }

  const updateCategoryPercentage = (index: number, newPercentage: number) => {
    const updatedCategories = [...productCategories]
    updatedCategories[index].percentage = newPercentage

    // Přepočítání procent, aby součet byl vždy 100%
    const totalPercentage = updatedCategories.reduce((sum, cat) => sum + cat.percentage, 0)
    if (totalPercentage !== 100) {
      const adjustmentFactor = 100 / totalPercentage
      updatedCategories.forEach((cat) => {
        cat.percentage = Math.round(cat.percentage * adjustmentFactor)
      })
    }

    setProductCategories(updatedCategories)
  }

  const updateCategoryMargin = ({ index, newMargin }: { index: number; newMargin: number }) => {
    const updatedCategories = [...productCategories]
    updatedCategories[index].margin = newMargin
    setProductCategories(updatedCategories)
  }

  const updateScenario = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    setSelectedScenario(scenario)
  }

  return (
    <div className="container-responsive">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 gradient-heading">Obchodní model Žabka</h2>

      <Tabs defaultValue="calculator" className="space-y-8">
        <div className="overflow-x-auto pb-2">
          <TabsList className="flex min-w-max space-x-1">
            <TabsTrigger value="calculator" className="flex-none py-2 px-3 text-sm whitespace-nowrap">
              <Calculator className="mr-2 h-4 w-4" /> Kalkulačka
            </TabsTrigger>
            <TabsTrigger value="income" className="flex-none py-2 px-3 text-sm whitespace-nowrap">
              <DollarSign className="mr-2 h-4 w-4" /> Příjmy
            </TabsTrigger>
            <TabsTrigger value="expenses" className="flex-none py-2 px-3 text-sm whitespace-nowrap">
              <BarChart className="mr-2 h-4 w-4" /> Výdaje
            </TabsTrigger>
            <TabsTrigger value="summary" className="flex-none py-2 px-3 text-sm whitespace-nowrap">
              <TrendingUp className="mr-2 h-4 w-4" /> Shrnutí
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="calculator" className="space-y-6 animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-blue-500" />
                Obchodní kalkulačka
              </CardTitle>
              <CardDescription>Vypočítejte své předpokládané příjmy, výdaje a zisk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="daily-turnover" className="text-base">
                    Průměrný denní obrat (Kč)
                  </Label>
                  <div className="input-wrapper">
                    <DollarSign className="input-icon h-4 w-4" />
                    <Input
                      id="daily-turnover"
                      type="number"
                      value={dailyTurnover}
                      onChange={(e) => updateValues({ newDailyTurnover: Number(e.target.value) })}
                      className="input-with-icon"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="monthly-turnover" className="text-base">
                    Měsíční obrat (Kč)
                  </Label>
                  <div className="input-wrapper">
                    <DollarSign className="input-icon h-4 w-4" />
                    <Input
                      id="monthly-turnover"
                      type="number"
                      value={monthlyTurnover}
                      readOnly
                      className="input-with-icon bg-muted"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="staff-count" className="text-base">
                    Počet zaměstnanců
                  </Label>
                  <div className="input-wrapper">
                    <Users className="input-icon h-4 w-4" />
                    <Input
                      id="staff-count"
                      type="number"
                      value={staffCount}
                      onChange={(e) => updateStaffCosts({ count: Number(e.target.value), cost: staffCost })}
                      className="input-with-icon"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <Label htmlFor="staff-cost" className="text-base">
                    Průměrné náklady na zaměstnance (Kč)
                  </Label>
                  <div className="input-wrapper">
                    <DollarSign className="input-icon h-4 w-4" />
                    <Input
                      id="staff-cost"
                      type="number"
                      value={staffCost}
                      onChange={(e) => updateStaffCosts({ count: staffCount, cost: Number(e.target.value) })}
                      className="input-with-icon"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-6">
                <Switch id="advanced-options" checked={showAdvancedOptions} onCheckedChange={setShowAdvancedOptions} />
                <Label htmlFor="advanced-options" className="font-medium">
                  Zobrazit pokročilé možnosti
                </Label>
              </div>

              {showAdvancedOptions && (
                <div className="mt-6 space-y-6 p-4 bg-muted/50 rounded-lg animate-slide-in">
                  <h3 className="text-lg font-medium">Pokročilé možnosti</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="wastage-rate" className="text-base">
                        Míra ztrát (%)
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          id="wastage-rate"
                          min={0}
                          max={5}
                          step={0.1}
                          value={[wastageRate]}
                          onValueChange={(value) => setWastageRate(value[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-right font-medium">{wastageRate}%</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label htmlFor="marketing-costs" className="text-base">
                        Marketingové náklady (Kč)
                      </Label>
                      <Input
                        id="marketing-costs"
                        type="number"
                        value={marketingCosts}
                        onChange={(e) => setMarketingCosts(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="w-full space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="stats-card">
                    <p className="text-sm text-muted-foreground mb-1">Celková měsíční provize</p>
                    <p className="text-2xl font-bold">{totalCommission?.toLocaleString() || "0"} Kč</p>
                  </div>
                  <div className="stats-card">
                    <p className="text-sm text-muted-foreground mb-1">Celkové měsíční náklady</p>
                    <p className="text-2xl font-bold">{totalCosts?.toLocaleString() || "0"} Kč</p>
                  </div>
                  <div className="stats-card">
                    <p className="text-sm text-muted-foreground mb-1">Měsíční zisk</p>
                    <p className={`text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {profit?.toLocaleString() || "0"} Kč
                    </p>
                  </div>
                </div>
                <Button variant="gradient" className="w-full mt-4">
                  <Calculator className="mr-2 h-4 w-4" />
                  Vytvořit podrobný finanční plán
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analýza příjmů</CardTitle>
              <CardDescription>Rozpis struktury provize a zdrojů příjmů</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Fixní provize</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{fixedCommission?.toLocaleString() || "0"} Kč</div>
                      <p className="text-sm text-gray-500">Základní měsíční platba</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Variabilní provize</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{variableCommission?.toLocaleString() || "0"} Kč</div>
                      <p className="text-sm text-gray-500">Na základě obratu a kategorií produktů</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Provize podle kategorie produktů</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {productCategories.map((category, index) => (
                        <div key={index} className="grid grid-cols-3 text-sm">
                          <div className="font-medium">{category.name}</div>
                          <div>{category.margin.toFixed(2)}%</div>
                          <div className="text-right font-medium">
                            {Math.round(
                              monthlyTurnover * (category.percentage / 100) * (category.margin / 100),
                            )?.toLocaleString() || "0"}{" "}
                            Kč
                          </div>
                        </div>
                      ))}
                      <Separator className="my-2" />
                      <div className="grid grid-cols-3 text-sm font-bold">
                        <div>Celkem</div>
                        <div>{((variableCommission / monthlyTurnover) * 100).toFixed(2)}%</div>
                        <div className="text-right">{variableCommission?.toLocaleString() || "0"} Kč</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analýza hrubé marže</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span>Hrubá marže:</span>
                        <span className="font-bold">{grossMarginPercentage.toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${Math.min(grossMarginPercentage, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span>{monthlyTurnover?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span>{totalCommission?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Hrubá marže (%):</span>
                        <span>{grossMarginPercentage.toFixed(2)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vizualizace příjmů</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: "Fixní provize", value: fixedCommission },
                              { name: "Variabilní provize", value: variableCommission },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#10b981" />
                            <Cell fill="#3b82f6" />
                          </Pie>
                          <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Celkový měsíční příjem:</span>
                  <span>{totalCommission?.toLocaleString() || "0"} Kč</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rozpis výdajů</CardTitle>
              <CardDescription>Přehled měsíčních provozních nákladů</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Náklady na zaměstnance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          <span>Počet zaměstnanců:</span>
                        </div>
                        <span className="font-medium">{staffCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Průměrné náklady na zaměstnance:</span>
                        <span className="font-medium">{staffCost?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex items-center justify-between font-bold">
                        <span>Celkové náklady na zaměstnance:</span>
                        <span>{totalStaffCost?.toLocaleString() || "0"} Kč</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Nájem</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{rent?.toLocaleString() || "0"} Kč</div>
                      <p className="text-sm text-gray-500">Hrazeno franšízorem</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Energie a služby</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{utilities?.toLocaleString() || "0"} Kč</div>
                      <p className="text-sm text-gray-500">Elektřina, voda, internet atd.</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Licenční poplatek (1 % z obratu)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{licenseFee?.toLocaleString() || "0"} Kč</div>
                    <p className="text-sm text-gray-500">Měsíční platba franšízorovi</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ztráty zásob ({wastageRate}% z obratu)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{wastageAmount?.toLocaleString() || "0"} Kč</div>
                    <p className="text-sm text-gray-500">Prošlé zboží, poškození, krádeže</p>
                    <div className="mt-4">
                      <Label htmlFor="wastage-slider">Míra ztrát (%)</Label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          id="wastage-slider"
                          min={0}
                          max={5}
                          step={0.1}
                          value={[wastageRate]}
                          onValueChange={(value) => setWastageRate(value[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-right">{wastageRate}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Další provozní náklady</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Marketing:</span>
                        <span>{marketingCosts?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Údržba:</span>
                        <span>{maintenanceCosts?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pojištění:</span>
                        <span>{insuranceCosts?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Účetnictví:</span>
                        <span>{accountingCosts?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Školení:</span>
                        <span>{trainingCosts?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ostatní náklady:</span>
                        <span>{otherCosts?.toLocaleString() || "0"} Kč</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Celkem další náklady:</span>
                        <span>
                          {(
                            marketingCosts +
                            maintenanceCosts +
                            insuranceCosts +
                            accountingCosts +
                            trainingCosts +
                            otherCosts
                          )?.toLocaleString() || "0"}{" "}
                          Kč
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Počáteční jednorázové náklady</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 text-sm">
                        <div className="font-medium">Jistina (počáteční)</div>
                        <div>20 000 Kč</div>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <div className="font-medium">Jistina (konečná)</div>
                        <div>150 000 Kč</div>
                      </div>
                      <div className="grid grid-cols-2 text-sm">
                        <div className="font-medium">Poplatek při převzetí provozovny</div>
                        <div>10 000 Kč + DPH</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Vizualizace nákladů</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              { name: "Personál", value: totalStaffCost },
                              { name: "Energie a služby", value: utilities },
                              { name: "Licenční poplatek", value: licenseFee },
                              { name: "Ztráty zásob", value: wastageAmount },
                              { name: "Marketing", value: marketingCosts },
                              { name: "Údržba", value: maintenanceCosts },
                              { name: "Pojištění", value: insuranceCosts },
                              { name: "Účetnictví", value: accountingCosts },
                              { name: "Školení", value: trainingCosts },
                              { name: "Ostatní", value: otherCosts },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          >
                            {[
                              { name: "Personál", value: totalStaffCost },
                              { name: "Energie a služby", value: utilities },
                              { name: "Licenční poplatek", value: licenseFee },
                              { name: "Ztráty zásob", value: wastageAmount },
                              { name: "Marketing", value: marketingCosts },
                              { name: "Údržba", value: maintenanceCosts },
                              { name: "Pojištění", value: insuranceCosts },
                              { name: "Účetnictví", value: accountingCosts },
                              { name: "Školení", value: trainingCosts },
                              { name: "Ostatní", value: otherCosts },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Celkové měsíční výdaje:</span>
                  <span>{totalCosts?.toLocaleString() || "0"} Kč</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analýza produktových kategorií</CardTitle>
              <CardDescription>Podíl jednotlivých kategorií na obratu a marži</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {productCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor={`category-${index}`}>{category.name}</Label>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Podíl na obratu:</span>
                        <Badge variant="outline">{category.percentage}%</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Slider
                        id={`category-${index}`}
                        min={0}
                        max={50}
                        step={1}
                        value={[category.percentage]}
                        onValueChange={(value) => updateCategoryPercentage(index, value[0])}
                        className="flex-1"
                      />
                      <span className="w-12 text-right">{category.percentage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Marže:</span>
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`margin-${index}`}
                          type="number"
                          value={category.margin}
                          onChange={(e) => updateCategoryMargin({ index, newMargin: Number(e.target.value) })}
                          className="w-20"
                        />
                        <span>%</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Měsíční obrat kategorie:</span>
                      <span className="font-medium">
                        {Math.round(monthlyTurnover * (category.percentage / 100))?.toLocaleString() || "0"} Kč
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Měsíční provize z kategorie:</span>
                      <span className="font-medium">
                        {Math.round(
                          monthlyTurnover * (category.percentage / 100) * (category.margin / 100),
                        )?.toLocaleString() || "0"}{" "}
                        Kč
                      </span>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Vizualizace kategorií</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={productCategories.map((cat) => ({
                          name: cat.name,
                          obrat: Math.round(monthlyTurnover * (cat.percentage / 100)),
                          provize: Math.round(monthlyTurnover * (cat.percentage / 100) * (cat.margin / 100)),
                        }))}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                        <Legend />
                        <Bar dataKey="obrat" name="Obrat" fill="#3b82f6" />
                        <Bar dataKey="provize" name="Provize" fill="#10b981" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Podíl kategorií na obratu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={productCategories.map((cat) => ({
                            name: cat.name,
                            value: cat.percentage,
                          }))}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {productCategories.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => value + "%"} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Celková variabilní provize:</span>
                  <span>{variableCommission?.toLocaleString() || "0"} Kč</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analýza scénářů</CardTitle>
              <CardDescription>Porovnání pesimistického, realistického a optimistického scénáře</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center space-x-2 mb-6">
                <Button
                  variant={selectedScenario === "pessimistic" ? "default" : "outline"}
                  onClick={() => updateScenario("pessimistic")}
                  className="flex items-center"
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Pesimistický
                </Button>
                <Button
                  variant={selectedScenario === "realistic" ? "default" : "outline"}
                  onClick={() => updateScenario("realistic")}
                  className="flex items-center"
                >
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Realistický
                </Button>
                <Button
                  variant={selectedScenario === "optimistic" ? "default" : "outline"}
                  onClick={() => updateScenario("optimistic")}
                  className="flex items-center"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Optimistický
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className={selectedScenario === "pessimistic" ? "border-red-500 border-2" : ""}>
                  <CardHeader className="bg-red-50">
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      Pesimistický scénář
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Obrat:</span>
                      <span>{pessimisticScenario.turnover?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provize:</span>
                      <span>{pessimisticScenario.commission?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Náklady:</span>
                      <span>{pessimisticScenario.costs?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Zisk:</span>
                      <span className={pessimisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                        {pessimisticScenario.profit?.toLocaleString() || "0"} Kč
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className={selectedScenario === "realistic" ? "border-blue-500 border-2" : ""}>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center">
                      <ArrowUpDown className="mr-2 h-5 w-5 text-blue-500" />
                      Realistický scénář
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Obrat:</span>
                      <span>{realisticScenario.turnover?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provize:</span>
                      <span>{realisticScenario.commission?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Náklady:</span>
                      <span>{realisticScenario.costs?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Zisk:</span>
                      <span className={realisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                        {realisticScenario.profit?.toLocaleString() || "0"} Kč
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className={selectedScenario === "optimistic" ? "border-green-500 border-2" : ""}>
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Optimistický scénář
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Obrat:</span>
                      <span>{optimisticScenario.turnover?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provize:</span>
                      <span>{optimisticScenario.commission?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Náklady:</span>
                      <span>{optimisticScenario.costs?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Zisk:</span>
                      <span className={optimisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                        {optimisticScenario.profit?.toLocaleString() || "0"} Kč
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Zisk (vybraný scénář):</span>
                  <span>
                    {(selectedScenario === "pessimistic"
                      ? pessimisticScenario.profit
                      : selectedScenario === "realistic"
                        ? realisticScenario.profit
                        : optimisticScenario.profit
                    )?.toLocaleString() || "0"}{" "}
                    Kč
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sezónní analýza</CardTitle>
              <CardDescription>Měsíční vývoj obratu, nákladů a zisku</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                    <Legend />
                    <Bar dataKey="turnover" name="Obrat" fill="#3b82f6" />
                    <Bar dataKey="costs" name="Náklady" fill="#f472b6" />
                    <Bar dataKey="profit" name="Zisk" fill="#10b981" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Průměrný měsíční zisk:</span>
                  <span>{monthlyData.reduce((sum, month) => sum + month.profit, 0) / monthlyData.length} Kč</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shrnutí</CardTitle>
              <CardDescription>Klíčové finanční ukazatele a metriky</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Ziskovost</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Měsíční zisk:</span>
                      <span className="font-bold">{profit?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hrubá marže:</span>
                      <span className="font-bold">{grossMarginPercentage.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Čistá marže:</span>
                      <span className="font-bold">{netMarginPercentage.toFixed(2)}%</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Návratnost investice</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Počáteční investice:</span>
                      <span className="font-bold">{initialInvestment?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Roční ROI:</span>
                      <span className="font-bold">{roi.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doba návratnosti:</span>
                      <span className="font-bold">{paybackPeriod.toFixed(2)} měsíců</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Bod zvratu</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Měsíční obrat:</span>
                      <span className="font-bold">{monthlyTurnover?.toLocaleString() || "0"} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bod zvratu:</span>
                      <span className="font-bold">{breakEvenTurnover?.toLocaleString() || "0"} Kč</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Celkový měsíční zisk:</span>
                  <span>{profit?.toLocaleString() || "0"} Kč</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analýza trhu</CardTitle>
              <CardDescription>Konkurence, zákazníci a růst trhu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Podíl na trhu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={competitorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {competitorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => value + "%"} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Demografie zákazníků</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={customerDemographics}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value + "%"} />
                        <Legend />
                        <Bar dataKey="muži" name="Muži" fill="#3b82f6" />
                        <Bar dataKey="ženy" name="Ženy" fill="#f472b6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Růst trhu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={marketGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value + "%"} />
                        <Legend />
                        <Bar dataKey="růst" name="Růst" fill="#10b981" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Finanční projekce</CardTitle>
              <CardDescription>Projekce cash flow na 2 roky</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                        <Legend />
                        <Bar dataKey="příjmy" name="Příjmy" fill="#3b82f6" />
                        <Bar dataKey="výdaje" name="Výdaje" fill="#f472b6" />
                        <Bar dataKey="zisk" name="Zisk" fill="#10b981" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Kumulativní Cash Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={cashFlowData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                        <Legend />
                        <Line type="monotone" dataKey="kumulativníCF" name="Kumulativní CF" stroke="#10b981" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analýza bodu zvratu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart
                        data={breakEvenAnalysisData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                        <Legend />
                        <Line type="monotone" dataKey="náklady" name="Náklady" stroke="#f472b6" />
                        <Line type="monotone" dataKey="příjmy" name="Příjmy" stroke="#3b82f6" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analýza rizik (SWOT)</CardTitle>
              <CardDescription>Silné a slabé stránky, příležitosti a hrozby</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Silné stránky</CardTitle>
                  </CardHeader>
                  <CardContent className="list-disc list-inside">
                    <ul>
                      {swotData.strengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Slabé stránky</CardTitle>
                  </CardHeader>
                  <CardContent className="list-disc list-inside">
                    <ul>
                      {swotData.weaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Příležitosti</CardTitle>
                  </CardHeader>
                  <CardContent className="list-disc list-inside">
                    <ul>
                      {swotData.opportunities.map((opportunity, index) => (
                        <li key={index}>{opportunity}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Hrozby</CardTitle>
                  </CardHeader>
                  <CardContent className="list-disc list-inside">
                    <ul>
                      {swotData.threats.map((threat, index) => (
                        <li key={index}>{threat}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Citlivostní analýza</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={sensitivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="scénář" />
                        <YAxis />
                        <Tooltip formatter={(value) => value?.toLocaleString() || "0" + " Kč"} />
                        <Legend />
                        <Bar dataKey="zisk" name="Zisk" fill="#10b981" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Operativní detaily</CardTitle>
              <CardDescription>Dodavatelé, personál a další</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dodavatelé</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dodavatel
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kategorie
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Podmínky
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {supplierData.map((supplier, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{supplier.dodavatel}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{supplier.kategorie}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{supplier.podmínky}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Personální plán</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Pozice
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Počet
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Náklady
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Zodpovědnosti
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {staffingPlan.map((staff, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.pozice}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.počet}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.náklady?.toLocaleString() || "0"} Kč</td>
                            <td className="px-6 py-4 whitespace-nowrap">{staff.zodpovědnosti}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Strategie růstu</CardTitle>
              <CardDescription>Klíčové milníky a marketingový plán</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Milníky</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Milník
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Časová osa
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Popis
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {growthMilestones.map((milestone, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{milestone.milestone}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milestone.timeline}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{milestone.popis}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Marketingový plán</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Čtvrtletí
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Akvizice
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Věrnost
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Události
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Náklady
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {marketingPlan.map((plan, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">{plan.quarter}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{plan.acquisitions}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{plan.loyalty}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{plan.events}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{plan.costs?.toLocaleString() || "0"} Kč</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Metriky</CardTitle>
              <CardDescription>Klíčové ukazatele výkonnosti</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {kpiData.map((kpiCategory, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{kpiCategory.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Metrika
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Cíl
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Aktuální
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Stav
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {kpiCategory.metrics.map((metric, metricIndex) => (
                            <tr key={metricIndex}>
                              <td className="px-6 py-4 whitespace-nowrap">{metric.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{metric.target}</td>
                              <td className="px-6 py-4 whitespace-nowrap">{metric.actual}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {metric.status === "success" && (
                                  <Badge className="bg-green-500 hover:bg-green-600">Splněno</Badge>
                                )}
                                {metric.status === "warning" && (
                                  <Badge className="bg-yellow-500 hover:bg-yellow-600">Blíží se cíli</Badge>
                                )}
                                {metric.status === "danger" && <Badge variant="destructive">Nesplněno</Badge>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle>Spokojenost zákazníků</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={satisfactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="aspect" />
                        <YAxis domain={[0, 5]} />
                        <Tooltip formatter={(value) => typeof value === 'number' ? value.toFixed(1) : value} />
                        <Legend />
                        <Bar dataKey="hodnocení" name="Hodnocení" fill="#3b82f6" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provozní efektivita</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={efficiencyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="měsíc" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="produktivita" name="Produktivita" stroke="#3b82f6" />
                        <Line type="monotone" dataKey="využitíPersonálu" name="Využití personálu" stroke="#f472b6" />
                        <Line type="monotone" dataKey="rotaceZáSob" name="Rotace zásob" stroke="#10b981" />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

