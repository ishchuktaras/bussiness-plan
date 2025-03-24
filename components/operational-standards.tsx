"use client"

import { useState } from "react"
import {
  AlertTriangle,
  BarChart4,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Info,
  Percent,
  ShoppingBag,
  XCircle,
} from "lucide-react"

import { cn } from "@/lib/utils"
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
import { MobileTabScroller } from "@/components/ui/mobile-tab-scroller"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function OperationalStandards() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({})

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-6">
      {/* Header with gradient background */}
      <div className="rounded-lg mb-6 bg-gradient-to-r from-violet-600 to-violet-400 p-4 sm:p-6 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Provozní normy</h1>
        <p className="text-sm md:text-base opacity-90">
          Kompletní přehled standardů a požadavků pro provoz franšízové prodejny
          Žabka
        </p>
      </div>

      <Tabs defaultValue="hours">
        <MobileTabScroller showScrollIndicators={true} value="hours">
          <TabsList className="flex flex-wrap w-full bg-white p-1 rounded-lg shadow-md">
            <TabsTrigger
              value="hours"
              className="px-3 py-2 text-l sm:text-sm whitespace-nowrap"
            >
              <span>Hodiny</span>
            </TabsTrigger>
            <TabsTrigger
              value="staff"
              className="flex items-center px-3 py-1.5 text-l sm:text-sm whitespace-nowrap"
            >
              <span>Personál</span>
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="flex items-center px-3 py-1.5 text-l sm:text-sm whitespace-nowrap"
            >
              <span>Produkty</span>
            </TabsTrigger>
            <TabsTrigger
              value="bakery"
              className="flex items-center px-3 py-1.5 text-l sm:text-sm whitespace-nowrap"
            >
              <span>Pekárna</span>
            </TabsTrigger>
            <TabsTrigger
              value="marketing"
              className="flex items-center px-3 py-1.5 text-l sm:text-sm whitespace-nowrap"
            >
              <span>Marketing</span>
            </TabsTrigger>
            <TabsTrigger
              value="kpis"
              className="flex items-center px-3 py-1.5 text-l sm:text-sm whitespace-nowrap"
            >
              <span>KPI</span>
            </TabsTrigger>
          </TabsList>
        </MobileTabScroller>

        <TabsContent value="hours" className="mt-4">
          <Card className="border-violet-200">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-violet-800">
                    <Clock className="mr-2 h-5 w-5 text-violet-600" />
                    Otevírací doba
                  </CardTitle>
                  <CardDescription>
                    Požadovaná provozní doba a zásady
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-violet-100 text-violet-800 border-violet-200"
                >
                  Oddíl 3.12 smlouvy
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3 text-violet-800 flex items-center">
                      <Info className="mr-2 h-5 w-5 text-violet-600" />
                      Standardní provozní doba
                    </h3>

                    <div className="bg-violet-50 p-4 rounded-md border border-violet-100">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Sedm (7) dní v týdnu (včetně nedělí a svátků)
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Od 6:00 do 23:00 denně</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Jakékoli změny provozní doby musí být písemně
                            dohodnuty s franšízorem
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-violet-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Výjimky mohou platit prostřednictvím Manuálu nebo na
                            základě dohody
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 text-violet-800 flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                      Sankce za nedodržení
                    </h3>

                    <div className="bg-red-50 p-4 rounded-md border border-red-100">
                      <p className="text-sm text-gray-600 mb-3">
                        Podle oddílu 9.6 franšízové smlouvy:
                      </p>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Celodenní uzavření: Až 50 000 Kč pokuta za
                            kalendářní den
                          </span>
                        </li>
                        <li className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Částečné denní uzavření: Až 700 Kč pokuta za 15
                            minut
                          </span>
                        </li>
                        <li className="flex items-start">
                          <XCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>
                            Opakované porušení může vést k ukončení franšízové
                            smlouvy
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800 flex items-center">
                    <Percent className="mr-2 h-5 w-5 text-amber-500" />
                    Úpravy provize
                  </h3>

                  <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                    <p className="text-sm text-gray-600 mb-3">
                      Pokud je otevírací doba upravena dohodou, fixní provize se
                      snižuje:
                    </p>

                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded border border-amber-100">
                        <h4 className="font-medium text-amber-700 mb-2">
                          Výpočet snížení
                        </h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                            440 Kč
                          </Badge>
                          <span>
                            za každou 1 hodinu snížení denní provozní doby
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Vzorec: 110 Kč × 4 × počet dnů se sníženou dobou
                        </div>
                      </div>

                      <div className="p-3 bg-white rounded border border-amber-100">
                        <h4 className="font-medium text-amber-700 mb-2">
                          Podmínky aplikace
                        </h4>
                        <p className="text-sm">
                          Snížení platí, když změny trvají více než 16 dní v
                          měsíci
                        </p>
                      </div>

                      <div className="p-3 bg-white rounded border border-amber-100">
                        <h4 className="font-medium text-amber-700 mb-2">
                          Příklad výpočtu
                        </h4>
                        <div className="text-sm space-y-2">
                          <p>
                            Obchod otevřený od 7:00 do 22:00 (2 hodiny méně)
                          </p>
                          <p>Po dobu 20 dní v měsíci</p>
                          <p className="font-medium">
                            Snížení: 2 × 440 Kč = 880 Kč měsíčně
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 p-4 rounded-md border border-violet-100 mt-6">
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Doporučený rozvrh směn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Ranní směna
                    </h4>
                    <p className="text-sm">6:00 - 14:00</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Doporučený počet zaměstnanců: 2
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Odpolední směna
                    </h4>
                    <p className="text-sm">14:00 - 23:00</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Doporučený počet zaměstnanců: 2
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="mt-4">
          <Card className="border-violet-200">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-violet-800">
                    <ShoppingBag className="mr-2 h-5 w-5 text-violet-600" />
                    Požadavky na personál
                  </CardTitle>
                  <CardDescription>
                    Personální standardy a vzhled
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-violet-100 text-violet-800 border-violet-200"
                >
                  Oddíl 4.8 smlouvy
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div
                    className={cn(
                      "border rounded-lg transition-all duration-300 overflow-hidden",
                      expandedSections["uniform"]
                        ? "border-violet-300"
                        : "border-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "flex justify-between items-center p-4 cursor-pointer",
                        expandedSections["uniform"]
                          ? "bg-violet-50"
                          : "bg-white hover:bg-gray-50"
                      )}
                      onClick={() => toggleSection("uniform")}
                    >
                      <h3 className="text-lg font-medium flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          01
                        </Badge>
                        Uniforma personálu
                      </h3>
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 text-violet-600 transition-transform duration-300",
                          expandedSections["uniform"] ? "rotate-90" : ""
                        )}
                      />
                    </div>

                    {expandedSections["uniform"] && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div className="bg-green-50 p-3 rounded-md border border-green-100">
                            <div className="font-medium mb-2 text-green-800 flex items-center">
                              <CheckCircle2 className="h-4 w-4 mr-1.5 text-green-600" />
                              Schváleno
                            </div>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Černé tričko s logem společnosti</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Zelené tričko s logem společnosti</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Firemní vesta</span>
                              </li>
                            </ul>
                          </div>
                          <div className="bg-red-50 p-3 rounded-md border border-red-100">
                            <div className="font-medium mb-2 text-red-800 flex items-center">
                              <XCircle className="h-4 w-4 mr-1.5 text-red-600" />
                              Není povoleno
                            </div>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>
                                  Pokrývky hlavy (čepice, kšilty) na prodejní
                                  ploše
                                </span>
                              </li>
                              <li className="flex items-start">
                                <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Nefiremní oblečení</span>
                              </li>
                              <li className="flex items-start">
                                <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Špinavé nebo poškozené uniformy</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="bg-violet-50 p-3 rounded-md border border-violet-100">
                          <h4 className="font-medium text-violet-800 mb-2">
                            Objednávání uniforem
                          </h4>
                          <p className="text-sm">
                            Uniformy lze objednat prostřednictvím portálu
                            franšízanta. Každý zaměstnanec má nárok na 2 trička
                            a 1 vestu ročně zdarma.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "border rounded-lg transition-all duration-300 overflow-hidden mt-4",
                      expandedSections["service"]
                        ? "border-violet-300"
                        : "border-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "flex justify-between items-center p-4 cursor-pointer",
                        expandedSections["service"]
                          ? "bg-violet-50"
                          : "bg-white hover:bg-gray-50"
                      )}
                      onClick={() => toggleSection("service")}
                    >
                      <h3 className="text-lg font-medium flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          02
                        </Badge>
                        Standardy zákaznického servisu
                      </h3>
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 text-violet-600 transition-transform duration-300",
                          expandedSections["service"] ? "rotate-90" : ""
                        )}
                      />
                    </div>

                    {expandedSections["service"] && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                          <h4 className="font-medium text-blue-800 mb-3">
                            Princip zákaznického servisu 3P:
                          </h4>
                          <div className="space-y-3">
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <div className="flex items-center">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                  1
                                </Badge>
                                <span className="ml-2 font-medium">
                                  Pozdravit zákazníka
                                </span>
                              </div>
                              <p className="text-sm mt-1 text-gray-600">
                                Každý zákazník musí být pozdraven do 5 sekund od
                                vstupu do prodejny.
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <div className="flex items-center">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                  2
                                </Badge>
                                <span className="ml-2 font-medium">
                                  Poděkovat zákazníkovi
                                </span>
                              </div>
                              <p className="text-sm mt-1 text-gray-600">
                                Po dokončení nákupu vždy poděkujte zákazníkovi.
                              </p>
                            </div>
                            <div className="bg-white p-3 rounded border border-blue-100">
                              <div className="flex items-center">
                                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                                  3
                                </Badge>
                                <span className="ml-2 font-medium">
                                  Rozloučit se
                                </span>
                              </div>
                              <p className="text-sm mt-1 text-gray-600">
                                Přejte zákazníkovi hezký den nebo podobnou frázi
                                na rozloučenou.
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 border-blue-200"
                            >
                              Vyžadováno smlouvou
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 border-blue-200"
                            >
                              Pravidelně kontrolováno
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 border-blue-200"
                            >
                              Vliv na bonus
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div
                    className={cn(
                      "border rounded-lg transition-all duration-300 overflow-hidden",
                      expandedSections["training"]
                        ? "border-violet-300"
                        : "border-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "flex justify-between items-center p-4 cursor-pointer",
                        expandedSections["training"]
                          ? "bg-violet-50"
                          : "bg-white hover:bg-gray-50"
                      )}
                      onClick={() => toggleSection("training")}
                    >
                      <h3 className="text-lg font-medium flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          03
                        </Badge>
                        Požadavky na školení
                      </h3>
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 text-violet-600 transition-transform duration-300",
                          expandedSections["training"] ? "rotate-90" : ""
                        )}
                      />
                    </div>

                    {expandedSections["training"] && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="border p-3 rounded-md">
                            <div className="font-medium mb-2 flex items-center">
                              <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                                A
                              </Badge>
                              Úvodní školení
                            </div>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Povinné před zahájením provozu</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Zahrnuje provoz obchodu a manuál</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Franšízant se musí zúčastnit osobně</span>
                              </li>
                            </ul>
                          </div>
                          <div className="border p-3 rounded-md">
                            <div className="font-medium mb-2 flex items-center">
                              <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                                B
                              </Badge>
                              Průběžné školení
                            </div>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>
                                  Pravidelné školení organizované franšízorem
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>
                                  Franšízant se musí zúčastnit a zajistit účast
                                  personálu
                                </span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Náklady hradí franšízant</span>
                              </li>
                            </ul>
                          </div>
                          <div className="border p-3 rounded-md">
                            <div className="font-medium mb-2 flex items-center">
                              <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                                C
                              </Badge>
                              E-learningové kurzy
                            </div>
                            <ul className="text-sm space-y-2">
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Dostupné na portálu franšízanta</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>Povinné pro všechny zaměstnance</span>
                              </li>
                              <li className="flex items-start">
                                <CheckCircle2 className="h-4 w-4 text-violet-600 mr-1.5 mt-0.5 flex-shrink-0" />
                                <span>
                                  Musí být dokončeny do 30 dnů od nástupu
                                </span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={cn(
                      "border rounded-lg transition-all duration-300 overflow-hidden mt-4",
                      expandedSections["prohibited"]
                        ? "border-violet-300"
                        : "border-gray-200"
                    )}
                  >
                    <div
                      className={cn(
                        "flex justify-between items-center p-4 cursor-pointer",
                        expandedSections["prohibited"]
                          ? "bg-violet-50"
                          : "bg-white hover:bg-gray-50"
                      )}
                      onClick={() => toggleSection("prohibited")}
                    >
                      <h3 className="text-lg font-medium flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          04
                        </Badge>
                        Zakázané činnosti
                      </h3>
                      <ChevronRight
                        className={cn(
                          "h-5 w-5 text-violet-600 transition-transform duration-300",
                          expandedSections["prohibited"] ? "rotate-90" : ""
                        )}
                      />
                    </div>

                    {expandedSections["prohibited"] && (
                      <div className="p-4 border-t border-gray-200">
                        <div className="bg-red-50 p-4 rounded-md border border-red-100">
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>
                                Používání mobilních telefonů u pokladny
                              </span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>
                                Komunikace s médii bez souhlasu franšízora
                              </span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>Provozování konkurenčních podniků</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>Neoprávněné úpravy obchodu</span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>
                                Konzumace alkoholu během pracovní doby
                              </span>
                            </li>
                            <li className="flex items-start">
                              <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                              <span>Kouření v prostorách prodejny</span>
                            </li>
                          </ul>
                          <div className="mt-4 p-3 bg-white rounded border border-red-100">
                            <h4 className="font-medium text-red-800 mb-1">
                              Důsledky porušení
                            </h4>
                            <p className="text-sm">
                              Porušení těchto pravidel může vést k finančním
                              sankcím nebo v závažných případech k ukončení
                              franšízové smlouvy.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 p-4 rounded-md border border-violet-100 mt-4">
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Hodnocení personálu
                </h3>
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Kritéria hodnocení
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm mb-1">
                          Zákaznický servis
                        </div>
                        <Progress value={80} className="h-2 mb-1" />
                        <div className="text-xs text-right">80% váha</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm mb-1">
                          Vzhled a uniforma
                        </div>
                        <Progress value={60} className="h-2 mb-1" />
                        <div className="text-xs text-right">60% váha</div>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm mb-1">
                          Znalost produktů
                        </div>
                        <Progress value={70} className="h-2 mb-1" />
                        <div className="text-xs text-right">70% váha</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Doporučený počet personálu
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm mb-1">
                          Standardní obchod
                        </div>
                        <p className="text-sm">
                          Minimálně 4 zaměstnanci celkem
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Včetně franšízanta
                        </p>
                      </div>
                      <div className="p-2 border rounded-md">
                        <div className="font-medium text-sm mb-1">
                          Obchod s rozšířenou otevírací dobou
                        </div>
                        <p className="text-sm">
                          Minimálně 6 zaměstnanců celkem
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Včetně franšízanta
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card className="border-violet-200">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-violet-800">
                    <Percent className="mr-2 h-5 w-5 text-violet-600" />
                    Standardy produktů
                  </CardTitle>
                  <CardDescription>
                    Požadavky na dostupnost a prezentaci produktů
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-violet-100 text-violet-800 border-violet-200"
                >
                  Oddíl 5.2 smlouvy
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Povinné kategorie produktů
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-medium mb-2 text-violet-800">
                      Ovoce a zelenina
                    </div>
                    <p className="text-xs mb-2 text-gray-500">
                      Požadované položky:
                    </p>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Banány</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Citrony</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Jablka</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Okurky</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Cherry rajčata (250g)</span>
                      </li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Badge className="bg-violet-100 text-violet-800 border-violet-200">
                        Kontrolováno denně
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-medium mb-2 text-violet-800">
                      Mléčné výrobky
                    </div>
                    <p className="text-xs mb-2 text-gray-500">
                      Požadavky na prezentaci:
                    </p>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Max. 2 viditelné mezery v modulu</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Všechny produkty s cenovkou</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Jednotná velikost cenovek</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Max. 1 chybějící cenovka</span>
                      </li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Badge className="bg-violet-100 text-violet-800 border-violet-200">
                        Vliv na bonus
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="font-medium mb-2 text-violet-800">
                      Obecné požadavky
                    </div>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Max. 3 viditelné mezery na modul</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Produkty seskupené podle kategorie</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Všechny produkty s cenovkou</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Max. 2 chybějící cenovky</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Žádné prošlé produkty</span>
                      </li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <Badge className="bg-violet-100 text-violet-800 border-violet-200">
                        Vyžadováno smlouvou
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Objednávání a správa produktů
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Produkty musí být objednávány ze seznamu schválených
                          dodavatelů franšízora
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Zboží zůstává majetkem franšízora až do prodeje
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Franšízant odpovídá za ztráty a poškození produktů
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Pravidelné kontroly zásob prováděné franšízorem
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">
                        Objednávkový systém
                      </h4>
                      <p className="text-sm">
                        Objednávky se zadávají prostřednictvím portálu
                        franšízanta nejpozději 48 hodin před požadovaným
                        dodáním.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Pravidla pro lokální produkty
                  </h3>
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <p className="mb-3 text-sm">
                      Franšízant může prodávat vlastní produkty (&quot;Zboží
                      Franchisanta&quot;) s omezeními:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Maximálně 10 produktových rodin</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Produkty musí být schváleny a registrovány franšízorem
                        </span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Nesmí zahrnovat: alkohol {`>15%`}, nealkoholické
                          nápoje (kromě čerstvých šťáv), kávu, čaj, tabák,
                          mražené produkty, pochutiny
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Provize: 5% z prodejní ceny franšízorovi</span>
                      </li>
                      <li className="flex items-start">
                        <Info className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Lokální produkty musí být vystaveny v rámci
                          příslušných kategorií produktů
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Požadavky na tabákové výrobky
                </h3>
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Musí dodržovat planogram franšízora pro tabákové
                            výrobky
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Podléhá kontrole franšízorem nebo třetími stranami
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>Bonus: 1 000 Kč za čtvrtletí při dodržení</span>
                        </li>
                        <li className="flex items-start">
                          <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>Pokuta: Až 3 000 Kč za nedodržení</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded-md border border-amber-100">
                      <h4 className="font-medium text-amber-800 mb-2">
                        Planogram tabákových výrobků
                      </h4>
                      <p className="text-sm mb-2">
                        Aktuální planogram je dostupný na portálu franšízanta a
                        musí být implementován do 48 hodin od zveřejnění.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                      >
                        <Download className="mr-2 h-3 w-3" />
                        Stáhnout aktuální planogram
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 p-4 rounded-md border border-violet-100">
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Kontrolní seznam produktů
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Denní kontrola
                    </h4>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Kontrola expirace produktů</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Doplnění chybějících produktů</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Kontrola cenovek</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Týdenní kontrola
                    </h4>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Kontrola planogramů</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Kontrola akčních nabídek</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Inventura kritických položek</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Měsíční kontrola
                    </h4>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Kompletní inventura</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Analýza prodejů</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Optimalizace objednávek</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bakery" className="mt-4">
          <Card className="border-violet-200">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-violet-800">
                    <BookOpen className="mr-2 h-5 w-5 text-violet-600" />
                    Standardy pekárny
                  </CardTitle>
                  <CardDescription>
                    Požadavky na pekárnu a prezentaci
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-violet-100 text-violet-800 border-violet-200"
                >
                  Oddíl 6.3 smlouvy
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Nebalené pekařské výrobky - Ráno (6:00-14:00)
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-violet-100 text-violet-800 border-violet-200 mr-2">
                          Slané
                        </Badge>
                        <h4 className="font-medium">Požadavky</h4>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 8 druhů</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 40 kusů celkem</span>
                        </li>
                        <li className="flex items-center">
                          <Info className="h-4 w-4 text-blue-600 mr-1.5 flex-shrink-0" />
                          <span>Kromě základních rohlíků (rohlík, houska)</span>
                        </li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          Doporučené druhy: bagety, ciabatta, kaiserky,
                          dalamánky, pletýnky
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 mr-2">
                          Sladké
                        </Badge>
                        <h4 className="font-medium">Požadavky</h4>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 5 druhů</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 25 kusů celkem</span>
                        </li>
                      </ul>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          Doporučené druhy: koláče, croissanty, muffiny,
                          šátečky, buchty
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Nebalené pekařské výrobky - Odpoledne (14:00-19:00)
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-violet-100 text-violet-800 border-violet-200 mr-2">
                          Slané
                        </Badge>
                        <h4 className="font-medium">Požadavky</h4>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 6 druhů</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 30 kusů celkem</span>
                        </li>
                        <li className="flex items-center">
                          <Info className="h-4 w-4 text-blue-600 mr-1.5 flex-shrink-0" />
                          <span>Kromě základních rohlíků (rohlík, houska)</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm">
                      <div className="flex items-center mb-3">
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 mr-2">
                          Sladké
                        </Badge>
                        <h4 className="font-medium">Požadavky</h4>
                      </div>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 5 druhů</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Minimálně 20 kusů celkem</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Balené pekařské výrobky - Ráno (6:00-14:00)
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Minimálně 3 druhy baleného chleba</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Minimálně 3 druhy toustového chleba</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Minimálně 6 druhů sladkých balených výrobků (koláče,
                          štrúdl atd.)
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">
                        Tip pro zvýšení prodejů
                      </h4>
                      <p className="text-sm">
                        Umístěte balené pečivo do blízkosti pokladny pro
                        impulzivní nákupy.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Balené pekařské výrobky - Odpoledne (14:00-19:00)
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Minimálně 2 druhy baleného chleba</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Minimálně 2 druhy toustového chleba</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Minimálně 4 druhy sladkých balených výrobků</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Maximálně 2 viditelné mezery na regálech pekárny
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">
                        Slevy na konci dne
                      </h4>
                      <p className="text-sm">
                        Od 19:00 je možné aplikovat slevy 30% na nebalené pečivo
                        pro minimalizaci odpisu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Požadavky na prezentaci pekárny
                </h3>
                <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Sáčky a rukavice k dispozici pro zákazníky
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>Odpadkový koš s víkem v blízkosti pekárny</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>Všechny produkty mají cenovky</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>Pouze nebalené zboží v pekařských koších</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>Čisté koše a pečicí papíry</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Balené produkty jasně rozdělené na slané a sladké
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Seznam ingrediencí viditelný pro nebalené produkty
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded border border-amber-100">
                    <h4 className="font-medium text-amber-800 mb-1">
                      Kontrolní seznam pekárny
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span className="text-sm">Ranní kontrola</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span className="text-sm">Odpolední kontrola</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span className="text-sm">Večerní úklid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 p-4 rounded-md border border-violet-100">
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Vliv na bonus
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Standardní obchod
                    </h4>
                    <p className="text-sm mb-2">
                      Maximální měsíční bonus za pekárnu: 6 500 Kč
                    </p>
                    <Progress value={65} className="h-2 mb-2" />
                    <div className="text-xs text-gray-500">
                      Představuje 19% z celkového možného bonusu
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Kancelářský obchod
                    </h4>
                    <p className="text-sm mb-2">
                      Maximální měsíční bonus za pekárnu: 3 900 Kč
                    </p>
                    <Progress value={65} className="h-2 mb-2" />
                    <div className="text-xs text-gray-500">
                      Představuje 19% z celkového možného bonusu
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="mt-4">
          <Card className="border-violet-200">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-violet-800">
                    <Calendar className="mr-2 h-5 w-5 text-violet-600" />
                    Marketingové standardy
                  </CardTitle>
                  <CardDescription>
                    Požadavky na propagaci a vizuální prezentaci
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="bg-violet-100 text-violet-800 border-violet-200"
                >
                  Oddíl 7.1 smlouvy
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Povinné propagační aktivity
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Aktivní prodej produktů v zóně pokladny</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Účast na propagačních a reklamních kampaních
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Implementace spotřebitelských her a soutěží</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Instalace propagačních předmětů a značení dodaných
                          franšízorem
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-blue-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Štítky se sníženou cenou musí být na žlutém papíře
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-blue-100">
                      <h4 className="font-medium text-blue-800 mb-1">
                        Marketingový kalendář
                      </h4>
                      <p className="text-sm">
                        Aktuální marketingový kalendář je dostupný na portálu
                        franšízanta a je aktualizován měsíčně.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Vzhled obchodu
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="border p-3 rounded-md">
                      <div className="font-medium mb-2 flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          Exteriér
                        </Badge>
                        Standardy exteriéru
                      </div>
                      <ul className="text-sm space-y-1.5">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Čistý prostor kolem vchodu do obchodu</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Čisté vstupní dveře a okna</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Pouze autorizované označení na vstupních dveřích
                          </span>
                        </li>
                        <li className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1.5 flex-shrink-0" />
                          <span>Žádné neautorizované reklamní nálepky</span>
                        </li>
                      </ul>
                    </div>
                    <div className="border p-3 rounded-md">
                      <div className="font-medium mb-2 flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          Interiér
                        </Badge>
                        Standardy interiéru
                      </div>
                      <ul className="text-sm space-y-1.5">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Čisté podlahy a zametené rohožky</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Čistý odpadkový koš s víkem u kávovaru</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Čisté a funkční nákupní košíky</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Čisté chladicí zařízení bez námrazy</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                          <span>Čisté a nepoškozené regály a lišty</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Požadavky na značku
                  </h3>
                  <div className="bg-green-50 p-4 rounded-md border border-green-100">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Povinné používání loga Žabka</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Personál musí nosit určené pracovní oblečení
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Jednotný vzhled obchodu podle standardů</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Žádné neoprávněné úpravy designu obchodu</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Ochrana práv duševního vlastnictví</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-green-100">
                      <h4 className="font-medium text-green-800 mb-1">
                        Brandbook
                      </h4>
                      <p className="text-sm">
                        Kompletní brandbook s pravidly pro používání značky je
                        dostupný na portálu franšízanta.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Požadavky na aktivní prodejní položku
                  </h3>
                  <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Zobrazit aktivní prodejní položku v zóně pokladny
                          podle specifikace v týdenní zprávě
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Personál musí aktivně nabízet tento produkt zákazníkům
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>Dvě různé nabídky během měsíce</span>
                      </li>
                      <li className="flex items-start">
                        <XCircle className="h-4 w-4 text-red-600 mr-1.5 mt-0.5 flex-shrink-0" />
                        <span>
                          Nezobrazení nebo nenabízení vede k hodnocení 0 Kč pro
                          toto kritérium
                        </span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-white rounded border border-amber-100">
                      <h4 className="font-medium text-amber-800 mb-1">
                        Aktuální aktivní prodejní položka
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">
                            Croissant s náplní
                          </p>
                          <p className="text-xs text-gray-500">
                            Platnost: 15.3. - 31.3.2025
                          </p>
                        </div>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                          29 Kč
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 p-4 rounded-md border border-violet-100">
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Sezónní marketingové aktivity
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Jaro (březen-květen)
                    </h4>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Velikonoční nabídka</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Jarní osvěžení</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Grilování</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Léto (červen-srpen)
                    </h4>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Zmrzliny a ledové nápoje</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Letní osvěžení</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Cestování a výlety</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Podzim/Zima (září-únor)
                    </h4>
                    <ul className="text-sm space-y-1.5">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Zpátky do školy</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Vánoční nabídka</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1.5 flex-shrink-0" />
                        <span>Teplé nápoje</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="mt-4">
          <Card className="border-violet-200">
            <CardHeader className="bg-violet-50 rounded-t-lg border-b border-violet-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center text-violet-800">
                    <BarChart4 className="mr-2 h-5 w-5 text-violet-600" />
                    Klíčové ukazatele výkonnosti
                  </CardTitle>
                  <CardDescription>
                    Metriky výkonu a systém hodnocení
                  </CardDescription>
                </div>
                \
                <Badge
                  variant="outline"
                  className="bg-violet-100 text-violet-800 border-violet-200"
                >
                  Oddíl 8.4 smlouvy
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Systém hodnocení obchodu
                </h3>
                <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                  <p className="mb-3 text-sm">
                    Obchody jsou hodnoceny na základě systému kontrolního
                    seznamu s potenciálními odměnami:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md border border-blue-100 shadow-sm">
                      <div className="font-medium mb-2 text-blue-800">
                        Běžný obchod
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm">Maximální měsíční bonus:</p>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          34 000 Kč
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Zákaznický servis</span>
                            <span className="font-medium">2 500 Kč</span>
                          </div>
                          <Progress value={7.4} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy exteriéru</span>
                            <span className="font-medium">1 000 Kč</span>
                          </div>
                          <Progress value={2.9} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy interiéru</span>
                            <span className="font-medium">1 000 Kč</span>
                          </div>
                          <Progress value={2.9} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy pekárny</span>
                            <span className="font-medium">6 500 Kč</span>
                          </div>
                          <Progress value={19.1} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy produktů</span>
                            <span className="font-medium">19 500 Kč</span>
                          </div>
                          <Progress value={57.4} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy služeb</span>
                            <span className="font-medium">3 500 Kč</span>
                          </div>
                          <Progress value={10.3} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-md border border-blue-100 shadow-sm">
                      <div className="font-medium mb-2 text-blue-800">
                        Kancelářský obchod (Brno Tuřanka)
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm">Maximální měsíční bonus:</p>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          20 400 Kč
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Zákaznický servis</span>
                            <span className="font-medium">1 500 Kč</span>
                          </div>
                          <Progress value={7.4} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy exteriéru</span>
                            <span className="font-medium">600 Kč</span>
                          </div>
                          <Progress value={2.9} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy interiéru</span>
                            <span className="font-medium">600 Kč</span>
                          </div>
                          <Progress value={2.9} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy pekárny</span>
                            <span className="font-medium">3 900 Kč</span>
                          </div>
                          <Progress value={19.1} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy produktů</span>
                            <span className="font-medium">11 700 Kč</span>
                          </div>
                          <Progress value={57.4} className="h-1.5" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Standardy služeb</span>
                            <span className="font-medium">2 100 Kč</span>
                          </div>
                          <Progress value={10.3} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Hodnocení výkonu
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <div className="font-medium mb-2 text-violet-800 flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          01
                        </Badge>
                        Frekvence kontrol
                      </div>
                      <ul className="text-sm space-y-1.5">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-violet-500 mr-1.5 flex-shrink-0" />
                          <span>Pravidelné kontroly prováděné franšízorem</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-violet-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Neohlášené návštěvy ke kontrole dodržování
                          </span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-violet-500 mr-1.5 flex-shrink-0" />
                          <span>
                            V kalendářním měsíci je možných více kontrol
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <div className="font-medium mb-2 text-violet-800 flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          02
                        </Badge>
                        Důsledky špatného výkonu
                      </div>
                      <ul className="text-sm space-y-1.5">
                        <li className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Neuspokojivé výsledky mohou vést k finančním sankcím
                          </span>
                        </li>
                        <li className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Opakovaný špatný výkon může být důvodem k ukončení
                          </span>
                        </li>
                        <li className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Tři případy nulové odměny představují
                            &quot;opakovaný&quot; špatný výkon
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white border border-violet-100 p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                      <div className="font-medium mb-2 text-violet-800 flex items-center">
                        <Badge className="mr-2 bg-violet-100 text-violet-800 border-violet-200">
                          03
                        </Badge>
                        Proces zlepšování
                      </div>
                      <ul className="text-sm space-y-1.5">
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-violet-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Zjištěné problémy musí být napraveny v časovém rámci
                            stanoveném franšízorem
                          </span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-violet-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Neodstranění problémů může vést k dalším sankcím
                          </span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-violet-500 mr-1.5 flex-shrink-0" />
                          <span>
                            Franšízant musí implementovat nápravná opatření pro
                            všechny nedostatky
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3 text-violet-800">
                    Speciální bonusy a správa zásob
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-md border border-green-100">
                      <h4 className="font-medium text-green-800 mb-2">
                        Speciální bonusy
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Dodržování planogramu tabáku: 1 000 Kč za čtvrtletí
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Sezónní propagační kampaně: Dodatečné bonusy podle
                            specifikace
                          </span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle2 className="h-4 w-4 text-green-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Pobídky založené na výkonu za překročení prodejních
                            cílů
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-md border border-amber-100">
                      <h4 className="font-medium text-amber-800 mb-2">
                        Správa zásob
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Info className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Pravidelné kontroly zásob prováděné franšízorem
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>Franšízant se musí účastnit kontrol zásob</span>
                        </li>
                        <li className="flex items-start">
                          <Info className="h-4 w-4 text-amber-600 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Rozdíly v zásobách ovlivňují zadržení 2 % variabilní
                            provize
                          </span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Pokud ztráty přesáhnou 2,49 % prodeje, zadržení se
                            zvýší na 3 %
                          </span>
                        </li>
                        <li className="flex items-start">
                          <AlertTriangle className="h-4 w-4 text-red-500 mr-1.5 mt-0.5 flex-shrink-0" />
                          <span>
                            Vysoké ztráty zásob (≥4 %) mohou vyvolat dodatečné
                            inventury na náklady franšízanta
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white p-4 rounded-md border border-violet-100 shadow-sm">
                      <h4 className="font-medium text-violet-800 mb-2">
                        Hodnotící formulář
                      </h4>
                      <p className="text-sm mb-3">
                        Hodnocení probíhá pomocí standardizovaného formuláře,
                        který obsahuje všechny kontrolované položky a jejich
                        váhu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 p-4 rounded-md border border-violet-100">
                <h3 className="text-lg font-medium mb-3 text-violet-800">
                  Průměrné hodnocení obchodů
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Průměrné obchody
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Průměrné plnění:</span>
                      <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                        75-85%
                      </Badge>
                    </div>
                    <Progress value={80} className="h-2 mb-2" />
                    <p className="text-xs text-gray-500">
                      Průměrný měsíční bonus: 25 500 - 28 900 Kč
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Nejlepší obchody
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Průměrné plnění:</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        90-100%
                      </Badge>
                    </div>
                    <Progress value={95} className="h-2 mb-2" />
                    <p className="text-xs text-gray-500">
                      Průměrný měsíční bonus: 30 600 - 34 000 Kč
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-violet-100">
                    <h4 className="font-medium text-violet-700 mb-2">
                      Podprůměrné obchody
                    </h4>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm">Průměrné plnění:</span>
                      <Badge className="bg-red-100 text-red-800 border-red-200">
                        60-74%
                      </Badge>
                    </div>
                    <Progress value={67} className="h-2 mb-2" />
                    <p className="text-xs text-gray-500">
                      Průměrný měsíční bonus: 20 400 - 25 160 Kč
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
