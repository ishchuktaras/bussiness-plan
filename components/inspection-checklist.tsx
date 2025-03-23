"use client"

import { useState } from "react"
import { CheckCheck, ClipboardCheck, AlertTriangle, CheckCircle2, XCircle, Save, Send, Star, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type ChecklistItem = {
  id: string
  label: string
  checked: boolean
}

type ChecklistCategory = {
  id: string
  title: string
  items: ChecklistItem[]
}

const InspectionChecklist = () => {
  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      id: "store",
      title: "Kontrola prodejny",
      items: [
        { id: "store-1", label: "Čistota výlohy a vstupu do prodejny", checked: true },
        { id: "store-2", label: "Správné vystavení akčních materiálů", checked: true },
        { id: "store-3", label: "Čistota podlahy a regálů", checked: true },
        { id: "store-4", label: "Správná teplota v prodejně (20-22°C)", checked: false },
        { id: "store-5", label: "Funkčnost osvětlení", checked: true },
        { id: "store-6", label: "Čistota toalet pro zákazníky", checked: false },
        { id: "store-7", label: "Správné označení cen u zboží", checked: true },
        { id: "store-8", label: "Dodržování planogramu", checked: true },
      ],
    },
    {
      id: "products",
      title: "Kontrola zboží",
      items: [
        { id: "products-1", label: "Kontrola dat spotřeby", checked: true },
        { id: "products-2", label: "Správné uskladnění čerstvého zboží", checked: true },
        { id: "products-3", label: "Dostatek zboží v regálech", checked: false },
        { id: "products-4", label: "Správná rotace zboží (FIFO)", checked: true },
        { id: "products-5", label: "Kontrola teploty v chladicích zařízeních", checked: true },
        { id: "products-6", label: "Čistota chladicích a mrazicích boxů", checked: true },
        { id: "products-7", label: "Správné vystavení akčního zboží", checked: true },
        { id: "products-8", label: "Kontrola kvality ovoce a zeleniny", checked: false },
      ],
    },
    {
      id: "staff",
      title: "Kontrola personálu",
      items: [
        { id: "staff-1", label: "Dodržování dress code", checked: true },
        { id: "staff-2", label: "Nošení jmenovek", checked: true },
        { id: "staff-3", label: "Dodržování hygienických předpisů", checked: true },
        { id: "staff-4", label: "Znalost aktuálních akcí a nabídek", checked: false },
        { id: "staff-5", label: "Přátelský přístup k zákazníkům", checked: true },
        { id: "staff-6", label: "Dodržování pracovní doby", checked: true },
        { id: "staff-7", label: "Znalost postupů při reklamacích", checked: false },
        { id: "staff-8", label: "Správné používání pokladního systému", checked: true },
      ],
    },
    {
      id: "service",
      title: "Kontrola služeb",
      items: [
        { id: "service-1", label: "Funkčnost služby Zásilkovna", checked: true },
        { id: "service-2", label: "Správné vydávání účtenek", checked: true },
        { id: "service-3", label: "Funkčnost platebních terminálů", checked: true },
        { id: "service-4", label: "Dostupnost sáčků a tašek", checked: false },
        { id: "service-5", label: "Správné fungování věrnostního programu", checked: true },
        { id: "service-6", label: "Dodržování otevírací doby", checked: true },
        { id: "service-7", label: "Funkčnost služby Freshpoint", checked: false },
        { id: "service-8", label: "Správné fungování služby Dobíjení kreditu", checked: true },
      ],
    },
  ])

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)),
            }
          : category,
      ),
    )
  }

  const calculateProgress = (category: ChecklistCategory) => {
    const checkedItems = category.items.filter((item) => item.checked).length
    return (checkedItems / category.items.length) * 100
  }

  const calculateTotalProgress = () => {
    const totalItems = categories.reduce((acc, category) => acc + category.items.length, 0)
    const checkedItems = categories.reduce(
      (acc, category) => acc + category.items.filter((item) => item.checked).length,
      0,
    )
    return (checkedItems / totalItems) * 100
  }

  const calculatePerformance = (progress: number) => {
    if (progress >= 90) return "Výborný"
    if (progress >= 75) return "Dobrý"
    if (progress >= 60) return "Uspokojivý"
    return "Potřebuje zlepšení"
  }

  const calculateBonus = (progress: number) => {
    if (progress >= 90) return "10,000 Kč"
    if (progress >= 75) return "5,000 Kč"
    if (progress >= 60) return "2,000 Kč"
    return "0 Kč"
  }

  const getUncheckedItems = () => {
    return categories.flatMap((category) =>
      category.items.filter((item) => !item.checked).map((item) => ({ category: category.title, item: item.label })),
    )
  }

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="mb-6 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-lg">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl flex items-center">
          <CheckCheck size={32} className="mr-3" />
          Kontrolní seznam prodejny
        </h1>
        <p className="text-violet-100 mb-6">Pravidelná kontrola zajišťuje kvalitu služeb a spokojenost zákazníků</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-none bg-white/10 text-white">
            <CardContent className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">Celkový pokrok</h3>
                <span className="text-lg font-bold">{Math.round(calculateTotalProgress())}%</span>
              </div>
              <Progress value={calculateTotalProgress()} className="h-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="border-none bg-white/10 text-white">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">Hodnocení výkonu</h3>
                <p className="text-lg font-bold">{calculatePerformance(calculateTotalProgress())}</p>
              </div>
              <Award size={40} className="text-violet-200" />
            </CardContent>
          </Card>

          <Card className="border-none bg-white/10 text-white">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">Potenciální bonus</h3>
                <p className="text-lg font-bold">{calculateBonus(calculateTotalProgress())}</p>
              </div>
              <Star size={40} className="text-yellow-300" />
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="store" className="mb-6">
        <TabsList className="grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="store">Prodejna</TabsTrigger>
          <TabsTrigger value="products">Zboží</TabsTrigger>
          <TabsTrigger value="staff">Personál</TabsTrigger>
          <TabsTrigger value="service">Služby</TabsTrigger>
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center">
                    <ClipboardCheck size={20} className="mr-2 text-violet-600" />
                    {category.title}
                  </h2>
                  <div className="flex items-center">
                    <span className="mr-2 font-medium">{Math.round(calculateProgress(category))}%</span>
                    <Progress value={calculateProgress(category)} className="h-2 w-24" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center rounded-md transition-colors hover:bg-violet-50",
                        item.checked ? "bg-violet-50/50" : "bg-white",
                      )}
                    >
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={item.checked}
                        onChange={() => toggleItem(category.id, item.id)}
                        className="size-5 rounded border-violet-300 text-violet-600 focus:ring-violet-500"
                      />
                      <label htmlFor={item.id} className="ml-3 cursor-pointer grow">
                        {item.label}
                      </label>
                      {item.checked ? (
                        <CheckCircle2 size={20} className="text-green-500" />
                      ) : (
                        <XCircle size={20} className="text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mb-6">
        <h2 className="mb-4 flex items-center text-xl font-bold">
          <ClipboardCheck size={24} className="mr-2 text-violet-600" />
          Shrnutí kontroly
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-3 rounded-full bg-violet-100 p-3">
                <CheckCircle2 size={24} className="text-violet-600" />
              </div>
              <h3 className="mb-1 font-semibold">Splněné položky</h3>
              <p className="text-2xl font-bold text-violet-600">
                {categories.reduce((acc, category) => acc + category.items.filter((item) => item.checked).length, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-3 rounded-full bg-red-100 p-3">
                <XCircle size={24} className="text-red-600" />
              </div>
              <h3 className="mb-1 font-semibold">Nesplněné položky</h3>
              <p className="text-2xl font-bold text-red-600">
                {categories.reduce((acc, category) => acc + category.items.filter((item) => !item.checked).length, 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-3 rounded-full bg-indigo-100 p-3">
                <Award size={24} className="text-indigo-600" />
              </div>
              <h3 className="mb-1 font-semibold">Celkové hodnocení</h3>
              <p className="text-2xl font-bold text-indigo-600">{calculatePerformance(calculateTotalProgress())}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-3 rounded-full bg-yellow-100 p-3">
                <Star size={24} className="text-yellow-600" />
              </div>
              <h3 className="mb-1 font-semibold">Potenciální bonus</h3>
              <p className="text-2xl font-bold text-yellow-600">{calculateBonus(calculateTotalProgress())}</p>
            </CardContent>
          </Card>
        </div>

        {getUncheckedItems().length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start">
                <AlertTriangle size={24} className="mr-3 mt-0.5 text-amber-500" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Doporučení ke zlepšení</h3>
                  <p className="mb-4 text-gray-600">
                    Na základě kontroly doporučujeme zaměřit se na následující oblasti:
                  </p>
                  <ul className="space-y-2">
                    {getUncheckedItems().map((item, index) => (
                      <li key={index} className="flex items-start">
                        {/* Fixed the conflicting classnames here - removed inline-block */}
                        <span className="mr-2 mt-0.5 flex items-center justify-center rounded-full bg-amber-100 text-xs text-amber-600 size-5">
                          !
                        </span>
                        <span>
                          <strong>{item.category}:</strong> {item.item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" className="flex items-center">
          <Save size={16} className="mr-2" />
          Uložit pokrok
        </Button>
        <Button className="flex items-center bg-violet-600 hover:bg-violet-700 text-white">
          <Send size={16} className="mr-2" />
          Dokončit kontrolu
        </Button>
      </div>
    </div>
  )
}

export default InspectionChecklist

