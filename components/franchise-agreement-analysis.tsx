"use client"

import { useState } from "react"
import type React from "react"
import {
  AlertTriangle,
  BookOpen,
  Building,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  DollarSign,
  Download,
  FileCheck,
  FileText,
  Info,
  Layers,
  Map,
  Percent,
  Shield,
  Star,
  TrendingUp,
  XCircle,
  Zap,
} from "lucide-react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  id: string
  title: string
  description: string
  icon: React.ReactNode
  details: string[]
  importance: Severity
}

export default function FranchiseAgreementAnalysis() {
  const [riskLevel, setRiskLevel] = useState(35)
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    "doba-trvani": true,
    "financni-podminky": true,
    "teritorialni-prava": false,
    "provozni-standardy": false,
    "ukonceni-smlouvy": false,
  })

  // Data pro klíčové body smlouvy
  const keyPoints: KeyPoint[] = [
    {
      id: "doba-trvani",
      title: "Doba trvání",
      description:
        "Smlouva je uzavírána na dobu neurčitou s výpovědní lhůtou 3 měsíce.",
      icon: <Clock className="h-6 w-6 text-violet-600" />,
      details: [
        "Smlouva na dobu neurčitou s možností výpovědi i bez udání důvodu",
        "Výpovědní lhůta 3 měsíce začíná běžet prvním dnem měsíce následujícího po doručení výpovědi",
        "Možnost okamžitého odstoupení při závažném porušení podmínek",
      ],
      importance: "high",
    },
    {
      id: "financni-podminky",
      title: "Finanční podmínky",
      description:
        "Zahrnuje vstupní poplatek, průběžné poplatky a další finanční závazky.",
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
      id: "teritorialni-prava",
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
      id: "provozni-standardy",
      title: "Provozní standardy",
      description:
        "Franšízant je povinen dodržovat stanovené standardy provozu.",
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
      id: "ukonceni-smlouvy",
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

  // Funkce pro zobrazení důležitosti
  const getImportanceBadge = (importance: Severity): JSX.Element => {
    switch (importance) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 font-medium">
            Vysoká důležitost
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-amber-100 text-amber-800 font-medium">
            Střední důležitost
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 font-medium">
            Nízká důležitost
          </Badge>
        )
    }
  }

  const toggleSection = (id: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-6 mb-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center">
              <FileCheck className="mr-3 h-8 w-8" />
              Analýza franšízové smlouvy Žabka
            </h1>
            <p className="text-violet-100 max-w-3xl">
              {siteConfig.description}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center bg-white/10 rounded-lg p-3 backdrop-blur-sm">
            <div className="mr-3">
              <div className="text-xs text-violet-200">Celkové hodnocení</div>
              <div className="text-2xl font-bold">8/10</div>
            </div>
            <div className="flex">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-yellow-300 fill-yellow-300"
                />
              ))}
              {[9, 10].map((i) => (
                <Star key={i} className="h-5 w-5 text-violet-300" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Alert className="mb-6 border-orange-200 bg-orange-50">
        <AlertTriangle className="h-5 w-5 text-orange-600" />
        <AlertTitle className="text-red-800 font-semibold">
          Důležité upozornění
        </AlertTitle>
        <AlertDescription className="text-orange-700">
          Tato analýza slouží pouze k informativním účelům. Pro závazné
          informace je nutné konzultovat aktuální oficiální franšízovou smlouvu
          a právního poradce.
        </AlertDescription>
      </Alert>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md overflow-hidden">
          <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs px-2 py-1 rounded-bl-md">
            Klíčový údaj
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-violet-800">
              <Clock className="mr-2 h-5 w-5" /> Doba trvání
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">Neurčitá</div>
            <p className="text-sm text-violet-600 mt-2">
              S výpovědní lhůtou 3 měsíce
            </p>
            <div className="mt-3 flex items-center text-xs text-violet-500">
              <Info className="h-3 w-3 mr-1" />
              <span>Možnost výpovědi i bez udání důvodu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md overflow-hidden">
          <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs px-2 py-1 rounded-bl-md">
            Klíčový údaj
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-violet-800">
              <Map className="mr-2 h-5 w-5" /> Teritoriální ochrana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">500 metrů</div>
            <p className="text-sm text-violet-600 mt-2">
              Garantovaná exkluzivita v okruhu od provozovny
            </p>
            <div className="mt-3 flex items-center text-xs text-violet-500">
              <Info className="h-3 w-3 mr-1" />
              <span>Ochrana před otevřením další Žabky v této zóně</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md overflow-hidden">
          <div className="absolute top-0 right-0 bg-violet-600 text-white text-xs px-2 py-1 rounded-bl-md">
            Klíčový údaj
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-violet-800">
              <DollarSign className="mr-2 h-5 w-5" /> Vstupní poplatek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-violet-700">10 000 Kč</div>
            <p className="text-sm text-violet-600 mt-2">
              Jednorázový poplatek při podpisu smlouvy
            </p>
            <div className="mt-3 flex items-center text-xs text-green-600">
              <CheckCircle className="h-3 w-3 mr-1" />
              <span>Výrazně nižší než u konkurence (150-500 tis. Kč)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content */}
      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-bold text-violet-800 mb-4 flex items-center">
          <Layers className="mr-2 h-5 w-5" />
          Přehled nejdůležitějších aspektů franšízové smlouvy Žabka
        </h2>

        {keyPoints.map((point) => (
          <div
            key={point.id}
            className={cn(
              "border rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md",
              expandedSections[point.id] ? "shadow-md" : ""
            )}
          >
            <div
              className={cn(
                "flex items-center justify-between p-4 cursor-pointer",
                expandedSections[point.id]
                  ? "bg-violet-100"
                  : "bg-white hover:bg-violet-50"
              )}
              onClick={() => toggleSection(point.id)}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                    expandedSections[point.id]
                      ? "bg-violet-200"
                      : "bg-violet-100"
                  )}
                >
                  {point.icon}
                </div>
                <div>
                  <h3 className="font-medium text-violet-800">{point.title}</h3>
                  <p className="text-sm text-gray-600">{point.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                {getImportanceBadge(point.importance)}
                <div className="ml-3">
                  {expandedSections[point.id] ? (
                    <ChevronUp className="h-5 w-5 text-violet-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {expandedSections[point.id] && (
              <div className="p-4 bg-violet-50 border-t border-violet-100">
                <h4 className="text-sm font-medium mb-3 flex items-center text-violet-800">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Detaily:
                </h4>
                <ul className="text-sm space-y-2">
                  {point.details.map((detail, idx) => (
                    <li
                      key={idx}
                      className="flex items-start bg-white p-3 rounded-md shadow-sm"
                    >
                      <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                      </div>
                      <span className="text-violet-800">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Financial details */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-violet-800 mb-4 flex items-center">
          <DollarSign className="mr-2 h-5 w-5" />
          Finanční podmínky franšízy
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md border-violet-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white pb-3">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="mr-2 h-5 w-5" /> Poplatky a jistiny
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-violet-100">
                <div className="p-4 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <DollarSign className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-violet-800">
                      Vstupní poplatek
                    </h4>
                    <p className="text-lg font-bold text-violet-700 my-1">
                      10 000 Kč
                    </p>
                    <p className="text-xs text-gray-600">
                      Jednorázový poplatek při podpisu smlouvy
                    </p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Výhodný oproti konkurenci
                    </Badge>
                  </div>
                </div>

                <div className="p-4 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Percent className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-violet-800">
                      Licenční poplatek
                    </h4>
                    <p className="text-lg font-bold text-violet-700 my-1">
                      1% z obratu
                    </p>
                    <p className="text-xs text-gray-600">
                      Měsíční poplatek za používání značky a systému
                    </p>
                    <Badge className="mt-2 bg-green-100 text-green-800">
                      Nižší než konkurence (3-7%)
                    </Badge>
                  </div>
                </div>

                <div className="p-4 flex items-start">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center mr-3 flex-shrink-0">
                    <Shield className="h-5 w-5 text-violet-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-violet-800">Jistina</h4>
                    <p className="text-lg font-bold text-violet-700 my-1">
                      150 000 Kč
                    </p>
                    <p className="text-xs text-gray-600">
                      Postupně navyšovaná z 20 000 Kč na 150 000 Kč
                    </p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge className="mt-2 bg-amber-100 text-amber-800 cursor-help">
                            Pozor na postupné navyšování
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs max-w-xs">
                            Jistina začíná na 20 000 Kč a postupně se navyšuje
                            až na 150 000 Kč během trvání smlouvy
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md border-violet-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" /> Provize franchisanta
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-violet-100">
                <div className="p-4">
                  <h4 className="font-medium text-violet-800 mb-2">
                    Fixní část
                  </h4>
                  <p className="text-sm text-violet-700 mb-2">
                    Garantovaná měsíční částka stanovená ve smlouvě
                  </p>
                  <div className="flex items-center">
                    <Badge className="bg-violet-100 text-violet-800">
                      Cca 25 000 Kč měsíčně
                    </Badge>
                    <span className="text-xs text-red-600 ml-2 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Krátí se při zkrácení otevírací doby
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-medium text-violet-800 mb-2">
                    Variabilní část 1
                  </h4>
                  <p className="text-sm text-violet-700 mb-2">
                    Procento z obratu dle kategorie zboží
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-violet-100 text-violet-800">
                      5,52% - 25,5% dle kategorie
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Vyšší % u vlastních výrobků
                    </Badge>
                  </div>
                </div>

                <div className="p-4">
                  <h4 className="font-medium text-violet-800 mb-2">
                    Variabilní část 2
                  </h4>
                  <p className="text-sm text-violet-700 mb-2">
                    Vypočítaná ze stanoveného vzorce s koeficientem 0,0675
                  </p>
                  <div className="flex items-center">
                    <Badge className="bg-violet-100 text-violet-800">
                      Dle výkonu prodejny
                    </Badge>
                    <span className="text-xs text-gray-600 ml-2">
                      Zohledňuje celkový obrat
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-amber-50 p-3 border-t border-amber-100">
              <div className="flex items-start">
                <Info className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                  <span className="font-medium">Důležité:</span> Franšízor hradí
                  náklady na provoz prodejny včetně nájmu, energií a vybavení.
                  Franchisant je zodpovědný především za personální náklady a
                  drobné opravy do 1 000 Kč.
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Pros and cons */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-violet-800 mb-4 flex items-center">
          <Zap className="mr-2 h-5 w-5" />
          Výhody a nevýhody franšízy Žabka
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md border-green-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white pb-3">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" /> Hlavní výhody
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start bg-green-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-green-800">
                      Nízký vstupní poplatek
                    </span>
                    <p className="text-sm text-green-700 mt-1">
                      Pouze 10 000 Kč oproti konkurenci (150-500 tis. Kč)
                    </p>
                  </div>
                </li>
                <li className="flex items-start bg-green-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-green-800">
                      Nízký licenční poplatek
                    </span>
                    <p className="text-sm text-green-700 mt-1">
                      Pouze 1% z obratu oproti konkurenci (3-7%)
                    </p>
                  </div>
                </li>
                <li className="flex items-start bg-green-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-green-800">
                      Franchisor hradí náklady na provoz
                    </span>
                    <p className="text-sm text-green-700 mt-1">
                      Včetně nájmu, energií a vybavení prodejny
                    </p>
                  </div>
                </li>
                <li className="flex items-start bg-green-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <span className="font-medium text-green-800">
                      Možnost prodeje vlastního sortimentu
                    </span>
                    <p className="text-sm text-green-700 mt-1">
                      S vyšší provizí z prodeje vlastních výrobků
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md border-red-100 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 to-rose-600 text-white pb-3">
              <CardTitle className="text-lg flex items-center">
                <XCircle className="mr-2 h-5 w-5" /> Hlavní nevýhody
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <ul className="space-y-3">
                <li className="flex items-start bg-red-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-red-800">
                      Přísné kontroly a standardy
                    </span>
                    <p className="text-sm text-red-700 mt-1">
                      Pravidelné kontroly dodržování standardů kvality
                    </p>
                  </div>
                </li>
                <li className="flex items-start bg-red-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-red-800">
                      Vysoké smluvní pokuty
                    </span>
                    <p className="text-sm text-red-700 mt-1">
                      Až 100 000 Kč za porušení některých ustanovení smlouvy
                    </p>
                  </div>
                </li>
                <li className="flex items-start bg-red-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-red-800">
                      Povinná dlouhá otevírací doba
                    </span>
                    <p className="text-sm text-red-700 mt-1">
                      7 dní v týdnu od 6:00 do 23:00
                    </p>
                  </div>
                </li>
                <li className="flex items-start bg-red-50 p-3 rounded-md">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                    <XCircle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <span className="font-medium text-red-800">
                      Přísný zákaz konkurence
                    </span>
                    <p className="text-sm text-red-700 mt-1">
                      Platí i 12 měsíců po ukončení smlouvy
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
