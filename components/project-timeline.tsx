"use client"

import { useState } from "react"
import { Check, Clock, ArrowRight, CalendarDays, AlertTriangle, FileCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProjectTimeline() {
  const [projectStartDate, setProjectStartDate] = useState<string>("2023-08-01")

  // Calculate timeline dates based on start date
  const calculateDate = (offsetDays: number): string => {
    if (!projectStartDate) return ""

    const date = new Date(projectStartDate)
    date.setDate(date.getDate() + offsetDays)
    return date.toISOString().split("T")[0]
  }

  // Format date for display
  const formatDate = (dateString: string): string => {
    if (!dateString) return ""

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("cs-CZ", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date)
  }

  // Project phases
  const phases = [
    {
      id: "preparation",
      name: "Přípravná fáze",
      start: calculateDate(0),
      end: calculateDate(30),
      progress: 100,
      status: "completed",
      description:
        "Analýza lokality, příprava podnikatelského plánu, finanční kalkulace, zajištění finančních prostředků.",
      tasks: [
        { id: "task1", name: "Analýza lokality", deadline: calculateDate(7), completed: true },
        { id: "task2", name: "Příprava podnikatelského plánu", deadline: calculateDate(14), completed: true },
        { id: "task3", name: "Finanční kalkulace", deadline: calculateDate(21), completed: true },
        { id: "task4", name: "Zajištění financování", deadline: calculateDate(30), completed: true },
      ],
    },
    {
      id: "contract",
      name: "Smluvní dokumentace",
      start: calculateDate(31),
      end: calculateDate(60),
      progress: 75,
      status: "in-progress",
      description:
        "Podpis franšízové smlouvy, smlouvy o nájmu nebytových prostor, založení společnosti, zajištění pojištění.",
      tasks: [
        { id: "task5", name: "Podpis franšízové smlouvy", deadline: calculateDate(45), completed: true },
        { id: "task6", name: "Smlouva o nájmu prostor", deadline: calculateDate(50), completed: true },
        { id: "task7", name: "Založení společnosti", deadline: calculateDate(55), completed: true },
        { id: "task8", name: "Zajištění pojištění", deadline: calculateDate(60), completed: false },
      ],
    },
    {
      id: "permits",
      name: "Povolení a dokumentace",
      start: calculateDate(61),
      end: calculateDate(90),
      progress: 30,
      status: "in-progress",
      description:
        "Získání stavebního povolení, projektová dokumentace, zajištění hygienických povolení a požárního zajištění.",
      tasks: [
        { id: "task9", name: "Projektová dokumentace", deadline: calculateDate(70), completed: true },
        { id: "task10", name: "Stavební povolení", deadline: calculateDate(80), completed: false },
        { id: "task11", name: "Hygienické povolení", deadline: calculateDate(85), completed: false },
        { id: "task12", name: "Požární zajištění", deadline: calculateDate(90), completed: false },
      ],
    },
    {
      id: "construction",
      name: "Stavební úpravy",
      start: calculateDate(91),
      end: calculateDate(120),
      progress: 0,
      status: "pending",
      description: "Realizace stavebních úprav podle standardů Žabka, instalace vybavení, připojení technologií.",
      tasks: [
        { id: "task13", name: "Stavební úpravy", deadline: calculateDate(105), completed: false },
        { id: "task14", name: "Instalace vybavení", deadline: calculateDate(112), completed: false },
        { id: "task15", name: "Připojení technologií", deadline: calculateDate(118), completed: false },
        { id: "task16", name: "Kolaudace", deadline: calculateDate(120), completed: false },
      ],
    },
    {
      id: "pre-opening",
      name: "Předotevírací přípravy",
      start: calculateDate(121),
      end: calculateDate(135),
      progress: 0,
      status: "pending",
      description: "Nábor personálu, školení personálu, zaškolení, první naskladnění, marketingová kampaň.",
      tasks: [
        { id: "task17", name: "Nábor personálu", deadline: calculateDate(125), completed: false },
        { id: "task18", name: "Školení personálu", deadline: calculateDate(130), completed: false },
        { id: "task19", name: "První naskladnění", deadline: calculateDate(133), completed: false },
        { id: "task20", name: "Marketingová kampaň", deadline: calculateDate(135), completed: false },
      ],
    },
    {
      id: "opening",
      name: "Otevření prodejny",
      start: calculateDate(136),
      end: calculateDate(136),
      progress: 0,
      status: "pending",
      description: "Slavnostní otevření prodejny, zahájení provozu.",
      tasks: [{ id: "task21", name: "Slavnostní otevření", deadline: calculateDate(136), completed: false }],
    },
    {
      id: "operation",
      name: "Provozní fáze",
      start: calculateDate(137),
      end: calculateDate(167),
      progress: 0,
      status: "pending",
      description: "Stabilizace provozu, optimalizace procesu, marketingové aktivity, hodnocení výkonnosti.",
      tasks: [
        { id: "task22", name: "Stabilizace provozu", deadline: calculateDate(150), completed: false },
        { id: "task23", name: "Optimalizace procesů", deadline: calculateDate(160), completed: false },
        { id: "task24", name: "Hodnocení výkonnosti", deadline: calculateDate(167), completed: false },
      ],
    },
  ]

  // Milestones
  const milestones = [
    { date: calculateDate(30), name: "Získání financování", completed: true },
    { date: calculateDate(60), name: "Dokončení smluvní dokumentace", completed: false },
    { date: calculateDate(90), name: "Získání všech povolení", completed: false },
    { date: calculateDate(120), name: "Dokončení stavebních úprav", completed: false },
    { date: calculateDate(136), name: "Otevření prodejny", completed: false },
    { date: calculateDate(167), name: "Stabilizace provozu", completed: false },
  ]

  // Risk management
  const risks = [
    {
      id: "risk1",
      name: "Zpoždění stavebních úprav",
      impact: "high",
      probability: "medium",
      mitigation:
        "Včasné plánování, výběr spolehlivého dodavatele, smluvní penále za zpoždění, rezerva v časovém plánu.",
    },
    {
      id: "risk2",
      name: "Problémy s povolením",
      impact: "high",
      probability: "medium",
      mitigation: "Včasná komunikace s úřady, konzultace s odborníky, příprava alternativních řešení.",
    },
    {
      id: "risk3",
      name: "Nedostatek kvalifikovaného personálu",
      impact: "medium",
      probability: "medium",
      mitigation: "Včasný nábor, konkurenceschopné platové podmínky, spolupráce s úřadem práce.",
    },
    {
      id: "risk4",
      name: "Nízká návštěvnost při otevření",
      impact: "medium",
      probability: "low",
      mitigation: "Efektivní marketingová kampaň, speciální nabídky při otevření, zapojení místní komunity.",
    },
    {
      id: "risk5",
      name: "Překročení rozpočtu",
      impact: "high",
      probability: "medium",
      mitigation: "Detailní rozpočtování, pravidelná kontrola nákladů, finanční rezerva ve výši 15%.",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Dokončeno</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">Probíhá</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Čeká</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">Vysoký</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Střední</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Nízký</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{level}</Badge>
    }
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Harmonogram Projektu</h1>

      <Tabs defaultValue="timeline">
        <TabsList className="flex flex-wrap w-full">
          <TabsTrigger value="timeline" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <Clock className="mr-1 sm:mr-2 h-4 w-4" /> Časový plán
          </TabsTrigger>
          <TabsTrigger value="phases" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <ArrowRight className="mr-1 sm:mr-2 h-4 w-4" /> Fáze projektu
          </TabsTrigger>
          <TabsTrigger value="milestones" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <CalendarDays className="mr-1 sm:mr-2 h-4 w-4" /> Milníky
          </TabsTrigger>
          <TabsTrigger value="risks" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <AlertTriangle className="mr-1 sm:mr-2 h-4 w-4" /> Rizika
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex-1 min-w-[120px] py-2 text-xs sm:text-sm">
            <FileCheck className="mr-1 sm:mr-2 h-4 w-4" /> Dokumentace
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Časový plán projektu</CardTitle>
              <CardDescription>Přehled jednotlivých fází a úkolů</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="mb-4">
                <Label htmlFor="start-date">Datum zahájení projektu</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="start-date"
                    type="date"
                    value={projectStartDate}
                    onChange={(e) => setProjectStartDate(e.target.value)}
                    className="max-w-xs"
                  />
                  <Button variant="outline" size="sm">
                    Aktualizovat
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                {phases.map((phase, index) => (
                  <div key={phase.id} className="relative">
                    {index < phases.length - 1 && (
                      <div className="absolute left-[20px] top-[40px] bottom-0 w-0.5 bg-gray-200 z-0"></div>
                    )}
                    <div className="flex">
                      <div className="relative z-10">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            phase.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : phase.status === "in-progress"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {phase.status === "completed" ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">{phase.name}</h3>
                          {getStatusBadge(phase.status)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatDate(phase.start)} - {formatDate(phase.end)}
                        </div>
                        <p className="text-sm mt-2 mb-3">{phase.description}</p>
                        <div className="w-full">
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Průběh:</span>
                            <span>{phase.progress}%</span>
                          </div>
                          <Progress value={phase.progress} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="ml-14 mt-4 mb-6">
                      <h4 className="text-sm font-medium mb-2">Úkoly:</h4>
                      <div className="space-y-2">
                        {phase.tasks.map((task) => (
                          <div key={task.id} className="flex items-start">
                            <div
                              className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center ${
                                task.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {task.completed && <Check className="h-3 w-3" />}
                            </div>
                            <div className="ml-2 flex-1">
                              <div className="flex items-center justify-between">
                                <span className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}>
                                  {task.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  Termín: {formatDate(task.deadline)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="flex justify-between">
                  <span>Celkový průběh projektu:</span>
                  <span className="font-bold">30%</span>
                </div>
                <Progress value={30} className="h-2 mt-2" />
                <div className="mt-4 text-sm text-muted-foreground">
                  <p className="flex justify-between">
                    <span>Datum zahájení:</span>
                    <span className="font-medium">{formatDate(projectStartDate)}</span>
                  </p>
                  <p className="flex justify-between mt-1">
                    <span>Plánované otevření:</span>
                    <span className="font-medium">{formatDate(calculateDate(136))}</span>
                  </p>
                  <p className="flex justify-between mt-1">
                    <span>Celková délka projektu:</span>
                    <span className="font-medium">168 dní</span>
                  </p>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Fáze projektu</CardTitle>
              <CardDescription>Detailní popis jednotlivých fází a jejich náplně</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phases.slice(0, 4).map((phase) => (
                  <Card
                    key={phase.id}
                    className={`${
                      phase.status === "completed"
                        ? "border-green-200"
                        : phase.status === "in-progress"
                          ? "border-blue-200"
                          : ""
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{phase.name}</CardTitle>
                        {getStatusBadge(phase.status)}
                      </div>
                      <CardDescription>
                        {formatDate(phase.start)} - {formatDate(phase.end)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{phase.description}</p>
                      <div className="w-full mb-3">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Průběh:</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-medium">Hlavní výstupy fáze:</div>
                        <ul className="list-disc pl-4 space-y-1">
                          {phase.tasks.map((task) => (
                            <li key={task.id} className={task.completed ? "text-gray-500" : ""}>
                              {task.name} {task.completed && <span className="text-green-600">(✓)</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {phases.slice(4, 7).map((phase) => (
                  <Card
                    key={phase.id}
                    className={`${
                      phase.status === "completed"
                        ? "border-green-200"
                        : phase.status === "in-progress"
                          ? "border-blue-200"
                          : ""
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{phase.name}</CardTitle>
                        {getStatusBadge(phase.status)}
                      </div>
                      <CardDescription>
                        {formatDate(phase.start)} - {formatDate(phase.end)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{phase.description}</p>
                      <div className="w-full mb-3">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Průběh:</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress value={phase.progress} className="h-2" />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-medium">Hlavní výstupy fáze:</div>
                        <ul className="list-disc pl-4 space-y-1">
                          {phase.tasks.map((task) => (
                            <li key={task.id} className={task.completed ? "text-gray-500" : ""}>
                              {task.name} {task.completed && <span className="text-green-600">(✓)</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Celkový přehled fází</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Fáze</th>
                          <th className="text-center py-2">Od</th>
                          <th className="text-center py-2">Do</th>
                          <th className="text-center py-2">Trvání (dny)</th>
                          <th className="text-center py-2">Průběh</th>
                          <th className="text-right py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {phases.map((phase) => {
                          const start = new Date(phase.start)
                          const end = new Date(phase.end)
                          const duration = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

                          return (
                            <tr key={phase.id} className="border-b">
                              <td className="py-2">{phase.name}</td>
                              <td className="text-center py-2">{formatDate(phase.start)}</td>
                              <td className="text-center py-2">{formatDate(phase.end)}</td>
                              <td className="text-center py-2">{duration}</td>
                              <td className="py-2">
                                <div className="flex items-center">
                                  <Progress value={phase.progress} className="h-2 w-32" />
                                  <span className="ml-2 text-xs">{phase.progress}%</span>
                                </div>
                              </td>
                              <td className="text-right py-2">{getStatusBadge(phase.status)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                Exportovat harmonogram fází
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Klíčové milníky projektu</CardTitle>
              <CardDescription>Přehled důležitých termínů a událostí</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-gray-200 z-0"></div>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => {
                    const milestoneDate = new Date(milestone.date)
                    const today = new Date()
                    const isPast = milestoneDate < today
                    const isToday = milestoneDate.toDateString() === today.toDateString()

                    return (
                      <div key={index} className="flex relative">
                        <div className="relative z-10">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              milestone.completed
                                ? "bg-green-100 text-green-600"
                                : isPast
                                  ? "bg-red-100 text-red-600"
                                  : isToday
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {milestone.completed ? <Check className="h-5 w-5" /> : <CalendarDays className="h-5 w-5" />}
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">{milestone.name}</h3>
                            <Badge
                              className={`${
                                milestone.completed
                                  ? "bg-green-100 text-green-800"
                                  : isPast
                                    ? "bg-red-100 text-red-800"
                                    : isToday
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {milestone.completed ? "Splněno" : isPast ? "Zpožděno" : isToday ? "Dnes" : "Plánováno"}
                            </Badge>
                          </div>
                          <div className="text-sm mt-1 flex items-center">
                            <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Termín: {formatDate(milestone.date)}</span>
                            {isPast && !milestone.completed && (
                              <Badge variant="outline" className="ml-2 text-red-600">
                                Zpoždění:{" "}
                                {Math.floor((today.getTime() - milestoneDate.getTime()) / (1000 * 60 * 60 * 24))} dní
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Celková časová osa projektu</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative pt-1 pb-12">
                    <div className="absolute left-0 right-0 h-1 bg-gray-200 top-8"></div>
                    <div className="flex justify-between relative">
                      {milestones.map((milestone, index) => (
                        <div key={index} className="relative z-10 flex flex-col items-center">
                          <div className="text-xs mb-2 text-center w-24 truncate" title={milestone.name}>
                            {milestone.name}
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              milestone.completed ? "bg-green-600" : "bg-gray-400"
                            }`}
                          >
                            {milestone.completed && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="text-xs mt-2 text-muted-foreground">
                            {formatDate(milestone.date).split(" ")[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Plánované milníky</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {milestones
                        .filter((m) => !m.completed)
                        .map((milestone, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span>{milestone.name}</span>
                            <span className="text-muted-foreground">{formatDate(milestone.date)}</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Dokončené milníky</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {milestones
                        .filter((m) => m.completed)
                        .map((milestone, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-1" />
                              {milestone.name}
                            </span>
                            <span className="text-muted-foreground">{formatDate(milestone.date)}</span>
                          </div>
                        ))}
                      {milestones.filter((m) => m.completed).length === 0 && (
                        <div className="text-sm text-muted-foreground text-center py-2">
                          Zatím nebyly dokončeny žádné milníky
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Kritické termíny</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Získání stavebního povolení</span>
                        <Badge variant="outline" className="text-red-600">
                          Kritické
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Kolaudace</span>
                        <Badge variant="outline" className="text-red-600">
                          Kritické
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Podpis franšízové smlouvy</span>
                        <Badge variant="outline" className="text-yellow-600">
                          Důležité
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Otevření prodejny</span>
                        <Badge variant="outline" className="text-red-600">
                          Kritické
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="w-full">
                <div className="text-sm text-muted-foreground mb-4">
                  <p>
                    Milníky představují klíčové události v průběhu projektu, které jsou využívány pro sledování
                    celkového postupu. Dodržení termínů milníků je kritické pro úspěšné dokončení projektu v plánovaném
                    čase.
                  </p>
                </div>
                <Button variant="outline" className="w-full">
                  Exportovat milníky do kalendáře
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Řízení rizik projektu</CardTitle>
              <CardDescription>Identifikace, analýza a opatření proti rizikům</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {risks.map((risk) => (
                  <Card key={risk.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{risk.name}</CardTitle>
                        <div className="flex gap-2">
                          <Badge className="bg-blue-100 text-blue-800">Dopad: {getRiskBadge(risk.impact)}</Badge>
                          <Badge className="bg-purple-100 text-purple-800">
                            Pravděpodobnost: {getRiskBadge(risk.probability)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium">Opatření:</h4>
                          <p className="text-sm text-muted-foreground">{risk.mitigation}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Matice rizik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-px bg-gray-200 rounded overflow-hidden">
                    <div className="bg-white p-2 text-center font-medium"></div>
                    <div className="bg-white p-2 text-center font-medium text-sm">Nízký dopad</div>
                    <div className="bg-white p-2 text-center font-medium text-sm">Střední dopad</div>
                    <div className="bg-white p-2 text-center font-medium text-sm">Vysoký dopad</div>

                    <div className="bg-white p-2 text-center font-medium text-sm">Vysoká pravd.</div>
                    <div className="bg-yellow-50 p-2 text-center text-xs"></div>
                    <div className="bg-orange-50 p-2 text-center text-xs"></div>
                    <div className="bg-red-50 p-2 text-center text-xs"></div>

                    <div className="bg-white p-2 text-center font-medium text-sm">Střední pravd.</div>
                    <div className="bg-green-50 p-2 text-center text-xs"></div>
                    <div className="bg-yellow-50 p-2 text-center text-xs">
                      <div className="bg-white shadow rounded-sm p-1 mb-1">Nedostatek personálu</div>
                    </div>
                    <div className="bg-orange-50 p-2 text-center text-xs">
                      <div className="bg-white shadow rounded-sm p-1 mb-1">Zpoždění stavby</div>
                      <div className="bg-white shadow rounded-sm p-1 mb-1">Problémy s povolením</div>
                      <div className="bg-white shadow rounded-sm p-1">Překročení rozpočtu</div>
                    </div>

                    <div className="bg-white p-2 text-center font-medium text-sm">Nízká pravd.</div>
                    <div className="bg-green-50 p-2 text-center text-xs"></div>
                    <div className="bg-green-50 p-2 text-center text-xs">
                      <div className="bg-white shadow rounded-sm p-1">Nízká návštěvnost</div>
                    </div>
                    <div className="bg-yellow-50 p-2 text-center text-xs"></div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Celkové hodnocení rizik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm">
                      Projekt otevření Žabky čelí několika významným rizikům, která byla identifikována a pro která byla
                      navržena zmírňující opatření. Celková rizikovost projektu je hodnocena jako{" "}
                      <strong>střední</strong>.
                    </p>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Nejvýznamnější rizika:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Zpoždění stavebních úprav</li>
                        <li>Problémy s získáním potřebných povolení</li>
                        <li>Překročení plánovaného rozpočtu</li>
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium mb-2">Doporučená opatření:</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Vytvořit časovou rezervu v harmonogramu pro kritické činnosti (min. 2 týdny)</li>
                        <li>Zajistit finanční rezervu ve výši min. 15% rozpočtu</li>
                        <li>Pravidelné kontrolní body pro sledování postupu projektu (týdenní)</li>
                        <li>Včasná komunikace s úřady a předběžné konzultace před podáním žádostí</li>
                        <li>Pečlivý výběr dodavatelů s referencemi a zkušenostmi s podobnými projekty</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                Stáhnout plán řízení rizik
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Požadovaná dokumentace</CardTitle>
              <CardDescription>Přehled dokumentů potřebných v jednotlivých fázích projektu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Přípravná fáze</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Podnikatelský plán</div>
                        <div className="text-sm text-muted-foreground">
                          Detailní plán podnikání včetně finančních odhadů a analýzy trhu
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Finanční kalkulace</div>
                        <div className="text-sm text-muted-foreground">
                          Podrobné vyčíslení investice, provozních nákladů a očekávaných příjmů
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Analýza lokality</div>
                        <div className="text-sm text-muted-foreground">
                          Studie okolí, demografické složení, konkurence a potenciál lokality
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Smluvní dokumentace</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Franšízová smlouva</div>
                        <div className="text-sm text-muted-foreground">
                          Hlavní smluvní dokument upravující vztah s franšízorem
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Nájemní smlouva</div>
                        <div className="text-sm text-muted-foreground">
                          Smlouva o nájmu nebytových prostor pro provozovnu
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Pojistná smlouva</div>
                        <div className="text-sm text-muted-foreground">
                          Pojištění majetku, odpovědnosti a přerušení provozu
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Zakládací dokumenty společnosti</div>
                        <div className="text-sm text-muted-foreground">
                          Výpis z obchodního rejstříku, společenská smlouva, apod.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Povolení a dokumentace</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Projektová dokumentace</div>
                        <div className="text-sm text-muted-foreground">
                          Stavební a technická dokumentace pro stavební úpravy
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Stavební povolení</div>
                        <div className="text-sm text-muted-foreground">
                          Povolení ke stavebním úpravám od stavebního úřadu
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Hygienické povolení</div>
                        <div className="text-sm text-muted-foreground">Povolení od krajské hygienické stanice</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Požární zpráva</div>
                        <div className="text-sm text-muted-foreground">
                          Požárně bezpečnostní řešení schválené hasičským sborem
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Provozní dokumentace</h3>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">HACCP dokumentace</div>
                        <div className="text-sm text-muted-foreground">
                          Systém analýzy rizika a stanovení kritických kontrolních bodů
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Provozní řád</div>
                        <div className="text-sm text-muted-foreground">Interní předpisy pro provoz obchodu</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Pracovní smlouvy</div>
                        <div className="text-sm text-muted-foreground">Smlouvy se zaměstnanci</div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Kolaudační rozhodnutí</div>
                        <div className="text-sm text-muted-foreground">Potvrzení o způsobilosti stavby k užívání</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Stav dokumentace</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-medium">Celkový stav dokumentace</h3>
                      <div className="flex items-center">
                        <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                        <span className="text-sm">40% dokončeno</span>
                      </div>
                    </div>
                    <div className="space-x-1">
                      <Badge className="bg-green-100 text-green-800">Hotovo: 8</Badge>
                      <Badge className="bg-yellow-100 text-yellow-800">Rozpracováno: 5</Badge>
                      <Badge className="bg-gray-100 text-gray-800">Čeká: 7</Badge>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Dokument</th>
                          <th className="text-center py-2">Stav</th>
                          <th className="text-right py-2">Termín</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2">Podnikatelský plán</td>
                          <td className="text-center py-2">
                            <Badge className="bg-green-100 text-green-800">Hotovo</Badge>
                          </td>
                          <td className="text-right py-2">{formatDate(calculateDate(14))}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Franšízová smlouva</td>
                          <td className="text-center py-2">
                            <Badge className="bg-green-100 text-green-800">Hotovo</Badge>
                          </td>
                          <td className="text-right py-2">{formatDate(calculateDate(45))}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Stavební povolení</td>
                          <td className="text-center py-2">
                            <Badge className="bg-yellow-100 text-yellow-800">Rozpracováno</Badge>
                          </td>
                          <td className="text-right py-2">{formatDate(calculateDate(80))}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Hygienické povolení</td>
                          <td className="text-center py-2">
                            <Badge className="bg-gray-100 text-gray-800">Čeká</Badge>
                          </td>
                          <td className="text-right py-2">{formatDate(calculateDate(85))}</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2">Kolaudační rozhodnutí</td>
                          <td className="text-center py-2">
                            <Badge className="bg-gray-100 text-gray-800">Čeká</Badge>
                          </td>
                          <td className="text-right py-2">{formatDate(calculateDate(120))}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full">
                Stáhnout checklist dokumentace
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

