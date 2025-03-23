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
  Info,
  Download,
  Zap,
  Calendar,
  Percent,
  ArrowRight,
  HelpCircle,
  FileText,
  Coins,
  TrendingDown,
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
import { Tooltip as TooltipComponent, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
  Line,
  Cell,
  Area,
  AreaChart,
  ComposedChart,
} from "recharts"

// Import the MobileTabScroller at the top of the file
import { MobileTabScroller } from "@/components/ui/mobile-tab-scroller"

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
  const [accountingCosts, setAccountingCosts] = useState(3000)
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
  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

  const updateScenario = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    setSelectedScenario(scenario)
  }

  // Funkce pro formátování čísel
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("cs-CZ", {
      style: "currency",
      currency: "CZK",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Funkce pro formátování procent
  const formatPercent = (value: number) => {
    return new Intl.NumberFormat("cs-CZ", {
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value / 100)
  }

  // Funkce pro získání barvy podle hodnoty
  const getColorByValue = (value: number, isInverted = false) => {
    if (isInverted) {
      return value <= 0 ? "text-green-600" : "text-red-600"
    }
    return value >= 0 ? "text-green-600" : "text-red-600"
  }

  // Funkce pro získání barvy pozadí podle hodnoty
  const getBgColorByValue = (value: number, isInverted = false) => {
    if (isInverted) {
      return value <= 0 ? "bg-green-600" : "bg-red-600"
    }
    return value >= 0 ? "bg-green-600" : "bg-red-600"
  }

  // Funkce pro získání barvy podle scénáře
  const getScenarioColor = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    switch (scenario) {
      case "pessimistic":
        return "text-red-600"
      case "realistic":
        return "text-blue-600"
      case "optimistic":
        return "text-green-600"
    }
  }

  // Funkce pro získání barvy pozadí podle scénáře
  const getScenarioBgColor = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    switch (scenario) {
      case "pessimistic":
        return "bg-red-50"
      case "realistic":
        return "bg-blue-50"
      case "optimistic":
        return "bg-green-50"
    }
  }

  // Funkce pro získání barvy okraje podle scénáře
  const getScenarioBorderColor = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    switch (scenario) {
      case "pessimistic":
        return "border-red-500"
      case "realistic":
        return "border-blue-500"
      case "optimistic":
        return "border-green-500"
    }
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-6 mb-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <Calculator className="mr-3 h-8 w-8" />
          Obchodní model
        </h1>
        <p className="text-violet-100 max-w-3xl">
          Interaktivní kalkulačka pro analýzu finančních aspektů franšízy Žabka. Prozkoumejte příjmy, výdaje, ziskovost
          a další klíčové ukazatele pro informované rozhodnutí o vašem podnikání.
        </p>
      </div>

      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <Info className="h-5 w-5 text-orange-600" />
        <AlertTitle className="text-orange-800 font-semibold">Důležité upozornění</AlertTitle>
        <AlertDescription className="text-orange-700">
          Tato kalkulačka slouží pouze k orientačním účelům. Skutečné výsledky se mohou lišit v závislosti na mnoha
          faktorech, jako je lokalita, sezónnost, konkurence a další. Pro přesné informace kontaktujte přímo společnost
          Žabka.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="calculator">
        <MobileTabScroller showScrollIndicators={true} value="calculator">
          <TabsList className="flex flex-wrap w-full bg-white p-1 rounded-lg shadow-md">
            <TabsTrigger value="calculator" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Calculator className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Kalkulačka</span>
              <span className="sm:hidden">Kalkulačka</span>
            </TabsTrigger>
            <TabsTrigger value="income" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <DollarSign className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Příjmy</span>
              <span className="sm:hidden">Příjmy</span>
            </TabsTrigger>
            <TabsTrigger value="expenses" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <BarChart className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Výdaje</span>
              <span className="sm:hidden">Výdaje</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <PieChart className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Kategorie</span>
              <span className="sm:hidden">Kategorie</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Target className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Scénáře</span>
              <span className="sm:hidden">Scénáře</span>
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <Calendar className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Sezónnost</span>
              <span className="sm:hidden">Sezónnost</span>
            </TabsTrigger>
            <TabsTrigger value="summary" className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap">
              <TrendingUp className="mr-1.5 h-4 w-4" /> <span className="hidden sm:inline">Shrnutí</span>
              <span className="sm:hidden">Shrnutí</span>
            </TabsTrigger>
          </TabsList>
        </MobileTabScroller>

        <TabsContent value="calculator" className="space-y-4">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <Calculator className="mr-2 h-5 w-5" />
                Obchodní kalkulačka
              </CardTitle>
              <CardDescription className="text-violet-100">
                Vypočítejte své předpokládané příjmy, výdaje a zisk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center text-violet-800">
                    <DollarSign className="mr-2 h-5 w-5 text-violet-600" />
                    Základní údaje o obratu
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="daily-turnover" className="flex items-center">
                          Průměrný denní obrat
                          <TooltipProvider>
                            <TooltipComponent>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Průměrný denní obrat prodejny. Typická hodnota pro Žabku je mezi 25 000 - 40 000 Kč.
                                </p>
                              </TooltipContent>
                            </TooltipComponent>
                          </TooltipProvider>
                        </Label>
                        <Badge variant="outline" className="font-normal">
                          Doporučeno: 25 000 - 40 000 Kč
                        </Badge>
                      </div>
                      <Input
                        id="daily-turnover"
                        type="number"
                        value={dailyTurnover}
                        onChange={(e) => updateValues({ newDailyTurnover: Number(e.target.value) })}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthly-turnover">Měsíční obrat</Label>
                      <Input
                        id="monthly-turnover"
                        type="text"
                        value={formatCurrency(monthlyTurnover)}
                        readOnly
                        className="bg-gray-50 text-right"
                      />
                    </div>
                  </div>

                  <h3 className="text-lg font-medium flex items-center text-violet-800 mt-6">
                    <Users className="mr-2 h-5 w-5 text-violet-600" />
                    Personální náklady
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="staff-count" className="flex items-center">
                          Počet zaměstnanců
                          <TooltipProvider>
                            <TooltipComponent>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Celkový počet zaměstnanců (včetně brigádníků přepočtených na plné úvazky).
                                </p>
                              </TooltipContent>
                            </TooltipComponent>
                          </TooltipProvider>
                        </Label>
                        <Badge variant="outline" className="font-normal">
                          Typicky: 2-4 osoby
                        </Badge>
                      </div>
                      <Input
                        id="staff-count"
                        type="number"
                        value={staffCount}
                        onChange={(e) => updateStaffCosts({ count: Number(e.target.value), cost: staffCost })}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff-cost">Průměrné náklady na zaměstnance (měsíčně)</Label>
                      <Input
                        id="staff-cost"
                        type="number"
                        value={staffCost}
                        onChange={(e) => updateStaffCosts({ count: staffCount, cost: Number(e.target.value) })}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-staff-cost">Celkové personální náklady</Label>
                      <Input
                        id="total-staff-cost"
                        type="text"
                        value={formatCurrency(totalStaffCost)}
                        readOnly
                        className="bg-gray-50 text-right"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center text-violet-800">
                    <BarChart className="mr-2 h-5 w-5 text-violet-600" />
                    Další provozní náklady
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rent" className="flex items-center">
                          Nájem
                          <TooltipProvider>
                            <TooltipComponent>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">Nájem je hrazen franšízorem Žabka.</p>
                              </TooltipContent>
                            </TooltipComponent>
                          </TooltipProvider>
                        </Label>
                        <Badge className="bg-green-100 text-green-800">Hrazeno franšízorem</Badge>
                      </div>
                      <Input
                        id="rent"
                        type="text"
                        value={formatCurrency(rent)}
                        readOnly
                        className="bg-gray-50 text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="utilities">Energie a služby</Label>
                      <Input
                        id="utilities"
                        type="number"
                        value={utilities}
                        onChange={(e) => setUtilities(Number(e.target.value))}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="other-costs">Ostatní měsíční náklady</Label>
                      <Input
                        id="other-costs"
                        type="number"
                        value={otherCosts}
                        onChange={(e) => setOtherCosts(Number(e.target.value))}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license-fee">Licenční poplatek (1% z obratu)</Label>
                      <Input
                        id="license-fee"
                        type="text"
                        value={formatCurrency(licenseFee)}
                        readOnly
                        className="bg-gray-50 text-right"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-6">
                    <Switch
                      id="advanced-options"
                      checked={showAdvancedOptions}
                      onCheckedChange={setShowAdvancedOptions}
                    />
                    <Label htmlFor="advanced-options" className="font-medium cursor-pointer">
                      Zobrazit pokročilé možnosti
                    </Label>
                  </div>
                </div>
              </div>

              {showAdvancedOptions && (
                <div className="mt-4 space-y-4">
                  <Card className="border-violet-200 bg-violet-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center text-violet-800">
                        <Zap className="mr-2 h-4 w-4 text-violet-600" />
                        Pokročilé možnosti
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="wastage-rate" className="flex items-center">
                            Míra ztrát (%)
                            <TooltipProvider>
                              <TooltipComponent>
                                <TooltipTrigger>
                                  <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    Procento zboží, které se neprodá z důvodu prošlé doby trvanlivosti, poškození nebo
                                    krádeží.
                                  </p>
                                </TooltipContent>
                              </TooltipComponent>
                            </TooltipProvider>
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
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maintenance-costs">Náklady na údržbu (Kč)</Label>
                          <Input
                            id="maintenance-costs"
                            type="number"
                            value={maintenanceCosts}
                            onChange={(e) => setMaintenanceCosts(Number(e.target.value))}
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="insurance-costs">Pojištění (Kč)</Label>
                          <Input
                            id="insurance-costs"
                            type="number"
                            value={insuranceCosts}
                            onChange={(e) => setInsuranceCosts(Number(e.target.value))}
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accounting-costs">Účetnictví (Kč)</Label>
                          <Input
                            id="accounting-costs"
                            type="number"
                            value={accountingCosts}
                            onChange={(e) => setAccountingCosts(Number(e.target.value))}
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="training-costs">Školení (Kč)</Label>
                          <Input
                            id="training-costs"
                            type="number"
                            value={trainingCosts}
                            onChange={(e) => setTrainingCosts(Number(e.target.value))}
                            className="text-right"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="mt-6">
                <Card className="border-none shadow-md bg-gradient-to-r from-violet-50 to-indigo-50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center text-violet-800">
                      <TrendingUp className="mr-2 h-5 w-5 text-violet-600" />
                      Výsledky kalkulace
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-violet-700">Celková měsíční provize</Label>
                        <div className="text-2xl font-bold text-violet-800">{formatCurrency(totalCommission)}</div>
                        <div className="text-sm text-violet-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Fixní: {formatCurrency(fixedCommission)} + Variabilní: {formatCurrency(variableCommission)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-violet-700">Celkové měsíční náklady</Label>
                        <div className="text-2xl font-bold text-violet-800">{formatCurrency(totalCosts)}</div>
                        <div className="text-sm text-violet-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Personál: {formatCurrency(totalStaffCost)} + Ostatní:{" "}
                          {formatCurrency(totalCosts - totalStaffCost)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-violet-700">Měsíční zisk</Label>
                        <div className={`text-2xl font-bold ${getColorByValue(profit)}`}>{formatCurrency(profit)}</div>
                        <div className="text-sm text-violet-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Roční zisk: {formatCurrency(profit * 12)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-violet-700">Hrubá marže:</span>
                  <Badge className="bg-violet-100 text-violet-800">{formatPercent(grossMarginPercentage)}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-700">Čistá marže:</span>
                  <Badge
                    className={`${netMarginPercentage >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {formatPercent(netMarginPercentage)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-700">Návratnost investice (ROI):</span>
                  <Badge className={`${roi > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {roi > 0 ? formatPercent(roi) + " ročně" : "N/A"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-700">Doba návratnosti:</span>
                  <Badge className={`${profit > 0 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                    {profit > 0 ? Math.ceil(paybackPeriod) + " měsíců" : "N/A"}
                  </Badge>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="income" className="space-y-4">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <DollarSign className="mr-2 h-5 w-5" />
                Analýza příjmů
              </CardTitle>
              <CardDescription className="text-violet-100">Rozpis struktury provize a zdrojů příjmů</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                      <CardTitle className="text-base flex items-center text-violet-800">
                        <Coins className="mr-2 h-4 w-4 text-violet-600" />
                        Fixní provize
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold text-violet-700">{formatCurrency(fixedCommission)}</div>
                      <p className="text-sm text-violet-600 mt-2">
                        Základní měsíční platba nezávislá na obratu. Tvoří{" "}
                        {formatPercent((fixedCommission / totalCommission) * 100)} z celkové provize.
                      </p>
                      <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">Výhody fixní provize:</h4>
                        <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                          <li>Stabilní příjem nezávislý na sezónních výkyvech</li>
                          <li>Jistota minimálního příjmu i v období nižších prodejů</li>
                          <li>Snazší plánování cash-flow a rozpočtu</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                      <CardTitle className="text-base flex items-center text-violet-800">
                        <Percent className="mr-2 h-4 w-4 text-violet-600" />
                        Variabilní provize
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold text-violet-700">{formatCurrency(variableCommission)}</div>
                      <p className="text-sm text-violet-600 mt-2">
                        Provize závislá na obratu a struktuře prodeje. Tvoří{" "}
                        {formatPercent((variableCommission / totalCommission) * 100)} z celkové provize.
                      </p>
                      <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">Výhody variabilní provize:</h4>
                        <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                          <li>Roste s rostoucím obratem prodejny</li>
                          <li>Motivuje k optimalizaci sortimentu a zvyšování prodejů</li>
                          <li>Umožňuje profitovat z úspěšných sezón a marketingových akcí</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-md border-none">
                  <CardHeader className="bg-violet-50 pb-2">
                    <CardTitle className="text-base flex items-center">
                      <PieChart className="mr-2 h-4 w-4 text-violet-600" />
                      Provize podle kategorie produktů
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-2">Kategorie</th>
                            <th className="text-center py-2">Podíl na obratu</th>
                            <th className="text-center py-2">Marže</th>
                            <th className="text-right py-2">Měsíční obrat</th>
                            <th className="text-right py-2">Měsíční provize</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productCategories.map((category, index) => (
                            <tr key={index} className="border-b hover:bg-violet-50 transition-colors">
                              <td className="py-2 font-medium">{category.name}</td>
                              <td className="text-center py-2">{category.percentage}%</td>
                              <td className="text-center py-2">{category.margin.toFixed(2)}%</td>
                              <td className="text-right py-2">
                                {formatCurrency(monthlyTurnover * (category.percentage / 100))}
                              </td>
                              <td className="text-right py-2">
                                {formatCurrency(
                                  monthlyTurnover * (category.percentage / 100) * (category.margin / 100),
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="bg-violet-50">
                            <td className="py-2 font-bold">Celkem</td>
                            <td className="text-center py-2 font-bold">100%</td>
                            <td className="text-center py-2 font-bold">
                              {((variableCommission / monthlyTurnover) * 100).toFixed(2)}%
                            </td>
                            <td className="text-right py-2 font-bold">{formatCurrency(monthlyTurnover)}</td>
                            <td className="text-right py-2 font-bold">{formatCurrency(variableCommission)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-md border-none">
                    <CardHeader className="bg-violet-50 pb-2">
                      <CardTitle className="text-base flex items-center">
                        <TrendingUp className="mr-2 h-4 w-4 text-violet-600" />
                        Analýza hrubé marže
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">Hrubá marže:</span>
                          <span className="font-bold text-violet-800">{formatPercent(grossMarginPercentage)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-violet-600 h-2.5 rounded-full"
                            style={{ width: `${Math.min(grossMarginPercentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Měsíční obrat:</span>
                          <span>{formatCurrency(monthlyTurnover)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Celková provize:</span>
                          <span>{formatCurrency(totalCommission)}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Hrubá marže (%):</span>
                          <span>{formatPercent(grossMarginPercentage)}</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">Co znamená hrubá marže?</h4>
                        <p className="text-xs text-violet-700">
                          Hrubá marže představuje poměr mezi celkovou provizí a obratem. Ukazuje, kolik procent z obratu
                          tvoří vaše příjmy před odečtením nákladů. Vyšší hrubá marže znamená lepší potenciál pro
                          ziskovost.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-none">
                    <CardHeader className="bg-violet-50 pb-2">
                      <CardTitle className="text-base flex items-center">
                        <PieChart className="mr-2 h-4 w-4 text-violet-600" />
                        Vizualizace příjmů
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
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
                              <Cell fill="#4f46e5" />
                              <Cell fill="#10b981" />
                            </Pie>
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-md border-none">
                  <CardHeader className="bg-violet-50 pb-2">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                      Příjmy podle kategorií produktů
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Legend />
                          <Bar dataKey="obrat" name="Obrat" fill="#4f46e5" />
                          <Bar dataKey="provize" name="Provize" fill="#10b981" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-violet-800">Celkový měsíční příjem:</span>
                  <span className="text-lg font-bold text-violet-800">{formatCurrency(totalCommission)}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout analýzu příjmů (PDF)
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-4">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <BarChart className="mr-2 h-5 w-5" />
                Rozpis výdajů
              </CardTitle>
              <CardDescription className="text-violet-100">Přehled měsíčních provozních nákladů</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-6">
                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <Users className="mr-2 h-4 w-4 text-violet-600" />
                      Náklady na zaměstnance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Users className="mr-2 h-4 w-4 text-violet-600" />
                          <span>Počet zaměstnanců:</span>
                        </div>
                        <span className="font-medium">{staffCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Průměrné náklady na zaměstnance:</span>
                        <span className="font-medium">{formatCurrency(staffCost)}</span>
                      </div>
                      <div className="flex items-center justify-between font-bold">
                        <span>Celkové náklady na zaměstnance:</span>
                        <span>{formatCurrency(totalStaffCost)}</span>
                      </div>
                      <div className="mt-2 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">Personální náklady tvoří:</h4>
                        <div className="flex items-center mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-violet-600 h-2.5 rounded-full"
                              style={{ width: `${Math.min((totalStaffCost / totalCosts) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-medium text-violet-800">
                            {formatPercent((totalStaffCost / totalCosts) * 100)}
                          </span>
                        </div>
                        <p className="text-xs text-violet-700 mt-2">
                          Personální náklady jsou obvykle největší položkou provozních výdajů. Optimalizace směn a
                          efektivní plánování personálu může výrazně zvýšit ziskovost.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="shadow-md border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                      <CardTitle className="text-base flex items-center text-violet-800">
                        <FileText className="mr-2 h-4 w-4 text-violet-600" />
                        Nájem
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold text-green-600">{formatCurrency(rent)}</div>
                      <p className="text-sm text-violet-600 mt-2">
                        Nájem prostor je plně hrazen franšízorem Žabka, což je významná konkurenční výhoda oproti jiným
                        franšízovým konceptům.
                      </p>
                      <div className="mt-4 bg-green-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-green-800 mb-1">Výhoda nulových nákladů na nájem:</h4>
                        <ul className="text-xs text-green-700 space-y-1 list-disc pl-4">
                          <li>Eliminace jednoho z největších fixních nákladů</li>
                          <li>Nižší finanční riziko pro franchisanta</li>
                          <li>Lepší cash-flow a rychlejší návratnost investice</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="shadow-md border-none overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                      <CardTitle className="text-base flex items-center text-violet-800">
                        <TrendingUp className="mr-2 h-4 w-4 text-violet-600" />
                        Energie a služby
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="text-3xl font-bold text-violet-700">{formatCurrency(utilities)}</div>
                      <p className="text-sm text-violet-600 mt-2">
                        Náklady na elektřinu, vodu, topení, internet a další služby spojené s provozem prodejny.
                      </p>
                      <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">Tipy pro optimalizaci:</h4>
                        <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                          <li>Investice do energeticky úsporných spotřebičů a osvětlení</li>
                          <li>Pravidelná údržba chladicích zařízení pro maximální efektivitu</li>
                          <li>Monitoring spotřeby a identifikace možných úniků</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <Percent className="mr-2 h-4 w-4 text-violet-600" />
                      Licenční poplatek (1% z obratu)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-violet-700">{formatCurrency(licenseFee)}</div>
                    <p className="text-sm text-violet-600 mt-2">
                      Měsíční poplatek franšízorovi za používání značky, know-how a systému Žabka. Činí 1% z celkového
                      měsíčního obratu.
                    </p>
                    <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-violet-800 mb-1">Srovnání s konkurencí:</h4>
                      <p className="text-xs text-violet-700 mb-2">
                        Licenční poplatek 1% je výrazně nižší než u většiny konkurenčních franšízových konceptů, kde se
                        poplatky běžně pohybují mezi 3-7% z obratu.
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-violet-600 h-2.5 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">Žabka: 1%</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                        </div>
                        <span className="ml-2 text-xs font-medium">Konkurence: 3-7%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <TrendingDown className="mr-2 h-4 w-4 text-violet-600" />
                      Ztráty zásob ({wastageRate}% z obratu)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-violet-700">{formatCurrency(wastageAmount)}</div>
                    <p className="text-sm text-violet-600 mt-2">
                      Ztráty způsobené prošlým zbožím, poškozením, krádežemi a dalšími faktory. Průměrně se pohybují
                      mezi 1-3% z obratu.
                    </p>
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
                    <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-violet-800 mb-1">Jak snížit ztráty:</h4>
                      <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                        <li>Pečlivé řízení zásob a objednávek podle prodejních dat</li>
                        <li>Pravidelné kontroly dat spotřeby a rotace zboží</li>
                        <li>Efektivní cenové akce na zboží s blížícím se datem spotřeby</li>
                        <li>Bezpečnostní opatření proti krádežím</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none">
                  <CardHeader className="bg-violet-50 pb-2">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                      Další provozní náklady
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Marketing:</span>
                        <span>{formatCurrency(marketingCosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Údržba:</span>
                        <span>{formatCurrency(maintenanceCosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Pojištění:</span>
                        <span>{formatCurrency(insuranceCosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Účetnictví:</span>
                        <span>{formatCurrency(accountingCosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Školení:</span>
                        <span>{formatCurrency(trainingCosts)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ostatní náklady:</span>
                        <span>{formatCurrency(otherCosts)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Celkem další náklady:</span>
                        <span>
                          {formatCurrency(
                            marketingCosts +
                              maintenanceCosts +
                              insuranceCosts +
                              accountingCosts +
                              trainingCosts +
                              otherCosts,
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none">
                  <CardHeader className="bg-violet-50 pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Coins className="mr-2 h-4 w-4 text-violet-600" />
                      Počáteční jednorázové náklady
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                      <div className="grid grid-cols-2 text-sm">
                        <div className="font-medium">Celková počáteční investice</div>
                        <div className="font-bold">180 000 Kč</div>
                      </div>
                      <div className="mt-2 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">Poznámka k jistině:</h4>
                        <p className="text-xs text-violet-700">
                          Jistina se postupně navyšuje z počátečních 20 000 Kč na konečných 150 000 Kč. Slouží jako
                          záruka pro franšízora a je vratná při ukončení spolupráce.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none">
                  <CardHeader className="bg-violet-50 pb-2">
                    <CardTitle className="text-base flex items-center">
                      <PieChart className="mr-2 h-4 w-4 text-violet-600" />
                      Vizualizace nákladů
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                            label={({ name, percent }) =>
                              percent > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
                            }
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
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-violet-800">Celkové měsíční výdaje:</span>
                  <span className="text-lg font-bold text-violet-800">{formatCurrency(totalCosts)}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout analýzu výdajů (PDF)
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <PieChart className="mr-2 h-5 w-5" />
                Analýza produktových kategorií
              </CardTitle>
              <CardDescription className="text-violet-100">
                Podíl jednotlivých kategorií na obratu a marži
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md border-none">
                  <CardHeader className="bg-violet-50 pb-2">
                    <CardTitle className="text-base flex items-center">
                      <PieChart className="mr-2 h-4 w-4 text-violet-600" />
                      Podíl kategorií na obratu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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

                <Card className="shadow-md border-none">
                  <CardHeader className="bg-violet-50 pb-2">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                      Obrat a provize podle kategorií
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
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
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Legend />
                          <Bar dataKey="obrat" name="Obrat" fill="#4f46e5" />
                          <Bar dataKey="provize" name="Provize" fill="#10b981" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center text-violet-800">
                  <Percent className="mr-2 h-5 w-5 text-violet-600" />
                  Nastavení kategorií
                </h3>
                <p className="text-sm text-violet-600">
                  Upravte podíl jednotlivých kategorií na celkovém obratu a jejich marže. Součet podílů na obratu musí
                  být vždy 100%.
                </p>

                <div className="space-y-6">
                  {productCategories.map((category, index) => (
                    <Card key={index} className="shadow-sm border-none">
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <Label htmlFor={`category-${index}`} className="font-medium text-violet-800">
                              {category.name}
                            </Label>
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
                            <div className="flex items-center">
                              <span className="text-sm text-gray-500 mr-2">Marže:</span>
                              <TooltipProvider>
                                <TooltipComponent>
                                  <TooltipTrigger>
                                    <HelpCircle className="h-4 w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">
                                      Marže představuje procento z obratu dané kategorie, které získáte jako provizi.
                                      Hodnoty jsou nastaveny podle standardních podmínek Žabka.
                                    </p>
                                  </TooltipContent>
                                </TooltipComponent>
                              </TooltipProvider>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Input
                                id={`margin-${index}`}
                                type="number"
                                value={category.margin}
                                onChange={(e) => updateCategoryMargin({ index, newMargin: Number(e.target.value) })}
                                className="w-20 text-right"
                              />
                              <span>%</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div className="flex justify-between text-sm">
                              <span>Měsíční obrat kategorie:</span>
                              <span className="font-medium">
                                {formatCurrency(monthlyTurnover * (category.percentage / 100))}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Měsíční provize z kategorie:</span>
                              <span className="font-medium">
                                {formatCurrency(
                                  monthlyTurnover * (category.percentage / 100) * (category.margin / 100),
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-violet-600" />
                    Efektivita kategorií
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Kategorie</th>
                          <th className="text-center py-2">Podíl na obratu</th>
                          <th className="text-center py-2">Marže</th>
                          <th className="text-center py-2">Podíl na provizi</th>
                          <th className="text-center py-2">Efektivita</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productCategories
                          .map((cat) => ({
                            ...cat,
                            provizeValue: monthlyTurnover * (cat.percentage / 100) * (cat.margin / 100),
                            podilNaProvizi:
                              ((monthlyTurnover * (cat.percentage / 100) * (cat.margin / 100)) / variableCommission) *
                              100,
                            efektivita: cat.margin / cat.percentage,
                          }))
                          .sort((a, b) => b.efektivita - a.efektivita)
                          .map((category, index) => (
                            <tr key={index} className="border-b hover:bg-violet-50 transition-colors">
                              <td className="py-2 font-medium">{category.name}</td>
                              <td className="text-center py-2">{category.percentage}%</td>
                              <td className="text-center py-2">{category.margin.toFixed(2)}%</td>
                              <td className="text-center py-2">{category.podilNaProvizi.toFixed(2)}%</td>
                              <td className="text-center py-2">
                                <Badge
                                  className={
                                    category.efektivita > 1.5
                                      ? "bg-green-100 text-green-800"
                                      : category.efektivita > 1
                                        ? "bg-blue-100 text-blue-800"
                                        : category.efektivita > 0.5
                                          ? "bg-amber-100 text-amber-800"
                                          : "bg-red-100 text-red-800"
                                  }
                                >
                                  {category.efektivita.toFixed(2)}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Co znamená efektivita?</h4>
                    <p className="text-xs text-violet-700">
                      Efektivita je poměr mezi marží kategorie a jejím podílem na obratu. Hodnota vyšší než 1 znamená,
                      že kategorie přináší nadprůměrnou provizi vzhledem ke svému podílu na obratu. Zaměřte se na
                      podporu prodeje kategorií s vysokou efektivitou.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-violet-800">Celková variabilní provize:</span>
                  <span className="text-lg font-bold text-violet-800">{formatCurrency(variableCommission)}</span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout analýzu kategorií (PDF)
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <Target className="mr-2 h-5 w-5" />
                Analýza scénářů
              </CardTitle>
              <CardDescription className="text-violet-100">
                Porovnání pesimistického, realistického a optimistického scénáře
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="flex justify-center space-x-4 mb-6">
                <Button
                  variant={selectedScenario === "pessimistic" ? "default" : "outline"}
                  onClick={() => updateScenario("pessimistic")}
                  className={`flex items-center ${
                    selectedScenario === "pessimistic" ? "bg-red-600 hover:bg-red-700" : "text-red-600 border-red-200"
                  }`}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Pesimistický
                </Button>
                <Button
                  variant={selectedScenario === "realistic" ? "default" : "outline"}
                  onClick={() => updateScenario("realistic")}
                  className={`flex items-center ${
                    selectedScenario === "realistic" ? "bg-blue-600 hover:bg-blue-700" : "text-blue-600 border-blue-200"
                  }`}
                >
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  Realistický
                </Button>
                <Button
                  variant={selectedScenario === "optimistic" ? "default" : "outline"}
                  onClick={() => updateScenario("optimistic")}
                  className={`flex items-center ${
                    selectedScenario === "optimistic"
                      ? "bg-green-600 hover:bg-green-700"
                      : "text-green-600 border-green-200"
                  }`}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Optimistický
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  className={`shadow-md border-none overflow-hidden transition-all hover:shadow-lg ${
                    selectedScenario === "pessimistic" ? "border-2 border-red-500" : ""
                  }`}
                >
                  <CardHeader className="bg-red-50 pb-2">
                    <CardTitle className="text-base flex items-center text-red-800">
                      <AlertTriangle className="mr-2 h-4 w-4 text-red-600" />
                      Pesimistický scénář
                    </CardTitle>
                    <CardDescription className="text-red-600">Obrat: -20%, Náklady: +10%, Ztráty: 3%</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span className="font-medium">{formatCurrency(pessimisticScenario.turnover)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span className="font-medium">{formatCurrency(pessimisticScenario.commission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celkové náklady:</span>
                        <span className="font-medium">{formatCurrency(pessimisticScenario.costs)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Měsíční zisk:</span>
                        <span className={getColorByValue(pessimisticScenario.profit)}>
                          {formatCurrency(pessimisticScenario.profit)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Roční zisk:</span>
                        <span className={getColorByValue(pessimisticScenario.profit)}>
                          {formatCurrency(pessimisticScenario.profit * 12)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 bg-red-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-red-800 mb-1">Předpoklady scénáře:</h4>
                      <ul className="text-xs text-red-700 space-y-1 list-disc pl-4">
                        <li>Nižší návštěvnost prodejny než očekáváno</li>
                        <li>Silnější konkurence v okolí</li>
                        <li>Vyšší provozní náklady</li>
                        <li>Vyšší míra ztrát zboží</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`shadow-md border-none overflow-hidden transition-all hover:shadow-lg ${
                    selectedScenario === "realistic" ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <CardHeader className="bg-blue-50 pb-2">
                    <CardTitle className="text-base flex items-center text-blue-800">
                      <ArrowUpDown className="mr-2 h-4 w-4 text-blue-600" />
                      Realistický scénář
                    </CardTitle>
                    <CardDescription className="text-blue-600">Obrat: 100%, Náklady: 100%, Ztráty: 2%</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span className="font-medium">{formatCurrency(realisticScenario.turnover)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span className="font-medium">{formatCurrency(realisticScenario.commission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celkové náklady:</span>
                        <span className="font-medium">{formatCurrency(realisticScenario.costs)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Měsíční zisk:</span>
                        <span className={getColorByValue(realisticScenario.profit)}>
                          {formatCurrency(realisticScenario.profit)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Roční zisk:</span>
                        <span className={getColorByValue(realisticScenario.profit)}>
                          {formatCurrency(realisticScenario.profit * 12)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 bg-blue-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-1">Předpoklady scénáře:</h4>
                      <ul className="text-xs text-blue-700 space-y-1 list-disc pl-4">
                        <li>Standardní návštěvnost prodejny</li>
                        <li>Běžná úroveň konkurence</li>
                        <li>Očekávané provozní náklady</li>
                        <li>Průměrná míra ztrát zboží</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card
                  className={`shadow-md border-none overflow-hidden transition-all hover:shadow-lg ${
                    selectedScenario === "optimistic" ? "border-2 border-green-500" : ""
                  }`}
                >
                  <CardHeader className="bg-green-50 pb-2">
                    <CardTitle className="text-base flex items-center text-green-800">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Optimistický scénář
                    </CardTitle>
                    <CardDescription className="text-green-600">
                      Obrat: +20%, Náklady: -5%, Ztráty: 1.5%
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span className="font-medium">{formatCurrency(optimisticScenario.turnover)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span className="font-medium">{formatCurrency(optimisticScenario.commission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celkové náklady:</span>
                        <span className="font-medium">{formatCurrency(optimisticScenario.costs)}</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Měsíční zisk:</span>
                        <span className={getColorByValue(optimisticScenario.profit)}>
                          {formatCurrency(optimisticScenario.profit)}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Roční zisk:</span>
                        <span className={getColorByValue(optimisticScenario.profit)}>
                          {formatCurrency(optimisticScenario.profit * 12)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 bg-green-50 p-3 rounded-lg">
                      <h4 className="text-sm font-medium text-green-800 mb-1">Předpoklady scénáře:</h4>
                      <ul className="text-xs text-green-700 space-y-1 list-disc pl-4">
                        <li>Vyšší návštěvnost prodejny než očekáváno</li>
                        <li>Slabší konkurence v okolí</li>
                        <li>Optimalizované provozní náklady</li>
                        <li>Nižší míra ztrát zboží díky efektivnímu řízení</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                    Porovnání scénářů
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          {
                            name: "Pesimistický",
                            obrat: pessimisticScenario.turnover,
                            provize: pessimisticScenario.commission,
                            naklady: pessimisticScenario.costs,
                            zisk: pessimisticScenario.profit,
                          },
                          {
                            name: "Realistický",
                            obrat: realisticScenario.turnover,
                            provize: realisticScenario.commission,
                            naklady: realisticScenario.costs,
                            zisk: realisticScenario.profit,
                          },
                          {
                            name: "Optimistický",
                            obrat: optimisticScenario.turnover,
                            provize: optimisticScenario.commission,
                            naklady: optimisticScenario.costs,
                            zisk: optimisticScenario.profit,
                          },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="obrat" name="Obrat" fill="#4f46e5" />
                        <Bar dataKey="provize" name="Provize" fill="#10b981" />
                        <Bar dataKey="naklady" name="Náklady" fill="#ef4444" />
                        <Bar dataKey="zisk" name="Zisk" fill="#f59e0b" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-violet-600" />
                    Finanční ukazatele podle scénářů
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Ukazatel</th>
                          <th className="text-center py-2 bg-red-50">Pesimistický</th>
                          <th className="text-center py-2 bg-blue-50">Realistický</th>
                          <th className="text-center py-2 bg-green-50">Optimistický</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-violet-50 transition-colors">
                          <td className="py-2 font-medium">Hrubá marže (%)</td>
                          <td className="text-center py-2 bg-red-50">
                            {formatPercent((pessimisticScenario.commission / pessimisticScenario.turnover) * 100)}
                          </td>
                          <td className="text-center py-2 bg-blue-50">
                            {formatPercent((realisticScenario.commission / realisticScenario.turnover) * 100)}
                          </td>
                          <td className="text-center py-2 bg-green-50">
                            {formatPercent((optimisticScenario.commission / optimisticScenario.turnover) * 100)}
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-violet-50 transition-colors">
                          <td className="py-2 font-medium">Čistá marže (%)</td>
                          <td className="text-center py-2 bg-red-50">
                            {formatPercent((pessimisticScenario.profit / pessimisticScenario.turnover) * 100)}
                          </td>
                          <td className="text-center py-2 bg-blue-50">
                            {formatPercent((realisticScenario.profit / realisticScenario.turnover) * 100)}
                          </td>
                          <td className="text-center py-2 bg-green-50">
                            {formatPercent((optimisticScenario.profit / optimisticScenario.turnover) * 100)}
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-violet-50 transition-colors">
                          <td className="py-2 font-medium">Roční zisk</td>
                          <td className="text-center py-2 bg-red-50">
                            {formatCurrency(pessimisticScenario.profit * 12)}
                          </td>
                          <td className="text-center py-2 bg-blue-50">
                            {formatCurrency(realisticScenario.profit * 12)}
                          </td>
                          <td className="text-center py-2 bg-green-50">
                            {formatCurrency(optimisticScenario.profit * 12)}
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-violet-50 transition-colors">
                          <td className="py-2 font-medium">ROI (%)</td>
                          <td className="text-center py-2 bg-red-50">
                            {pessimisticScenario.profit > 0
                              ? formatPercent(((pessimisticScenario.profit * 12) / initialInvestment) * 100)
                              : "N/A"}
                          </td>
                          <td className="text-center py-2 bg-blue-50">
                            {realisticScenario.profit > 0
                              ? formatPercent(((realisticScenario.profit * 12) / initialInvestment) * 100)
                              : "N/A"}
                          </td>
                          <td className="text-center py-2 bg-green-50">
                            {optimisticScenario.profit > 0
                              ? formatPercent(((optimisticScenario.profit * 12) / initialInvestment) * 100)
                              : "N/A"}
                          </td>
                        </tr>
                        <tr className="border-b hover:bg-violet-50 transition-colors">
                          <td className="py-2 font-medium">Doba návratnosti (měsíce)</td>
                          <td className="text-center py-2 bg-red-50">
                            {pessimisticScenario.profit > 0
                              ? Math.ceil(initialInvestment / pessimisticScenario.profit)
                              : "N/A"}
                          </td>
                          <td className="text-center py-2 bg-blue-50">
                            {realisticScenario.profit > 0
                              ? Math.ceil(initialInvestment / realisticScenario.profit)
                              : "N/A"}
                          </td>
                          <td className="text-center py-2 bg-green-50">
                            {optimisticScenario.profit > 0
                              ? Math.ceil(initialInvestment / optimisticScenario.profit)
                              : "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Info className="mr-2 h-4 w-4 text-violet-600" />
                    Analýza citlivosti
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <p className="text-sm text-violet-700 mb-4">
                    Analýza citlivosti ukazuje, jak se změní zisk při změně klíčových parametrů. Níže je zobrazen vliv
                    změny obratu a nákladů na měsíční zisk.
                  </p>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={[
                          { name: "-20%", obrat: profit * 0.8, naklady: profit * 1.2 },
                          { name: "-10%", obrat: profit * 0.9, naklady: profit * 1.1 },
                          { name: "0%", obrat: profit, naklady: profit },
                          { name: "+10%", obrat: profit * 1.1, naklady: profit * 0.9 },
                          { name: "+20%", obrat: profit * 1.2, naklady: profit * 0.8 },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="obrat"
                          name="Změna obratu"
                          stroke="#4f46e5"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          activeDot={{ r: 8 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="naklady"
                          name="Změna nákladů"
                          stroke="#ef4444"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          activeDot={{ r: 8 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Interpretace:</h4>
                    <p className="text-xs text-violet-700">
                      Graf ukazuje, že zisk je citlivější na změny obratu než na změny nákladů. Zvýšení obratu o 10% má
                      větší pozitivní dopad na zisk než snížení nákladů o 10%. Proto je vhodné se primárně zaměřit na
                      strategie zvyšování obratu.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-violet-800">Vybraný scénář:</span>
                  <span className={`text-lg font-bold ${getScenarioColor(selectedScenario)}`}>
                    {selectedScenario === "pessimistic"
                      ? "Pesimistický"
                      : selectedScenario === "optimistic"
                        ? "Optimistický"
                        : "Realistický"}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout analýzu scénářů (PDF)
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="seasonal" className="space-y-4">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <Calendar className="mr-2 h-5 w-5" />
                Sezónní analýza
              </CardTitle>
              <CardDescription className="text-violet-100">
                Projekce obratu, nákladů a zisku v průběhu roku
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <LineChart className="mr-2 h-4 w-4 text-violet-600" />
                    Měsíční projekce obratu
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="turnover"
                          name="Obrat"
                          stroke="#4f46e5"
                          fill="#4f46e5"
                          fillOpacity={0.2}
                          activeDot={{ r: 8 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Sezónní trendy:</h4>
                    <p className="text-xs text-violet-700">
                      Graf zobrazuje očekávané sezónní výkyvy v obratu. Nejvyšší obrat je typicky v prosinci (vánoční
                      sezóna) a letních měsících (červenec, srpen). Nejnižší obrat bývá v únoru a lednu po vánočních
                      svátcích.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                    Měsíční projekce zisku
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Legend />
                        <Bar dataKey="commission" name="Provize" fill="#10b981" />
                        <Bar dataKey="costs" name="Náklady" fill="#ef4444" />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          name="Zisk"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                          activeDot={{ r: 8 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Analýza ziskovosti:</h4>
                    <p className="text-xs text-violet-700">
                      Ziskovost kopíruje sezónní trendy obratu, ale je ovlivněna i fixními náklady, které zůstávají
                      relativně konstantní. Proto je důležité v období nižšího obratu optimalizovat variabilní náklady,
                      zejména personální.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-violet-600" />
                    Tabulka měsíčních projekcí
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Měsíc</th>
                          <th className="text-right py-2">Obrat (Kč)</th>
                          <th className="text-right py-2">Provize (Kč)</th>
                          <th className="text-right py-2">Náklady (Kč)</th>
                          <th className="text-right py-2">Zisk (Kč)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {monthlyData.map((month, index) => (
                          <tr key={index} className="border-b hover:bg-violet-50 transition-colors">
                            <td className="py-2 font-medium">{month.name}</td>
                            <td className="text-right py-2">{formatCurrency(Math.round(month.turnover))}</td>
                            <td className="text-right py-2">{formatCurrency(Math.round(month.commission))}</td>
                            <td className="text-right py-2">{formatCurrency(Math.round(month.costs))}</td>
                            <td className={`text-right py-2 font-medium ${getColorByValue(month.profit)}`}>
                              {formatCurrency(Math.round(month.profit))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-bold bg-violet-50">
                          <td className="py-2">Celkem za rok</td>
                          <td className="text-right py-2">
                            {formatCurrency(monthlyData.reduce((sum, month) => sum + month.turnover, 0))}
                          </td>
                          <td className="text-right py-2">
                            {formatCurrency(monthlyData.reduce((sum, month) => sum + month.commission, 0))}
                          </td>
                          <td className="text-right py-2">
                            {formatCurrency(monthlyData.reduce((sum, month) => sum + month.costs, 0))}
                          </td>
                          <td className="text-right py-2">
                            {formatCurrency(monthlyData.reduce((sum, month) => sum + month.profit, 0))}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-violet-600" />
                    Sezónní faktory
                  </CardTitle>
                  <CardDescription className="text-violet-600">Relativní změny obratu v průběhu roku</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={monthNames.map((month, index) => ({
                          name: month,
                          factor: seasonalFactors[index],
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0.7, 1.3]} tick={{ fontSize: 12 }} />
                        <Tooltip
                          formatter={(value) => (Number(value) * 100).toFixed(0) + "%"}
                          contentStyle={{
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          }}
                        />
                        <Bar dataKey="factor" name="Sezónní faktor" fill="#4f46e5" />
                        <Line
                          type="monotone"
                          dataKey="factor"
                          name="Trend"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ r: 5 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-1">Vysvětlení sezónních faktorů:</h4>
                    <p className="text-xs text-violet-700">
                      Sezónní faktory ukazují relativní změny obratu v průběhu roku. Hodnota 1.0 představuje průměrný
                      měsíční obrat. Hodnota 1.2 znamená, že v daném měsíci je obrat o 20% vyšší než průměr, zatímco
                      hodnota 0.8 znamená, že je o 20% nižší.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-violet-600" />
                    Strategie pro sezónní výkyvy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-violet-800">Strategie pro silné měsíce:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Maximalizace prodejů pomocí speciálních nabídek a akcí</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Rozšíření otevírací doby v nejvytíženějších dnech</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Posílení personálu pro zajištění plynulého provozu</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Vytvoření finanční rezervy pro slabší měsíce</span>
                        </li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-violet-800">Strategie pro slabé měsíce:</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Optimalizace personálních nákladů (úprava směn)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Zaměření na produkty s vyšší marží pro udržení ziskovosti</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Speciální marketingové akce pro zvýšení návštěvnosti</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          </div>
                          <span className="text-sm">Snížení ztrát důsledným řízením zásob a objednávek</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-violet-800">Průměrný měsíční zisk:</span>
                  <span
                    className={`text-lg font-bold ${
                      monthlyData.reduce((sum, month) => sum + month.profit, 0) / 12 >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatCurrency(Math.round(monthlyData.reduce((sum, month) => sum + month.profit, 0) / 12))}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout sezónní analýzu (PDF)
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle className="flex items-center text-xl">
                <TrendingUp className="mr-2 h-5 w-5" />
                Finanční shrnutí
              </CardTitle>
              <CardDescription className="text-violet-100">Měsíční zisk a klíčové finanční ukazatele</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <DollarSign className="mr-2 h-4 w-4 text-violet-600" />
                      Měsíční přehled
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span className="font-bold">{formatCurrency(monthlyTurnover)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span className="font-bold">{formatCurrency(totalCommission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celkové výdaje:</span>
                        <span className="font-bold">{formatCurrency(totalCosts)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Měsíční zisk:</span>
                        <span className={`font-bold ${getColorByValue(profit)}`}>{formatCurrency(profit)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <Calendar className="mr-2 h-4 w-4 text-violet-600" />
                      Roční projekce
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Roční obrat:</span>
                        <span className="font-bold">{formatCurrency(monthlyTurnover * 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roční provize:</span>
                        <span className="font-bold">{formatCurrency(totalCommission * 12)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roční výdaje:</span>
                        <span className="font-bold">{formatCurrency(totalCosts * 12)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Roční zisk:</span>
                        <span className={`font-bold ${getColorByValue(profit)}`}>{formatCurrency(profit * 12)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <Coins className="mr-2 h-4 w-4 text-violet-600" />
                      Investice a návratnost
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Počáteční investice:</span>
                        <span className="font-bold">{formatCurrency(initialInvestment)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Roční návratnost (ROI):</span>
                        <span className={`font-bold ${roi > 0 ? "text-green-600" : "text-gray-500"}`}>
                          {roi > 0 ? formatPercent(roi) : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Doba návratnosti:</span>
                        <span className={`font-bold ${profit > 0 ? "text-green-600" : "text-gray-500"}`}>
                          {profit > 0 ? Math.ceil(paybackPeriod) + " měsíců" : "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span>Zisk po 3 letech:</span>
                        <span className={`font-bold ${profit > 0 ? "text-green-600" : "text-red-600"}`}>
                          {formatCurrency(profit * 36 - initialInvestment)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-violet-600" />
                    Klíčové finanční ukazatele
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Hrubá marže</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-violet-600 h-2.5 rounded-full"
                              style={{ width: `${Math.min(grossMarginPercentage, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold">{formatPercent(grossMarginPercentage)}</span>
                        </div>
                        <p className="text-xs text-violet-600 mt-1">
                          Poměr mezi celkovou provizí a obratem. Ukazuje, kolik procent z obratu tvoří vaše příjmy před
                          odečtením nákladů.
                        </p>
                      </div>

                      <div>
                        <Label>Čistá marže</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`${netMarginPercentage >= 0 ? "bg-green-600" : "bg-red-600"} h-2.5 rounded-full`}
                              style={{ width: `${Math.min(Math.abs(netMarginPercentage), 100)}%` }}
                            />
                          </div>
                          <span className="font-bold">{formatPercent(netMarginPercentage)}</span>
                        </div>
                        <p className="text-xs text-violet-600 mt-1">
                          Poměr mezi ziskem a obratem. Ukazuje, kolik procent z obratu tvoří váš čistý zisk po odečtení
                          všech nákladů.
                        </p>
                      </div>

                      <div>
                        <Label>Bod zvratu (měsíční obrat)</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-blue-600 h-2.5 rounded-full"
                              style={{ width: `${Math.min((monthlyTurnover / breakEvenTurnover) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold">{formatCurrency(breakEvenTurnover)}</span>
                        </div>
                        <p className="text-xs text-violet-600 mt-1">
                          {monthlyTurnover >= breakEvenTurnover
                            ? "Obrat je " +
                              Math.round((monthlyTurnover / breakEvenTurnover - 1) * 100) +
                              "% nad bodem zvratu"
                            : "Obrat je " +
                              Math.round((1 - monthlyTurnover / breakEvenTurnover) * 100) +
                              "% pod bodem zvratu"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label>Návratnost investice (ROI)</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`${roi > 0 ? "bg-green-600" : "bg-gray-400"} h-2.5 rounded-full`}
                              style={{ width: `${Math.min(roi, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold">{formatPercent(roi)}</span>
                        </div>
                        <p className="text-xs text-violet-600 mt-1">
                          {roi > 0
                            ? "Roční návratnost investice " + formatPercent(roi)
                            : "Investice se nevrací (negativní zisk)"}
                        </p>
                      </div>

                      <div>
                        <Label>Doba návratnosti investice</Label>
                        <div className="mt-1">
                          <span className="text-xl font-bold">
                            {profit > 0 ? Math.ceil(paybackPeriod) + " měsíců" : "N/A - Negativní zisk"}
                          </span>
                          <p className="text-xs text-violet-600 mt-1">
                            {profit > 0
                              ? "Investice se vrátí za " + Math.ceil(paybackPeriod) + " měsíců při současné ziskovosti"
                              : "Při současné ziskovosti se investice nevrátí"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label>Efektivita nákladů</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-amber-600 h-2.5 rounded-full"
                              style={{ width: `${Math.min((totalCosts / totalCommission) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold">{formatPercent((totalCosts / totalCommission) * 100)}</span>
                        </div>
                        <p className="text-xs text-violet-600 mt-1">
                          Náklady tvoří {formatPercent((totalCosts / totalCommission) * 100)} z celkové provize
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Coins className="mr-2 h-4 w-4 text-violet-600" />
                    Analýza návratnosti investice
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Počáteční investice:</span>
                      <span className="font-bold">{formatCurrency(initialInvestment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Měsíční zisk:</span>
                      <span className={`font-bold ${getColorByValue(profit)}`}>{formatCurrency(profit)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doba návratnosti investice:</span>
                      <span className="font-bold">
                        {profit > 0 ? Math.ceil(paybackPeriod) + " měsíců" : "N/A - Negativní zisk"}
                      </span>
                    </div>

                    {profit > 0 && (
                      <div className="mt-4">
                        <Label>Průběh návratnosti investice</Label>
                        <div className="h-60 mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={Array.from({ length: Math.ceil(paybackPeriod) + 3 }, (_, i) => ({
                                month: i,
                                investment: initialInvestment,
                                returned: Math.min(i * profit, initialInvestment),
                              }))}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                              <XAxis
                                dataKey="month"
                                label={{ value: "Měsíc", position: "insideBottom", offset: -5 }}
                                tick={{ fontSize: 12 }}
                              />
                              <YAxis
                                label={{ value: "Kč", angle: -90, position: "insideLeft" }}
                                tick={{ fontSize: 12 }}
                              />
                              <Tooltip
                                formatter={(value) => formatCurrency(Number(value))}
                                contentStyle={{
                                  borderRadius: "8px",
                                  border: "none",
                                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                }}
                              />
                              <Legend />
                              <Area
                                type="monotone"
                                dataKey="investment"
                                name="Počáteční investice"
                                stroke="#ef4444"
                                fill="#ef4444"
                                fillOpacity={0.1}
                                strokeWidth={2}
                              />
                              <Area
                                type="monotone"
                                dataKey="returned"
                                name="Vráceno"
                                stroke="#10b981"
                                fill="#10b981"
                                fillOpacity={0.2}
                                strokeWidth={2}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <PieChart className="mr-2 h-4 w-4 text-violet-600" />
                    Porovnání příjmů a výdajů
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[
                            { name: "Fixní provize", value: fixedCommission },
                            { name: "Variabilní provize", value: variableCommission },
                            { name: "Personál", value: -totalStaffCost },
                            { name: "Energie a služby", value: -utilities },
                            { name: "Licenční poplatek", value: -licenseFee },
                            { name: "Ztráty zásob", value: -wastageAmount },
                            {
                              name: "Ostatní náklady",
                              value: -(
                                marketingCosts +
                                maintenanceCosts +
                                insuranceCosts +
                                accountingCosts +
                                trainingCosts +
                                otherCosts
                              ),
                            },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) =>
                            Math.abs(percent) > 0.05 ? `${name}: ${(percent * 100).toFixed(0)}%` : ""
                          }
                        >
                          {[
                            { name: "Fixní provize", value: fixedCommission },
                            { name: "Variabilní provize", value: variableCommission },
                            { name: "Personál", value: -totalStaffCost },
                            { name: "Energie a služby", value: -utilities },
                            { name: "Licenční poplatek", value: -licenseFee },
                            { name: "Ztráty zásob", value: -wastageAmount },
                            {
                              name: "Ostatní náklady",
                              value: -(
                                marketingCosts +
                                maintenanceCosts +
                                insuranceCosts +
                                accountingCosts +
                                trainingCosts +
                                otherCosts
                              ),
                            },
                          ].map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.value > 0 ? COLORS[index % 2] : COLORS[(index % 5) + 2]}
                            />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(Math.abs(Number(value)))} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Info className="mr-2 h-4 w-4 text-violet-600" />
                    Závěrečné hodnocení
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="bg-violet-50 p-4 rounded-lg">
                      <h4 className="font-medium text-violet-800 mb-2">Celkové zhodnocení projektu</h4>
                      <p className="text-sm text-violet-700 mb-2">
                        {profit >= 20000
                          ? "Projekt vykazuje vynikající ziskovost s měsíčním ziskem přes 20 000 Kč. Návratnost investice je rychlá a dlouhodobý potenciál velmi dobrý."
                          : profit >= 10000
                            ? "Projekt vykazuje dobrou ziskovost s měsíčním ziskem přes 10 000 Kč. Návratnost investice je v rozumném časovém horizontu."
                            : profit > 0
                              ? "Projekt je ziskový, ale s nižším měsíčním ziskem. Zvažte možnosti optimalizace nákladů nebo zvýšení obratu."
                              : "Projekt v současné konfiguraci není ziskový. Je nutné přehodnotit náklady nebo zvýšit obrat."}
                      </p>
                      <p className="text-sm text-violet-700">
                        {profit > 0
                          ? `Při současné ziskovosti se počáteční investice vrátí za ${Math.ceil(
                              paybackPeriod,
                            )} měsíců, což je ${
                              paybackPeriod <= 12 ? "velmi dobrá" : paybackPeriod <= 18 ? "přijatelná" : "delší"
                            } doba návratnosti.`
                          : "Při současných parametrech se investice nevrátí, je nutné upravit obchodní model."}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">Silné stránky projektu</h4>
                        <ul className="text-sm text-green-700 space-y-1 list-disc pl-4">
                          <li>Nízký vstupní poplatek (10 000 Kč) oproti konkurenčním franšízám</li>
                          <li>Nájem hrazený franšízorem, což výrazně snižuje fixní náklady</li>
                          <li>Nízký licenční poplatek (1% z obratu)</li>
                          <li>Zavedená značka s rostoucím povědomím na trhu</li>
                          <li>Komplexní podpora ze strany franšízora</li>
                        </ul>
                      </div>

                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-2">Doporučení pro zvýšení ziskovosti</h4>
                        <ul className="text-sm text-amber-700 space-y-1 list-disc pl-4">
                          <li>Optimalizace personálních nákladů, které tvoří největší část výdajů</li>
                          <li>Zaměření na kategorie s vyšší marží (pekařské výrobky, lahůdkový pult)</li>
                          <li>Snížení ztrát zásob efektivním řízením objednávek</li>
                          <li>Marketingové aktivity pro zvýšení obratu v slabších měsících</li>
                          <li>Pravidelná analýza prodejních dat pro optimalizaci sortimentu</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-violet-800">Celkové hodnocení projektu:</span>
                  <Badge
                    className={`text-base ${
                      profit >= 20000
                        ? "bg-green-100 text-green-800"
                        : profit >= 10000
                          ? "bg-blue-100 text-blue-800"
                          : profit > 0
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {profit >= 20000
                      ? "Vynikající"
                      : profit >= 10000
                        ? "Dobrý"
                        : profit > 0
                          ? "Přijatelný"
                          : "Rizikový"}
                  </Badge>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout kompletní obchodní plán (PDF)
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

