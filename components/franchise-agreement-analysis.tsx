"use client"

import { useState } from "react"
import {
  Clock,
  DollarSign,
  Map,
  BookOpen,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  HelpCircle,
  Award,
  Briefcase,
  Shield,
  TrendingUp,
  Users,
  FileCheck,
  ChevronRight,
  Percent,
  ChevronDown,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type React from "react"

type Severity = "high" | "medium" | "low"
type ItemType = "right" | "obligation"

interface RightOrObligation {
  text: string
  type: ItemType
}

interface Risk {
  text: string
  severity: Severity
}

interface Opportunity {
  text: string
  impact: Severity
}

interface KeyPoint {
  title: string
  description: string
  icon: React.ReactNode
  details: string[]
  importance: Severity
}

export default function FranchiseAgreementAnalysis() {
  const [riskLevel, setRiskLevel] = useState(35)
  const [openFaq, setOpenFaq] = useState<string | null>("item-1")

  // Data pro finanční podmínky
  const financialConditions = [
    {
      name: "Vstupní franšízový poplatek",
      value: "10 000 Kč",
      description: "Jednorázový poplatek při podpisu smlouvy",
      icon: <DollarSign className="h-5 w-5 text-violet-600" />,
    },
    {
      name: "Průběžný licenční poplatek",
      value: "1% z obratu",
      description: "Měsíční poplatek za používání značky a systému",
      icon: <TrendingUp className="h-5 w-5 text-violet-600" />,
    },
    {
      name: "Jistina",
      value: "150 000 Kč",
      description: "Postupně navyšovaná z 20 000 Kč na 150 000 Kč",
      icon: <Shield className="h-5 w-5 text-violet-600" />,
    },
    {
      name: "Provize franchisanta",
      value: "Fixní + variabilní část",
      description: "Odměna za provozování prodejny",
      icon: <Percent className="h-5 w-5 text-violet-600" />,
    },
  ]

  // Data pro porovnání s konkurencí
  const competitorComparison = [
    {
      aspect: "Vstupní poplatek",
      zabka: "10 000 Kč",
      competitor1: "150-250 tis. Kč",
      competitor2: "300-500 tis. Kč",
      evaluation: "Výhodný",
    },
    {
      aspect: "Průběžný poplatek",
      zabka: "1% z obratu",
      competitor1: "3-6% z obratu",
      competitor2: "4-7% z obratu",
      evaluation: "Výhodný",
    },
    {
      aspect: "Délka smlouvy",
      zabka: "Neurčitá",
      competitor1: "3 roky",
      competitor2: "7 let",
      evaluation: "Výhodný",
    },
    {
      aspect: "Teritoriální ochrana",
      zabka: "500 m",
      competitor1: "300 m",
      competitor2: "1 km",
      evaluation: "Průměrná",
    },
    {
      aspect: "Marketingová podpora",
      zabka: "Silná",
      competitor1: "Střední",
      competitor2: "Střední",
      evaluation: "Nadprůměrná",
    },
  ]

  // Data pro klíčové body smlouvy
  const keyPoints: KeyPoint[] = [
    {
      title: "Doba trvání",
      description: "Smlouva je uzavírána na dobu neurčitou s výpovědní lhůtou 3 měsíce.",
      icon: <Clock className="h-6 w-6 text-violet-600" />,
      details: [
        "Smlouva na dobu neurčitou s možností výpovědi i bez udání důvodu",
        "Výpovědní lhůta 3 měsíce začíná běžet prvním dnem měsíce následujícího po doručení výpovědi",
        "Možnost okamžitého odstoupení při závažném porušení podmínek",
      ],
      importance: "high",
    },
    {
      title: "Finanční podmínky",
      description: "Zahrnuje vstupní poplatek, průběžné poplatky a další finanční závazky.",
      icon: <DollarSign className="h-6 w-6 text-violet-600" />,
      details: [
        "Vstupní franšízový poplatek: 10 000 Kč",
        "Licenční poplatek: 1% z měsíčního obratu",
        "Jistina: 20 000 Kč navyšovaná postupně až na 150 000 Kč",
        "Provize franchisanta: fixní částka + variabilní část dle obratu",
      ],
      importance: "high",
    },
    {
      title: "Teritoriální práva",
      description: "Franšízant získává exkluzivitu v definovaném území.",
      icon: <Map className="h-6 w-6 text-violet-600" />,
      details: [
        "Garantovaná exkluzivita v okruhu 500 metrů od provozovny",
        "Ochrana před otevřením další Žabky v této zóně",
        "Zákaz provozování konkurenční činnosti během trvání smlouvy",
        "Zákaz konkurence platí i 12 měsíců po ukončení smlouvy",
      ],
      importance: "medium",
    },
    {
      title: "Provozní standardy",
      description: "Franšízant je povinen dodržovat stanovené standardy provozu.",
      icon: <BookOpen className="h-6 w-6 text-violet-600" />,
      details: [
        "Povinné školení před zahájením provozu",
        "Dodržování provozního manuálu a merchandisingových standardů",
        "Prodejní doba 7 dní v týdnu od 6:00 do 23:00",
        "Pravidelné kontroly kvality (check listy)",
        "Povinné používání pokladního a skladového systému Žabka",
      ],
      importance: "high",
    },
    {
      title: "Ukončení smlouvy",
      description: "Podmínky pro ukončení franšízové smlouvy a jeho důsledky.",
      icon: <FileText className="h-6 w-6 text-violet-600" />,
      details: [
        "Výpovědní lhůta při standardním ukončení: 3 měsíce",
        "Okamžité ukončení při závažném porušení podmínek",
        "Povinnost odstranění všech označení a prvků značky Žabka",
        "Vyrovnání všech závazků vůči franšízorovi",
        "Předání provozovny ve stavu odpovídajícím běžnému opotřebení",
      ],
      importance: "medium",
    },
  ]

  // Data pro práva a povinnosti
  const rightsAndObligations = {
    franchisor: [
      { text: "Poskytnutí know-how a obchodního systému", type: "right" },
      { text: "Marketingová podpora na národní úrovni", type: "right" },
      { text: "Školení a průběžná podpora franšízanta", type: "right" },
      { text: "Zajištění dodavatelského řetězce", type: "right" },
      { text: "Pravidelné kontroly dodržování standardů", type: "obligation" },
      { text: "Poskytování aktualizací provozního manuálu", type: "obligation" },
      { text: "Respektování teritoriální exkluzivity", type: "obligation" },
      { text: "Hrazení nákladů na provoz prodejny", type: "obligation" },
    ] as RightOrObligation[],
    franchisee: [
      { text: "Používání značky a systému Žabka", type: "right" },
      { text: "Teritoriální ochrana v definované oblasti", type: "right" },
      { text: "Přístup k centrálnímu marketingu", type: "right" },
      { text: "Podpora při řešení provozních problémů", type: "right" },
      { text: "Dodržování provozních standardů", type: "obligation" },
      { text: "Placení licenčních poplatků", type: "obligation" },
      { text: "Odběr zboží od schválených dodavatelů", type: "obligation" },
      { text: "Účast na povinných školeních", type: "obligation" },
      { text: "Zákaz konkurenční činnosti", type: "obligation" },
    ] as RightOrObligation[],
  }

  // Data pro rizika a příležitosti
  const risksAndOpportunities = {
    risks: [
      { text: "Omezená flexibilita při výběru sortimentu", severity: "medium" },
      { text: "Závislost na centrálním marketingu a brandingu", severity: "low" },
      { text: "Povinné odběry od schválených dodavatelů", severity: "medium" },
      { text: "Vysoké smluvní pokuty při porušení smlouvy", severity: "high" },
      { text: "Omezení při prodeji nebo převodu franšízy", severity: "medium" },
    ] as Risk[],
    opportunities: [
      { text: "Silná zavedená značka s rostoucím povědomím", impact: "high" },
      { text: "Propracovaný obchodní model s ověřenou ziskovostí", impact: "high" },
      { text: "Nízký vstupní poplatek oproti konkurenci", impact: "high" },
      { text: "Možnost podnikání bez vlastní nemovitosti", impact: "high" },
      { text: "Školení a průběžná podpora ze strany franšízora", impact: "medium" },
    ] as Opportunity[],
  }

  // Funkce pro zobrazení důležitosti
  const getImportanceBadge = (importance: Severity): JSX.Element => {
    switch (importance) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Vysoká důležitost</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800">Střední důležitost</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Nízká důležitost</Badge>
    }
  }

  // Funkce pro zobrazení závažnosti rizika
  const getRiskSeverityBadge = (severity: Severity): JSX.Element => {
    switch (severity) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Vysoké riziko</Badge>
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800">Střední riziko</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Nízké riziko</Badge>
    }
  }

  // Funkce pro zobrazení dopadu příležitosti
  const getOpportunityImpactBadge = (impact: Severity): JSX.Element => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-100 text-green-800">Vysoký dopad</Badge>
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">Střední dopad</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Nízký dopad</Badge>
    }
  }

  // Function to toggle FAQ items
  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-6 mb-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
          <FileCheck className="mr-3 h-8 w-8" />
          Analýza franšízové smlouvy
        </h1>
        <p className="text-violet-100 max-w-3xl">
          Detailní rozbor klíčových bodů, podmínek, práv a povinností vyplývajících z franšízové smlouvy, včetně
          porovnání s konkurencí a identifikace potenciálních rizik a příležitostí.
        </p>
      </div>

      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <AlertTriangle className="h-5 w-5 text-orange" />
        <AlertTitle className="text-red-800 font-semibold">Důležité upozornění</AlertTitle>
        <AlertDescription className="text-orange-700">
          Tato analýza slouží pouze k informativním účelům. Pro závazné informace je nutné konzultovat aktuální
          oficiální franšízovou smlouvu a právního poradce.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex flex-wrap w-full bg-white p-1 rounded-lg shadow-md">
          <TabsTrigger
            value="overview"
            className="flex-1 min-w-[120px] py-3 text-xs sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            <FileText className="mr-1 sm:mr-2 h-4 w-4" /> Přehled smlouvy
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="flex-1 min-w-[120px] py-3 text-xs sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            <DollarSign className="mr-1 sm:mr-2 h-4 w-4" /> Finanční podmínky
          </TabsTrigger>
          <TabsTrigger
            value="rights"
            className="flex-1 min-w-[120px] py-3 text-xs sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            <Users className="mr-1 sm:mr-2 h-4 w-4" /> Práva a povinnosti
          </TabsTrigger>
          <TabsTrigger
            value="comparison"
            className="flex-1 min-w-[120px] py-3 text-xs sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            <TrendingUp className="mr-1 sm:mr-2 h-4 w-4" /> Porovnání s konkurencí
          </TabsTrigger>
          <TabsTrigger
            value="risks"
            className="flex-1 min-w-[120px] py-3 text-xs sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            <AlertTriangle className="mr-1 sm:mr-2 h-4 w-4" /> Rizika a příležitosti
          </TabsTrigger>
        </TabsList>

        {/* Přehled smlouvy */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-violet-800">
                  <Clock className="mr-2 h-5 w-5" /> Doba trvání
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-violet-700">Neurčitá</div>
                <p className="text-xs text-violet-600 mt-2">S výpovědní lhůtou 3 měsíce</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-violet-800">
                  <Map className="mr-2 h-5 w-5" /> Teritoriální ochrana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-violet-700">500 metrů</div>
                <p className="text-xs text-violet-600 mt-2">Garantovaná exkluzivita v okruhu od provozovny</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-violet-800">
                  <DollarSign className="mr-2 h-5 w-5" /> Vstupní poplatek
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-violet-700">10 000 Kč</div>
                <p className="text-xs text-violet-600 mt-2">Jednorázový poplatek při podpisu smlouvy</p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Klíčové body franšízové smlouvy</CardTitle>
              <CardDescription className="text-violet-100">
                Přehled nejdůležitějších aspektů franšízové smlouvy
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {keyPoints.map((point, index) => (
                  <Card key={index} className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg">
                    <CardHeader className="pb-2 bg-gradient-to-r from-violet-50 to-indigo-50">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base flex items-center text-violet-800">
                          {point.icon}
                          <span className="ml-2">{point.title}</span>
                        </CardTitle>
                        <div>{getImportanceBadge(point.importance)}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm mb-3 text-violet-800">{point.description}</p>
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center text-violet-800">
                          <ChevronRight className="h-4 w-4 mr-1" />
                          Detaily:
                        </h4>
                        <ul className="text-sm space-y-2">
                          {point.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start bg-violet-50 p-2 rounded-md">
                              <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                              </div>
                              <span className="text-violet-800">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
              >
                <FileText className="mr-2 h-4 w-4" />
                Stáhnout kompletní analýzu smlouvy (PDF)
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Finanční podmínky */}
        <TabsContent value="financial" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Finanční podmínky franšízy</CardTitle>
              <CardDescription className="text-violet-100">
                Přehled všech finančních závazků a podmínek vyplývajících z franšízové smlouvy
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {financialConditions.map((condition, index) => (
                  <Card key={index} className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg">
                    <CardContent className="p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mr-4 flex-shrink-0">
                        {condition.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-violet-800">{condition.name}</h3>
                        <div className="text-xl font-bold text-violet-700 my-1">{condition.value}</div>
                        <p className="text-xs text-violet-600">{condition.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <TrendingUp className="mr-2 h-4 w-4 text-violet-600" />
                      Struktura provize franchisanta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Fixní část provize</span>
                          <span className="font-semibold text-violet-800">Stanovená ve smlouvě</span>
                        </div>
                        <Progress value={40} className="h-2 bg-violet-100" />
                        <p className="text-xs text-violet-600 mt-1">
                          Garantovaná měsíční částka, která se krátí při zkrácení otevírací doby
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Variabilní část provize 1</span>
                          <span className="font-semibold text-violet-800">% z obratu dle kategorie zboží</span>
                        </div>
                        <Progress value={70} className="h-2 bg-violet-100" />
                        <p className="text-xs text-violet-600 mt-1">Různé sazby dle kategorie zboží (5,52% - 25,5%)</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Variabilní část provize 2</span>
                          <span className="font-semibold text-violet-800">Koeficient 0,0675</span>
                        </div>
                        <Progress value={50} className="h-2 bg-violet-100" />
                        <p className="text-xs text-violet-600 mt-1">Vypočítaná ze stanoveného vzorce</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Zádržné</span>
                          <span className="font-semibold text-violet-800">2% z obratu</span>
                        </div>
                        <Progress value={30} className="h-2 bg-violet-100" />
                        <p className="text-xs text-violet-600 mt-1">Vypláceno po provedení inventury</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <AlertTriangle className="mr-2 h-4 w-4 text-violet-600" />
                      Skryté a dodatečné náklady
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="bg-amber-50 p-3 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-1">Jistina</h4>
                        <p className="text-sm text-amber-700">
                          Počáteční 20 000 Kč, postupně navyšovaná až na 150 000 Kč
                        </p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-1">Náklady na běžnou údržbu</h4>
                        <p className="text-sm text-amber-700">
                          Franchisant hradí běžnou údržbu a drobné opravy do 1 000 Kč
                        </p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-1">Smluvní pokuty</h4>
                        <p className="text-sm text-amber-700">Až 100 000 Kč za porušení některých ustanovení smlouvy</p>
                      </div>

                      <div className="bg-amber-50 p-3 rounded-lg">
                        <h4 className="font-medium text-amber-800 mb-1">Pojištění</h4>
                        <p className="text-sm text-amber-700">
                          Povinnost uzavřít pojištění v rozsahu stanoveném smlouvou
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Stáhnout finanční analýzu (PDF)
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Práva a povinnosti */}
        <TabsContent value="rights" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Práva a povinnosti smluvních stran</CardTitle>
              <CardDescription className="text-violet-100">
                Přehled práv a povinností franšízora (Žabka) a franšízanta vyplývajících ze smlouvy
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <Users className="mr-2 h-4 w-4 text-violet-600" />
                      Práva a povinnosti franšízora (Žabka)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {rightsAndObligations.franchisor.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start p-3 rounded-lg ${item.type === "right" ? "bg-green-50" : "bg-blue-50"}`}
                        >
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full mr-3 flex-shrink-0 ${
                              item.type === "right" ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            {item.type === "right" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Briefcase className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <span className={item.type === "right" ? "text-green-800" : "text-blue-800"}>
                            {item.text}
                            <Badge className="ml-2" variant="outline">
                              {item.type === "right" ? "Právo" : "Povinnost"}
                            </Badge>
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <Users className="mr-2 h-4 w-4 text-violet-600" />
                      Práva a povinnosti franšízanta
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {rightsAndObligations.franchisee.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start p-3 rounded-lg ${item.type === "right" ? "bg-green-50" : "bg-blue-50"}`}
                        >
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full mr-3 flex-shrink-0 ${
                              item.type === "right" ? "bg-green-100" : "bg-blue-100"
                            }`}
                          >
                            {item.type === "right" ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Briefcase className="h-4 w-4 text-blue-600" />
                            )}
                          </div>
                          <span className={item.type === "right" ? "text-green-800" : "text-blue-800"}>
                            {item.text}
                            <Badge className="ml-2" variant="outline">
                              {item.type === "right" ? "Právo" : "Povinnost"}
                            </Badge>
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <HelpCircle className="mr-2 h-4 w-4 text-violet-600" />
                      Klíčové právní aspekty smlouvy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {[
                        {
                          id: "item-1",
                          question: "Ochrana duševního vlastnictví",
                          answer: (
                            <>
                              <p>
                                Franšízant získává licenci k používání ochranných známek, log a dalších prvků duševního
                                vlastnictví Žabka, ale pouze v rozsahu nezbytném pro provoz franšízy a pouze po dobu
                                trvání smlouvy. Veškerá práva zůstávají franšízorovi.
                              </p>
                              <p className="mt-2">
                                Franšízant je povinen okamžitě informovat franšízora o jakémkoliv porušení nebo zneužití
                                duševního vlastnictví třetími stranami.
                              </p>
                            </>
                          ),
                        },
                        {
                          id: "item-2",
                          question: "Převod a prodej franšízy",
                          answer: (
                            <>
                              <p>
                                Franšízant nemůže prodat, převést nebo postoupit franšízovou smlouvu bez předchozího
                                písemného souhlasu franšízora. Žabka má předkupní právo na odkup franšízy.
                              </p>
                              <p className="mt-2">
                                Franchisant není oprávněn postupovat svoje pohledávky za Franchisorem ani převádět
                                závazky vůči Franchisorovi na třetí osoby bez předchozího písemného souhlasu.
                              </p>
                            </>
                          ),
                        },
                        {
                          id: "item-3",
                          question: "Zákaz konkurence",
                          answer: (
                            <>
                              <p>
                                Franchisant se zavazuje neprovozovat, a to ani nepřímo prostřednictvím právnické osoby,
                                na území České republiky prodejnu potravin nebo prodejnu potravin a smíšeného zboží.
                              </p>
                              <p className="mt-2">
                                Zákaz konkurence platí po celou dobu trvání smlouvy a dále 12 měsíců po jejím ukončení.
                                Za porušení zákazu konkurence hrozí smluvní pokuta až 500.000 Kč.
                              </p>
                            </>
                          ),
                        },
                        {
                          id: "item-4",
                          question: "Protikorupční zásady",
                          answer: (
                            <>
                              <p>
                                Smlouva obsahuje rozsáhlé protikorupční zásady, které franchisant musí dodržovat.
                                Franchisant se zavazuje neposkytovat ani nenabízet žádné korupční platby ani cokoli
                                nepřiměřené hodnoty.
                              </p>
                              <p className="mt-2">
                                Porušení protikorupčních zásad může vést k pozastavení činnosti franchisanta,
                                pozastavení plateb nebo k vypovězení smlouvy.
                              </p>
                            </>
                          ),
                        },
                      ].map((faq) => {
                        const isOpen = openFaq === faq.id
                        return (
                          <Card
                            key={faq.id}
                            className={`border transition-all duration-300 ${
                              isOpen ? "shadow-md border-violet-300" : "shadow-sm"
                            }`}
                          >
                            <CardHeader
                              className="p-4 cursor-pointer hover:bg-violet-50 rounded-t-lg"
                              onClick={() => toggleFaq(faq.id)}
                            >
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base flex items-center">
                                  <span className="mr-3 text-violet-600">
                                    <HelpCircle className="h-5 w-5" />
                                  </span>
                                  {faq.question}
                                </CardTitle>
                                <div className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}>
                                  <ChevronDown className="h-5 w-5 text-gray-400" />
                                </div>
                              </div>
                            </CardHeader>
                            {isOpen && (
                              <CardContent className="pt-0 px-4 pb-4 border-t">
                                <div className="text-violet-700 bg-violet-50 p-3 rounded-md pl-8">{faq.answer}</div>
                              </CardContent>
                            )}
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
              >
                <Users className="mr-2 h-4 w-4" />
                Stáhnout analýzu práv a povinností (PDF)
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Porovnání s konkurencí */}
        <TabsContent value="comparison" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Porovnání s konkurenčními franšízami</CardTitle>
              <CardDescription className="text-violet-100">
                Srovnání klíčových podmínek franšízy Žabka s konkurenčními koncepty na trhu
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto mb-6">
                <Table>
                  <TableCaption>Srovnání franšízových podmínek s konkurencí</TableCaption>
                  <TableHeader>
                    <TableRow className="bg-violet-100">
                      <TableHead className="font-semibold">Aspekt smlouvy</TableHead>
                      <TableHead className="text-center bg-violet-200 font-semibold">Žabka</TableHead>
                      <TableHead className="text-center font-semibold">Konkurent A</TableHead>
                      <TableHead className="text-center font-semibold">Konkurent B</TableHead>
                      <TableHead className="font-semibold">Hodnocení</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitorComparison.map((item, index) => (
                      <TableRow key={index} className="hover:bg-violet-50 transition-colors">
                        <TableCell className="font-medium">{item.aspect}</TableCell>
                        <TableCell className="text-center bg-violet-50 font-medium text-violet-800">
                          {item.zabka}
                        </TableCell>
                        <TableCell className="text-center">{item.competitor1}</TableCell>
                        <TableCell className="text-center">{item.competitor2}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              item.evaluation === "Výhodný"
                                ? "bg-green-100 text-green-800"
                                : item.evaluation === "Standardní"
                                  ? "bg-blue-100 text-blue-800"
                                  : item.evaluation === "Průměrný"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-red-100 text-red-800"
                            }
                          >
                            {item.evaluation}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-green-50">
                    <CardTitle className="text-base flex items-center text-green-800">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Výhody oproti konkurenci
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-green-800">Nízký vstupní poplatek (10 000 Kč)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-green-800">Nízký licenční poplatek (1% z obratu)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-green-800">Franchisor hradí náklady na provoz prodejny</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-green-800">Možnost prodeje vlastního sortimentu</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-red-50">
                    <CardTitle className="text-base flex items-center text-red-800">
                      <XCircle className="mr-2 h-4 w-4" />
                      Nevýhody oproti konkurenci
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-red-800">Přísné kontroly a standardy</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-red-800">Vysoké smluvní pokuty při porušení smlouvy</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-red-800">Povinná dlouhá otevírací doba (6:00-23:00)</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        </div>
                        <span className="text-red-800">Přísný zákaz konkurence i po ukončení smlouvy</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-blue-50">
                    <CardTitle className="text-base flex items-center text-blue-800">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Celkové hodnocení
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 flex items-center justify-center mb-4">
                        <span className="text-3xl font-bold text-white">8/10</span>
                      </div>
                      <p className="text-center text-blue-800 text-sm">
                        Franšíza Žabka nabízí nadprůměrné podmínky ve srovnání s konkurencí, zejména díky nízkým
                        vstupním nákladům a propracovanému obchodnímu konceptu.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="pb-2 bg-violet-50">
                  <CardTitle className="text-base flex items-center">
                    <Award className="mr-2 h-4 w-4 text-violet-600" />
                    Konkurenční výhody franšízy Žabka
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="bg-violet-50 p-4 rounded-lg">
                      <h4 className="font-medium text-violet-800 mb-2">Silná a rostoucí značka</h4>
                      <p className="text-sm text-violet-700">
                        Žabka je etablovaná značka s rostoucím povědomím mezi zákazníky a ambiciózními plány expanze,
                        což zvyšuje hodnotu franšízy v čase.
                      </p>
                    </div>

                    <div className="bg-violet-50 p-4 rounded-lg">
                      <h4 className="font-medium text-violet-800 mb-2">Propracovaný obchodní model</h4>
                      <p className="text-sm text-violet-700">
                        Koncept Žabka je založen na detailně propracovaném obchodním modelu s ověřenou ziskovostí a
                        optimalizovanými procesy.
                      </p>
                    </div>

                    <div className="bg-violet-50 p-4 rounded-lg">
                      <h4 className="font-medium text-violet-800 mb-2">Komplexní podpora franšízanta</h4>
                      <p className="text-sm text-violet-700">
                        Žabka poskytuje nadstandardní podporu včetně školení, marketingu, IT systémů a průběžného
                        poradenství, což minimalizuje podnikatelské riziko.
                      </p>
                    </div>

                    <div className="bg-violet-50 p-4 rounded-lg">
                      <h4 className="font-medium text-violet-800 mb-2">Nízké vstupní náklady</h4>
                      <p className="text-sm text-violet-700">
                        Na rozdíl od mnoha konkurenčních franšíz, Žabka vyžaduje relativně nízký vstupní poplatek a
                        franchisor hradí většinu nákladů na provoz prodejny.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Stáhnout konkurenční analýzu (PDF)
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Rizika a příležitosti */}
        <TabsContent value="risks" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Rizika a příležitosti franšízové smlouvy</CardTitle>
              <CardDescription className="text-violet-100">
                Identifikace potenciálních rizik a příležitostí vyplývajících z franšízové smlouvy Žabka
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-red-50">
                    <CardTitle className="text-base flex items-center text-red-800">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Potenciální rizika
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {risksAndOpportunities.risks.map((risk, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-red-800">{risk.text}</h4>
                            {getRiskSeverityBadge(risk.severity)}
                          </div>
                          <Progress
                            value={risk.severity === "high" ? 80 : risk.severity === "medium" ? 50 : 30}
                            className="h-1.5 bg-red-100"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-green-50">
                    <CardTitle className="text-base flex items-center text-green-800">
                      <Award className="mr-2 h-4 w-4" />
                      Potenciální příležitosti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {risksAndOpportunities.opportunities.map((opportunity, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-lg shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-green-800">{opportunity.text}</h4>
                            {getOpportunityImpactBadge(opportunity.impact)}
                          </div>
                          <Progress
                            value={opportunity.impact === "high" ? 80 : opportunity.impact === "medium" ? 50 : 30}
                            className="h-1.5 bg-green-100"
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="pb-2 bg-violet-50">
                  <CardTitle className="text-base flex items-center">
                    <Shield className="mr-2 h-4 w-4 text-violet-600" />
                    Celkové hodnocení rizik
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="w-full">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">Úroveň rizika: {riskLevel}%</span>
                        <span className="text-sm font-medium">
                          {riskLevel < 30 ? "Nízké riziko" : riskLevel < 60 ? "Střední riziko" : "Vysoké riziko"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className={`h-2.5 rounded-full ${
                            riskLevel < 30 ? "bg-green-600" : riskLevel < 60 ? "bg-amber-500" : "bg-red-600"
                          }`}
                          style={{ width: `${riskLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-violet-50 p-4 rounded-lg">
                    <h4 className="font-medium text-violet-800 mb-2">Shrnutí rizik a příležitostí</h4>
                    <p className="text-sm text-violet-700 mb-3">
                      Franšízová smlouva Žabka představuje vyvážený poměr rizik a příležitostí. Hlavní rizika spočívají
                      v přísných kontrolách, vysokých smluvních pokutách a omezení podnikatelské svobody franchisanta.
                    </p>
                    <p className="text-sm text-violet-700 mb-3">
                      Na druhou stranu, příležitosti zahrnují využití silné značky, propracovaného obchodního modelu a
                      komplexní podpory, což může výrazně zvýšit šance na úspěch podnikání při nízkých vstupních
                      nákladech.
                    </p>
                    <p className="text-sm text-violet-700">
                      Celkově lze hodnotit franšízovou smlouvu Žabka jako středně rizikovou s dobrým potenciálem
                      návratnosti investice při správném řízení identifikovaných rizik.
                    </p>
                  </div>

                  <div className="mt-4 space-y-3">
                    <h4 className="font-medium text-violet-800">Doporučení pro minimalizaci rizik:</h4>
                    <div className="flex items-start">
                      <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                      </div>
                      <span className="text-violet-800">Důkladná právní kontrola smlouvy před podpisem</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                      </div>
                      <span className="text-violet-800">Vytvoření finanční rezervy pro neočekávané výdaje</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                      </div>
                      <span className="text-violet-800">Důsledné dodržování standardů a podmínek smlouvy</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                      </div>
                      <span className="text-violet-800">
                        Aktivní komunikace s franšízorem a řešení problémů v zárodku
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Stáhnout analýzu rizik a příležitostí (PDF)
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

