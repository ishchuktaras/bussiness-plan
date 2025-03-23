"use client"

import { useMemo } from "react"
import { Users, BarChart, LineChart, PieChart, ShoppingCart, Map, Search, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"

// Definice konkurentů jako konstanty mimo komponentu
const COMPETITORS = [
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
]

// Data pro žabku jako konstanta
const ZABKA_RATINGS = {
  assortment: 70,
  price: 75,
  location: 90,
  freshness: 85,
  speed: 90,
  service: 85,
  convenience: 95,
}

// Výhody a nevýhody jako konstanta
const ADVANTAGES_DISADVANTAGES = [
  {
    category: "Sortiment",
    advantages: [
      "Specializace na convenience produkty",
      "Kvalitní pekárna",
      "Čerstvě připravované občerstvení",
      "Káva s sebou",
    ],
    disadvantages: ["Omezená šíře sortimentu oproti supermarketům", "Méně privátních značek"],
  },
  {
    category: "Ceny",
    advantages: ["Konkurenceschopné ceny v kategorii convenience", "Akční nabídky", "Věrnostní program"],
    disadvantages: ["Vyšší ceny než v diskontech a supermarketech", "Premium cena za convenience služby"],
  },
  {
    category: "Lokalita a dostupnost",
    advantages: [
      "Strategická lokalita s vysokou frekvencí",
      "Dlouhá otevírací doba (6:00-23:00)",
      "Dostupnost 7 dní v týdnu",
    ],
    disadvantages: ["Limitovaná parkovací místa", "Menší prodejní plocha"],
  },
  {
    category: "Zákaznický servis",
    advantages: ["Rychlé odbavení", "Přátelský personál", "Osobní přístup k zákazníkům"],
    disadvantages: ["Méně personálu v porovnání se supermarkety", "Omezená možnost reklamací na místě"],
  },
]

// Klíčové metriky pro benchmark tabulku jako konstanta
const BENCHMARK_METRICS = [
  {
    metric: "Otevírací doba",
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

// Konkurenční strategie jako konstanta
const COMPETITIVE_STRATEGIES = [
  {
    title: "Diferenciace sortimentu",
    description: "Zaměření na výběrové produkty a lokální speciality. Rozšíření nabídky čerstvého občerstvení a kávy.",
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
    description: "Školení personálu v oblasti zákaznického servisu. Důraz na rychlost a osobní přístup.",
    impact: "high",
    timeframe: "medium",
    actions: ["Pravidelná školení personálu", "Zavedení standardu obsluhy 'Žabka'", "Měření spokojenosti zákazníků"],
  },
  {
    title: "Věrnostní program",
    description: "Vytvoření atraktivního věrnostního programu pro pravidelné zákazníky s personalizovanými nabídkami.",
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
    description: "Lokálně zaměřené marketingové aktivity pro zvýšení povědomí o značce a nabídce.",
    impact: "medium",
    timeframe: "short",
    actions: ["Lokální letáky a inzerce", "Ochutnávkové akce v obchodě", "Sociální média s místním zaměřením"],
  },
  {
    title: "Rozšíření služeb",
    description: "Zavedení doplňkových služeb, které konkurence nenabízí (výdejní místo, dobíjení kreditu, apod.).",
    impact: "high",
    timeframe: "long",
    actions: ["Zavedení výdejního místa pro e-shopy", "Rozšíření platebních služeb", "Zavedení donášky do okolí"],
  },
]

export default function CompetitionAnalysis() {
  // Použití useMemo pro deterministické řazení a zpracování dat
  const sortedCompetitors = useMemo(() => {
    return [...COMPETITORS].sort((a, b) => a.id - b.id)
  }, [])

  // Data pro radarový graf
  const radarData = useMemo(() => {
    return [
      {
        subject: "Sortiment",
        Žabka: ZABKA_RATINGS.assortment,
        Albert: sortedCompetitors[0].strengths_rating.assortment,
        Večerka: sortedCompetitors[1].strengths_rating.assortment,
      },
      {
        subject: "Ceny",
        Žabka: ZABKA_RATINGS.price,
        Albert: sortedCompetitors[0].strengths_rating.price,
        Večerka: sortedCompetitors[1].strengths_rating.price,
      },
      {
        subject: "Lokalita",
        Žabka: ZABKA_RATINGS.location,
        Albert: sortedCompetitors[0].strengths_rating.location,
        Večerka: sortedCompetitors[1].strengths_rating.location,
      },
      {
        subject: "Čerstvost",
        Žabka: ZABKA_RATINGS.freshness,
        Albert: sortedCompetitors[0].strengths_rating.freshness,
        Večerka: sortedCompetitors[1].strengths_rating.freshness,
      },
      {
        subject: "Rychlost",
        Žabka: ZABKA_RATINGS.speed,
        Albert: sortedCompetitors[0].strengths_rating.speed,
        Večerka: sortedCompetitors[1].strengths_rating.speed,
      },
      {
        subject: "Služby",
        Žabka: ZABKA_RATINGS.service,
        Albert: sortedCompetitors[0].strengths_rating.service,
        Večerka: sortedCompetitors[1].strengths_rating.service,
      },
      {
        subject: "Pohodlí",
        Žabka: ZABKA_RATINGS.convenience,
        Albert: sortedCompetitors[0].strengths_rating.convenience,
        Večerka: sortedCompetitors[1].strengths_rating.convenience,
      },
    ]
  }, [sortedCompetitors])

  // Data pro graf cen
  const priceComparisonData = useMemo(() => {
    return [
      { name: "Žabka", value: ZABKA_RATINGS.price },
      { name: "Albert", value: sortedCompetitors[0].strengths_rating.price },
      { name: "Večerka", value: sortedCompetitors[1].strengths_rating.price },
      { name: "BILLA", value: sortedCompetitors[2].strengths_rating.price },
      { name: "Tesco", value: sortedCompetitors[3].strengths_rating.price },
      { name: "LIDL", value: sortedCompetitors[4].strengths_rating.price },
    ]
  }, [sortedCompetitors])

  // Data pro bar chart popularity
  const popularityData = useMemo(() => {
    return [
      { name: "Žabka (odhad)", popularity: 75 },
      ...sortedCompetitors.map((comp) => ({ name: comp.name, popularity: comp.popularity })),
    ]
  }, [sortedCompetitors])

  // Nejbližší konkurent - předpočítáno pro konzistentní výsledky
  const closestCompetitor = useMemo(() => {
    return [...sortedCompetitors].sort((a, b) => a.distance - b.distance)[0]
  }, [sortedCompetitors])

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
        return <Badge className="bg-green-100 text-green-800">Krátkodobé (0-3 měsíce)</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Střednědobé (3-6 měsíců)</Badge>
      case "long":
        return <Badge className="bg-red-100 text-red-800">Dlouhodobé (6+ měsíců)</Badge>
      default:
        return <Badge>{timeframe}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Analýza konkurence</h1>

      <Tabs defaultValue="overview">
        <TabsList className="flex flex-wrap w-full">
          <TabsTrigger value="overview" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <BarChart className="mr-1 sm:mr-2 h-4 w-4" /> Přehled konkurence
          </TabsTrigger>
          <TabsTrigger value="comparison" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <LineChart className="mr-1 sm:mr-2 h-4 w-4" /> Srovnání
          </TabsTrigger>
          <TabsTrigger value="advantages" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <PieChart className="mr-1 sm:mr-2 h-4 w-4" /> Výhody a nevýhody
          </TabsTrigger>
          <TabsTrigger value="strategy" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <ShoppingCart className="mr-1 sm:mr-2 h-4 w-4" /> Konkurenční strategie
          </TabsTrigger>
          <TabsTrigger value="map" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <Map className="mr-1 sm:mr-2 h-4 w-4" /> Mapa konkurence
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Přehled konkurence v okolí</CardTitle>
              <CardDescription>Analýza hlavních konkurentů v okolí plánované prodejny Žabka</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableCaption>Seznam hlavních konkurentů v okolí</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Název</TableHead>
                      <TableHead>Typ</TableHead>
                      <TableHead>Vzdálenost</TableHead>
                      <TableHead>Velikost (m²)</TableHead>
                      <TableHead>Otevírací doba</TableHead>
                      <TableHead>Hodnocení</TableHead>
                      <TableHead>Cenová úroveň</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedCompetitors.map((competitor) => (
                      <TableRow key={competitor.id}>
                        <TableCell className="font-medium">{competitor.name}</TableCell>
                        <TableCell>{competitor.type}</TableCell>
                        <TableCell>{competitor.distance} km</TableCell>
                        <TableCell>{competitor.size} m²</TableCell>
                        <TableCell>{competitor.openingHours}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                              <div
                                className="h-2 bg-blue-600 rounded-full"
                                style={{ width: `${(competitor.rating / 5) * 100}%` }}
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
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Popularita konkurentů</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={popularityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Legend />
                          <Bar dataKey="popularity" name="Popularita" fill="#3b82f6" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Srovnání cen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart
                          data={priceComparisonData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => `${value}/100`} />
                          <Legend />
                          <Bar dataKey="value" name="Příznivost cen" fill="#10b981" />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Vyšší hodnota znamená příznivější ceny pro zákazníky
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedCompetitors.slice(0, 3).map((competitor) => (
                  <Card key={competitor.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{competitor.name}</CardTitle>
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
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Silné stránky:</h4>
                        <ul className="text-sm space-y-1">
                          {competitor.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Slabé stránky:</h4>
                        <ul className="text-sm space-y-1">
                          {competitor.weaknesses.map((weakness, idx) => (
                            <li key={idx} className="flex items-center">
                              <div className="w-1 h-1 bg-red-500 rounded-full mr-2"></div>
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
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-4">
                  V okolí plánované prodejny Žabka se nachází {sortedCompetitors.length} hlavních konkurentů. Najdeme
                  zde mix supermarketů a malých večerek, přičemž nejbližším konkurentem je {closestCompetitor.name} ve
                  vzdálenosti {closestCompetitor.distance} km.
                </p>
                <Button variant="outline" className="w-full">
                  Exportovat analýzu konkurence
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Srovnání s konkurencí</CardTitle>
              <CardDescription>Detailní srovnání klíčových metrik Žabky s hlavními konkurenty</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Žabka" dataKey="Žabka" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.5} />
                    <Radar name="Albert" dataKey="Albert" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="Večerka" dataKey="Večerka" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Benchmark tabulka</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Metrika</TableHead>
                          <TableHead className="text-center bg-violet-50">Žabka</TableHead>
                          <TableHead className="text-center">Albert</TableHead>
                          <TableHead className="text-center">Večerka</TableHead>
                          <TableHead className="text-center">BILLA</TableHead>
                          <TableHead className="text-center">Tesco</TableHead>
                          <TableHead className="text-center">LIDL</TableHead>
                          <TableHead>Konkurenční výhoda</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {BENCHMARK_METRICS.map((metric, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{metric.metric}</TableCell>
                            <TableCell className="text-center bg-violet-50 font-medium">{metric.zabka}</TableCell>
                            <TableCell className="text-center">{metric.competitors.albert}</TableCell>
                            <TableCell className="text-center">{metric.competitors.vecerka}</TableCell>
                            <TableCell className="text-center">{metric.competitors.billa}</TableCell>
                            <TableCell className="text-center">{metric.competitors.tesco}</TableCell>
                            <TableCell className="text-center">{metric.competitors.lidl}</TableCell>
                            <TableCell className="text-sm">{metric.advantage}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Rozmanitost sortimentu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Žabka</span>
                          <span>{ZABKA_RATINGS.assortment}%</span>
                        </div>
                        <Progress value={ZABKA_RATINGS.assortment} className="h-2" />
                      </div>
                      {sortedCompetitors.slice(0, 3).map((competitor) => (
                        <div key={competitor.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{competitor.name}</span>
                            <span>{competitor.strengths_rating.assortment}%</span>
                          </div>
                          <Progress value={competitor.strengths_rating.assortment} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                      <p>
                        Žabka nabízí optimalizovaný sortiment pro convenience nakupování zaměřený na čerstvé potraviny a
                        rychlé občerstvení.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Rychlost nákupu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Žabka</span>
                          <span>{ZABKA_RATINGS.speed}%</span>
                        </div>
                        <Progress value={ZABKA_RATINGS.speed} className="h-2" />
                      </div>
                      {sortedCompetitors.slice(0, 3).map((competitor) => (
                        <div key={competitor.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{competitor.name}</span>
                            <span>{competitor.strengths_rating.speed}%</span>
                          </div>
                          <Progress value={competitor.strengths_rating.speed} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                      <p>Žabka nabízí jeden z nejrychlejších způsobů nákupu s průměrnou dobou obsluhy pod 2 minuty.</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dostupnost lokality</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">Žabka</span>
                          <span>{ZABKA_RATINGS.location}%</span>
                        </div>
                        <Progress value={ZABKA_RATINGS.location} className="h-2" />
                      </div>
                      {sortedCompetitors.slice(0, 3).map((competitor) => (
                        <div key={competitor.id}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{competitor.name}</span>
                            <span>{competitor.strengths_rating.location}%</span>
                          </div>
                          <Progress value={competitor.strengths_rating.location} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                      <p>
                        Strategická lokalita s vysokou frekvencí pěších zákazníků je jednou z hlavních konkurenčních
                        výhod Žabky.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Hlavní konkurenční výhody Žabky</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <Clock className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Dlouhá otevírací doba</h3>
                          <p className="text-sm text-muted-foreground">
                            Otevřeno 17 hodin denně (6:00-23:00), 7 dní v týdnu včetně svátků
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <Map className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Strategická lokalita</h3>
                          <p className="text-sm text-muted-foreground">
                            Umístění v lokalitě s vysokou frekvencí pěších zákazníků
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <ShoppingCart className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Convenience koncept</h3>
                          <p className="text-sm text-muted-foreground">
                            Optimalizovaný sortiment pro rychlý a pohodlný nákup
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <Users className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Osobní přístup</h3>
                          <p className="text-sm text-muted-foreground">
                            Přátelský personál a osobní přístup k zákazníkům
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <Search className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Rychlost nákupu</h3>
                          <p className="text-sm text-muted-foreground">
                            Průměrná doba obsluhy pod 2 minuty, ideální pro zákazníky ve spěchu
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <BarChart className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Čerstvé občerstvení</h3>
                          <p className="text-sm text-muted-foreground">
                            Široká nabídka čerstvě připravovaného občerstvení a kávy
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-4">
                  Žabka se od konkurence odlišuje především svým convenience konceptem, který kombinuje strategickou
                  lokalitu, dlouhou otevírací dobu a optimalizovaný sortiment pro rychlý nákup. Tyto faktory společně
                  vytvářejí jedinečnou hodnotu pro zákazníky, kteří hledají pohodlný a rychlý způsob nakupování.
                </p>
                <Button variant="outline" className="w-full">
                  Stáhnout detailní srovnání
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="advantages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Výhody a nevýhody oproti konkurenci</CardTitle>
              <CardDescription>Analýza silných a slabých stránek Žabky ve srovnání s konkurencí</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {ADVANTAGES_DISADVANTAGES.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{item.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-green-600 mb-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Výhody
                        </h3>
                        <ul className="space-y-2 text-sm">
                          {item.advantages.map((advantage, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 text-green-500 mt-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{advantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-red-600 mb-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Nevýhody
                        </h3>
                        <ul className="space-y-2 text-sm">
                          {item.disadvantages.map((disadvantage, idx) => (
                            <li key={idx} className="flex items-start">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2 text-red-500 mt-0.5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>{disadvantage}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader>
                  <CardTitle>Celkové hodnocení konkurenční pozice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted rounded-lg p-4">
                      <p className="text-sm mb-4">
                        Žabka má silnou konkurenční pozici v segmentu convenience prodejen díky kombinaci strategické
                        lokality, dlouhé otevírací doby a optimalizovaného sortimentu. Hlavní výhodou oproti
                        supermarketům je rychlost a pohodlnost nákupu, zatímco oproti večerkám nabízí vyšší kvalitu,
                        lepší zákaznický servis a širší sortiment čerstvého zboží.
                      </p>
                      <p className="text-sm">
                        Nevýhody v podobě vyšších cen a omezenějšího sortimentu oproti supermarketům jsou kompenzovány
                        přidanou hodnotou v podobě úspory času a pohodlí. Pro maximalizaci konkurenční výhody je
                        důležité zaměřit se na oblasti, kde Žabka vyniká - čerstvé občerstvení, káva, pekárenské výrobky
                        a rychlý zákaznický servis.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center p-4 bg-green-50 rounded-lg">
                        <div className="text-green-600 font-bold text-2xl mb-2">75%</div>
                        <div className="text-center">
                          <div className="font-medium mb-1">Celková konkurenční síla</div>
                          <div className="text-xs text-muted-foreground">
                            Žabka má silnou pozici v segmentu convenience
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-blue-600 font-bold text-2xl mb-2">85%</div>
                        <div className="text-center">
                          <div className="font-medium mb-1">Diferenciace</div>
                          <div className="text-xs text-muted-foreground">Jasné odlišení od konkurence</div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center p-4 bg-amber-50 rounded-lg">
                        <div className="text-amber-600 font-bold text-2xl mb-2">70%</div>
                        <div className="text-center">
                          <div className="font-medium mb-1">Cenová konkurenceschopnost</div>
                          <div className="text-xs text-muted-foreground">Dobrá hodnota za peníze v segmentu</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                Stáhnout SWOT analýzu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Konkurenční strategie</CardTitle>
              <CardDescription>Strategie pro získání a udržení konkurenční výhody</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COMPETITIVE_STRATEGIES.slice(0, 4).map((strategy, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-base">{strategy.title}</CardTitle>
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
                    <CardContent>
                      <p className="text-sm mb-3">{strategy.description}</p>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Klíčové akce:</h4>
                        <ul className="text-sm space-y-1">
                          {strategy.actions.map((action, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mr-2 mt-2"></div>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{COMPETITIVE_STRATEGIES[4].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm mb-3">{COMPETITIVE_STRATEGIES[4].description}</p>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Klíčové akce:</h4>
                        <ul className="text-sm space-y-1">
                          {COMPETITIVE_STRATEGIES[4].actions.map((action, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mr-2 mt-2"></div>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center mb-3">
                        <span className="text-sm mr-2">Dopad:</span>
                        {getImpactBadge(COMPETITIVE_STRATEGIES[4].impact)}
                      </div>
                      <div className="flex items-center mb-3">
                        <span className="text-sm mr-2">Časový rámec:</span>
                        {getTimeframeBadge(COMPETITIVE_STRATEGIES[4].timeframe)}
                      </div>
                      <div className="bg-muted p-3 rounded-md text-sm">
                        <p>
                          Rozšíření služeb představuje významnou příležitost pro diferenciaci od konkurence a vytvoření
                          dodatečných zdrojů příjmů. Implementace těchto služeb vyžaduje delší časový horizont a
                          koordinaci s franšízorem.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementační plán</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                      <div className="space-y-8">
                        <div className="flex relative">
                          <div className="relative z-10">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                              <span className="text-green-600 font-medium">1</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium">Krátkodobé strategie (0-3 měsíce)</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">
                              Okamžité akce pro získání konkurenční výhody
                            </p>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-green-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Rozšíření nabídky čerstvých sendvičů a salátů</span>
                              </li>
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-green-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Lokální marketingové aktivity pro zvýšení povědomí</span>
                              </li>
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-green-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Zavedení premium kávy a kvalitních pekárenských výrobků</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex relative">
                          <div className="relative z-10">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">2</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium">Střednědobé strategie (3-6 měsíců)</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">
                              Budování dlouhodobé konkurenční výhody
                            </p>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-blue-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Implementace věrnostního programu</span>
                              </li>
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-blue-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Pravidelná školení personálu v oblasti zákaznického servisu</span>
                              </li>
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-blue-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Vytvoření sekce s lokálními specialitami</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="flex relative">
                          <div className="relative z-10">
                            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                              <span className="text-purple-600 font-medium">3</span>
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-medium">Dlouhodobé strategie (6+ měsíců)</h3>
                            <p className="text-sm text-muted-foreground mt-1 mb-2">Rozšíření služeb a inovace</p>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-purple-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Zavedení výdejního místa pro e-shopy</span>
                              </li>
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-purple-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Rozšíření platebních služeb</span>
                              </li>
                              <li className="flex items-start">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-2 text-purple-500 mt-0.5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                <span>Zavedení donášky do okolí</span>
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
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <p className="text-sm text-muted-foreground mb-4">
                  Konkurenční strategie Žabky je založena na diferenciaci v oblasti convenience nakupování, s důrazem na
                  rychlost, pohodlí a kvalitu. Implementace navržených strategií by měla probíhat postupně, s
                  pravidelným vyhodnocováním jejich efektivity a případnými úpravami podle reakce zákazníků a
                  konkurence.
                </p>
                <Button variant="outline" className="w-full">
                  Stáhnout strategický plán
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mapa konkurence</CardTitle>
              <CardDescription>Vizualizace konkurenčního prostředí v okolí</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4 h-80 flex items-center justify-center">
                <div className="text-center">Mapa bude doplněna o interaktivní zobrazení konkurentů v okolí.</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

