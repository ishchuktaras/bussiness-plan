"use client"

import { useState } from "react"
import {
  ArrowRight,
  BarChart,
  Calculator,
  Calendar,
  Coins,
  DollarSign,
  Download,
  HelpCircle,
  Info,
  Percent,
  PieChart,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import {
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// Import the MobileTabScroller at the top of the file
import { MobileTabScroller } from "@/components/ui/mobile-tab-scroller"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip as TooltipComponent,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  const [selectedScenario, setSelectedScenario] = useState<
    "pessimistic" | "realistic" | "optimistic"
  >("realistic")
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

  const scenarios: Record<
    "pessimistic" | "realistic" | "optimistic",
    ScenarioType
  > = {
    pessimistic: { turnoverFactor: 0.8, costFactor: 1.1, wastageRate: 3.0 },
    realistic: { turnoverFactor: 1.0, costFactor: 1.0, wastageRate: 2.0 },
    optimistic: { turnoverFactor: 1.2, costFactor: 0.95, wastageRate: 1.5 },
  }

  const calculateScenario = (
    scenario: "pessimistic" | "realistic" | "optimistic"
  ) => {
    const scenarioTurnover =
      monthlyTurnover * scenarios[scenario].turnoverFactor
    const scenarioVariableCommission =
      variableCommission * scenarios[scenario].turnoverFactor
    const scenarioTotalCommission = fixedCommission + scenarioVariableCommission
    const scenarioOperationalCosts =
      totalOperationalCosts * scenarios[scenario].costFactor
    const scenarioWastage =
      scenarioTurnover * (scenarios[scenario].wastageRate / 100)
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
      const monthlyVariableCommission =
        variableCommission * seasonalFactors[index]
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
    const totalPercentage = updatedCategories.reduce(
      (sum, cat) => sum + cat.percentage,
      0
    )
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

  const updateCategoryMargin = ({
    index,
    newMargin,
  }: UpdateCategoryMarginProps) => {
    const updatedCategories = [...productCategories]
    updatedCategories[index].margin = newMargin
    setProductCategories(updatedCategories)
  }

  // Barvy pro grafy
  const COLORS = [
    "#4f46e5",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#8dd1e1",
  ]

  const updateScenario = (
    scenario: "pessimistic" | "realistic" | "optimistic"
  ) => {
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
  const getScenarioColor = (
    scenario: "pessimistic" | "realistic" | "optimistic"
  ) => {
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
  const getScenarioBgColor = (
    scenario: "pessimistic" | "realistic" | "optimistic"
  ) => {
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
  const getScenarioBorderColor = (
    scenario: "pessimistic" | "realistic" | "optimistic"
  ) => {
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
          Obchodní model Žabka
        </h1>
        <p className="text-violet-100 max-w-3xl">
          Interaktivní kalkulačka pro analýzu finančních aspektů franšízy Žabka.
          Prozkoumejte příjmy, výdaje, ziskovost a další klíčové ukazatele pro
          informované rozhodnutí o vašem podnikání.
        </p>
      </div>

      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <Info className="h-5 w-5 text-orange-600" />
        <AlertTitle className="text-red-800 font-semibold">
          Důležité upozornění
        </AlertTitle>
        <AlertDescription className="text-orange-700">
          Tato kalkulačka slouží pouze k orientačním účelům. Skutečné výsledky
          se mohou lišit v závislosti na mnoha faktorech, jako je lokalita,
          sezónnost, konkurence a další. Pro přesné informace kontaktujte přímo
          společnost Žabka.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="calculator">
        <MobileTabScroller showScrollIndicators={true} value="calculator">
          <TabsList className="flex flex-wrap w-full bg-white p-1 rounded-lg shadow-md">
            <TabsTrigger
              value="calculator"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Kalkulačka</span>
            </TabsTrigger>
            <TabsTrigger
              value="income"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Příjmy</span>
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Výdaje</span>
            </TabsTrigger>
            <TabsTrigger
              value="categories"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Kategorie</span>
            </TabsTrigger>
            <TabsTrigger
              value="scenarios"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Scénáře</span>
            </TabsTrigger>
            <TabsTrigger
              value="seasonal"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Sezónnost</span>
            </TabsTrigger>
            <TabsTrigger
              value="summary"
              className="px-3 py-2 text-xs sm:text-sm whitespace-nowrap"
            >
              <span className="hidden sm:inline">Shrnutí</span>
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
                        <Label
                          htmlFor="daily-turnover"
                          className="flex items-center"
                        >
                          Průměrný denní obrat
                          <TooltipProvider>
                            <TooltipComponent>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Průměrný denní obrat prodejny. Typická hodnota
                                  pro Žabku je mezi 25 000 - 40 000 Kč.
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
                        onChange={(e) =>
                          updateValues({
                            newDailyTurnover: Number(e.target.value),
                          })
                        }
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
                        <Label
                          htmlFor="staff-count"
                          className="flex items-center"
                        >
                          Počet zaměstnanců
                          <TooltipProvider>
                            <TooltipComponent>
                              <TooltipTrigger>
                                <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Celkový počet zaměstnanců (včetně brigádníků
                                  přepočtených na plné úvazky).
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
                        onChange={(e) =>
                          updateStaffCosts({
                            count: Number(e.target.value),
                            cost: staffCost,
                          })
                        }
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="staff-cost">
                        Průměrné náklady na zaměstnance (měsíčně)
                      </Label>
                      <Input
                        id="staff-cost"
                        type="number"
                        value={staffCost}
                        onChange={(e) =>
                          updateStaffCosts({
                            count: staffCount,
                            cost: Number(e.target.value),
                          })
                        }
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="total-staff-cost">
                        Celkové personální náklady
                      </Label>
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
                                <p className="max-w-xs">
                                  Nájem je hrazen franšízorem Žabka.
                                </p>
                              </TooltipContent>
                            </TooltipComponent>
                          </TooltipProvider>
                        </Label>
                        <Badge className="bg-green-100 text-green-800">
                          Hrazeno franšízorem
                        </Badge>
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
                      <Label htmlFor="other-costs">
                        Ostatní měsíční náklady
                      </Label>
                      <Input
                        id="other-costs"
                        type="number"
                        value={otherCosts}
                        onChange={(e) => setOtherCosts(Number(e.target.value))}
                        className="text-right"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license-fee">
                        Licenční poplatek (1% z obratu)
                      </Label>
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
                    <Label
                      htmlFor="advanced-options"
                      className="font-medium cursor-pointer"
                    >
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
                          <Label
                            htmlFor="wastage-rate"
                            className="flex items-center"
                          >
                            Míra ztrát (%)
                            <TooltipProvider>
                              <TooltipComponent>
                                <TooltipTrigger>
                                  <HelpCircle className="h-4 w-4 ml-1 text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    Procento zboží, které se neprodá z důvodu
                                    prošlé doby trvanlivosti, poškození nebo
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
                              onValueChange={(value) =>
                                setWastageRate(value[0])
                              }
                              className="flex-1"
                            />
                            <span className="w-12 text-right">
                              {wastageRate}%
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="marketing-costs">
                            Marketingové náklady (Kč)
                          </Label>
                          <Input
                            id="marketing-costs"
                            type="number"
                            value={marketingCosts}
                            onChange={(e) =>
                              setMarketingCosts(Number(e.target.value))
                            }
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maintenance-costs">
                            Náklady na údržbu (Kč)
                          </Label>
                          <Input
                            id="maintenance-costs"
                            type="number"
                            value={maintenanceCosts}
                            onChange={(e) =>
                              setMaintenanceCosts(Number(e.target.value))
                            }
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="insurance-costs">
                            Pojištění (Kč)
                          </Label>
                          <Input
                            id="insurance-costs"
                            type="number"
                            value={insuranceCosts}
                            onChange={(e) =>
                              setInsuranceCosts(Number(e.target.value))
                            }
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="accounting-costs">
                            Účetnictví (Kč)
                          </Label>
                          <Input
                            id="accounting-costs"
                            type="number"
                            value={accountingCosts}
                            onChange={(e) =>
                              setAccountingCosts(Number(e.target.value))
                            }
                            className="text-right"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="training-costs">Školení (Kč)</Label>
                          <Input
                            id="training-costs"
                            type="number"
                            value={trainingCosts}
                            onChange={(e) =>
                              setTrainingCosts(Number(e.target.value))
                            }
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
                        <Label className="text-violet-700">
                          Celková měsíční provize
                        </Label>
                        <div className="text-2xl font-bold text-violet-800">
                          {formatCurrency(totalCommission)}
                        </div>
                        <div className="text-sm text-violet-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Fixní: {formatCurrency(fixedCommission)} + Variabilní:{" "}
                          {formatCurrency(variableCommission)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-violet-700">
                          Celkové měsíční náklady
                        </Label>
                        <div className="text-2xl font-bold text-violet-800">
                          {formatCurrency(totalCosts)}
                        </div>
                        <div className="text-sm text-violet-600 flex items-center">
                          <ArrowRight className="h-3 w-3 mr-1" />
                          Personál: {formatCurrency(totalStaffCost)} + Ostatní:{" "}
                          {formatCurrency(totalCosts - totalStaffCost)}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-violet-700">Měsíční zisk</Label>
                        <div
                          className={`text-2xl font-bold ${getColorByValue(
                            profit
                          )}`}
                        >
                          {formatCurrency(profit)}
                        </div>
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
                  <Badge className="bg-violet-100 text-violet-800">
                    {formatPercent(grossMarginPercentage)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-700">Čistá marže:</span>
                  <Badge
                    className={`${
                      netMarginPercentage >= 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formatPercent(netMarginPercentage)}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-700">
                    Návratnost investice (ROI):
                  </span>
                  <Badge
                    className={`${
                      roi > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {roi > 0 ? formatPercent(roi) + " ročně" : "N/A"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-violet-700">Doba návratnosti:</span>
                  <Badge
                    className={`${
                      profit > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
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
              <CardDescription className="text-violet-100">
                Rozpis struktury provize a zdrojů příjmů
              </CardDescription>
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
                      <div className="text-3xl font-bold text-violet-700">
                        {formatCurrency(fixedCommission)}
                      </div>
                      <p className="text-sm text-violet-600 mt-2">
                        Základní měsíční platba nezávislá na obratu. Tvoří{" "}
                        {formatPercent(
                          (fixedCommission / totalCommission) * 100
                        )}{" "}
                        z celkové provize.
                      </p>
                      <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">
                          Výhody fixní provize:
                        </h4>
                        <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                          <li>
                            Stabilní příjem nezávislý na sezónních výkyvech
                          </li>
                          <li>
                            Jistota minimálního příjmu i v období nižších
                            prodejů
                          </li>
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
                      <div className="text-3xl font-bold text-violet-700">
                        {formatCurrency(variableCommission)}
                      </div>
                      <p className="text-sm text-violet-600 mt-2">
                        Provize závislá na obratu a struktuře prodeje. Tvoří{" "}
                        {formatPercent(
                          (variableCommission / totalCommission) * 100
                        )}{" "}
                        z celkové provize.
                      </p>
                      <div className="mt-4 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">
                          Výhody variabilní provize:
                        </h4>
                        <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                          <li>Roste s rostoucím obratem prodejny</li>
                          <li>
                            Motivuje k optimalizaci sortimentu a zvyšování
                            prodejů
                          </li>
                          <li>
                            Umožňuje profitovat z úspěšných sezón a
                            marketingových akcí
                          </li>
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
                            <th className="text-center py-2">
                              Podíl na obratu
                            </th>
                            <th className="text-center py-2">Marže</th>
                            <th className="text-right py-2">Měsíční obrat</th>
                            <th className="text-right py-2">Měsíční provize</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productCategories.map((category, index) => (
                            <tr
                              key={index}
                              className="border-b hover:bg-violet-50 transition-colors"
                            >
                              <td className="py-2 font-medium">
                                {category.name}
                              </td>
                              <td className="text-center py-2">
                                {category.percentage}%
                              </td>
                              <td className="text-center py-2">
                                {category.margin.toFixed(2)}%
                              </td>
                              <td className="text-right py-2">
                                {formatCurrency(
                                  monthlyTurnover * (category.percentage / 100)
                                )}
                              </td>
                              <td className="text-right py-2">
                                {formatCurrency(
                                  monthlyTurnover *
                                    (category.percentage / 100) *
                                    (category.margin / 100)
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
                              {(
                                (variableCommission / monthlyTurnover) *
                                100
                              ).toFixed(2)}
                              %
                            </td>
                            <td className="text-right py-2 font-bold">
                              {formatCurrency(monthlyTurnover)}
                            </td>
                            <td className="text-right py-2 font-bold">
                              {formatCurrency(variableCommission)}
                            </td>
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
                          <span className="font-bold text-violet-800">
                            {formatPercent(grossMarginPercentage)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-violet-600 h-2.5 rounded-full"
                            style={{
                              width: `${Math.min(grossMarginPercentage, 100)}%`,
                            }}
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
                        <h4 className="text-sm font-medium text-violet-800 mb-1">
                          Co znamená hrubá marže?
                        </h4>
                        <p className="text-xs text-violet-700">
                          Hrubá marže představuje poměr mezi celkovou provizí a
                          obratem. Ukazuje, kolik procent z obratu tvoří vaše
                          příjmy před odečtením nákladů. Vyšší hrubá marže
                          znamená lepší potenciál pro ziskovost.
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
                      {/* For the pie chart visualization of income */}
                      {/* Replace the existing pie chart code in the "Vizualizace příjmů" section with: */}

                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={[
                                {
                                  name: "Fixní provize",
                                  value: fixedCommission,
                                },
                                {
                                  name: "Variabilní provize",
                                  value: variableCommission,
                                },
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={120}
                              innerRadius={60}
                              paddingAngle={2}
                              dataKey="value"
                              nameKey="name"
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              strokeWidth={1}
                              stroke="#ffffff"
                            >
                              <Cell fill="#6366f1" />
                              <Cell fill="#10b981" />
                            </Pie>
                            <Tooltip
                              formatter={(value) =>
                                formatCurrency(Number(value))
                              }
                              contentStyle={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                border: "none",
                                padding: "8px 12px",
                              }}
                            />
                            <Legend
                              layout="horizontal"
                              verticalAlign="bottom"
                              align="center"
                              iconType="circle"
                              iconSize={10}
                              wrapperStyle={{
                                paddingTop: "20px",
                                fontSize: "14px",
                              }}
                            />
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
                    {/* For the bar chart showing income by product categories */}
                    {/* Replace the existing bar chart code with: */}

                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={productCategories.map((cat) => ({
                            name: cat.name,
                            obrat: Math.round(
                              monthlyTurnover * (cat.percentage / 100)
                            ),
                            provize: Math.round(
                              monthlyTurnover *
                                (cat.percentage / 100) *
                                (cat.margin / 100)
                            ),
                          }))}
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          barGap={8}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 11 }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                            angle={-15}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                            tickFormatter={(value) =>
                              `${Math.round(value / 1000)}k`
                            }
                            domain={[0, "dataMax + 20000"]}
                          />
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                              backgroundColor: "white",
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              padding: "8px 12px",
                            }}
                            cursor={{ fill: "rgba(236, 236, 254, 0.2)" }}
                          />
                          <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{
                              paddingBottom: "10px",
                              fontSize: "14px",
                            }}
                          />
                          <Bar
                            dataKey="obrat"
                            name="Obrat"
                            fill="#6366f1"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={50}
                          />
                          <Bar
                            dataKey="provize"
                            name="Provize"
                            fill="#10b981"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={50}
                          />
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
                  <span className="text-lg font-medium text-violet-800">
                    Celkový měsíční příjem:
                  </span>
                  <span className="text-lg font-bold text-violet-800">
                    {formatCurrency(totalCommission)}
                  </span>
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
              <CardDescription className="text-violet-100">
                Přehled měsíčních provozních nákladů
              </CardDescription>
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
                        <span className="font-medium">
                          {formatCurrency(staffCost)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between font-bold">
                        <span>Celkové náklady na zaměstnance:</span>
                        <span>{formatCurrency(totalStaffCost)}</span>
                      </div>
                      <div className="mt-2 bg-violet-50 p-3 rounded-lg">
                        <h4 className="text-sm font-medium text-violet-800 mb-1">
                          Personální náklady tvoří:
                        </h4>
                        <div className="flex items-center mt-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-violet-600 h-2.5 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (totalStaffCost / totalCosts) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                          <span className="font-medium text-violet-800">
                            {formatPercent((totalStaffCost / totalCosts) * 100)}
                          </span>
                        </div>
                        <p className="text-xs text-violet-700 mt-2">
                          Personální náklady jsou obvykle největší položkou
                          provozních výdajů. Optimalizace směn a efektivní
                          plánování personálu může výrazně zvýšit ziskovost.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <PieChart className="mr-2 h-4 w-4 text-violet-600" />
                      Vizualizace nákladů
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-96 relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={[
                              {
                                name: "Personál",
                                value: totalStaffCost,
                                color: "#4f46e5",
                              },
                              {
                                name: "Energie a služby",
                                value: utilities,
                                color: "#10b981",
                              },
                              {
                                name: "Licenční poplatek",
                                value: licenseFee,
                                color: "#f59e0b",
                              },
                              {
                                name: "Ztráty zásob",
                                value: wastageAmount,
                                color: "#ef4444",
                              },
                              {
                                name: "Marketing",
                                value: marketingCosts,
                                color: "#8b5cf6",
                              },
                              {
                                name: "Údržba",
                                value: maintenanceCosts,
                                color: "#06b6d4",
                              },
                              {
                                name: "Pojištění",
                                value: insuranceCosts,
                                color: "#f97316",
                              },
                              {
                                name: "Účetnictví",
                                value: accountingCosts,
                                color: "#14b8a6",
                              },
                              {
                                name: "Školení",
                                value: trainingCosts,
                                color: "#a855f7",
                              },
                              {
                                name: "Ostatní",
                                value: otherCosts,
                                color: "#64748b",
                              },
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={140}
                            innerRadius={0}
                            paddingAngle={2}
                            dataKey="value"
                            nameKey="name"
                            label={({
                              name,
                              percent,
                              value,
                              cx,
                              cy,
                              midAngle,
                              innerRadius,
                              outerRadius,
                              index,
                            }) => {
                              // Only show labels for segments that are 8% or larger
                              if (percent < 0.08) return null

                              const RADIAN = Math.PI / 180
                              const radius =
                                25 +
                                innerRadius +
                                (outerRadius - innerRadius) * 0.5
                              const x =
                                cx + radius * Math.cos(-midAngle * RADIAN)
                              const y =
                                cy + radius * Math.sin(-midAngle * RADIAN)

                              return (
                                <text
                                  x={x}
                                  y={y}
                                  fill="white"
                                  textAnchor={x > cx ? "start" : "end"}
                                  dominantBaseline="central"
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    textShadow: "0px 0px 3px rgba(0,0,0,0.5)",
                                  }}
                                >
                                  {`${name}: ${(percent * 100).toFixed(0)}%`}
                                </text>
                              )
                            }}
                            strokeWidth={1}
                            stroke="#ffffff"
                          >
                            {[
                              {
                                name: "Personál",
                                value: totalStaffCost,
                                color: "#4f46e5",
                              },
                              {
                                name: "Energie a služby",
                                value: utilities,
                                color: "#10b981",
                              },
                              {
                                name: "Licenční poplatek",
                                value: licenseFee,
                                color: "#f59e0b",
                              },
                              {
                                name: "Ztráty zásob",
                                value: wastageAmount,
                                color: "#ef4444",
                              },
                              {
                                name: "Marketing",
                                value: marketingCosts,
                                color: "#8b5cf6",
                              },
                              {
                                name: "Údržba",
                                value: maintenanceCosts,
                                color: "#06b6d4",
                              },
                              {
                                name: "Pojištění",
                                value: insuranceCosts,
                                color: "#f97316",
                              },
                              {
                                name: "Účetnictví",
                                value: accountingCosts,
                                color: "#14b8a6",
                              },
                              {
                                name: "Školení",
                                value: trainingCosts,
                                color: "#a855f7",
                              },
                              {
                                name: "Ostatní",
                                value: otherCosts,
                                color: "#64748b",
                              },
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                              backgroundColor: "white",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              border: "none",
                              padding: "8px 12px",
                            }}
                          />
                          <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{
                              paddingTop: "20px",
                              fontSize: "14px",
                              display: "flex",
                              flexWrap: "wrap",
                              justifyContent: "center",
                              gap: "10px",
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-6 bg-violet-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-violet-800 mb-2">
                        Analýza nákladů:
                      </h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-violet-700">
                            Největší nákladová položka:
                          </span>
                          <span className="font-medium text-violet-900">
                            Personál (
                            {formatPercent((totalStaffCost / totalCosts) * 100)}
                            )
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-violet-700">
                            Druhá největší položka:
                          </span>
                          <span className="font-medium text-violet-900">
                            {
                              [
                                { name: "Energie a služby", value: utilities },
                                {
                                  name: "Licenční poplatek",
                                  value: licenseFee,
                                },
                                { name: "Ztráty zásob", value: wastageAmount },
                                { name: "Marketing", value: marketingCosts },
                                { name: "Údržba", value: maintenanceCosts },
                                { name: "Pojištění", value: insuranceCosts },
                                { name: "Účetnictví", value: accountingCosts },
                                { name: "Školení", value: trainingCosts },
                                { name: "Ostatní", value: otherCosts },
                              ].sort((a, b) => b.value - a.value)[0].name
                            }{" "}
                            (
                            {formatPercent(
                              ([
                                { name: "Energie a služby", value: utilities },
                                {
                                  name: "Licenční poplatek",
                                  value: licenseFee,
                                },
                                { name: "Ztráty zásob", value: wastageAmount },
                                { name: "Marketing", value: marketingCosts },
                                { name: "Údržba", value: maintenanceCosts },
                                { name: "Pojištění", value: insuranceCosts },
                                { name: "Účetnictví", value: accountingCosts },
                                { name: "Školení", value: trainingCosts },
                                { name: "Ostatní", value: otherCosts },
                              ].sort((a, b) => b.value - a.value)[0].value /
                                totalCosts) *
                                100
                            )}
                            )
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-violet-700">
                            Třetí největší položka:
                          </span>
                          <span className="font-medium text-violet-900">
                            {
                              [
                                { name: "Energie a služby", value: utilities },
                                {
                                  name: "Licenční poplatek",
                                  value: licenseFee,
                                },
                                { name: "Ztráty zásob", value: wastageAmount },
                                { name: "Marketing", value: marketingCosts },
                                { name: "Údržba", value: maintenanceCosts },
                                { name: "Pojištění", value: insuranceCosts },
                                { name: "Účetnictví", value: accountingCosts },
                                { name: "Školení", value: trainingCosts },
                                { name: "Ostatní", value: otherCosts },
                              ].sort((a, b) => b.value - a.value)[1].name
                            }{" "}
                            (
                            {formatPercent(
                              ([
                                { name: "Energie a služby", value: utilities },
                                {
                                  name: "Licenční poplatek",
                                  value: licenseFee,
                                },
                                { name: "Ztráty zásob", value: wastageAmount },
                                { name: "Marketing", value: marketingCosts },
                                { name: "Údržba", value: maintenanceCosts },
                                { name: "Pojištění", value: insuranceCosts },
                                { name: "Účetnictví", value: accountingCosts },
                                { name: "Školení", value: trainingCosts },
                                { name: "Ostatní", value: otherCosts },
                              ].sort((a, b) => b.value - a.value)[1].value /
                                totalCosts) *
                                100
                            )}
                            )
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-violet-800 mb-2">
                          Doporučení pro optimalizaci nákladů:
                        </h4>
                        <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                          <li>
                            Optimalizujte personální náklady efektivním
                            plánováním směn a využitím brigádníků v době špičky
                          </li>
                          <li>
                            Snižte ztráty zásob pečlivým řízením objednávek a
                            sledováním expirace produktů
                          </li>
                          <li>
                            Zvažte investice do energeticky úsporných zařízení
                            pro snížení nákladů na energie
                          </li>
                          <li>
                            Pravidelně porovnávejte náklady s průměrem v síti
                            Žabka pro identifikaci oblastí ke zlepšení
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                      Náklady podle kategorií
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
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
                          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                          barGap={8}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                            vertical={false}
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 11 }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                            angle={-15}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                            tickFormatter={(value) =>
                              `${Math.round(value / 1000)}k`
                            }
                            domain={[0, "dataMax + 20000"]}
                          />
                          <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                              backgroundColor: "white",
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              padding: "8px 12px",
                            }}
                            cursor={{ fill: "rgba(236, 236, 254, 0.2)" }}
                          />
                          <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{
                              paddingBottom: "10px",
                              fontSize: "14px",
                            }}
                          />
                          <Bar
                            dataKey="value"
                            name="Náklady"
                            fill="#6366f1"
                            radius={[4, 4, 0, 0]}
                            maxBarSize={50}
                          />
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
                  <span className="text-lg font-medium text-violet-800">
                    Celkové měsíční náklady:
                  </span>
                  <span className="text-lg font-bold text-violet-800">
                    {formatCurrency(totalCosts)}
                  </span>
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
                Kategorie produktů
              </CardTitle>
              <CardDescription className="text-violet-100">
                Upravte podíl jednotlivých kategorií na celkovém obratu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productCategories.map((category, index) => (
                  <Card
                    key={index}
                    className="shadow-md border-none overflow-hidden"
                  >
                    <CardHeader className="bg-violet-50 pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Zap className="mr-2 h-4 w-4 text-violet-600" />
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor={`percentage-${index}`}
                          className="text-sm"
                        >
                          Podíl na obratu (%)
                        </Label>
                        <Input
                          id={`percentage-${index}`}
                          type="number"
                          value={category.percentage}
                          onChange={(e) =>
                            updateCategoryPercentage(
                              index,
                              Number(e.target.value)
                            )
                          }
                          className="text-right"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`margin-${index}`} className="text-sm">
                          Marže (%)
                        </Label>
                        <Input
                          id={`margin-${index}`}
                          type="number"
                          value={category.margin}
                          onChange={(e) =>
                            updateCategoryMargin({
                              index: index,
                              newMargin: Number(e.target.value),
                            })
                          }
                          className="text-right"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-gradient-to-r from-violet-50 to-indigo-50 pb-2">
                  <CardTitle className="text-base flex items-center text-violet-800">
                    <PieChart className="mr-2 h-4 w-4 text-violet-600" />
                    Vizualizace kategorií
                  </CardTitle>
                  <CardDescription className="text-violet-600">
                    Přehled podílu jednotlivých kategorií na celkovém obratu
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={productCategories}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={140}
                          innerRadius={60}
                          paddingAngle={3}
                          dataKey="percentage"
                          nameKey="name"
                          label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                          }
                          strokeWidth={1}
                          stroke="#ffffff"
                        >
                          {productCategories.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={
                                [
                                  "#6366f1", // Pekařské výrobky - fialová
                                  "#10b981", // Lahůdkový pult - zelená
                                  "#f59e0b", // Cigarety a tabák - oranžová
                                  "#ef4444", // Mléčné výrobky - červená
                                  "#8b5cf6", // Maso a drůbež - světle fialová
                                  "#22c55e", // Potraviny a cukrovinky - světle zelená
                                  "#ffc658", // Ovoce a zelenina - žlutá
                                  "#06b6d4", // Nápoje - modrá
                                ][index % 8]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              const categoryTurnover =
                                monthlyTurnover * (data.percentage / 100)
                              const categoryProfit =
                                categoryTurnover * (data.margin / 100)

                              return (
                                <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
                                  <p className="font-bold text-lg text-gray-800">
                                    {data.name}
                                  </p>
                                  <div className="space-y-1 mt-2">
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">
                                        Podíl na obratu:
                                      </span>{" "}
                                      {data.percentage}%
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">
                                        Měsíční obrat:
                                      </span>{" "}
                                      {formatCurrency(categoryTurnover)}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">
                                        Marže:
                                      </span>{" "}
                                      {data.margin.toFixed(1)}%
                                    </p>
                                    <p className="text-sm font-medium text-violet-700">
                                      <span className="font-medium">
                                        Měsíční provize:
                                      </span>{" "}
                                      {formatCurrency(categoryProfit)}
                                    </p>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Legend
                          layout="horizontal"
                          verticalAlign="bottom"
                          align="center"
                          iconType="circle"
                          iconSize={10}
                          wrapperStyle={{
                            paddingTop: "20px",
                            fontSize: "14px",
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "8px",
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 bg-violet-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-violet-800 mb-3">
                      Analýza kategorií:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <h5 className="text-xs font-medium text-gray-500 mb-1">
                          Kategorie s nejvyšší marží
                        </h5>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-violet-800">
                            {
                              productCategories.sort(
                                (a, b) => b.margin - a.margin
                              )[0].name
                            }
                          </span>
                          <Badge className="bg-green-100 text-green-800">
                            {productCategories
                              .sort((a, b) => b.margin - a.margin)[0]
                              .margin.toFixed(1)}
                            %
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <h5 className="text-xs font-medium text-gray-500 mb-1">
                          Největší podíl na obratu
                        </h5>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-violet-800">
                            {
                              productCategories.sort(
                                (a, b) => b.percentage - a.percentage
                              )[0].name
                            }
                          </span>
                          <Badge className="bg-blue-100 text-blue-800">
                            {
                              productCategories.sort(
                                (a, b) => b.percentage - a.percentage
                              )[0].percentage
                            }
                            %
                          </Badge>
                        </div>
                      </div>

                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <h5 className="text-xs font-medium text-gray-500 mb-1">
                          Největší přínos k zisku
                        </h5>
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-violet-800">
                            {
                              productCategories.sort(
                                (a, b) =>
                                  b.percentage * b.margin -
                                  a.percentage * a.margin
                              )[0].name
                            }
                          </span>
                          <Badge className="bg-violet-100 text-violet-800">
                            {formatCurrency(
                              monthlyTurnover *
                                (productCategories.sort(
                                  (a, b) =>
                                    b.percentage * b.margin -
                                    a.percentage * a.margin
                                )[0].percentage /
                                  100) *
                                (productCategories.sort(
                                  (a, b) =>
                                    b.percentage * b.margin -
                                    a.percentage * a.margin
                                )[0].margin /
                                  100)
                            )}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h5 className="text-xs font-medium text-violet-800 mb-2">
                        Doporučení pro optimalizaci kategorií:
                      </h5>
                      <ul className="text-xs text-violet-700 space-y-1 list-disc pl-4">
                        <li>
                          Zvažte navýšení podílu kategorií s vysokou marží
                          (např.{" "}
                          {
                            productCategories.sort(
                              (a, b) => b.margin - a.margin
                            )[0].name
                          }
                          )
                        </li>
                        <li>
                          Optimalizujte nabídku v kategorii{" "}
                          {
                            productCategories.sort(
                              (a, b) => b.percentage - a.percentage
                            )[0].name
                          }{" "}
                          pro maximalizaci obratu
                        </li>
                        <li>
                          Zaměřte se na cross-selling mezi kategoriemi s vysokou
                          a nízkou marží
                        </li>
                        <li>
                          Pravidelně analyzujte sezónní výkyvy v jednotlivých
                          kategoriích
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <p className="text-sm text-violet-700">
                  Upravte podíl jednotlivých kategorií produktů na celkovém
                  obratu. Celkový součet musí být 100%.
                </p>
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
                Prozkoumejte různé scénáře a jejich dopad na ziskovost
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  className={`shadow-md border-none overflow-hidden transition-all hover:shadow-lg cursor-pointer ${getScenarioBgColor(
                    "pessimistic"
                  )} ${
                    selectedScenario === "pessimistic"
                      ? getScenarioBorderColor("pessimistic")
                      : ""
                  }`}
                  onClick={() => updateScenario("pessimistic")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-red-600" />
                      Pesimistický scénář
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-red-600">
                      {formatCurrency(pessimisticScenario.profit)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Obrat: {formatCurrency(pessimisticScenario.turnover)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Náklady: {formatCurrency(pessimisticScenario.costs)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Provize: {formatCurrency(pessimisticScenario.commission)}
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`shadow-md border-none overflow-hidden transition-all hover:shadow-lg cursor-pointer ${getScenarioBgColor(
                    "realistic"
                  )} ${
                    selectedScenario === "realistic"
                      ? getScenarioBorderColor("realistic")
                      : ""
                  }`}
                  onClick={() => updateScenario("realistic")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-blue-600" />
                      Realistický scénář
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(realisticScenario.profit)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Obrat: {formatCurrency(realisticScenario.turnover)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Náklady: {formatCurrency(realisticScenario.costs)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Provize: {formatCurrency(realisticScenario.commission)}
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className={`shadow-md border-none overflow-hidden transition-all hover:shadow-lg cursor-pointer ${getScenarioBgColor(
                    "optimistic"
                  )} ${
                    selectedScenario === "optimistic"
                      ? getScenarioBorderColor("optimistic")
                      : ""
                  }`}
                  onClick={() => updateScenario("optimistic")}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                      Optimistický scénář
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(optimisticScenario.profit)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Obrat: {formatCurrency(optimisticScenario.turnover)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Náklady: {formatCurrency(optimisticScenario.costs)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Provize: {formatCurrency(optimisticScenario.commission)}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                    Srovnání scénářů
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={[
                          {
                            name: "Pesimistický",
                            profit: pessimisticScenario.profit,
                            fill: "#f43f5e",
                          },
                          {
                            name: "Realistický",
                            profit: realisticScenario.profit,
                            fill: "#3b82f6",
                          },
                          {
                            name: "Optimistický",
                            profit: optimisticScenario.profit,
                            fill: "#22c55e",
                          },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        barGap={8}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f0f0f0"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12 }}
                          axisLine={{ stroke: "#e5e7eb" }}
                          tickLine={false}
                        />
                        <YAxis
                          dataKey="profit"
                          tick={{ fontSize: 12 }}
                          axisLine={{ stroke: "#e5e7eb" }}
                          tickLine={false}
                          tickFormatter={(value) =>
                            `${Math.round(value / 1000)}k`
                          }
                          domain={["dataMin - 10000", "dataMax + 20000"]}
                        />
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            padding: "8px 12px",
                          }}
                          cursor={{ fill: "rgba(236, 236, 254, 0.2)" }}
                        />
                        <Legend
                          verticalAlign="top"
                          height={36}
                          iconType="circle"
                          iconSize={10}
                          wrapperStyle={{
                            paddingBottom: "10px",
                            fontSize: "14px",
                          }}
                        />
                        <Bar
                          dataKey="profit"
                          name="Zisk"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <p className="text-sm text-violet-700">
                  Prozkoumejte různé scénáře a jejich dopad na ziskovost.
                  Vyberte scénář pro zobrazení detailů.
                </p>
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
                Prozkoumejte sezónní výkyvy v průběhu roku
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50 pb-2">
                  <CardTitle className="text-base flex items-center">
                    <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                    Měsíční ziskovost
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={monthlyData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                        barGap={8}
                      >
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="#f0f0f0"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="name"
                          tick={{ fontSize: 12 }}
                          axisLine={{ stroke: "#e5e7eb" }}
                          tickLine={false}
                        />
                        <YAxis
                          dataKey="profit"
                          tick={{ fontSize: 12 }}
                          axisLine={{ stroke: "#e5e7eb" }}
                          tickLine={false}
                          tickFormatter={(value) =>
                            `${Math.round(value / 1000)}k`
                          }
                          domain={["dataMin - 10000", "dataMax + 20000"]}
                        />
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            padding: "8px 12px",
                          }}
                          cursor={{ fill: "rgba(236, 236, 254, 0.2)" }}
                        />
                        <Legend
                          verticalAlign="top"
                          height={36}
                          iconType="circle"
                          iconSize={10}
                          wrapperStyle={{
                            paddingBottom: "10px",
                            fontSize: "14px",
                          }}
                        />
                        <Bar
                          dataKey="profit"
                          name="Zisk"
                          fill="#6366f1"
                          radius={[4, 4, 0, 0]}
                          maxBarSize={50}
                        />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <p className="text-sm text-violet-700">
                  Prozkoumejte sezónní výkyvy v průběhu roku. Graf zobrazuje
                  měsíční ziskovost.
                </p>
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
                Shrnutí
              </CardTitle>
              <CardDescription className="text-violet-100">
                Klíčové ukazatele pro vaše podnikání
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <DollarSign className="mr-2 h-4 w-4 text-violet-600" />
                      Měsíční obrat
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-violet-700">
                      {formatCurrency(monthlyTurnover)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Celkový měsíční obrat prodejny.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Coins className="mr-2 h-4 w-4 text-violet-600" />
                      Celková provize
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-violet-700">
                      {formatCurrency(totalCommission)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Celková měsíční provize (fixní + variabilní).
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="mr-2 h-4 w-4 text-violet-600" />
                      Celkové náklady
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-violet-700">
                      {formatCurrency(totalCosts)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Celkové měsíční náklady (personál + ostatní).
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                      Měsíční zisk
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div
                      className={`text-3xl font-bold ${getColorByValue(
                        profit
                      )}`}
                    >
                      {formatCurrency(profit)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Měsíční zisk po odečtení všech nákladů.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Percent className="mr-2 h-4 w-4 text-violet-600" />
                      Hrubá marže
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="text-3xl font-bold text-violet-700">
                      {formatPercent(grossMarginPercentage)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Poměr mezi celkovou provizí a obratem.
                    </p>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center">
                      <Percent className="mr-2 h-4 w-4 text-green-600" />
                      Čistá marže
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div
                      className={`text-3xl font-bold ${getColorByValue(
                        netMarginPercentage
                      )}`}
                    >
                      {formatPercent(netMarginPercentage)}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      Poměr mezi ziskem a obratem.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <p className="text-sm text-violet-700">
                  Shrnutí klíčových ukazatelů pro vaše podnikání. Pro
                  detailnější analýzu přejděte do jednotlivých sekcí.
                </p>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Stáhnout shrnutí (PDF)
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
