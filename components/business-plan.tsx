"use client"

import { useState } from "react"
import {
  Calculator,
  DollarSign,
  BarChart,
  Users,
  TrendingUp,
  LineChart,
  PieChart,
  ArrowUpDown,
  Target,
  AlertTriangle,
  CheckCircle,
  Globe,
  FileText,
  ShieldAlert,
  Building,
  BarChart2,
  Gauge,
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
  // Základní finanční údaje
  const [dailyTurnover, setDailyTurnover] = useState(30000)
  const [monthlyTurnover, setMonthlyTurnover] = useState(dailyTurnover * 30)
  const [rent, setRent] = useState(0) // Hrazeno franšízorem
  const [utilities, setUtilities] = useState(0)
  const [staffCount, setStaffCount] = useState(2)
  const [staffCost, setStaffCost] = useState(28000)
  const [totalStaffCost, setTotalStaffCost] = useState(staffCount * staffCost)
  const [otherCosts, setOtherCosts] = useState(2000)

  // Rozšířené finanční údaje
  const [seasonalityFactor, setSeasonalityFactor] = useState(1.0)
  const [wastageRate, setWastageRate] = useState(1.0)
  const [marketingCosts, setMarketingCosts] = useState(2000)
  const [maintenanceCosts, setMaintenanceCosts] = useState(0)
  const [insuranceCosts, setInsuranceCosts] = useState(2000)
  const [accountingCosts, setAccountingCosts] = useState(0)
  const [trainingCosts, setTrainingCosts] = useState(0)
  const [selectedScenario, setSelectedScenario] = useState<"pessimistic" | "realistic" | "optimistic">("realistic")
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)

  // Kategorie produktů a jejich podíl na obratu
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

  // Výpočet provize na základě smlouvy
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

  // Scénáře
  type ScenarioType = {
    turnoverFactor: number
    costFactor: number
    wastageRate: number
  }

  const scenarios: Record<"pessimistic" | "realistic" | "optimistic", ScenarioType> = {
    pessimistic: { turnoverFactor: 0.8, costFactor: 1.1, wastageRate: 3.0 },
    realistic: { turnoverFactor: 1.0, costFactor: 1.0, wastageRate: 2.0 },
    optimistic: { turnoverFactor: 1.2, costFactor: 0.95, wastageRate: 1.5 },
  }

  const calculateScenario = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    const scenarioTurnover = monthlyTurnover * scenarios[scenario].turnoverFactor
    const scenarioVariableCommission = variableCommission * scenarios[scenario].turnoverFactor
    const scenarioTotalCommission = fixedCommission + scenarioVariableCommission
    const scenarioOperationalCosts = totalOperationalCosts * scenarios[scenario].costFactor
    const scenarioWastage = scenarioTurnover * (scenarios[scenario].wastageRate / 100)
    const scenarioTotalCosts = scenarioOperationalCosts + scenarioWastage
    const scenarioProfit = scenarioTotalCommission - scenarioTotalCosts

    return {
      turnover: scenarioTurnover,
      commission: scenarioTotalCommission,
      costs: scenarioTotalCosts,
      profit: scenarioProfit,
    }
  }

  const pessimisticScenario = calculateScenario("pessimistic")
  const realisticScenario = calculateScenario("realistic")
  const optimisticScenario = calculateScenario("optimistic")

  // Sezónní analýza
  const monthNames = [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ]

  const seasonalFactors = [
    0.85, // Leden
    0.8, // Únor
    0.9, // Březen
    0.95, // Duben
    1.0, // Květen
    1.05, // Červen
    1.1, // Červenec
    1.15, // Srpen
    1.05, // Září
    1.0, // Říjen
    0.95, // Listopad
    1.2, // Prosinec
  ]

  const calculateMonthlyData = () => {
    return monthNames.map((month, index) => {
      const monthlyTurnoverSeasonal = monthlyTurnover * seasonalFactors[index]
      const monthlyVariableCommission = variableCommission * seasonalFactors[index]
      const monthlyTotalCommission = fixedCommission + monthlyVariableCommission
      const monthlyWastage = monthlyTurnoverSeasonal * (wastageRate / 100)
      const monthlyTotalCosts = totalOperationalCosts + monthlyWastage
      const monthlyProfit = monthlyTotalCommission - monthlyTotalCosts

      return {
        name: month,
        turnover: monthlyTurnoverSeasonal,
        commission: monthlyTotalCommission,
        costs: monthlyTotalCosts,
        profit: monthlyProfit,
      }
    })
  }

  const monthlyData = calculateMonthlyData()

  // Market Analysis Data
  const competitorData = [
    { name: "Žabka", value: 28 },
    { name: "Albert", value: 22 },
    { name: "Lidl", value: 18 },
    { name: "Tesco Express", value: 15 },
    { name: "BILLA", value: 12 },
    { name: "Ostatní", value: 5 },
  ]

  const customerDemographics = [
    { name: "18-24", muži: 12, ženy: 15 },
    { name: "25-34", muži: 25, ženy: 22 },
    { name: "35-44", muži: 30, ženy: 28 },
    { name: "45-54", muži: 20, ženy: 21 },
    { name: "55-64", muži: 8, ženy: 10 },
    { name: "65+", muži: 5, ženy: 4 },
  ]

  const marketGrowthData = [
    { name: "2022", růst: 3.5 },
    { name: "2023", růst: 4.2 },
    { name: "2024", růst: 4.8 },
    { name: "2025", růst: 5.5 },
    { name: "2026", růst: 6.1 },
    { name: "2027", růst: 6.8 },
  ]

  // Financial Projection Data
  const cashFlowData = Array.from({ length: 24 }, (_, i) => {
    const month = i % 12
    const year = Math.floor(i / 12) + 1
    const seasonality = seasonalFactors[month]
    const growthFactor = year === 1 ? 1 : 1.1 // 10% growth in year 2

    const monthlyRevenue = monthlyTurnover * seasonality * growthFactor
    const monthlyVariableCommission = variableCommission * seasonality * growthFactor
    const monthlyTotalCommission = fixedCommission + monthlyVariableCommission
    const monthlyOperationalCosts = totalOperationalCosts * (year === 1 ? 1 : 1.05) // 5% increase in costs in year 2
    const monthlyWastage = monthlyRevenue * (wastageRate / 100)
    const monthlyCosts = monthlyOperationalCosts + monthlyWastage
    const monthlyProfit = monthlyTotalCommission - monthlyCosts

    // Cumulative cash flow calculation (simplified)
    const initialCash = i === 0 ? -initialInvestment : 0

    return {
      name: `${monthNames[month]} ${year}`,
      příjmy: monthlyTotalCommission,
      výdaje: monthlyCosts,
      zisk: monthlyProfit,
      cashFlow: initialCash + monthlyProfit,
      kumulativníCF: 0, // Will be calculated after
    }
  })

  // Calculate cumulative cash flow
  let runningCashFlow = -initialInvestment
  cashFlowData.forEach((data, index) => {
    runningCashFlow += data.zisk
    cashFlowData[index].kumulativníCF = runningCashFlow
  })

  // Break-even analysis
  const breakEvenAnalysisData = [
    {
      name: "10,000",
      náklady: totalCosts * (10000 / monthlyTurnover),
      příjmy: totalCommission * (10000 / monthlyTurnover),
    },
    {
      name: "20,000",
      náklady: totalCosts * (20000 / monthlyTurnover),
      příjmy: totalCommission * (20000 / monthlyTurnover),
    },
    {
      name: "30,000",
      náklady: totalCosts * (30000 / monthlyTurnover),
      příjmy: totalCommission * (30000 / monthlyTurnover),
    },
    {
      name: "40,000",
      náklady: totalCosts * (40000 / monthlyTurnover),
      příjmy: totalCommission * (40000 / monthlyTurnover),
    },
    {
      name: "50,000",
      náklady: totalCosts * (50000 / monthlyTurnover),
      příjmy: totalCommission * (50000 / monthlyTurnover),
    },
  ]

  // SWOT Analysis for Risk Assessment
  const swotData = {
    strengths: [
      "Zavedená značka s vysokou důvěrou zákazníků",
      "Strategicky umístěné lokality s vysokou návštěvností",
      "Ověřený obchodní model franšízy",
      "Silná vyjednávací pozice s dodavateli",
      "Standardizované procesy a podpora franšízora",
    ],
    weaknesses: [
      "Omezená flexibilita v nabídce produktů",
      "Vysoké náklady na pracovní sílu",
      "Závislost na franšízorovi a jeho rozhodnutích",
      "Limitované možnosti vlastní marketingové strategie",
      "Potřeba dodržovat přísné standardy",
    ],
    opportunities: [
      "Rostoucí poptávka po pohodlném nakupování",
      "Možnost rozšíření služeb (výdejní místa, apod.)",
      "Digitalizace a online objednávky",
      "Možnost oslovit nové zákaznické segmenty",
      "Trend zdravého stravování a bio produktů",
    ],
    threats: [
      "Silná konkurence v maloobchodním sektoru",
      "Rostoucí náklady na provoz (energie, mzdy)",
      "Změny spotřebitelských návyků (e-shopy)",
      "Ekonomická nestabilita a inflace",
      "Změny v legislativě a regulacích",
    ],
  }

  // Sensitivity Analysis Data
  const sensitivityData = [
    { scénář: "-20% obrat", zisk: totalCommission * 0.8 - totalCosts },
    { scénář: "-10% obrat", zisk: totalCommission * 0.9 - totalCosts },
    { scénář: "Baseline", zisk: profit },
    { scénář: "+10% obrat", zisk: totalCommission * 1.1 - totalCosts },
    { scénář: "+20% obrat", zisk: totalCommission * 1.2 - totalCosts },
  ]

  // Supplier Data for Operational Details
  const supplierData = [
    { dodavatel: "Penam", kategorie: "Pekárenské výrobky", podmínky: "Splatnost 14 dnů, min. obj. 5000 Kč" },
    { dodavatel: "Makro Cash & Carry", kategorie: "Smíšené zboží", podmínky: "Splatnost 30 dnů, vlastní odvoz" },
    { dodavatel: "Madeta", kategorie: "Mléčné výrobky", podmínky: "Splatnost 21 dnů, doprava zdarma" },
    { dodavatel: "Coca-Cola HBC", kategorie: "Nápoje", podmínky: "Splatnost 14 dnů, min. obj. 10000 Kč" },
    { dodavatel: "Philip Morris ČR", kategorie: "Tabákové výrobky", podmínky: "Splatnost 7 dnů, přímá distribuce" },
  ]

  // Staffing Plan
  const staffingPlan = [
    { pozice: "Vedoucí prodejny", počet: 1, náklady: 36000, zodpovědnosti: "Celkové vedení, objednávky, personál" },
    {
      pozice: "Prodavač/ka (plný úvazek)",
      počet: 2,
      náklady: 28000,
      zodpovědnosti: "Obsluha pokladny, doplňování zboží",
    },
    {
      pozice: "Prodavač/ka (částečný úvazek)",
      počet: 2,
      náklady: 15000,
      zodpovědnosti: "Víkendy a špičky, doplňování",
    },
    { pozice: "Brigádník", počet: 2, náklady: 12000, zodpovědnosti: "Výpomoc dle potřeby, doplňování zboží" },
  ]

  // Growth Strategy Milestones
  const growthMilestones = [
    { milestone: "Dosažení stabilní ziskovosti", timeline: "3-6 měsíců", popis: "Optimalizace nákladů a procesů" },
    { milestone: "Splnění všech KPI franšízora", timeline: "6-9 měsíců", popis: "Získání všech bonusů za kvalitu" },
    { milestone: "První rozšíření služeb", timeline: "12 měsíců", popis: "Implementace nových služeb (výdejní místo)" },
    { milestone: "Navýšení obratu o 20%", timeline: "18 měsíců", popis: "Zvýšení průměrného nákupu a frekvence" },
    { milestone: "Druhá provozovna", timeline: "36 měsíců", popis: "Otevření další franšízové provozovny Žabka" },
  ]

  // Marketing Plan
  const marketingPlan = [
    { quarter: "Q1", acquisitions: 24, loyalty: 10, events: 2, costs: 18000 },
    { quarter: "Q2", acquisitions: 35, loyalty: 16, events: 3, costs: 25000 },
    { quarter: "Q3", acquisitions: 30, loyalty: 22, events: 2, costs: 20000 },
    { quarter: "Q4", acquisitions: 45, loyalty: 30, events: 4, costs: 35000 },
  ]

  // KPI Data
  const kpiData = [
    {
      category: "Finanční",
      metrics: [
        { name: "Průměrný denní obrat", target: "30,000 Kč", actual: "27,500 Kč", status: "warning" },
        { name: "Hrubá marže", target: "20%", actual: "19.2%", status: "warning" },
        { name: "Čistý zisk", target: "15%", actual: "12.1%", status: "danger" },
      ],
    },
    {
      category: "Zákaznický servis",
      metrics: [
        { name: "Mystery shopping skóre", target: "90%", actual: "87%", status: "warning" },
        { name: "Spokojenost zákazníků", target: "4.5/5", actual: "4.3/5", status: "success" },
        { name: "Frekvence návštěv", target: "2.5x týdně", actual: "2.1x týdně", status: "warning" },
      ],
    },
    {
      category: "Operační",
      metrics: [
        { name: "Ztráty zásob", target: "<2%", actual: "2.3%", status: "warning" },
        { name: "Plnění standardů", target: "95%", actual: "91%", status: "warning" },
        { name: "Rotace zásob", target: "8x měsíčně", actual: "7.2x měsíčně", status: "warning" },
      ],
    },
  ]

  // Customer Satisfaction Data
  const satisfactionData = [
    { aspect: "Čistota", hodnocení: 4.2 },
    { aspect: "Rychlost obsluhy", hodnocení: 3.9 },
    { aspect: "Nabídka produktů", hodnocení: 4.0 },
    { aspect: "Kvalita pečiva", hodnocení: 4.5 },
    { aspect: "Přístup personálu", hodnocení: 4.1 },
    { aspect: "Ceny", hodnocení: 3.7 },
  ]

  // Operational Efficiency Metrics
  const efficiencyData = [
    { měsíc: "Leden", produktivita: 80, využitíPersonálu: 75, rotaceZáSob: 7.1 },
    { měsíc: "Únor", produktivita: 82, využitíPersonálu: 78, rotaceZáSob: 7.3 },
    { měsíc: "Březen", produktivita: 85, využitíPersonálu: 80, rotaceZáSob: 7.5 },
    { měsíc: "Duben", produktivita: 87, využitíPersonálu: 83, rotaceZáSob: 7.8 },
    { měsíc: "Květen", produktivita: 90, využitíPersonálu: 85, rotaceZáSob: 8.0 },
    { měsíc: "Červen", produktivita: 92, využitíPersonálu: 87, rotaceZáSob: 8.2 },
  ]

  // Aktualizace hodnot
  interface UpdateValuesProps {
    newDailyTurnover: number
  }

  const updateValues = ({ newDailyTurnover }: UpdateValuesProps) => {
    const newMonthlyTurnover = newDailyTurnover * 30
    setDailyTurnover(newDailyTurnover)
    setMonthlyTurnover(newMonthlyTurnover)
  }

  interface UpdateStaffCostsProps {
    count: number
    cost: number
  }

  const updateStaffCosts = ({ count, cost }: UpdateStaffCostsProps) => {
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

  interface UpdateCategoryMarginProps {
    index: number
    newMargin: number
  }

  const updateCategoryMargin = ({ index, newMargin }: UpdateCategoryMarginProps) => {
    const updatedCategories = [...productCategories]
    updatedCategories[index].margin = newMargin
    setProductCategories(updatedCategories)
  }

  // Barvy pro grafy
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

  const updateScenario = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    setSelectedScenario(scenario)
    // další kód...
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{}</h1> */}

      <Tabs defaultValue="calculator">
        <TabsList className="flex flex-wrap w-full mb-4">
          <TabsTrigger value="calculator" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <Calculator className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Kalkulačka
          </TabsTrigger>
          <TabsTrigger value="income" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <DollarSign className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Příjmy
          </TabsTrigger>
          <TabsTrigger value="expenses" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <BarChart className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Výdaje
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <PieChart className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Kategorie
          </TabsTrigger>
          <TabsTrigger value="scenarios" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <Target className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Scénáře
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <LineChart className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Sezónnost
          </TabsTrigger>
          <TabsTrigger value="summary" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <TrendingUp className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Shrnutí
          </TabsTrigger>
        </TabsList>

        <TabsList className="flex flex-wrap w-full mb-4">
          <TabsTrigger value="market" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <Globe className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Analýza trhu
          </TabsTrigger>
          <TabsTrigger value="finance" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <FileText className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Finanční projekce
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <ShieldAlert className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Analýza rizik
          </TabsTrigger>
          <TabsTrigger value="operations" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <Building className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Operativní detaily
          </TabsTrigger>
          <TabsTrigger value="growth" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <BarChart2 className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Strategie růstu
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <Gauge className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Metriky
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Obchodní kalkulačka</CardTitle>
              <CardDescription>Vypočítejte své předpokládané příjmy, výdaje a zisk</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="daily-turnover">Průměrný denní obrat (Kč)</Label>
                  <Input
                    id="daily-turnover"
                    type="number"
                    value={dailyTurnover}
                    onChange={(e) => updateValues({ newDailyTurnover: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthly-turnover">Měsíční obrat (Kč)</Label>
                  <Input id="monthly-turnover" type="number" value={monthlyTurnover} readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-count">Počet zaměstnanců</Label>
                  <Input
                    id="staff-count"
                    type="number"
                    value={staffCount}
                    onChange={(e) => updateStaffCosts({ count: Number(e.target.value), cost: staffCost })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staff-cost">Průměrné náklady na zaměstnance (Kč)</Label>
                  <Input
                    id="staff-cost"
                    type="number"
                    value={staffCost}
                    onChange={(e) => updateStaffCosts({ count: staffCount, cost: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="utilities">Energie a služby (Kč)</Label>
                  <Input
                    id="utilities"
                    type="number"
                    value={utilities}
                    onChange={(e) => setUtilities(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="other-costs">Ostatní měsíční náklady (Kč)</Label>
                  <Input
                    id="other-costs"
                    type="number"
                    value={otherCosts}
                    onChange={(e) => setOtherCosts(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Switch id="advanced-options" checked={showAdvancedOptions} onCheckedChange={setShowAdvancedOptions} />
                <Label htmlFor="advanced-options">Zobrazit pokročilé možnosti</Label>
              </div>

              {showAdvancedOptions && (
                <div className="mt-4 space-y-4">
                  <h3 className="text-lg font-medium">Pokročilé možnosti</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wastage-rate">Míra ztrát (%)</Label>
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
                        <span className="w-12 text-right">{wastageRate}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marketing-costs">Marketingové náklady (Kč)</Label>
                      <Input
                        id="marketing-costs"
                        type="number"
                        value={marketingCosts}
                        onChange={(e) => setMarketingCosts(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maintenance-costs">Náklady na údržbu (Kč)</Label>
                      <Input
                        id="maintenance-costs"
                        type="number"
                        value={maintenanceCosts}
                        onChange={(e) => setMaintenanceCosts(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="insurance-costs">Pojištění (Kč)</Label>
                      <Input
                        id="insurance-costs"
                        type="number"
                        value={insuranceCosts}
                        onChange={(e) => setInsuranceCosts(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="accounting-costs">Účetnictví (Kč)</Label>
                      <Input
                        id="accounting-costs"
                        type="number"
                        value={accountingCosts}
                        onChange={(e) => setAccountingCosts(Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="training-costs">Školení (Kč)</Label>
                      <Input
                        id="training-costs"
                        type="number"
                        value={trainingCosts}
                        onChange={(e) => setTrainingCosts(Number(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full flex flex-col space-y-2">
                <div className="flex justify-between">
                  <span>Celková měsíční provize:</span>
                  <span className="font-bold">{totalCommission.toLocaleString()} Kč</span>
                </div>
                <div className="flex justify-between">
                  <span>Celkové měsíční náklady:</span>
                  <span className="font-bold">{totalCosts.toLocaleString()} Kč</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Měsíční zisk:</span>
                  <span className={`font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {profit.toLocaleString()} Kč
                  </span>
                </div>
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
                      <div className="text-2xl font-bold">{fixedCommission.toLocaleString()} Kč</div>
                      <p className="text-sm text-gray-500">Základní měsíční platba</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Variabilní provize</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{variableCommission.toLocaleString()} Kč</div>
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
                            ).toLocaleString()}{" "}
                            Kč
                          </div>
                        </div>
                      ))}
                      <Separator className="my-2" />
                      <div className="grid grid-cols-3 text-sm font-bold">
                        <div>Celkem</div>
                        <div>{((variableCommission / monthlyTurnover) * 100).toFixed(2)}%</div>
                        <div className="text-right">{variableCommission.toLocaleString()} Kč</div>
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
                        <span>{monthlyTurnover.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span>{totalCommission.toLocaleString()} Kč</span>
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
                          <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                  <span>{totalCommission.toLocaleString()} Kč</span>
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
                        <span className="font-medium">{staffCost.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex items-center justify-between font-bold">
                        <span>Celkové náklady na zaměstnance:</span>
                        <span>{totalStaffCost.toLocaleString()} Kč</span>
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
                      <div className="text-2xl font-bold">{rent.toLocaleString()} Kč</div>
                      <p className="text-sm text-gray-500">Hrazeno franšízorem</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Energie a služby</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{utilities.toLocaleString()} Kč</div>
                      <p className="text-sm text-gray-500">Elektřina, voda, internet atd.</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Licenční poplatek (1 % z obratu)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{licenseFee.toLocaleString()} Kč</div>
                    <p className="text-sm text-gray-500">Měsíční platba franšízorovi</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ztráty zásob ({wastageRate}% z obratu)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{wastageAmount.toLocaleString()} Kč</div>
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
                        <span>{marketingCosts.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Údržba:</span>
                        <span>{maintenanceCosts.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pojištění:</span>
                        <span>{insuranceCosts.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Účetnictví:</span>
                        <span>{accountingCosts.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Školení:</span>
                        <span>{trainingCosts.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ostatní náklady:</span>
                        <span>{otherCosts.toLocaleString()} Kč</span>
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
                          ).toLocaleString()}{" "}
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
                          <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                  <span>{totalCosts.toLocaleString()} Kč</span>
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
                        {Math.round(monthlyTurnover * (category.percentage / 100)).toLocaleString()} Kč
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Měsíční provize z kategorie:</span>
                      <span className="font-medium">
                        {Math.round(
                          monthlyTurnover * (category.percentage / 100) * (category.margin / 100),
                        ).toLocaleString()}{" "}
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
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                  <span>{variableCommission.toLocaleString()} Kč</span>
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
                      <span>{pessimisticScenario.turnover.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provize:</span>
                      <span>{pessimisticScenario.commission.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Náklady:</span>
                      <span>{pessimisticScenario.costs.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Zisk:</span>
                      <span className={pessimisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                        {pessimisticScenario.profit.toLocaleString()} Kč
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
                      <span>{realisticScenario.turnover.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provize:</span>
                      <span>{realisticScenario.commission.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Náklady:</span>
                      <span>{realisticScenario.costs.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Zisk:</span>
                      <span className={realisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                        {realisticScenario.profit.toLocaleString()} Kč
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
                      <span>{optimisticScenario.turnover.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Provize:</span>
                      <span>{optimisticScenario.commission.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Náklady:</span>
                      <span>{optimisticScenario.costs.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Zisk:</span>
                      <span className={optimisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                        {optimisticScenario.profit.toLocaleString()} Kč
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
                    ).toLocaleString()}{" "}
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
                    <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                      <span className="font-bold">{profit.toLocaleString()} Kč</span>
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
                      <span className="font-bold">{initialInvestment.toLocaleString()} Kč</span>
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
                      <span className="font-bold">{monthlyTurnover.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bod zvratu:</span>
                      <span className="font-bold">{breakEvenTurnover.toLocaleString()} Kč</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Celkový měsíční zisk:</span>
                  <span>{profit.toLocaleString()} Kč</span>
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
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
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
                            <td className="px-6 py-4 whitespace-nowrap">{staff.náklady.toLocaleString()} Kč</td>
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
                            <td className="px-6 py-4 whitespace-nowrap">{plan.costs.toLocaleString()} Kč</td>
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
                        <Tooltip formatter={(value) => (typeof value === 'number' ? value.toFixed(1) : value)} />
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

