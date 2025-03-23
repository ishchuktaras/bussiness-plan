"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BarChart, LineChart, PieChart, Clock, MapPin, Star } from "lucide-react"
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { MobileTabScroller } from "@/components/mobile-tab-scroller"

// Data for competitors
const competitorsData = [
  {
    name: "Albert",
    type: "Supermarket",
    distance: "0.5 km",
    distanceValue: 0.5,
    size: "800 m²",
    sizeValue: 800,
    hours: "6:00-22:00",
    rating: "3.8/5",
    ratingValue: 3.8,
    priceLevel: "Střední",
    popularity: 65,
    priceIndex: 110,
  },
  {
    name: "Večerka U Novotných",
    type: "Večerka",
    distance: "0.3 km",
    distanceValue: 0.3,
    size: "60 m²",
    sizeValue: 60,
    hours: "6:00-23:00",
    rating: "4.2/5",
    ratingValue: 4.2,
    priceLevel: "Vysoká",
    popularity: 45,
    priceIndex: 125,
  },
  {
    name: "BILLA",
    type: "Supermarket",
    distance: "1.2 km",
    distanceValue: 1.2,
    size: "650 m²",
    sizeValue: 650,
    hours: "7:00-21:00",
    rating: "4/5",
    ratingValue: 4.0,
    priceLevel: "Střední",
    popularity: 55,
    priceIndex: 105,
  },
  {
    name: "Tesco Express",
    type: "Convenience",
    distance: "0.8 km",
    distanceValue: 0.8,
    size: "250 m²",
    sizeValue: 250,
    hours: "6:00-22:00",
    rating: "3.5/5",
    ratingValue: 3.5,
    priceLevel: "Střední",
    popularity: 50,
    priceIndex: 108,
  },
  {
    name: "LIDL",
    type: "Diskont",
    distance: "1.5 km",
    distanceValue: 1.5,
    size: "1000 m²",
    sizeValue: 1000,
    hours: "7:00-21:00",
    rating: "4.3/5",
    ratingValue: 4.3,
    priceLevel: "Nízká",
    popularity: 75,
    priceIndex: 90,
  },
]

// Data for popularity chart
const popularityData = [
  { name: "Žabka (odhad)", popularity: 60 },
  ...competitorsData.map((competitor) => ({
    name: competitor.name,
    popularity: competitor.popularity,
  })),
]

// Data for price comparison chart
const priceComparisonData = [
  { name: "Žabka", priceIndex: 100 },
  ...competitorsData.map((competitor) => ({
    name: competitor.name,
    priceIndex: competitor.priceIndex,
  })),
]

// Function to get color based on price level
const getPriceLevelColor = (priceLevel: string) => {
  switch (priceLevel) {
    case "Nízká":
      return "bg-green-100 text-green-800"
    case "Střední":
      return "bg-yellow-100 text-yellow-800"
    case "Vysoká":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Function to get rating bar width and color
const getRatingBar = (rating: number) => {
  const width = (rating / 5) * 100
  let color = "bg-blue-500"

  if (rating >= 4.5) color = "bg-green-500"
  else if (rating >= 4.0) color = "bg-blue-500"
  else if (rating >= 3.5) color = "bg-yellow-500"
  else color = "bg-red-500"

  return { width, color }
}

export default function CompetitionAnalysis() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Analýza konkurence Žabka</h1>

      <Tabs defaultValue="overview">
        <MobileTabScroller>
          <TabsList className="flex">
            <TabsTrigger value="overview" className="px-2.5 py-1.5 text-xs sm:text-sm whitespace-nowrap">
              <BarChart className="mr-1 h-3 w-3" /> <span className="hidden sm:inline">Přehled</span>
              <span className="sm:hidden">Přehled</span>
            </TabsTrigger>
            <TabsTrigger value="comparison" className="px-2.5 py-1.5 text-xs sm:text-sm whitespace-nowrap">
              <LineChart className="mr-1 h-3 w-3" /> <span className="hidden sm:inline">Srovnání</span>
              <span className="sm:hidden">Srovnání</span>
            </TabsTrigger>
            <TabsTrigger value="advantages" className="px-2.5 py-1.5 text-xs sm:text-sm whitespace-nowrap">
              <Star className="mr-1 h-3 w-3" /> <span className="hidden sm:inline">Výhody a nevýhody</span>
              <span className="sm:hidden">Výhody</span>
            </TabsTrigger>
            <TabsTrigger value="strategy" className="px-2.5 py-1.5 text-xs sm:text-sm whitespace-nowrap">
              <PieChart className="mr-1 h-3 w-3" /> <span className="hidden sm:inline">Konkurenční strategie</span>
              <span className="sm:hidden">Strategie</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="px-2.5 py-1.5 text-xs sm:text-sm whitespace-nowrap">
              <MapPin className="mr-1 h-3 w-3" /> <span className="hidden sm:inline">Mapa konkurence</span>
              <span className="sm:hidden">Mapa</span>
            </TabsTrigger>
          </TabsList>
        </MobileTabScroller>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Přehled konkurence v okolí</CardTitle>
              <CardDescription>Analýza hlavních konkurentů v okolí plánované prodejny Žabka</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Název</th>
                      <th className="text-left py-2 px-2">Typ</th>
                      <th className="text-left py-2 px-2">Vzdálenost</th>
                      <th className="text-left py-2 px-2">Velikost (m²)</th>
                      <th className="text-left py-2 px-2">Otevírací doba</th>
                      <th className="text-left py-2 px-2">Hodnocení</th>
                      <th className="text-left py-2 px-2">Cenová úroveň</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorsData.map((competitor, index) => {
                      const ratingBar = getRatingBar(competitor.ratingValue)
                      return (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2 font-medium">{competitor.name}</td>
                          <td className="py-3 px-2">{competitor.type}</td>
                          <td className="py-3 px-2">{competitor.distance}</td>
                          <td className="py-3 px-2">{competitor.size}</td>
                          <td className="py-3 px-2 flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            {competitor.hours}
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className={`h-2.5 rounded-full ${ratingBar.color}`}
                                  style={{ width: `${ratingBar.width}%` }}
                                ></div>
                              </div>
                              <span>{competitor.rating}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <Badge className={getPriceLevelColor(competitor.priceLevel)}>{competitor.priceLevel}</Badge>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-500 mt-4">Seznam hlavních konkurentů v okolí</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popularita konkurentů</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={popularityData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis domain={[0, 100]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Popularita"]} />
                      <Bar dataKey="popularity" name="Popularita" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Srovnání cen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={priceComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                      <YAxis domain={[0, 150]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Přízivost cen"]} />
                      <Bar dataKey="priceIndex" name="Přízivost cen" fill="#10b981" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-gray-500 mt-2 text-right">
                  Vyšší hodnota znamená příznivější ceny pro zákazníky
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Other TabsContent sections remain the same */}
      </Tabs>
    </div>
  )
}

