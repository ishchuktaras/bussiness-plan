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
  LineChart as RechartsLineChart,
  Line,
  Cell,
} from "recharts"

export default function ZabkaBusinessPlan() {
  // Základní finanční údaje
  const [dailyTurnover, setDailyTurnover] = useState(30000)
  const [monthlyTurnover, setMonthlyTurnover] = useState(dailyTurnover * 30)
  const [rent, setRent] = useState(0) // Hrazeno franšízorem
  const [utilities, setUtilities] = useState(25000)
  const [staffCount, setStaffCount] = useState(2)
  const [staffCost, setStaffCost] = useState(30000)
  const [totalStaffCost, setTotalStaffCost] = useState(staffCount * staffCost)
  const [otherCosts, setOtherCosts] = useState(15000)

  // Rozšířené finanční údaje
  const [seasonalityFactor, setSeasonalityFactor] = useState(1.0)
  const [wastageRate, setWastageRate] = useState(2.0)
  const [marketingCosts, setMarketingCosts] = useState(5000)
  const [maintenanceCosts, setMaintenanceCosts] = useState(3000)
  const [insuranceCosts, setInsuranceCosts] = useState(2000)
  const [accountingCosts, setAccountingCosts] = useState(3000)
  const [trainingCosts, setTrainingCosts] = useState(1000)
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
    newDailyTurnover: number;
  }

  const updateValues = ({ newDailyTurnover }: UpdateValuesProps) => {
    const newMonthlyTurnover = newDailyTurnover * 30;
    setDailyTurnover(newDailyTurnover);
    setMonthlyTurnover(newMonthlyTurnover);
  };

  interface UpdateStaffCostsProps {
    count: number;
    cost: number;
  }

  const updateStaffCosts = ({ count, cost }: UpdateStaffCostsProps) => {
    setStaffCount(count);
    setStaffCost(cost);
    setTotalStaffCost(count * cost);
  };

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
    index: number;
    newMargin: number;
  }

  const updateCategoryMargin = ({ index, newMargin }: UpdateCategoryMarginProps) => {
    const updatedCategories = [...productCategories];
    updatedCategories[index].margin = newMargin;
    setProductCategories(updatedCategories);
  };

  // Barvy pro grafy
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d", "#ffc658", "#8dd1e1"]

  const updateScenario = (scenario: "pessimistic" | "realistic" | "optimistic") => {
    setSelectedScenario(scenario)
    // další kód...
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Podnikatelský plán Žabka</h1>

      <Tabs defaultValue="calculator">
        <TabsList className="flex flex-wrap w-full">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={selectedScenario === "pessimistic" ? "border-red-500 border-2" : ""}>
                  <CardHeader className="bg-red-50">
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      Pesimistický scénář
                    </CardTitle>
                    <CardDescription>Obrat: -20%, Náklady: +10%, Ztráty: 3%</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span>{pessimisticScenario.turnover.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span>{pessimisticScenario.commission.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celkové náklady:</span>
                        <span>{pessimisticScenario.costs.toLocaleString()} Kč</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Měsíční zisk:</span>
                        <span className={pessimisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                          {pessimisticScenario.profit.toLocaleString()} Kč
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={selectedScenario === "realistic" ? "border-blue-500 border-2" : ""}>
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center">
                      <ArrowUpDown className="mr-2 h-5 w-5 text-blue-500" />
                      Realistický scénář
                    </CardTitle>
                    <CardDescription>Obrat: 100%, Náklady: 100%, Ztráty: 2%</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span>{realisticScenario.turnover.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span>{realisticScenario.commission.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celkové náklady:</span>
                        <span>{realisticScenario.costs.toLocaleString()} Kč</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Měsíční zisk:</span>
                        <span className={realisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                          {realisticScenario.profit.toLocaleString()} Kč
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={selectedScenario === "optimistic" ? "border-green-500 border-2" : ""}>
                  <CardHeader className="bg-green-50">
                    <CardTitle className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      Optimistický scénář
                    </CardTitle>
                    <CardDescription>Obrat: +20%, Náklady: -5%, Ztráty: 1.5%</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Měsíční obrat:</span>
                        <span>{optimisticScenario.turnover.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celková provize:</span>
                        <span>{optimisticScenario.commission.toLocaleString()} Kč</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Celkové náklady:</span>
                        <span>{optimisticScenario.costs.toLocaleString()} Kč</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Měsíční zisk:</span>
                        <span className={optimisticScenario.profit >= 0 ? "text-green-600" : "text-red-600"}>
                          {optimisticScenario.profit.toLocaleString()} Kč
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Porovnání scénářů</CardTitle>
                </CardHeader>
                <CardContent>
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
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
                        <Legend />
                        <Bar dataKey="obrat" name="Obrat" fill="#3b82f6" />
                        <Bar dataKey="provize" name="Provize" fill="#10b981" />
                        <Bar dataKey="naklady" name="Náklady" fill="#ef4444" />
                        <Bar dataKey="zisk" name="Zisk" fill="#f59e0b" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Finanční ukazatele podle scénářů</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-2 font-medium border-b pb-2">
                      <div>Ukazatel</div>
                      <div>Pesimistický</div>
                      <div>Realistický</div>
                      <div>Optimistický</div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>Hrubá marže (%)</div>
                      <div>{((pessimisticScenario.commission / pessimisticScenario.turnover) * 100).toFixed(2)}%</div>
                      <div>{((realisticScenario.commission / realisticScenario.turnover) * 100).toFixed(2)}%</div>
                      <div>{((optimisticScenario.commission / optimisticScenario.turnover) * 100).toFixed(2)}%</div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>Čistá marže (%)</div>
                      <div>{((pessimisticScenario.profit / pessimisticScenario.turnover) * 100).toFixed(2)}%</div>
                      <div>{((realisticScenario.profit / realisticScenario.turnover) * 100).toFixed(2)}%</div>
                      <div>{((optimisticScenario.profit / optimisticScenario.turnover) * 100).toFixed(2)}%</div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>Roční zisk</div>
                      <div>{(pessimisticScenario.profit * 12).toLocaleString()} Kč</div>
                      <div>{(realisticScenario.profit * 12).toLocaleString()} Kč</div>
                      <div>{(optimisticScenario.profit * 12).toLocaleString()} Kč</div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>ROI (%)</div>
                      <div>
                        {pessimisticScenario.profit > 0
                          ? (((pessimisticScenario.profit * 12) / initialInvestment) * 100).toFixed(2) + "%"
                          : "N/A"}
                      </div>
                      <div>
                        {realisticScenario.profit > 0
                          ? (((realisticScenario.profit * 12) / initialInvestment) * 100).toFixed(2) + "%"
                          : "N/A"}
                      </div>
                      <div>
                        {optimisticScenario.profit > 0
                          ? (((optimisticScenario.profit * 12) / initialInvestment) * 100).toFixed(2) + "%"
                          : "N/A"}
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      <div>Doba návratnosti (měsíce)</div>
                      <div>
                        {pessimisticScenario.profit > 0
                          ? Math.ceil(initialInvestment / pessimisticScenario.profit)
                          : "N/A"}
                      </div>
                      <div>
                        {realisticScenario.profit > 0 ? Math.ceil(initialInvestment / realisticScenario.profit) : "N/A"}
                      </div>
                      <div>
                        {optimisticScenario.profit > 0
                          ? Math.ceil(initialInvestment / optimisticScenario.profit)
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Vybraný scénář:</span>
                  <span
                    className={
                      selectedScenario === "pessimistic"
                        ? "text-red-600"
                        : selectedScenario === "optimistic"
                          ? "text-green-600"
                          : "text-blue-600"
                    }
                  >
                    {selectedScenario === "pessimistic"
                      ? "Pesimistický"
                      : selectedScenario === "optimistic"
                        ? "Optimistický"
                        : "Realistický"}
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
              <CardDescription>Projekce obratu, nákladů a zisku v průběhu roku</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Měsíční projekce obratu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
                        <Legend />
                        <Line type="monotone" dataKey="turnover" name="Obrat" stroke="#3b82f6" activeDot={{ r: 8 }} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Měsíční projekce zisku</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
                        <Legend />
                        <Bar dataKey="commission" name="Provize" fill="#10b981" />
                        <Bar dataKey="costs" name="Náklady" fill="#ef4444" />
                        <Line type="monotone" dataKey="profit" name="Zisk" stroke="#f59e0b" strokeWidth={2} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tabulka měsíčních projekcí</CardTitle>
                </CardHeader>
                <CardContent>
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
                          <tr key={index} className="border-b">
                            <td className="py-2">{month.name}</td>
                            <td className="text-right py-2">{Math.round(month.turnover).toLocaleString()}</td>
                            <td className="text-right py-2">{Math.round(month.commission).toLocaleString()}</td>
                            <td className="text-right py-2">{Math.round(month.costs).toLocaleString()}</td>
                            <td
                              className={`text-right py-2 font-medium ${month.profit >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {Math.round(month.profit).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t font-bold">
                          <td className="py-2">Celkem za rok</td>
                          <td className="text-right py-2">
                            {monthlyData.reduce((sum, month) => sum + month.turnover, 0).toLocaleString()} Kč
                          </td>
                          <td className="text-right py-2">
                            {monthlyData.reduce((sum, month) => sum + month.commission, 0).toLocaleString()} Kč
                          </td>
                          <td className="text-right py-2">
                            {monthlyData.reduce((sum, month) => sum + month.costs, 0).toLocaleString()} Kč
                          </td>
                          <td className="text-right py-2">
                            {monthlyData.reduce((sum, month) => sum + month.profit, 0).toLocaleString()} Kč
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sezónní faktory</CardTitle>
                  <CardDescription>Relativní změny obratu v průběhu roku</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart
                        data={monthNames.map((month, index) => ({
                          name: month,
                          factor: seasonalFactors[index],
                        }))}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0.7, 1.3]} />
                        <Tooltip />
                        <Bar dataKey="factor" name="Sezónní faktor" fill="#8884d8" />
                        <Line type="monotone" dataKey="factor" stroke="#ff7300" strokeWidth={2} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between text-lg font-bold">
                  <span>Průměrný měsíční zisk:</span>
                  <span
                    className={
                      monthlyData.reduce((sum, month) => sum + month.profit, 0) / 12 >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {Math.round(monthlyData.reduce((sum, month) => sum + month.profit, 0) / 12).toLocaleString()} Kč
                  </span>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Finanční shrnutí</CardTitle>
              <CardDescription>Měsíční zisk a klíčové finanční ukazatele</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">Měsíční přehled</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Měsíční obrat:</span>
                      <span className="font-bold">{monthlyTurnover.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Celková provize:</span>
                      <span className="font-bold">{totalCommission.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Celkové výdaje:</span>
                      <span className="font-bold">{totalCosts.toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Měsíční zisk:</span>
                      <span className={`font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {profit.toLocaleString()} Kč
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">Roční projekce</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Roční obrat:</span>
                      <span className="font-bold">{(monthlyTurnover * 12).toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Roční provize:</span>
                      <span className="font-bold">{(totalCommission * 12).toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Roční výdaje:</span>
                      <span className="font-bold">{(totalCosts * 12).toLocaleString()} Kč</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Roční zisk:</span>
                      <span className={`font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {(profit * 12).toLocaleString()} Kč
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Klíčové finanční ukazatele</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Hrubá marže</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-green-600 h-2.5 rounded-full"
                              style={{ width: `${Math.min(grossMarginPercentage, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold">{grossMarginPercentage.toFixed(2)}%</span>
                        </div>
                      </div>

                      <div>
                        <Label>Čistá marže</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className={`${netMarginPercentage >= 0 ? "bg-green-600" : "bg-red-600"} h-2.5 rounded-full`}
                              style={{ width: `${Math.min(Math.abs(netMarginPercentage), 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold">{netMarginPercentage.toFixed(2)}%</span>
                        </div>
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
                          <span className="font-bold">{breakEvenTurnover.toLocaleString()} Kč</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {monthlyTurnover >= breakEvenTurnover
                            ? `Obrat je ${Math.round((monthlyTurnover / breakEvenTurnover - 1) * 100)}% nad bodem zvratu`
                            : `Obrat je ${Math.round((1 - monthlyTurnover / breakEvenTurnover) * 100)}% pod bodem zvratu`}
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
                          <span className="font-bold">{roi.toFixed(2)}%</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {roi > 0
                            ? `Roční návratnost investice ${roi.toFixed(2)}%`
                            : "Investice se nevrací (negativní zisk)"}
                        </p>
                      </div>

                      <div>
                        <Label>Doba návratnosti investice</Label>
                        <div className="mt-1">
                          <span className="text-xl font-bold">
                            {profit > 0 ? `${Math.ceil(paybackPeriod)} měsíců` : "N/A - Negativní zisk"}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            {profit > 0
                              ? `Investice se vrátí za ${Math.ceil(paybackPeriod)} měsíců při současné ziskovosti`
                              : "Při současné ziskovosti se investice nevrátí"}
                          </p>
                        </div>
                      </div>

                      <div>
                        <Label>Efektivita nákladů</Label>
                        <div className="flex items-center mt-1">
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                            <div
                              className="bg-yellow-600 h-2.5 rounded-full"
                              style={{ width: `${Math.min((totalCosts / totalCommission) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="font-bold">{((totalCosts / totalCommission) * 100).toFixed(2)}%</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Náklady tvoří {((totalCosts / totalCommission) * 100).toFixed(2)}% z celkové provize
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analýza návratnosti investice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Počáteční investice:</span>
                      <span className="font-bold">180 000 Kč</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Měsíční zisk:</span>
                      <span className={`font-bold ${profit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {profit.toLocaleString()} Kč
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Doba návratnosti investice:</span>
                      <span className="font-bold">
                        {profit > 0 ? `${Math.ceil(paybackPeriod)} měsíců` : "N/A - Negativní zisk"}
                      </span>
                    </div>

                    {profit > 0 && (
                      <div className="mt-4">
                        <Label>Průběh návratnosti investice</Label>
                        <div className="h-60 mt-4">
                          <ResponsiveContainer width="100%" height="100%">
                            <RechartsLineChart
                              data={Array.from({ length: Math.ceil(paybackPeriod) + 3 }, (_, i) => ({
                                month: i,
                                investment: initialInvestment,
                                returned: Math.min(i * profit, initialInvestment),
                              }))}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" label={{ value: "Měsíc", position: "insideBottom", offset: -5 }} />
                              <YAxis label={{ value: "Kč", angle: -90, position: "insideLeft" }} />
                              <Tooltip formatter={(value) => value.toLocaleString() + " Kč"} />
                              <Legend />
                              <Line
                                type="monotone"
                                dataKey="investment"
                                name="Počáteční investice"
                                stroke="#ef4444"
                                strokeWidth={2}
                              />
                              <Line
                                type="monotone"
                                dataKey="returned"
                                name="Vráceno"
                                stroke="#10b981"
                                strokeWidth={2}
                              />
                            </RechartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Porovnání příjmů a výdajů</CardTitle>
                </CardHeader>
                <CardContent>
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
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => Math.abs(Number(value)).toLocaleString() + " Kč"} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full">Vygenerovat podrobnou zprávu</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

