"use client"

import { useState } from "react"
import { ClipboardCheck, Check, X, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

export default function InspectionChecklist() {
  const [selectedCategory, setSelectedCategory] = useState("customer")

  const checklistItems = {
    customer: [
      { id: 1, label: "Personál nosí firemní uniformu (černé nebo zelené tričko s logem společnosti nebo vestu)" },
      { id: 2, label: "Personál nepoužívá mobilní telefon u pokladny" },
      { id: 3, label: "Personál zdraví, děkuje a loučí se se zákazníky (princip 3N/3P)" },
      { id: 4, label: "Aktivní prodejní položka je vystavena v zóně pokladny" },
      { id: 5, label: "Personál aktivně nabízí vystavený produkt zákazníkům" },
    ],
    exterior: [
      { id: 6, label: "Čistý prostor kolem obchodu a u vchodu" },
      { id: 7, label: "Čisté vstupní dveře a okna, pouze autorizované označení na vstupních dveřích" },
      { id: 8, label: "Fasáda a exteriér bez neautorizovaných reklamních nálepek" },
    ],
    interior: [
      { id: 9, label: "Čisté podlahy, zametené rohožky" },
      { id: 10, label: "Podlaha není viditelně znečištěná, čistý odpadkový koš s víkem u kávovaru" },
      { id: 11, label: "Čisté a funkční nákupní košíky a vozíky" },
      { id: 12, label: "Všechna chladicí a mrazicí zařízení čistá, bez námrazy" },
      { id: 13, label: "Čisté a nepoškozené regály a lišty" },
    ],
    bakery: [
      { id: 14, label: "Minimálně 8 druhů slaného pečiva (6:00-14:00), min. 40 kusů celkem" },
      { id: 15, label: "Minimálně 5 druhů sladkého pečiva (6:00-14:00), min. 25 kusů celkem" },
      { id: 16, label: "Minimálně 6 druhů slaného pečiva (14:00-19:00), min. 30 kusů celkem" },
      { id: 17, label: "Minimálně 5 druhů sladkého pečiva (14:00-19:00), min. 20 kusů celkem" },
      { id: 18, label: "Sáčky a rukavice k dispozici pro zákazníky" },
      { id: 19, label: "Odpadkový koš s víkem v blízkosti pekárny" },
      { id: 20, label: "Všechny produkty mají cenovky, pouze nebalené zboží v koších" },
      { id: 21, label: "Čisté pekařské koše a pečicí papíry, čistý prostor kolem pekárny" },
      { id: 22, label: "Balené produkty jasně rozdělené na slané a sladké" },
      { id: 23, label: "Seznam ingrediencí viditelný pro nebalené pekařské výrobky" },
    ],
    products: [
      { id: 24, label: "Ovoce: Banány, Citrony, Jablka k dispozici" },
      { id: 25, label: "Zelenina: Okurka, Cherry rajčata (250g) k dispozici" },
      { id: 26, label: "Všechny produkty označené cenou, zemí původu a kvalitou" },
      { id: 27, label: "Krájené produkty označené etiketou" },
      { id: 28, label: "Dostupné zboží ve 100% kvalitě (max. 2 podstandardní kusy povoleny)" },
      { id: 29, label: "Produkty vyžadující chlazení skladovány v chladicím displeji" },
      { id: 30, label: "Sáčky k dispozici pro zákazníky, oddělení udržováno v čistotě" },
      { id: 31, label: "Max. 2 viditelné mezery v mléčném modulu" },
      { id: 32, label: "Každý produkt má cenovku, ne více než 1 chybějící cenovka na lednici" },
      { id: 33, label: "Cenovky se nepřekrývají, jednotná velikost v rámci regálu" },
      { id: 34, label: "Ne více než 3 viditelné mezery na modul v obchodě" },
      { id: 35, label: "Produkty uspořádány a seskupeny podle kategorií" },
      { id: 36, label: "Každý produkt má cenovku, ne více než 2 chybějící cenovky v obchodě" },
      { id: 37, label: "Žádné prošlé produkty v obchodě, včetně čerstvých potravin" },
      { id: 38, label: "Vystavené zboží není poškozené" },
    ],
    services: [
      { id: 39, label: "Terminál pro služby ICP funkční během celé otevírací doby" },
      { id: 40, label: "Označení SNÍŽENÁ CENA vždy na žlutém papíře pro všechno nabízené zboží" },
    ],
  }

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({})

  const handleCheck = (id: number): void => {
    setCheckedItems((prevCheckedItems: CheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }))
  }

  interface ChecklistItem {
    id: number
    label: string
  }

  interface ChecklistItems {
    [key: string]: ChecklistItem[]
  }

  interface CheckedItems {
    [key: number]: boolean
  }

  const calculateScore = (category: keyof typeof checklistItems): number => {
    const items: ChecklistItem[] = checklistItems[category]
    const checkedCount: number = items.filter((item) => checkedItems[item.id]).length
    return Math.round((checkedCount / items.length) * 100)
  }

  const calculateTotalScore = () => {
    const allItems = Object.values(checklistItems).flat()
    const checkedCount = allItems.filter((item) => checkedItems[item.id]).length
    return Math.round((checkedCount / allItems.length) * 100)
  }

  const getCategoryBonus = (category: keyof typeof checklistItems): string => {
    const score: number = calculateScore(category)
    switch (category) {
      case "customer":
        return score === 100 ? "2 500 Kč" : "0 Kč"
      case "exterior":
        return score === 100 ? "1 000 Kč" : "0 Kč"
      case "interior":
        return score === 100 ? "1 000 Kč" : "0 Kč"
      case "bakery":
        return score >= 90 ? "5 000 Kč" : score >= 70 ? "2 500 Kč" : "0 Kč"
      case "products":
        return score >= 90 ? "13 000 Kč" : score >= 75 ? "6 500 Kč" : "0 Kč"
      case "services":
        return score === 100 ? "3 500 Kč" : "0 Kč"
      default:
        return "0 Kč"
    }
  }

  const getTotalBonus = () => {
    let total = 0

    Object.keys(checklistItems).forEach((category) => {
      const score = calculateScore(category as keyof typeof checklistItems)
      switch (category) {
        case "customer":
          total += score === 100 ? 2500 : 0
          break
        case "exterior":
          total += score === 100 ? 1000 : 0
          break
        case "interior":
          total += score === 100 ? 1000 : 0
          break
        case "bakery":
          total += score >= 90 ? 5000 : score >= 70 ? 2500 : 0
          break
        case "products":
          total += score >= 90 ? 13000 : score >= 75 ? 6500 : 0
          break
        case "services":
          total += score === 100 ? 3500 : 0
          break
      }
    })

    return `${total.toLocaleString()} Kč`
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Kontrolní seznam</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-6 mb-4">
              <TabsTrigger value="customer">Zákazník</TabsTrigger>
              <TabsTrigger value="exterior">Exteriér</TabsTrigger>
              <TabsTrigger value="interior">Interiér</TabsTrigger>
              <TabsTrigger value="bakery">Pekárna</TabsTrigger>
              <TabsTrigger value="products">Produkty</TabsTrigger>
              <TabsTrigger value="services">Služby</TabsTrigger>
            </TabsList>

            {Object.keys(checklistItems).map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ClipboardCheck className="mr-2 h-5 w-5" />
                      {category === "customer"
                        ? "Zákaznické"
                        : category === "exterior"
                          ? "Exteriérové"
                          : category === "interior"
                            ? "Interiérové"
                            : category === "bakery"
                              ? "Pekárenské"
                              : category === "products"
                                ? "Produktové"
                                : "Servisní"}{" "}
                      standardy
                    </CardTitle>
                    <CardDescription>
                      Zaškrtněte položky, které splňují požadované standardy během kontroly
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {checklistItems[category as keyof typeof checklistItems].map((item) => (
                        <div key={item.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={!!checkedItems[item.id]}
                            onCheckedChange={() => handleCheck(item.id)}
                          />
                          <label
                            htmlFor={`item-${item.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {item.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center">
                      <span className="mr-2">Skóre kategorie:</span>
                      <Progress value={calculateScore(category as keyof typeof checklistItems)} className="w-24 h-2" />
                      <span className="ml-2 font-bold">{calculateScore(category as keyof typeof checklistItems)}%</span>
                    </div>
                    <div>
                      <span className="font-bold">{getCategoryBonus(category as keyof typeof checklistItems)}</span>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Shrnutí kontroly</CardTitle>
              <CardDescription>Celkový výkon a potenciální bonus</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Celkový výkon</h3>
                <div className="flex items-center mb-2">
                  <Progress value={calculateTotalScore()} className="flex-1 h-2 mr-2" />
                  <span className="font-bold">{calculateTotalScore()}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-red-100 p-2 rounded">
                    <div className="text-xs text-gray-500">Slabý</div>
                    <div className="text-sm">0-69%</div>
                  </div>
                  <div className="bg-yellow-100 p-2 rounded">
                    <div className="text-xs text-gray-500">Dobrý</div>
                    <div className="text-sm">70-89%</div>
                  </div>
                  <div className="bg-green-100 p-2 rounded">
                    <div className="text-xs text-gray-500">Vynikající</div>
                    <div className="text-sm">90-100%</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Výkon podle kategorií</h3>
                <div className="space-y-2">
                  {Object.keys(checklistItems).map((category) => (
                    <div key={category} className="flex items-center justify-between text-sm">
                      <span>
                        {category === "customer"
                          ? "Zákazník"
                          : category === "exterior"
                            ? "Exteriér"
                            : category === "interior"
                              ? "Interiér"
                              : category === "bakery"
                                ? "Pekárna"
                                : category === "products"
                                  ? "Produkty"
                                  : "Služby"}
                      </span>
                      <div className="flex items-center">
                        <Progress
                          value={calculateScore(category as keyof typeof checklistItems)}
                          className="w-16 h-2 mr-2"
                        />
                        <span className="w-8 text-right">
                          {calculateScore(category as keyof typeof checklistItems)}%
                        </span>
                        {calculateScore(category as keyof typeof checklistItems) >= 90 ? (
                          <Check className="h-4 w-4 text-green-500 ml-1" />
                        ) : calculateScore(category as keyof typeof checklistItems) >= 70 ? (
                          <AlertCircle className="h-4 w-4 text-yellow-500 ml-1" />
                        ) : (
                          <X className="h-4 w-4 text-red-500 ml-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col border-t pt-4">
              <div className="flex justify-between w-full mb-4">
                <span className="font-medium">Potenciální bonus:</span>
                <span className="font-bold text-green-600">{getTotalBonus()}</span>
              </div>
              <Button className="w-full">Uložit výsledky kontroly</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

