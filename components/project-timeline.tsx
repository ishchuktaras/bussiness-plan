"use client"

import { useState } from "react"
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Briefcase,
  Building,
  Calendar,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileCheck,
  FileText,
  HelpCircle,
  Star,
  Users,
} from "lucide-react"

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
import { MobileTabScroller } from "@/components/ui/mobile-tab-scroller"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function ProjectTimeline() {
  const [projectStartDate, setProjectStartDate] = useState<string>("2025-02-01")
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null)
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null)

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

  // Calculate days between two dates
  const calculateDaysBetween = (startDate: string, endDate: string): number => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  // Calculate overall project progress
  const calculateOverallProgress = (): number => {
    const totalTasks = phases.flatMap((phase) => phase.tasks).length
    const completedTasks = phases
      .flatMap((phase) => phase.tasks)
      .filter((task) => task.completed).length
    return Math.round((completedTasks / totalTasks) * 100)
  }

  // Project phases
  const phases = [
    {
      id: "preparation",
      name: "Přípravná fáze",
      start: calculateDate(0),
      end: calculateDate(30),
      progress: 70,
      status: "in-progress",
      description:
        "Analýza lokality, příprava podnikatelského plánu, finanční kalkulace, zajištění finančních prostředků.",
      tasks: [
        {
          id: "task1",
          name: "Analýza lokality",
          deadline: calculateDate(7),
          completed: true,
        },
        {
          id: "task2",
          name: "Příprava podnikatelského plánu",
          deadline: calculateDate(14),
          completed: true,
        },
        {
          id: "task3",
          name: "Finanční kalkulace",
          deadline: calculateDate(21),
          completed: true,
        },
        {
          id: "task4",
          name: "Zajištění financování",
          deadline: calculateDate(30),
          completed: false,
        },
      ],
      icon: <BarChart3 className="h-5 w-5" />,
      color: "bg-violet-100 text-violet-600",
    },
    {
      id: "contract",
      name: "Smluvní dokumentace",
      start: calculateDate(31),
      end: calculateDate(60),
      progress: 0,
      status: "in-progress",
      description:
        "Podpis franšízové smlouvy, smlouvy o nájmu nebytových prostor, založení společnosti, zajištění pojištění.",
      tasks: [
        {
          id: "task5",
          name: "Podpis franšízové smlouvy",
          deadline: calculateDate(45),
          completed: false,
        },
        {
          id: "task6",
          name: "Smlouva o nájmu prostor",
          deadline: calculateDate(50),
          completed: false,
        },
        {
          id: "task7",
          name: "Založení OSVČ",
          deadline: calculateDate(55),
          completed: false,
        },
        {
          id: "task8",
          name: "Zajištění pojištění",
          deadline: calculateDate(60),
          completed: false,
        },
      ],
      icon: <FileText className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-600",
    },

    {
      id: "pre-opening",
      name: "Předotevírací přípravy",
      start: calculateDate(121),
      end: calculateDate(135),
      progress: 0,
      status: "pending",
      description:
        "Nábor personálu, školení personálu, zaškolení, první naskladnění, marketingová kampaň.",
      tasks: [
        {
          id: "task17",
          name: "Nábor personálu",
          deadline: calculateDate(125),
          completed: false,
        },
        {
          id: "task18",
          name: "Školení personálu",
          deadline: calculateDate(130),
          completed: false,
        },
        {
          id: "task19",
          name: "První naskladnění",
          deadline: calculateDate(133),
          completed: false,
        },
        {
          id: "task20",
          name: "Marketingová kampaň",
          deadline: calculateDate(135),
          completed: false,
        },
      ],
      icon: <Users className="h-5 w-5" />,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "opening",
      name: "Otevření prodejny",
      start: calculateDate(136),
      end: calculateDate(136),
      progress: 0,
      status: "pending",
      description: "Slavnostní otevření prodejny, zahájení provozu.",
      tasks: [
        {
          id: "task21",
          name: "Slavnostní otevření",
          deadline: calculateDate(136),
          completed: false,
        },
      ],
      icon: <Star className="h-5 w-5" />, // Changed from Sparkles to Star
      color: "bg-green-100 text-green-600",
    },
    {
      id: "operation",
      name: "Provozní fáze",
      start: calculateDate(137),
      end: calculateDate(167),
      progress: 0,
      status: "pending",
      description:
        "Stabilizace provozu, optimalizace procesu, marketingové aktivity, hodnocení výkonnosti.",
      tasks: [
        {
          id: "task22",
          name: "Stabilizace provozu",
          deadline: calculateDate(150),
          completed: false,
        },
        {
          id: "task23",
          name: "Optimalizace procesů",
          deadline: calculateDate(160),
          completed: false,
        },
        {
          id: "task24",
          name: "Hodnocení výkonnosti",
          deadline: calculateDate(167),
          completed: false,
        },
      ],
      icon: <Briefcase className="h-5 w-5" />,
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  // Milestones
  const milestones = [
    {
      date: calculateDate(30),
      name: "Získání financování",
      completed: false,
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      date: calculateDate(60),
      name: "Dokončení smluvní dokumentace",
      completed: false,
      icon: <FileText className="h-5 w-5" />,
    },
    {
      date: calculateDate(90),
      name: "Získání všech povolení",
      completed: false,
      icon: <FileCheck className="h-5 w-5" />,
    },

    {
      date: calculateDate(136),
      name: "Otevření prodejny",
      completed: false,
      icon: <Star className="h-5 w-5" />,
    }, // Changed from Sparkles to Star
    {
      date: calculateDate(167),
      name: "Stabilizace provozu",
      completed: false,
      icon: <Briefcase className="h-5 w-5" />,
    },
  ]

  // Risk management
  const risks = [
    {
      id: "risk2",
      name: "Problémy s povolením",
      impact: "high",
      probability: "medium",
      mitigation:
        "Včasná komunikace s úřady, konzultace s odborníky, příprava alternativních řešení.",
      phase: "permits",
      contingency:
        "Zajistit právní podporu, připravit alternativní návrhy řešení.",
      owner: "Právní oddělení",
      status: "Aktivní",
    },
    {
      id: "risk3",
      name: "Nedostatek kvalifikovaného personálu",
      impact: "medium",
      probability: "medium",
      mitigation:
        "Včasný nábor, konkurenceschopné platové podmínky, spolupráce s úřadem práce.",
      phase: "pre-opening",
      contingency:
        "Připravit plán zaškolení méně kvalifikovaných pracovníků, dočasná výpomoc z jiných poboček.",
      owner: "HR manažer",
      status: "Sledovaný",
    },
    {
      id: "risk4",
      name: "Nízká návštěvnost při otevření",
      impact: "medium",
      probability: "low",
      mitigation:
        "Efektivní marketingová kampaň, speciální nabídky při otevření, zapojení místní komunity.",
      phase: "opening",
      contingency:
        "Připravit dodatečné marketingové akce, speciální slevy a nabídky.",
      owner: "Marketingový manažer",
      status: "Sledovaný",
    },
    {
      id: "risk5",
      name: "Překročení rozpočtu",
      impact: "high",
      probability: "medium",
      mitigation:
        "Detailní rozpočtování, pravidelná kontrola nákladů, finanční rezerva ve výši 15%.",
      phase: "all",
      contingency:
        "Identifikovat možné úspory, připravit plán pro dodatečné financování.",
      owner: "Finanční manažer",
      status: "Aktivní",
    },
  ]

  // Required documents
  const documents = [
    {
      category: "Před podpisem franšízové smlouvy",
      items: [
        {
          name: "Výpis z trestního rejstříku",
          status: "pending",
          deadline: calculateDate(-10),
          note: "Ne starší než 3 měsíce, vydá CZECH POINT",
        },
        {
          name: "Výpis z Bankovního a Nebankovního registru",
          status: "pending",
          deadline: calculateDate(-10),
          note: "Lze získat online na https://www.kolikmam.cz/sluzby/vypisyzregistru/",
        },
        {
          name: "Výpis z Centrální evidence exekucí",
          status: "pending",
          deadline: calculateDate(-10),
          note: "Lze získat online na www.ceecr.cz",
        },
        {
          name: "Živnostenské oprávnění",
          status: "pending",
          deadline: calculateDate(-5),
          note: "Velkoobchod a maloobchod, Výroba potravinářských výrobků",
        },
        {
          name: "Oprávnění k prodeji alkoholu",
          status: "completed",
          deadline: calculateDate(-5),
          note: "Prodej kvasného lihu, konzumního lihu a lihovin",
        },
        {
          name: "Potvrzení o bezdlužnosti (FÚ)",
          status: "pending",
          deadline: calculateDate(-5),
          note: "Vydá finanční úřad",
        },
        {
          name: "Potvrzení o bezdlužnosti (SSZ)",
          status: "pending",
          deadline: calculateDate(-5),
          note: "Vydá správa sociálního zabezpečení",
        },
        {
          name: "Potvrzení o bezdlužnosti (ZP)",
          status: "pending",
          deadline: calculateDate(-5),
          note: "Vydá zdravotní pojišťovna",
        },
      ],
    },
    {
      category: "Přípravná fáze",
      items: [
        {
          name: "Podnikatelský plán",
          status: "completed",
          deadline: calculateDate(14),
          note: "Detailní plán podnikání včetně finančních odhadů a analýzy trhu",
        },
        {
          name: "Finanční kalkulace",
          status: "completed",
          deadline: calculateDate(21),
          note: "Podrobné vyčíslení investice, provozních nákladů a očekávaných příjmů",
        },
        {
          name: "Analýza lokality",
          status: "completed",
          deadline: calculateDate(7),
          note: "Studie okolí, demografické složení, konkurence a potenciál lokality",
        },
      ],
    },
    {
      category: "Smluvní dokumentace",
      items: [
        {
          name: "Franšízová smlouva",
          status: "pending",
          deadline: calculateDate(45),
          note: "Hlavní smluvní dokument upravující vztah s franšízorem",
        },
        {
          name: "Nájemní smlouva",
          status: "in-progress",
          deadline: calculateDate(50),
          note: "Smlouva o nájmu nebytových prostor pro provozovnu",
        },
        {
          name: "Pojistná smlouva",
          status: "pending",
          deadline: calculateDate(60),
          note: "Pojištění majetku, odpovědnosti a přerušení provozu",
        },
      ],
    },
    {
      category: "Provozní dokumentace",
      items: [
        {
          name: "HACCP dokumentace",
          status: "pending",
          deadline: calculateDate(125),
          note: "Systém analýzy rizika a stanovení kritických kontrolních bodů",
        },
        {
          name: "Provozní řád",
          status: "pending",
          deadline: calculateDate(130),
          note: "Interní předpisy pro provoz obchodu",
        },
        {
          name: "Pracovní smlouvy",
          status: "pending",
          deadline: calculateDate(125),
          note: "Smlouvy se zaměstnanci",
        },
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Dokončeno
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            Probíhá
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            Čeká
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            {status}
          </Badge>
        )
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "pending":
        return <HelpCircle className="h-4 w-4 text-gray-400" />
      default:
        return <HelpCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "high":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Vysoký
          </Badge>
        )
      case "medium":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Střední
          </Badge>
        )
      case "low":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Nízký
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 border-gray-200">
            {level}
          </Badge>
        )
    }
  }

  const handleDateUpdate = () => {
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
    }, 500)
  }

  const togglePhaseExpand = (phaseId: string) => {
    if (expandedPhase === phaseId) {
      setExpandedPhase(null)
    } else {
      setExpandedPhase(phaseId)
    }
  }

  const toggleRiskExpand = (riskId: string) => {
    if (expandedRisk === riskId) {
      setExpandedRisk(null)
    } else {
      setExpandedRisk(riskId)
    }
  }

  // Calculate document statistics
  const documentStats = {
    total: documents.flatMap((cat) => cat.items).length,
    completed: documents
      .flatMap((cat) => cat.items)
      .filter((doc) => doc.status === "completed").length,
    inProgress: documents
      .flatMap((cat) => cat.items)
      .filter((doc) => doc.status === "in-progress").length,
    pending: documents
      .flatMap((cat) => cat.items)
      .filter((doc) => doc.status === "pending").length,
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg p-6 mb-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Harmonogram Projektu
            </h1>
            <p className="mt-2 text-violet-100">
              Komplexní přehled časového plánu, fází, milníků a rizik projektu
              otevření franšízové prodejny
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-sm text-violet-100">Celkový průběh</div>
              <div className="text-2xl font-bold">
                {calculateOverallProgress()}%
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
              <div className="text-sm text-violet-100">Plánované otevření</div>
              <div className="text-lg font-bold">
                {formatDate(calculateDate(136))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="timeline" className="space-y-4">
        <MobileTabScroller showScrollIndicators={true} value="timeline">
          <TabsList className="flex flex-wrap w-full bg-white p-1 rounded-lg shadow-md">
            <TabsTrigger
              value="timeline"
              className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
            >
              <span>Časový plán</span>
            </TabsTrigger>
            <TabsTrigger
              value="phases"
              className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
            >
              <span>Fáze projektu</span>
            </TabsTrigger>
            <TabsTrigger
              value="milestones"
              className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
            >
              <span>Milníky</span>
            </TabsTrigger>
            <TabsTrigger
              value="risks"
              className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
            >
              <span>Rizika</span>
            </TabsTrigger>
            <TabsTrigger
              value="docs"
              className="flex-1 min-w-[120px] py-3 text-l sm:text-sm data-[state=active]:bg-violet-100 data-[state=active]:text-violet-800"
            >
              <span>Dokumentace</span>
            </TabsTrigger>
          </TabsList>
        </MobileTabScroller>

        <TabsContent value="timeline" className="space-y-4 mt-4">
          <Card className="border-violet-200 shadow-md">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-violet-800">
                    Časový plán projektu
                  </CardTitle>
                  <CardDescription>
                    Přehled jednotlivých fází a úkolů
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
                <Label
                  htmlFor="start-date"
                  className="text-violet-800 font-medium"
                >
                  Datum zahájení projektu
                </Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    id="start-date"
                    type="date"
                    value={projectStartDate}
                    onChange={(e) => setProjectStartDate(e.target.value)}
                    className="max-w-xs border-violet-200 focus-visible:ring-violet-500"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-violet-200 hover:bg-violet-100 hover:text-violet-800"
                    onClick={handleDateUpdate}
                  >
                    {isUpdating ? (
                      <span className="flex items-center gap-1">
                        <span className="animate-spin h-4 w-4 border-2 border-violet-500 border-t-transparent rounded-full"></span>
                        Aktualizuji...
                      </span>
                    ) : (
                      "Aktualizovat"
                    )}
                  </Button>
                </div>
                <div className="mt-3 text-sm text-violet-700">
                  <p className="flex justify-between">
                    <span>Plánované otevření:</span>
                    <span className="font-medium">
                      {formatDate(calculateDate(136))}
                    </span>
                  </p>
                  <p className="flex justify-between mt-1">
                    <span>Celková délka projektu:</span>
                    <span className="font-medium">168 dní</span>
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {phases.map((phase, index) => (
                  <div key={phase.id} className="relative">
                    {index < phases.length - 1 && (
                      <div className="absolute left-[20px] top-[40px] bottom-0 w-0.5 bg-violet-200 z-0"></div>
                    )}
                    <div className="flex">
                      <div className="relative z-10">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            phase.status === "completed"
                              ? "bg-green-100 text-green-600"
                              : phase.status === "in-progress"
                              ? "bg-violet-100 text-violet-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {phase.status === "completed" ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            phase.icon || (
                              <span className="text-sm font-medium">
                                {index + 1}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div
                          className="flex items-center justify-between cursor-pointer hover:bg-violet-50 p-2 rounded-md -ml-2"
                          onClick={() => togglePhaseExpand(phase.id)}
                        >
                          <h3 className="text-lg font-medium flex items-center">
                            {phase.name}
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition-transform ${
                                expandedPhase === phase.id ? "rotate-180" : ""
                              }`}
                            />
                          </h3>
                          {getStatusBadge(phase.status)}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {formatDate(phase.start)} - {formatDate(phase.end)}
                          <span className="ml-2 text-violet-600 font-medium">
                            ({calculateDaysBetween(phase.start, phase.end)} dní)
                          </span>
                        </div>
                        <p className="text-sm mt-2 mb-3">{phase.description}</p>
                        <div className="w-full">
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Průběh:</span>
                            <span>{phase.progress}%</span>
                          </div>
                          <Progress
                            value={phase.progress}
                            className="h-2 bg-violet-100"
                          />
                        </div>
                      </div>
                    </div>

                    {expandedPhase === phase.id && (
                      <div className="ml-14 mt-4 mb-6 bg-violet-50 p-4 rounded-lg border border-violet-100 animate-in fade-in-50 duration-300">
                        <h4 className="text-sm font-medium mb-2 text-violet-800">
                          Úkoly:
                        </h4>
                        <div className="space-y-2">
                          {phase.tasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-start bg-white p-2 rounded-md shadow-sm"
                            >
                              <div
                                className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                                  task.completed
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {task.completed ? (
                                  <Check className="h-3 w-3" />
                                ) : null}
                              </div>
                              <div className="ml-2 flex-1">
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-sm ${
                                      task.completed
                                        ? "line-through text-gray-500"
                                        : "text-violet-900"
                                    }`}
                                  >
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
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="flex justify-between">
                  <span className="font-medium text-violet-800">
                    Celkový průběh projektu:
                  </span>
                  <span className="font-bold text-violet-800">
                    {calculateOverallProgress()}%
                  </span>
                </div>
                <Progress
                  value={calculateOverallProgress()}
                  className="h-3 mt-2 bg-violet-100"
                />
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                    <div className="text-sm text-violet-800 font-medium">
                      Dokončené fáze
                    </div>
                    <div className="text-2xl font-bold text-violet-900">
                      {phases.filter((p) => p.status === "completed").length} /{" "}
                      {phases.length}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                    <div className="text-sm text-violet-800 font-medium">
                      Dokončené úkoly
                    </div>
                    <div className="text-2xl font-bold text-violet-900">
                      {
                        phases
                          .flatMap((p) => p.tasks)
                          .filter((t) => t.completed).length
                      }{" "}
                      / {phases.flatMap((p) => p.tasks).length}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                    <div className="text-sm text-violet-800 font-medium">
                      Dní do otevření
                    </div>
                    <div className="text-2xl font-bold text-violet-900">
                      {calculateDaysBetween(
                        new Date().toISOString().split("T")[0],
                        calculateDate(136)
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4 mt-4">
          <Card className="border-violet-200 shadow-md">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-violet-800">
                    Fáze projektu
                  </CardTitle>
                  <CardDescription>
                    Detailní popis jednotlivých fází a jejich náplně
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {phases.slice(0, 4).map((phase) => (
                  <Card
                    key={phase.id}
                    className={`hover:shadow-md transition-shadow ${
                      phase.status === "completed"
                        ? "border-green-200"
                        : phase.status === "in-progress"
                        ? "border-violet-200"
                        : "border-gray-200"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${phase.color}`}
                          >
                            {phase.icon}
                          </div>
                          {phase.name}
                        </CardTitle>
                        {getStatusBadge(phase.status)}
                      </div>
                      <CardDescription>
                        {formatDate(phase.start)} - {formatDate(phase.end)} (
                        {calculateDaysBetween(phase.start, phase.end)} dní)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{phase.description}</p>
                      <div className="w-full mb-3">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Průběh:</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress
                          value={phase.progress}
                          className="h-2 bg-violet-100"
                        />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-medium">Hlavní výstupy fáze:</div>
                        <ul className="list-disc pl-4 space-y-1">
                          {phase.tasks.map((task) => (
                            <li
                              key={task.id}
                              className={task.completed ? "text-gray-500" : ""}
                            >
                              {task.name}{" "}
                              {task.completed && (
                                <span className="text-green-600">(✓)</span>
                              )}
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
                    className={`hover:shadow-md transition-shadow ${
                      phase.status === "completed"
                        ? "border-green-200"
                        : phase.status === "in-progress"
                        ? "border-violet-200"
                        : "border-gray-200"
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${phase.color}`}
                          >
                            {phase.icon}
                          </div>
                          {phase.name}
                        </CardTitle>
                        {getStatusBadge(phase.status)}
                      </div>
                      <CardDescription>
                        {formatDate(phase.start)} - {formatDate(phase.end)} (
                        {calculateDaysBetween(phase.start, phase.end)} dní)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm mb-3">{phase.description}</p>
                      <div className="w-full mb-3">
                        <div className="flex justify-between mb-1 text-xs">
                          <span>Průběh:</span>
                          <span>{phase.progress}%</span>
                        </div>
                        <Progress
                          value={phase.progress}
                          className="h-2 bg-violet-100"
                        />
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-medium">Hlavní výstupy fáze:</div>
                        <ul className="list-disc pl-4 space-y-1">
                          {phase.tasks.map((task) => (
                            <li
                              key={task.id}
                              className={task.completed ? "text-gray-500" : ""}
                            >
                              {task.name}{" "}
                              {task.completed && (
                                <span className="text-green-600">(✓)</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-violet-200">
                <CardHeader className="bg-violet-50 border-b border-violet-100">
                  <CardTitle className="text-violet-800">
                    Celkový přehled fází
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-violet-100">
                          <th className="text-left py-2 text-violet-800">
                            Fáze
                          </th>
                          <th className="text-center py-2 text-violet-800">
                            Od
                          </th>
                          <th className="text-center py-2 text-violet-800">
                            Do
                          </th>
                          <th className="text-center py-2 text-violet-800">
                            Trvání (dny)
                          </th>
                          <th className="text-center py-2 text-violet-800">
                            Průběh
                          </th>
                          <th className="text-right py-2 text-violet-800">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {phases.map((phase) => {
                          const duration = calculateDaysBetween(
                            phase.start,
                            phase.end
                          )

                          return (
                            <tr
                              key={phase.id}
                              className="border-b hover:bg-violet-50"
                            >
                              <td className="py-2 flex items-center">
                                <div
                                  className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center ${phase.color}`}
                                >
                                  {phase.icon}
                                </div>
                                {phase.name}
                              </td>
                              <td className="text-center py-2">
                                {formatDate(phase.start)}
                              </td>
                              <td className="text-center py-2">
                                {formatDate(phase.end)}
                              </td>
                              <td className="text-center py-2">{duration}</td>
                              <td className="py-2">
                                <div className="flex items-center">
                                  <Progress
                                    value={phase.progress}
                                    className="h-2 w-32 bg-violet-100"
                                  />
                                  <span className="ml-2 text-xs">
                                    {phase.progress}%
                                  </span>
                                </div>
                              </td>
                              <td className="text-right py-2">
                                {getStatusBadge(phase.status)}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Celková délka projektu
                  </div>
                  <div className="text-2xl font-bold text-violet-900">
                    168 dní
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Aktuální fáze
                  </div>
                  <div className="text-xl font-bold text-violet-900">
                    {phases.find((p) => p.status === "in-progress")?.name ||
                      "Žádná"}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Celkový průběh
                  </div>
                  <div className="text-2xl font-bold text-violet-900">
                    {calculateOverallProgress()}%
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4 mt-4">
          <Card className="border-violet-200 shadow-md">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-violet-800">
                    Klíčové milníky projektu
                  </CardTitle>
                  <CardDescription>
                    Přehled důležitých termínů a událostí
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="relative">
                <div className="absolute left-[20px] top-0 bottom-0 w-0.5 bg-violet-200 z-0"></div>
                <div className="space-y-8">
                  {milestones.map((milestone, index) => {
                    const milestoneDate = new Date(milestone.date)
                    const today = new Date()
                    const isPast = milestoneDate < today
                    const isToday =
                      milestoneDate.toDateString() === today.toDateString()

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
                                ? "bg-amber-100 text-amber-600"
                                : "bg-violet-100 text-violet-600"
                            }`}
                          >
                            {milestone.completed ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              milestone.icon || (
                                <CalendarDays className="h-5 w-5" />
                              )
                            )}
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium">
                              {milestone.name}
                            </h3>
                            <Badge
                              className={`${
                                milestone.completed
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : isPast
                                  ? "bg-red-100 text-red-800 border-red-200"
                                  : isToday
                                  ? "bg-amber-100 text-amber-800 border-amber-200"
                                  : "bg-violet-100 text-violet-800 border-violet-200"
                              }`}
                            >
                              {milestone.completed
                                ? "Splněno"
                                : isPast
                                ? "Zpožděno"
                                : isToday
                                ? "Dnes"
                                : "Plánováno"}
                            </Badge>
                          </div>
                          <div className="text-sm mt-1 flex items-center">
                            <CalendarDays className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              Termín: {formatDate(milestone.date)}
                            </span>
                            {isPast && !milestone.completed && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-red-600 border-red-200"
                              >
                                Zpoždění:{" "}
                                {Math.floor(
                                  (today.getTime() - milestoneDate.getTime()) /
                                    (1000 * 60 * 60 * 24)
                                )}{" "}
                                dní
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <Card className="border-violet-200">
                <CardHeader className="bg-violet-50 border-b border-violet-100">
                  <CardTitle className="text-base text-violet-800">
                    Celková časová osa projektu
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="relative pt-1 pb-12">
                    <div className="absolute left-0 right-0 h-1 bg-violet-200 top-8"></div>
                    <div className="flex justify-between relative">
                      {milestones.map((milestone, index) => {
                        const milestoneDate = new Date(milestone.date)
                        const today = new Date()
                        const isPast = milestoneDate < today
                        const isCompleted = milestone.completed

                        return (
                          <div
                            key={index}
                            className="relative z-10 flex flex-col items-center"
                          >
                            <div
                              className="text-xs mb-2 text-center w-24 truncate"
                              title={milestone.name}
                            >
                              {milestone.name}
                            </div>
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                isCompleted
                                  ? "bg-green-600"
                                  : isPast
                                  ? "bg-red-500"
                                  : "bg-violet-500"
                              }`}
                            >
                              {isCompleted && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <div className="text-xs mt-2 text-muted-foreground">
                              {formatDate(milestone.date).split(" ")[0]}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-violet-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 bg-violet-50 border-b border-violet-100">
                    <CardTitle className="text-base text-violet-800">
                      Plánované milníky
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {milestones
                        .filter((m) => !m.completed)
                        .map((milestone, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm p-2 hover:bg-violet-50 rounded-md"
                          >
                            <span className="flex items-center">
                              <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center mr-2">
                                {milestone.icon || (
                                  <CalendarDays className="h-3 w-3" />
                                )}
                              </div>
                              {milestone.name}
                            </span>
                            <span className="text-muted-foreground">
                              {formatDate(milestone.date)}
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-violet-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 bg-violet-50 border-b border-violet-100">
                    <CardTitle className="text-base text-violet-800">
                      Dokončené milníky
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      {milestones
                        .filter((m) => m.completed)
                        .map((milestone, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm p-2 hover:bg-violet-50 rounded-md"
                          >
                            <span className="flex items-center">
                              <Check className="h-4 w-4 text-green-600 mr-2" />
                              {milestone.name}
                            </span>
                            <span className="text-muted-foreground">
                              {formatDate(milestone.date)}
                            </span>
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

                <Card className="border-violet-200 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2 bg-violet-50 border-b border-violet-100">
                    <CardTitle className="text-base text-violet-800">
                      Kritické termíny
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm p-2 hover:bg-violet-50 rounded-md">
                        <span>Podpis smlouvy</span>
                        <Badge
                          variant="outline"
                          className="text-red-600 border-red-200"
                        >
                          Kritické
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm p-2 hover:bg-violet-50 rounded-md">
                        <span>Dodání vybavení</span>
                        <Badge
                          variant="outline"
                          className="text-red-600 border-red-200"
                        >
                          Kritické
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm p-2 hover:bg-violet-50 rounded-md">
                        <span>Podpis franšízové smlouvy</span>
                        <Badge
                          variant="outline"
                          className="text-amber-600 border-amber-200"
                        >
                          Důležité
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-sm p-2 hover:bg-violet-50 rounded-md">
                        <span>Otevření prodejny</span>
                        <Badge
                          variant="outline"
                          className="text-red-600 border-red-200"
                        >
                          Kritické
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full">
                <div className="text-sm text-violet-700 mb-4">
                  <p>
                    Milníky představují klíčové události v průběhu projektu,
                    které jsou využívány pro sledování celkového postupu.
                    Dodržení termínů milníků je kritické pro úspěšné dokončení
                    projektu v plánovaném čase.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                    <div className="text-sm text-violet-800 font-medium">
                      Dokončené milníky
                    </div>
                    <div className="text-2xl font-bold text-violet-900">
                      {milestones.filter((m) => m.completed).length} /{" "}
                      {milestones.length}
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                    <div className="text-sm text-violet-800 font-medium">
                      Zpožděné milníky
                    </div>
                    <div className="text-2xl font-bold text-red-600">
                      {
                        milestones.filter(
                          (m) => new Date(m.date) < new Date() && !m.completed
                        ).length
                      }
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                    <div className="text-sm text-violet-800 font-medium">
                      Následující milník
                    </div>
                    <div className="text-lg font-bold text-violet-900">
                      {milestones.find(
                        (m) => !m.completed && new Date(m.date) >= new Date()
                      )?.name || "Žádný"}
                    </div>
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4 mt-4">
          <Card className="border-violet-200 shadow-md">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-violet-800">
                    Řízení rizik projektu
                  </CardTitle>
                  <CardDescription>
                    Identifikace, analýza a opatření proti rizikům
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {risks.map((risk) => (
                  <Card
                    key={risk.id}
                    className="border-violet-200 hover:shadow-md transition-shadow"
                  >
                    <CardHeader className="pb-2">
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleRiskExpand(risk.id)}
                      >
                        <CardTitle className="text-base flex items-center">
                          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                          {risk.name}
                          <ChevronDown
                            className={`ml-2 h-4 w-4 transition-transform ${
                              expandedRisk === risk.id ? "rotate-180" : ""
                            }`}
                          />
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            Dopad: {getRiskBadge(risk.impact)}
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                            Pravd.: {getRiskBadge(risk.probability)}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <h4 className="text-sm font-medium">Opatření:</h4>
                          <p className="text-sm text-muted-foreground">
                            {risk.mitigation}
                          </p>
                        </div>

                        {expandedRisk === risk.id && (
                          <div className="mt-4 space-y-3 bg-violet-50 p-3 rounded-md border border-violet-100 animate-in fade-in-50 duration-300">
                            <div>
                              <h4 className="text-xs font-medium text-violet-800">
                                Fáze projektu:
                              </h4>
                              <p className="text-xs">
                                {risk.phase === "all"
                                  ? "Všechny fáze"
                                  : phases.find((p) => p.id === risk.phase)
                                      ?.name || risk.phase}
                              </p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-violet-800">
                                Krizový plán:
                              </h4>
                              <p className="text-xs">{risk.contingency}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-violet-800">
                                Vlastník rizika:
                              </h4>
                              <p className="text-xs">{risk.owner}</p>
                            </div>
                            <div>
                              <h4 className="text-xs font-medium text-violet-800">
                                Status:
                              </h4>
                              <p className="text-xs">{risk.status}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="border-violet-200">
                <CardHeader className="bg-violet-50 border-b border-violet-100">
                  <CardTitle className="text-violet-800">
                    Celkové hodnocení rizik
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-4">
                    <p className="text-sm">
                      Projekt otevření Žabky čelí několika významným rizikům,
                      která byla identifikována a pro která byla navržena
                      zmírňující opatření. Celková rizikovost projektu je
                      hodnocena jako{" "}
                      <strong className="text-violet-800">střední</strong>.
                    </p>

                    <div>
                      <h3 className="text-sm font-medium mb-2 text-violet-800">
                        Nejvýznamnější rizika:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Zpoždění stavebních úprav</li>
                        <li>Problémy s získáním potřebných povolení</li>
                        <li>Překročení plánovaného rozpočtu</li>
                      </ul>
                    </div>

                    <Separator className="bg-violet-200" />

                    <div>
                      <h3 className="text-sm font-medium mb-2 text-violet-800">
                        Doporučená opatření:
                      </h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>
                          Vytvořit časovou rezervu v harmonogramu pro kritické
                          činnosti (min. 2 týdny)
                        </li>
                        <li>
                          Zajistit finanční rezervu ve výši min. 15% rozpočtu
                        </li>
                        <li>
                          Pravidelné kontrolní body pro sledování postupu
                          projektu (týdenní)
                        </li>
                        <li>
                          Včasná komunikace s úřady a předběžné konzultace před
                          podáním žádostí
                        </li>
                        <li>
                          Pečlivý výběr dodavatelů s referencemi a zkušenostmi s
                          podobnými projekty
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Vysoká priorita
                  </div>
                  <div className="text-2xl font-bold text-red-600">
                    {
                      risks.filter(
                        (r) => r.impact === "high" && r.probability === "medium"
                      ).length
                    }
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Střední priorita
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    {
                      risks.filter(
                        (r) =>
                          (r.impact === "medium" &&
                            r.probability === "medium") ||
                          (r.impact === "medium" && r.probability === "low")
                      ).length
                    }
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Aktivní rizika
                  </div>
                  <div className="text-2xl font-bold text-violet-900">
                    {risks.filter((r) => r.status === "Aktivní").length}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-4 mt-4">
          <Card className="border-violet-200 shadow-md">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-violet-800">
                    Požadovaná dokumentace
                  </CardTitle>
                  <CardDescription>
                    Přehled dokumentů potřebných v jednotlivých fázích projektu
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="bg-violet-50 rounded-lg p-4 border border-violet-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-violet-800">
                      Celkový stav dokumentace
                    </h3>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-gray-200 rounded-full mr-3">
                        <div
                          className="h-2 bg-violet-600 rounded-full"
                          style={{
                            width: `${
                              (documentStats.completed / documentStats.total) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-sm">
                        {Math.round(
                          (documentStats.completed / documentStats.total) * 100
                        )}
                        % dokončeno
                      </span>
                    </div>
                  </div>
                  <div className="space-x-1">
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      Hotovo: {documentStats.completed}
                    </Badge>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Rozpracováno: {documentStats.inProgress}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                      Čeká: {documentStats.pending}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {documents.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-1 h-6 bg-violet-500 rounded-full mr-2"></div>
                      <h3 className="text-lg font-medium text-violet-800">
                        {category.category}
                      </h3>
                    </div>
                    <div className="space-y-2 pl-3">
                      {category.items.map((doc, docIndex) => (
                        <div
                          key={docIndex}
                          className="flex items-start p-3 rounded-md hover:bg-violet-50 border border-violet-100 transition-colors"
                        >
                          <div className="mt-0.5 mr-3">
                            {getStatusIcon(doc.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div className="font-medium">{doc.name}</div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground">
                                  Termín: {formatDate(doc.deadline)}
                                </span>
                                {getStatusBadge(doc.status)}
                              </div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {doc.note}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Card className="border-violet-200">
                <CardHeader className="bg-violet-50 border-b border-violet-100">
                  <CardTitle className="text-violet-800">
                    Přehled dokumentů podle stavu
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-violet-100">
                          <th className="text-left py-2 text-violet-800">
                            Dokument
                          </th>
                          <th className="text-center py-2 text-violet-800">
                            Stav
                          </th>
                          <th className="text-center py-2 text-violet-800">
                            Kategorie
                          </th>
                          <th className="text-right py-2 text-violet-800">
                            Termín
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.flatMap((category) =>
                          category.items.map((doc, index) => (
                            <tr
                              key={index}
                              className="border-b hover:bg-violet-50"
                            >
                              <td className="py-2">{doc.name}</td>
                              <td className="text-center py-2">
                                {getStatusBadge(doc.status)}
                              </td>
                              <td className="text-center py-2">
                                <Badge
                                  variant="outline"
                                  className="border-violet-200 text-violet-800"
                                >
                                  {category.category}
                                </Badge>
                              </td>
                              <td className="text-right py-2">
                                {formatDate(doc.deadline)}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
            <CardFooter className="border-t pt-4 bg-violet-50">
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Dokončené dokumenty
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    {documentStats.completed}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Dokumenty v procesu
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    {documentStats.inProgress}
                  </div>
                </div>
                <div className="bg-white p-3 rounded-md shadow-sm border border-violet-100">
                  <div className="text-sm text-violet-800 font-medium">
                    Čekající dokumenty
                  </div>
                  <div className="text-2xl font-bold text-violet-900">
                    {documentStats.pending}
                  </div>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
