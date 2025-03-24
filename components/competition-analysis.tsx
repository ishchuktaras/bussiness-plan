"use client"

import type React from "react"
import { useState } from "react"
import {
  Award,
  BarChart,
  Clock,
  Coffee,
  LineChart,
  Map,
  PieChart,
  ShieldCheck,
  ShoppingCart,
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
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  BarChart as RechartsBarChart,
  PieChart as RechartsPieChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

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
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompetitionAnalysis() {
  // Lokální konkurenti
  const [competitors] = useState([
    {
      id: 1,
      name: "Albert",
      type: "Supermarket",
      distance: 0.5,
      size: 800,
      rating: 3.8,
      priceLevel: "medium",
      openingHours: "6:00-22:00",
      strengths: ["Široký sortiment", "Parkoviště", "Známá značka"],
      weaknesses: ["Vyšší ceny", "Delší fronty", "Méně osobní přístup"],
      popularity: 80,
      color: "#3b82f6",
      strengths_rating: {
        assortment: 85,
        price: 60,
        location: 75,
        freshness: 70,
        speed: 55,
        service: 65,
        convenience: 70,
      },
    },
    {
      id: 2,
      name: "Večerka U Novotných",
      type: "Večerka",
      distance: 0.3,
      size: 60,
      rating: 4.2,
      priceLevel: "high",
      openingHours: "6:00-23:00",
      strengths: ["Dlouhá otevírací doba", "Osobní přístup", "Blízkost"],
      weaknesses: ["Omezený sortiment", "Vyšší ceny", "Malý prostor"],
      popularity: 55,
      color: "#10b981",
      strengths_rating: {
        assortment: 40,
        price: 30,
        location: 85,
        freshness: 60,
        speed: 85,
        service: 90,
        convenience: 85,
      },
    },
    {
      id: 3,
      name: "BILLA",
      type: "Supermarket",
      distance: 1.2,
      size: 650,
      rating: 4.0,
      priceLevel: "medium",
      openingHours: "7:00-21:00",
      strengths: ["Kvalitní pekárna", "Akční nabídky", "Věrnostní program"],
      weaknesses: ["Méně pokladen", "Vzdálenější lokace"],
      popularity: 70,
      color: "#f59e0b",
      strengths_rating: {
        assortment: 80,
        price: 65,
        location: 60,
        freshness: 80,
        speed: 60,
        service: 70,
        convenience: 65,
      },
    },
    {
      id: 4,
      name: "Tesco Express",
      type: "Convenience",
      distance: 0.8,
      size: 250,
      rating: 3.5,
      priceLevel: "medium",
      openingHours: "6:00-22:00",
      strengths: ["Známá značka", "Klubové ceny", "Samoobslužné pokladny"],
      weaknesses: ["Někdy chybí zboží", "Méně čerstvého zboží"],
      popularity: 65,
      color: "#0ea5e9",
      strengths_rating: {
        assortment: 60,
        price: 70,
        location: 70,
        freshness: 60,
        speed: 75,
        service: 60,
        convenience: 80,
      },
    },
    {
      id: 5,
      name: "LIDL",
      type: "Diskont",
      distance: 1.5,
      size: 1000,
      rating: 4.3,
      priceLevel: "low",
      openingHours: "7:00-21:00",
      strengths: ["Nízké ceny", "Akční zboží", "Vlastní pekárna"],
      weaknesses: ["Vzdálenost", "Někdy fronty", "Omezený sortiment"],
      popularity: 85,
      color: "#ec4899",
      strengths_rating: {
        assortment: 65,
        price: 90,
        location: 50,
        freshness: 75,
        speed: 50,
        service: 60,
        convenience: 55,
      },
    },
  ])

  // Data pro žabku (naše silné stránky)
  const [zabkaRatings] = useState({
    assortment: 70,
    price: 75,
    location: 90,
    freshness: 85,
    speed: 90,
    service: 85,
    convenience: 95,
    color: "#4f46e5",
  })

  // Data pro radarový graf
  const getRadarData = () => {
    return [
      {
        subject: "Sortiment",
        Žabka: zabkaRatings.assortment,
        Albert: competitors[0].strengths_rating.assortment,
        Večerka: competitors[1].strengths_rating.assortment,
      },
      {
        subject: "Ceny",
        Žabka: zabkaRatings.price,
        Albert: competitors[0].strengths_rating.price,
        Večerka: competitors[1].strengths_rating.price,
      },
      {
        subject: "Lokalita",
        Žabka: zabkaRatings.location,
        Albert: competitors[0].strengths_rating.location,
        Večerka: competitors[1].strengths_rating.location,
      },
      {
        subject: "Čerstvost",
        Žabka: zabkaRatings.freshness,
        Albert: competitors[0].strengths_rating.freshness,
        Večerka: competitors[1].strengths_rating.freshness,
      },
      {
        subject: "Rychlost",
        Žabka: zabkaRatings.speed,
        Albert: competitors[0].strengths_rating.speed,
        Večerka: competitors[1].strengths_rating.speed,
      },
      {
        subject: "Služby",
        Žabka: zabkaRatings.service,
        Albert: competitors[0].strengths_rating.service,
        Večerka: competitors[1].strengths_rating.service,
      },
      {
        subject: "Pohodlí",
        Žabka: zabkaRatings.convenience,
        Albert: competitors[0].strengths_rating.convenience,
        Večerka: competitors[1].strengths_rating.convenience,
      },
    ]
  }

  // Data pro graf cen
  const priceComparisonData = [
    { name: "Žabka", value: 75, color: zabkaRatings.color },
    {
      name: "Albert",
      value: competitors[0].strengths_rating.price,
      color: competitors[0].color,
    },
    {
      name: "Večerka",
      value: competitors[1].strengths_rating.price,
      color: competitors[1].color,
    },
    {
      name: "BILLA",
      value: competitors[2].strengths_rating.price,
      color: competitors[2].color,
    },
    {
      name: "Tesco",
      value: competitors[3].strengths_rating.price,
      color: competitors[3].color,
    },
    {
      name: "LIDL",
      value: competitors[4].strengths_rating.price,
      color: competitors[4].color,
    },
  ]

  // Data pro bar chart popularity
  const popularityData = [
    { name: "Žabka (odhad)", popularity: 75, color: zabkaRatings.color },
    ...competitors.map((comp) => ({
      name: comp.name,
      popularity: comp.popularity,
      color: comp.color,
    })),
  ]

  // Data pro pie chart
  const marketShareData = [
    { name: "Žabka (odhad)", value: 20, color: zabkaRatings.color },
    { name: "Albert", value: 25, color: competitors[0].color },
    { name: "Večerka", value: 10, color: competitors[1].color },
    { name: "BILLA", value: 15, color: competitors[2].color },
    { name: "Tesco", value: 12, color: competitors[3].color },
    { name: "LIDL", value: 18, color: competitors[4].color },
  ]

  // Výhody a nevýhody
  const advantagesDisadvantages = [
    {
      category: "Sortiment",
      icon: <ShoppingCart className="h-5 w-5 text-violet-600" />,
      advantages: [
        "Specializace na convenience produkty",
        "Kvalitní pekárna",
        "Čerstvě připravované občerstvení",
        "Káva s sebou",
      ],
      disadvantages: [
        "Omezená šíře sortimentu oproti supermarketům",
        "Méně privátních značek",
      ],
    },
    {
      category: "Ceny",
      icon: <TrendingUp className="h-5 w-5 text-violet-600" />,
      advantages: [
        "Konkurenceschopné ceny v kategorii convenience",
        "Akční nabídky",
        "Věrnostní program",
      ],
      disadvantages: [
        "Vyšší ceny než v diskontech a supermarketech",
        "Premium cena za convenience služby",
      ],
    },
    {
      category: "Lokalita a dostupnost",
      icon: <Map className="h-5 w-5 text-violet-600" />,
      advantages: [
        "Strategická lokalita s vysokou frekvencí",
        "Dlouhá otevírací doba (6:00-23:00)",
        "Dostupnost 7 dní v týdnu",
      ],
      disadvantages: ["Limitovaná parkovací místa", "Menší prodejní plocha"],
    },
    {
      category: "Zákaznický servis",
      icon: <Users className="h-5 w-5 text-violet-600" />,
      advantages: [
        "Rychlé odbavení",
        "Přátelský personál",
        "Osobní přístup k zákazníkům",
      ],
      disadvantages: [
        "Méně personálu v porovnání se supermarkety",
        "Omezená možnost reklamací na místě",
      ],
    },
  ]

  // Klíčové metriky pro benchmark tabulku
  const benchmarkMetrics = [
    {
      metric: "Otevírací doba",
      icon: <Clock className="h-4 w-4 text-violet-600" />,
      zabka: "6:00-23:00 (17h)",
      competitors: {
        albert: "6:00-22:00 (16h)",
        vecerka: "6:00-23:00 (17h)",
        billa: "7:00-21:00 (14h)",
        tesco: "6:00-22:00 (16h)",
        lidl: "7:00-21:00 (14h)",
      },
      advantage: "Jedna z nejdelších otevíracích dob",
    },
    {
      metric: "Průměrná cena nákupu",
      icon: <TrendingUp className="h-4 w-4 text-violet-600" />,
      zabka: "150-200 Kč",
      competitors: {
        albert: "350-400 Kč",
        vecerka: "100-150 Kč",
        billa: "300-350 Kč",
        tesco: "200-250 Kč",
        lidl: "400-450 Kč",
      },
      advantage: "Ideální pro menší a rychlé nákupy",
    },
    {
      metric: "Počet produktů",
      icon: <ShoppingCart className="h-4 w-4 text-violet-600" />,
      zabka: "~2 500",
      competitors: {
        albert: "~10 000",
        vecerka: "~1 000",
        billa: "~8 000",
        tesco: "~5 000",
        lidl: "~2 000",
      },
      advantage: "Optimální mix pro convenience nákupy",
    },
    {
      metric: "Rychlost obsluhy",
      icon: <Zap className="h-4 w-4 text-violet-600" />,
      zabka: "< 2 min",
      competitors: {
        albert: "5-10 min",
        vecerka: "1-2 min",
        billa: "3-8 min",
        tesco: "3-5 min",
        lidl: "5-15 min",
      },
      advantage: "Jedna z nejrychlejších možností nákupu",
    },
    {
      metric: "Čerstvé občerstvení",
      icon: <Coffee className="h-4 w-4 text-violet-600" />,
      zabka: "Široká nabídka",
      competitors: {
        albert: "Omezená nabídka",
        vecerka: "Minimální",
        billa: "Střední nabídka",
        tesco: "Omezená nabídka",
        lidl: "Velmi omezená",
      },
      advantage: "Specialista na čerstvé občerstvení",
    },
  ]

  // Konkurenční strategie
  const competitiveStrategies = [
    {
      title: "Diferenciace sortimentu",
      icon: <Coffee className="h-5 w-5 text-violet-600" />,
      description:
        "Zaměření na výběrové produkty a lokální speciality. Rozšíření nabídky čerstvého občerstvení a kávy.",
      impact: "high",
      timeframe: "short",
      actions: [
        "Rozšířit nabídku čerstvých sendvičů a salátů",
        "Vytvořit sekci s lokálními specialitami",
        "Zavést premium kávu a kvalitní pekárenské výrobky",
      ],
    },
    {
      title: "Zákaznický servis",
      icon: <Users className="h-5 w-5 text-violet-600" />,
      description:
        "Školení personálu v oblasti zákaznického servisu. Důraz na rychlost a osobní přístup.",
      impact: "high",
      timeframe: "medium",
      actions: [
        "Pravidelná školení personálu",
        "Zavedení standardu obsluhy 'Žabka'",
        "Měření spokojenosti zákazníků",
      ],
    },
    {
      title: "Věrnostní program",
      icon: <Award className="h-5 w-5 text-violet-600" />,
      description:
        "Vytvoření atraktivního věrnostního programu pro pravidelné zákazníky s personalizovanými nabídkami.",
      impact: "medium",
      timeframe: "medium",
      actions: [
        "Implementace mobilní aplikace s věrnostním programem",
        "Sběr dat o nákupních preferencích",
        "Personalizace nabídek podle historie nákupů",
      ],
    },
    {
      title: "Marketingové akce",
      icon: <Target className="h-5 w-5 text-violet-600" />,
      description:
        "Lokálně zaměřené marketingové aktivity pro zvýšení povědomí o značce a nabídce.",
      impact: "medium",
      timeframe: "short",
      actions: [
        "Lokální letáky a inzerce",
        "Ochutnávkové akce v obchodě",
        "Sociální média s místním zaměřením",
      ],
    },
    {
      title: "Rozšíření služeb",
      icon: <ShieldCheck className="h-5 w-5 text-violet-600" />,
      description:
        "Zavedení doplňkových služeb, které konkurence nenabízí (výdejní místo, dobíjení kreditu, apod.).",
      impact: "high",
      timeframe: "long",
      actions: [
        "Zavedení výdejního místa pro e-shopy",
        "Rozšíření platebních služeb",
        "Zavedení donášky do okolí",
      ],
    },
  ]

  // Pomocné funkce pro vzhled
  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "high":
        return <Badge className="bg-green-100 text-green-800">Vysoký</Badge>
      case "medium":
        return <Badge className="bg-blue-100 text-blue-800">Střední</Badge>
      case "low":
        return <Badge className="bg-gray-100 text-gray-800">Nízký</Badge>
      default:
        return <Badge>{impact}</Badge>
    }
  }

  const getTimeframeBadge = (timeframe: string) => {
    switch (timeframe) {
      case "short":
        return (
          <Badge className="bg-green-100 text-green-800">
            Krátkodobé (0-3 měsíce)
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Střednědobé (3-6 měsíců)
          </Badge>
        )
      case "long":
        return (
          <Badge className="bg-red-100 text-red-800">
            Dlouhodobé (6+ měsíců)
          </Badge>
        )
      default:
        return <Badge>{timeframe}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg p-6 mb-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Analýza konkurence Žabka
        </h1>
        <p className="text-violet-100 max-w-3xl">
          Komplexní analýza konkurenčního prostředí pro plánovanou prodejnu
          Žabka, včetně srovnání s hlavními konkurenty, identifikace výhod a
          nevýhod a návrhu konkurenční strategie.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex flex-wrap w-full bg-white p-1 rounded-lg shadow-md">
          <TabsTrigger
            value="overview"
            className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            Přehled konkurence
          </TabsTrigger>
          <TabsTrigger
            value="comparison"
            className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            Srovnání
          </TabsTrigger>
          <TabsTrigger
            value="advantages"
            className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            Výhody a nevýhody
          </TabsTrigger>
          <TabsTrigger
            value="strategy"
            className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            Konkurenční
            strategie
          </TabsTrigger>
          <TabsTrigger
            value="map"
            className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
          >
            Mapa konkurence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-violet-800">
                  <Users className="mr-2 h-5 w-5" /> Počet konkurentů
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-3xl font-bold text-violet-700">
                    {competitors.length}
                  </div>
                  <div className="text-sm text-violet-600">v okruhu 1.5 km</div>
                </div>
                <p className="text-xs text-violet-600 mt-2">
                  Mix supermarketů, diskontů a malých večerek
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-violet-800">
                  <Map className="mr-2 h-5 w-5" /> Nejbližší konkurent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-violet-700">
                    {
                      competitors.sort((a, b) => a.distance - b.distance)[0]
                        .name
                    }
                  </div>
                  <div className="text-sm text-violet-600">
                    {
                      competitors.sort((a, b) => a.distance - b.distance)[0]
                        .distance
                    }{" "}
                    km
                  </div>
                </div>
                <p className="text-xs text-violet-600 mt-2">
                  Typ:{" "}
                  {competitors.sort((a, b) => a.distance - b.distance)[0].type}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center text-violet-800">
                  <Award className="mr-2 h-5 w-5" /> Hlavní konkurenční výhoda
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold text-violet-700">
                  Convenience koncept
                </div>
                <p className="text-xs text-violet-600 mt-2">
                  Rychlost nákupu, strategická lokalita, dlouhá otevírací doba
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Přehled konkurence v okolí</CardTitle>
              <CardDescription className="text-violet-100">
                Analýza hlavních konkurentů v okolí plánované prodejny Žabka
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>
                    Seznam hlavních konkurentů v okolí
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="bg-violet-50">
                      <TableHead className="font-semibold">Název</TableHead>
                      <TableHead className="font-semibold">Typ</TableHead>
                      <TableHead className="font-semibold">
                        Vzdálenost
                      </TableHead>
                      <TableHead className="font-semibold">
                        Velikost (m²)
                      </TableHead>
                      <TableHead className="font-semibold">
                        Otevírací doba
                      </TableHead>
                      <TableHead className="font-semibold">Hodnocení</TableHead>
                      <TableHead className="font-semibold">
                        Cenová úroveň
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {competitors.map((competitor) => (
                      <TableRow
                        key={competitor.id}
                        className="hover:bg-violet-50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {competitor.name}
                        </TableCell>
                        <TableCell>{competitor.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Map className="h-3 w-3 mr-1 text-violet-600" />
                            {competitor.distance} km
                          </div>
                        </TableCell>
                        <TableCell>{competitor.size} m²</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-violet-600" />
                            {competitor.openingHours}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                              <div
                                className="h-2 bg-violet-600 rounded-full"
                                style={{
                                  width: `${(competitor.rating / 5) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span>{competitor.rating}/5</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              competitor.priceLevel === "low"
                                ? "bg-green-100 text-green-800"
                                : competitor.priceLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {competitor.priceLevel === "low"
                              ? "Nízká"
                              : competitor.priceLevel === "medium"
                              ? "Střední"
                              : "Vysoká"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <BarChart className="mr-2 size-4 text-violet-600" />
                      Popularita konkurentů
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={popularityData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                          />
                          <YAxis
                            tick={{ fontSize: 12 }}
                            domain={[0, 100]}
                            axisLine={{ stroke: "#e5e7eb" }}
                            tickLine={false}
                            label={{
                              value: "Popularita (%)",
                              angle: -90,
                              position: "insideLeft",
                              style: {
                                textAnchor: "middle",
                                fill: "#6b7280",
                                fontSize: 12,
                              },
                            }}
                          />
                          <Tooltip
                            formatter={(value) => [`${value}%`, "Popularita"]}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              backgroundColor: "white",
                            }}
                            cursor={{ fill: "rgba(236, 236, 254, 0.2)" }}
                          />
                          <Legend
                            verticalAlign="top"
                            height={36}
                            iconType="circle"
                            iconSize={8}
                          />
                          <Bar dataKey="popularity" name="Popularita">
                            {popularityData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                          {/* Add value labels on top of each bar */}
                          <ReferenceLine y={0} stroke="#e5e7eb" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-xs text-center text-gray-500">
                      Popularita měřena na základě průzkumu mezi 200 zákazníky v
                      dané lokalitě
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none overflow-hidden">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <PieChart className="mr-2 size-4 text-violet-600" />
                      Odhadovaný tržní podíl
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={marketShareData}
                            cx="50%"
                            cy="45%"
                            labelLine={true}
                            outerRadius={90}
                            innerRadius={0}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, value }) => `${name}: ${value}%`}
                            paddingAngle={2}
                          >
                            {marketShareData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                                stroke="#fff"
                                strokeWidth={1}
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            formatter={(value) => `${value}%`}
                            contentStyle={{
                              borderRadius: "8px",
                              border: "none",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              backgroundColor: "white",
                            }}
                          />
                          <Legend
                            layout="horizontal"
                            verticalAlign="bottom"
                            align="center"
                            iconType="circle"
                            iconSize={8}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-xs text-center text-gray-500">
                      Odhad tržního podílu na základě analýzy lokálního trhu a
                      dat z podobných lokalit
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {competitors.slice(0, 3).map((competitor) => (
                  <Card
                    key={competitor.id}
                    className="shadow-md hover:shadow-lg transition-shadow border-none overflow-hidden"
                  >
                    <CardHeader className="pb-2 bg-gradient-to-r from-violet-50 to-indigo-50">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">
                          {competitor.name}
                        </CardTitle>
                        <Badge
                          className={
                            competitor.distance <= 0.5
                              ? "bg-red-100 text-red-800"
                              : competitor.distance <= 1
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }
                        >
                          {competitor.distance} km
                        </Badge>
                      </div>
                      <CardDescription>Typ: {competitor.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center text-green-600">
                          <Award className="h-4 w-4 mr-1" />
                          Silné stránky:
                        </h4>
                        <ul className="text-sm space-y-2">
                          {competitor.strengths.map((strength, idx) => (
                            <li
                              key={idx}
                              className="flex items-center bg-green-50 p-2 rounded-md"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center text-red-600">
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          Slabé stránky:
                        </h4>
                        <ul className="text-sm space-y-2">
                          {competitor.weaknesses.map((weakness, idx) => (
                            <li
                              key={idx}
                              className="flex items-center bg-red-50 p-2 rounded-md"
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                              {weakness}
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
              <div className="w-full">
                <p className="text-sm text-violet-700 mb-4">
                  V okolí plánované prodejny Žabka se nachází{" "}
                  {competitors.length} hlavních konkurentů. Najdeme zde mix
                  supermarketů a malých večerek, přičemž nejbližším konkurentem
                  je{" "}
                  <span className="font-semibold">
                    {
                      competitors.sort((a, b) => a.distance - b.distance)[0]
                        .name
                    }
                  </span>{" "}
                  ve vzdálenosti{" "}
                  <span className="font-semibold">
                    {
                      competitors.sort((a, b) => a.distance - b.distance)[0]
                        .distance
                    }{" "}
                    km
                  </span>
                  .
                </p>
                
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Srovnání s konkurencí</CardTitle>
              <CardDescription className="text-violet-100">
                Detailní srovnání klíčových metrik Žabky s hlavními konkurenty
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="bg-violet-50 p-4 rounded-lg shadow-inner mb-6">
                <h3 className="text-lg font-semibold text-violet-800 mb-3 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Srovnání klíčových metrik
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={getRadarData()}
                    >
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: "#4f46e5", fontSize: 12 }}
                      />
                      <PolarRadiusAxis
                        angle={30}
                        domain={[0, 100]}
                        tick={{ fill: "#4f46e5" }}
                      />
                      <Radar
                        name="Žabka"
                        dataKey="Žabka"
                        stroke="#4f46e5"
                        fill="#4f46e5"
                        fillOpacity={0.5}
                      />
                      <Radar
                        name="Albert"
                        dataKey="Albert"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Radar
                        name="Večerka"
                        dataKey="Večerka"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                      <Legend iconType="circle" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          border: "none",
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <Card className="shadow-md border-none">
                <CardHeader className="bg-violet-50">
                  <CardTitle className="text-base flex items-center">
                    <LineChart className="mr-2 h-4 w-4 text-violet-600" />
                    Benchmark tabulka
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-violet-100">
                          <TableHead className="font-semibold">
                            Metrika
                          </TableHead>
                          <TableHead className="text-center bg-violet-200 font-semibold">
                            Žabka
                          </TableHead>
                          <TableHead className="text-center font-semibold">
                            Albert
                          </TableHead>
                          <TableHead className="text-center font-semibold">
                            Večerka
                          </TableHead>
                          <TableHead className="text-center font-semibold">
                            BILLA
                          </TableHead>
                          <TableHead className="text-center font-semibold">
                            Tesco
                          </TableHead>
                          <TableHead className="text-center font-semibold">
                            LIDL
                          </TableHead>
                          <TableHead className="font-semibold">
                            Konkurenční výhoda
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {benchmarkMetrics.map((metric, index) => (
                          <TableRow
                            key={index}
                            className="hover:bg-violet-50 transition-colors"
                          >
                            <TableCell className="font-medium flex items-center">
                              {metric.icon}
                              <span className="ml-2">{metric.metric}</span>
                            </TableCell>
                            <TableCell className="text-center bg-violet-50 font-medium text-violet-800">
                              {metric.zabka}
                            </TableCell>
                            <TableCell className="text-center">
                              {metric.competitors.albert}
                            </TableCell>
                            <TableCell className="text-center">
                              {metric.competitors.vecerka}
                            </TableCell>
                            <TableCell className="text-center">
                              {metric.competitors.billa}
                            </TableCell>
                            <TableCell className="text-center">
                              {metric.competitors.tesco}
                            </TableCell>
                            <TableCell className="text-center">
                              {metric.competitors.lidl}
                            </TableCell>
                            <TableCell className="text-sm">
                              <Badge className="bg-violet-100 text-violet-800">
                                {metric.advantage}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <ShoppingCart className="mr-2 h-4 w-4 text-violet-600" />
                      Rozmanitost sortimentu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium flex items-center">
                            <div className="w-3 h-3 rounded-full bg-violet-600 mr-2"></div>
                            Žabka
                          </span>
                          <span className="font-semibold text-violet-800">
                            {zabkaRatings.assortment}%
                          </span>
                        </div>
                        <Progress
                          value={zabkaRatings.assortment}
                          className="h-2 bg-violet-100"
                          style={
                            {
                              "--progress-foreground": "var(--violet-600)",
                            } as React.CSSProperties
                          }
                        />
                      </div>
                      {competitors.slice(0, 3).map((competitor) => (
                        <div key={competitor.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: competitor.color }}
                              ></div>
                              {competitor.name}
                            </span>
                            <span>
                              {competitor.strengths_rating.assortment}%
                            </span>
                          </div>
                          <Progress
                            value={competitor.strengths_rating.assortment}
                            className="h-2 bg-gray-100"
                            style={
                              {
                                "--tw-progress-bar-color": competitor.color,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4 bg-violet-50 p-2 rounded-md">
                      <p>
                        Žabka nabízí optimalizovaný sortiment pro convenience
                        nakupování zaměřený na čerstvé potraviny a rychlé
                        občerstvení.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <Zap className="mr-2 h-4 w-4 text-violet-600" />
                      Rychlost nákupu
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium flex items-center">
                            <div className="w-3 h-3 rounded-full bg-violet-600 mr-2"></div>
                            Žabka
                          </span>
                          <span className="font-semibold text-violet-800">
                            {zabkaRatings.speed}%
                          </span>
                        </div>
                        <Progress
                          value={zabkaRatings.speed}
                          className="h-2 bg-violet-100"
                          style={
                            {
                              "--progress-foreground": "var(--violet-600)",
                            } as React.CSSProperties
                          }
                        />
                      </div>
                      {competitors.slice(0, 3).map((competitor) => (
                        <div key={competitor.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: competitor.color }}
                              ></div>
                              {competitor.name}
                            </span>
                            <span>{competitor.strengths_rating.speed}%</span>
                          </div>
                          <Progress
                            value={competitor.strengths_rating.speed}
                            className="h-2 bg-gray-100"
                            style={
                              {
                                "--tw-progress-bar-color": competitor.color,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4 bg-violet-50 p-2 rounded-md">
                      <p>
                        Žabka nabízí jeden z nejrychlejších způsobů nákupu s
                        prům��rnou dobou obsluhy pod 2 minuty.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <Map className="mr-2 h-4 w-4 text-violet-600" />
                      Dostupnost lokality
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium flex items-center">
                            <div className="w-3 h-3 rounded-full bg-violet-600 mr-2"></div>
                            Žabka
                          </span>
                          <span className="font-semibold text-violet-800">
                            {zabkaRatings.location}%
                          </span>
                        </div>
                        <Progress
                          value={zabkaRatings.location}
                          className="h-2 bg-violet-100"
                          style={
                            {
                              "--progress-foreground": "var(--violet-600)",
                            } as React.CSSProperties
                          }
                        />
                      </div>
                      {competitors.slice(0, 3).map((competitor) => (
                        <div key={competitor.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: competitor.color }}
                              ></div>
                              {competitor.name}
                            </span>
                            <span>{competitor.strengths_rating.location}%</span>
                          </div>
                          <Progress
                            value={competitor.strengths_rating.location}
                            className="h-2 bg-gray-100"
                            style={
                              {
                                "--tw-progress-bar-color": competitor.color,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4 bg-violet-50 p-2 rounded-md">
                      <p>
                        Strategická lokalita s vysokou frekvencí pěších
                        zákazníků je jednou z hlavních konkurenčních výhod
                        Žabky.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="shadow-md border-none overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                  <CardTitle>Hlavní konkurenční výhody Žabky</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start bg-violet-50 p-4 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                          <Clock className="h-6 w-6 text-violet-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-violet-800">
                            Dlouhá otevírací doba
                          </h3>
                          <p className="text-sm text-violet-600">
                            Otevřeno 17 hodin denně (6:00-23:00), 7 dní v týdnu
                            včetně svátků
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start bg-blue-50 p-4 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                          <Map className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-800">
                            Strategická lokalita
                          </h3>
                          <p className="text-sm text-blue-600">
                            Umístění v lokalitě s vysokou frekvencí pěších
                            zákazníků
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start bg-purple-50 p-4 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                          <ShoppingCart className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-purple-800">
                            Convenience koncept
                          </h3>
                          <p className="text-sm text-purple-600">
                            Optimalizovaný sortiment pro rychlý a pohodlný nákup
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start bg-amber-50 p-4 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                          <Users className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-amber-800">
                            Osobní přístup
                          </h3>
                          <p className="text-sm text-amber-600">
                            Přátelský personál a osobní přístup k zákazníkům
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start bg-red-50 p-4 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                          <Zap className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-red-800">
                            Rychlost nákupu
                          </h3>
                          <p className="text-sm text-red-600">
                            Průměrná doba obsluhy pod 2 minuty, ideální pro
                            zákazníky ve spěchu
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start bg-teal-50 p-4 rounded-lg transition-transform hover:scale-105">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mr-4 flex-shrink-0 shadow-md">
                          <Coffee className="h-6 w-6 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-teal-800">
                            Čerstvé občerstvení
                          </h3>
                          <p className="text-sm text-teal-600">
                            Široká nabídka čerstvě připravovaného občerstvení a
                            kávy
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <p className="text-sm text-violet-700 mb-4">
                  Žabka se od konkurence odlišuje především svým convenience
                  konceptem, který kombinuje strategickou lokalitu, dlouhou
                  otevírací dobu a optimalizovaný sortiment pro rychlý nákup.
                  Tyto faktory společně vytvářejí jedinečnou hodnotu pro
                  zákazníky, kteří hledají pohodlný a rychlý způsob nakupování.
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  Stáhnout detailní srovnání
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advantages" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Výhody a nevýhody oproti konkurenci</CardTitle>
              <CardDescription className="text-violet-100">
                Analýza silných a slabých stránek Žabky ve srovnání s konkurencí
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {advantagesDisadvantages.map((item, index) => (
                <Card
                  key={index}
                  className="shadow-md border-none overflow-hidden"
                >
                  <CardHeader className="pb-2 bg-gradient-to-r from-violet-50 to-indigo-50">
                    <CardTitle className="text-base flex items-center text-violet-800">
                      {item.icon}
                      <span className="ml-2">{item.category}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-green-600 mb-3 flex items-center">
                          <Award className="h-4 w-4 mr-2" />
                          Výhody
                        </h3>
                        <ul className="space-y-3 text-sm">
                          {item.advantages.map((advantage, idx) => (
                            <li
                              key={idx}
                              className="flex items-start bg-white p-3 rounded-md shadow-sm"
                            >
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-green-600"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span className="text-green-800">
                                {advantage}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-red-50 p-4 rounded-lg">
                        <h3 className="text-sm font-medium text-red-600 mb-3 flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Nevýhody
                        </h3>
                        <ul className="space-y-3 text-sm">
                          {item.disadvantages.map((disadvantage, idx) => (
                            <li
                              key={idx}
                              className="flex items-start bg-white p-3 rounded-md shadow-sm"
                            >
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 mr-3 flex-shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 text-red-600"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                              <span className="text-red-800">
                                {disadvantage}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="shadow-md border-none overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                  <CardTitle>Celkové hodnocení konkurenční pozice</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="bg-violet-50 rounded-lg p-5 shadow-inner">
                      <p className="text-sm mb-4 text-violet-800">
                        Žabka má silnou konkurenční pozici v segmentu
                        convenience prodejen díky kombinaci strategické
                        lokality, dlouhé otevírací doby a optimalizovaného
                        sortimentu. Hlavní výhodou oproti supermarketům je
                        rychlost a pohodlnost nákupu, zatímco oproti večerkám
                        nabízí vyšší kvalitu, lepší zákaznický servis a širší
                        sortiment čerstvého zboží.
                      </p>
                      <p className="text-sm text-violet-800">
                        Nevýhody v podobě vyšších cen a omezenějšího sortimentu
                        oproti supermarketům jsou kompenzovány přidanou hodnotou
                        v podobě úspory času a pohodlí. Pro maximalizaci
                        konkurenční výhody je důležité zaměřit se na oblasti,
                        kde Žabka vyniká - čerstvé občerstvení, káva, pekárenské
                        výrobky a rychlý zákaznický servis.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col items-center p-6 bg-gradient-to-b from-green-50 to-green-100 rounded-lg shadow-md transition-transform hover:scale-105">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                          <div className="text-green-600 font-bold text-2xl">
                            75%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium mb-2 text-green-800">
                            Celková konkurenční síla
                          </div>
                          <div className="text-xs text-green-700 bg-white p-2 rounded-md">
                            Žabka má silnou pozici v segmentu convenience
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg shadow-md transition-transform hover:scale-105">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                          <div className="text-blue-600 font-bold text-2xl">
                            85%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium mb-2 text-blue-800">
                            Diferenciace
                          </div>
                          <div className="text-xs text-blue-700 bg-white p-2 rounded-md">
                            Jasné odlišení od konkurence
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center p-6 bg-gradient-to-b from-amber-50 to-amber-100 rounded-lg shadow-md transition-transform hover:scale-105">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-md">
                          <div className="text-amber-600 font-bold text-2xl">
                            70%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium mb-2 text-amber-800">
                            Cenová konkurenceschopnost
                          </div>
                          <div className="text-xs text-amber-700 bg-white p-2 rounded-md">
                            Dobrá hodnota za peníze v segmentu
                          </div>
                        </div>
                      </div>
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
                <PieChart className="mr-2 h-4 w-4" />
                Stáhnout SWOT analýzu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Konkurenční strategie</CardTitle>
              <CardDescription className="text-violet-100">
                Strategie pro získání a udržení konkurenční výhody
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {competitiveStrategies.slice(0, 4).map((strategy, index) => (
                  <Card
                    key={index}
                    className="shadow-md border-none overflow-hidden transition-all hover:shadow-lg"
                  >
                    <CardHeader className="pb-2 bg-gradient-to-r from-violet-50 to-indigo-50">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base flex items-center text-violet-800">
                          {strategy.icon}
                          <span className="ml-2">{strategy.title}</span>
                        </CardTitle>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center">
                            <span className="text-xs mr-1">Dopad:</span>
                            {getImpactBadge(strategy.impact)}
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs mr-1">Časový rámec:</span>
                            {getTimeframeBadge(strategy.timeframe)}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm mb-3 text-violet-800">
                        {strategy.description}
                      </p>
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center text-violet-800">
                          <Target className="h-4 w-4 mr-1" />
                          Klíčové akce:
                        </h4>
                        <ul className="text-sm space-y-2">
                          {strategy.actions.map((action, idx) => (
                            <li
                              key={idx}
                              className="flex items-start bg-violet-50 p-2 rounded-md"
                            >
                              <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                              </div>
                              <span className="text-violet-800">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="shadow-md border-none overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-violet-50 to-indigo-50">
                  <CardTitle className="text-base flex items-center text-violet-800">
                    {competitiveStrategies[4].icon}
                    <span className="ml-2">
                      {competitiveStrategies[4].title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm mb-3 text-violet-800">
                        {competitiveStrategies[4].description}
                      </p>
                      <div>
                        <h4 className="text-sm font-medium mb-2 flex items-center text-violet-800">
                          <Target className="h-4 w-4 mr-1" />
                          Klíčové akce:
                        </h4>
                        <ul className="text-sm space-y-2">
                          {competitiveStrategies[4].actions.map(
                            (action, idx) => (
                              <li
                                key={idx}
                                className="flex items-start bg-violet-50 p-2 rounded-md"
                              >
                                <div className="w-5 h-5 bg-violet-100 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                  <div className="w-2 h-2 bg-violet-600 rounded-full"></div>
                                </div>
                                <span className="text-violet-800">
                                  {action}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center mb-3 bg-white p-3 rounded-lg shadow-sm">
                        <span className="text-sm mr-2 text-violet-800">
                          Dopad:
                        </span>
                        {getImpactBadge(competitiveStrategies[4].impact)}
                      </div>
                      <div className="flex items-center mb-3 bg-white p-3 rounded-lg shadow-sm">
                        <span className="text-sm mr-2 text-violet-800">
                          Časový rámec:
                        </span>
                        {getTimeframeBadge(competitiveStrategies[4].timeframe)}
                      </div>
                      <div className="bg-violet-50 p-4 rounded-md text-sm text-violet-800">
                        <p>
                          Rozšíření služeb představuje významnou příležitost pro
                          diferenciaci od konkurence a vytvoření dodatečných
                          zdrojů příjmů. Implementace těchto služeb vyžaduje
                          delší časový horizont a koordinaci s franšízorem.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-none overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                  <CardTitle>Implementační plán</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-[24px] top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 rounded-full z-0"></div>
                      <div className="space-y-12">
                        <div className="flex relative">
                          <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                1
                              </span>
                            </div>
                          </div>
                          <div className="ml-6 flex-1">
                            <h3 className="text-lg font-semibold text-green-700 mb-2 flex items-center">
                              <Zap className="mr-2 h-5 w-5" />
                              Krátkodobé strategie (0-3 měsíce)
                            </h3>
                            <p className="text-sm text-green-600 mb-4 bg-green-50 p-3 rounded-lg">
                              Okamžité akce pro získání konkurenční výhody
                            </p>
                            <ul className="text-sm space-y-3">
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-green-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-green-800">
                                    Rozšíření nabídky čerstvých sendvičů a
                                    salátů
                                  </span>
                                  <p className="text-xs text-green-600 mt-1">
                                    Zavedení nových produktů s důrazem na
                                    kvalitu a čerstvost
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-green-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-green-800">
                                    Lokální marketingové aktivity pro zvýšení
                                    povědomí
                                  </span>
                                  <p className="text-xs text-green-600 mt-1">
                                    Cílená komunikace v okolí prodejny pro
                                    přilákání nových zákazníků
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-green-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-green-800">
                                    Zavedení premium kávy a kvalitních
                                    pekárenských výrobků
                                  </span>
                                  <p className="text-xs text-green-600 mt-1">
                                    Diferenciace nabídky oproti konkurenci s
                                    důrazem na kvalitu
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex relative">
                          <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                2
                              </span>
                            </div>
                          </div>
                          <div className="ml-6 flex-1">
                            <h3 className="text-lg font-semibold text-blue-700 mb-2 flex items-center">
                              <Target className="mr-2 h-5 w-5" />
                              Střednědobé strategie (3-6 měsíců)
                            </h3>
                            <p className="text-sm text-blue-600 mb-4 bg-blue-50 p-3 rounded-lg">
                              Budování dlouhodobé konkurenční výhody
                            </p>
                            <ul className="text-sm space-y-3">
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-800">
                                    Implementace věrnostního programu
                                  </span>
                                  <p className="text-xs text-blue-600 mt-1">
                                    Vytvoření systému pro odměňování loajálních
                                    zákazníků
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-800">
                                    Pravidelná školení personálu v oblasti
                                    zákaznického servisu
                                  </span>
                                  <p className="text-xs text-blue-600 mt-1">
                                    Zvyšování kvality obsluhy a zákaznické
                                    zkušenosti
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-blue-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-blue-800">
                                    Vytvoření sekce s lokálními specialitami
                                  </span>
                                  <p className="text-xs text-blue-600 mt-1">
                                    Podpora lokálních dodavatelů a rozšíření
                                    nabídky o unikátní produkty
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex relative">
                          <div className="relative z-10">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center shadow-lg">
                              <span className="text-white font-bold text-lg">
                                3
                              </span>
                            </div>
                          </div>
                          <div className="ml-6 flex-1">
                            <h3 className="text-lg font-semibold text-purple-700 mb-2 flex items-center">
                              <Award className="mr-2 h-5 w-5" />
                              Dlouhodobé strategie (6+ měsíců)
                            </h3>
                            <p className="text-sm text-purple-600 mb-4 bg-purple-50 p-3 rounded-lg">
                              Rozšíření služeb a inovace
                            </p>
                            <ul className="text-sm space-y-3">
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-purple-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-purple-800">
                                    Zavedení výdejního místa pro e-shopy
                                  </span>
                                  <p className="text-xs text-purple-600 mt-1">
                                    Rozšíření služeb o výdej zásilek z e-shopů
                                    pro zvýšení návštěvnosti
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-purple-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-purple-800">
                                    Rozšíření platebních služeb
                                  </span>
                                  <p className="text-xs text-purple-600 mt-1">
                                    Implementace nových platebních metod a
                                    doplňkových finančních služeb
                                  </p>
                                </div>
                              </li>
                              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 mr-3 flex-shrink-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-purple-600"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                                <div>
                                  <span className="font-medium text-purple-800">
                                    Zavedení donášky do okolí
                                  </span>
                                  <p className="text-xs text-purple-600 mt-1">
                                    Rozšíření služeb o doručování zboží do
                                    blízkého okolí prodejny
                                  </p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <p className="text-sm text-violet-700 mb-4">
                  Konkurenční strategie Žabky je založena na diferenciaci v
                  oblasti convenience nakupování, s důrazem na rychlost, pohodlí
                  a kvalitu. Implementace navržených strategií by měla probíhat
                  postupně, s pravidelným vyhodnocováním jejich efektivity a
                  případnými úpravami podle reakce zákazníků a konkurence.
                </p>
                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Stáhnout strategický plán
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card className="shadow-lg border-none overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
              <CardTitle>Mapa konkurence</CardTitle>
              <CardDescription className="text-violet-100">
                Vizualizace konkurenčního prostředí v okolí
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-gradient-to-b from-violet-50 to-indigo-50 rounded-lg p-6 h-96 flex items-center justify-center shadow-inner">
                <div className="text-center max-w-md">
                  <Map className="h-16 w-16 text-violet-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-violet-800 mb-2">
                    Interaktivní mapa konkurence
                  </h3>
                  <p className="text-sm text-violet-600 mb-4">
                    Mapa bude doplněna o interaktivní zobrazení konkurentů v
                    okolí s možností filtrování podle typu, vzdálenosti a
                    dalších parametrů.
                  </p>
                  <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                    <Map className="mr-2 h-4 w-4" />
                    Připravujeme
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <Map className="mr-2 h-4 w-4 text-violet-600" />
                      Hustota konkurence v okolí
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">0-0.5 km</span>
                          <span className="font-semibold text-red-600">
                            Vysoká
                          </span>
                        </div>
                        <Progress
                          value={80}
                          className="h-2 bg-red-100"
                          style={
                            {
                              "--progress-foreground": "var(--red-600)",
                            } as React.CSSProperties
                          }
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">0.5-1.0 km</span>
                          <span className="font-semibold text-amber-600">
                            Střední
                          </span>
                        </div>
                        <Progress
                          value={60}
                          className="h-2 bg-amber-100"
                          style={
                            {
                              "--progress-foreground": "var(--amber-600)",
                            } as React.CSSProperties
                          }
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">1.0-1.5 km</span>
                          <span className="font-semibold text-green-600">
                            Nízká
                          </span>
                        </div>
                        <Progress
                          value={30}
                          className="h-2 bg-green-100"
                          style={
                            {
                              "--progress-foreground": "var(--green-600)",
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-4 bg-violet-50 p-3 rounded-md">
                      <p>
                        Nejvyšší koncentrace konkurence je v bezprostředním
                        okolí plánované prodejny (do 0.5 km), což představuje
                        výzvu, ale zároveň potvrzuje atraktivitu lokality.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-md border-none">
                  <CardHeader className="pb-2 bg-violet-50">
                    <CardTitle className="text-base flex items-center">
                      <Target className="mr-2 h-4 w-4 text-violet-600" />
                      Doporučení pro lokaci
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start bg-green-50 p-3 rounded-md">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-green-800">
                          Umístění v blízkosti zastávek MHD a pěších zón pro
                          maximalizaci frekvence zákazníků
                        </span>
                      </li>
                      <li className="flex items-start bg-green-50 p-3 rounded-md">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-green-800">
                          Zajištění dobré viditelnosti z ulice a přehledného
                          vstupu do prodejny
                        </span>
                      </li>
                      <li className="flex items-start bg-green-50 p-3 rounded-md">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 mr-3 flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-green-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-green-800">
                          Diferenciace od konkurence prostřednictvím výrazného
                          brandingu a atraktivního designu prodejny
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <Button
                variant="outline"
                className="w-full bg-white hover:bg-violet-100 border-violet-200 text-violet-700"
              >
                <Map className="mr-2 h-4 w-4" />
                Zobrazit detailní mapu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
