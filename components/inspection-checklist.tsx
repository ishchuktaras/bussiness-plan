"use client"

import { useState } from "react"
import { CheckCheck, ClipboardCheck, AlertTriangle, CheckCircle2, XCircle, Save, Send, Star, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define the checklist item type
type ChecklistItem = {
  id: string
  label: string
  checked: boolean
}

// Define the checklist category type
type ChecklistCategory = {
  id: string
  title: string
  items: ChecklistItem[]
}

const InspectionChecklist = () => {
  // Define the checklist data
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

  // Function to toggle the checked state of an item
  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            items: category.items.map((item) => {
              if (item.id === itemId) {
                return { ...item, checked: !item.checked }
              }
              return item
            }),
          }
        }
        return category
      }),
    )
  }

  // Calculate the progress for a category
  const calculateProgress = (category: ChecklistCategory) => {
    const totalItems = category.items.length
    const checkedItems = category.items.filter((item) => item.checked).length
    return (checkedItems / totalItems) * 100
  }

  // Calculate the total progress across all categories
  const calculateTotalProgress = () => {
    const totalItems = categories.reduce((acc, category) => acc + category.items.length, 0)
    const checkedItems = categories.reduce(
      (acc, category) => acc + category.items.filter((item) => item.checked).length,
      0,
    )
    return (checkedItems / totalItems) * 100
  }

  // Calculate performance rating based on progress
  const calculatePerformance = (progress: number) => {
    if (progress >= 90) return "Výborný"
    if (progress >= 75) return "Dobrý"
    if (progress >= 60) return "Uspokojivý"
    return "Potřebuje zlepšení"
  }

  // Calculate potential bonus based on performance
  const calculateBonus = (progress: number) => {
    if (progress >= 90) return "10,000 Kč"
    if (progress >= 75) return "5,000 Kč"
    if (progress >= 60) return "2,000 Kč"
    return "0 Kč"
  }

  // Get unchecked items for recommendations
  const getUncheckedItems = () => {
    return categories.flatMap((category) =>
      category.items.filter((item) => !item.checked).map((item) => ({ category: category.title, item: item.label })),
    )
  }

  // Calculate progress for each category
  const storeProgress = calculateProgress(categories[0])
  const productsProgress = calculateProgress(categories[1])
  const staffProgress = calculateProgress(categories[2])
  const serviceProgress = calculateProgress(categories[3])

  // Calculate performance for each category
  const storePerformance = calculatePerformance(storeProgress)
  const productsPerformance = calculatePerformance(productsProgress)
  const staffPerformance = calculatePerformance(staffProgress)
  const servicePerformance = calculatePerformance(serviceProgress)

  return (
    <div className="container mx-auto p-2 sm:p-4">
      <div className="mb-6 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white shadow-lg">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl flex items-center">
          <CheckCheck className="mr-3 size-8" />
          Kontrolní seznam prodejny
        </h1>
        <p className="mb-6 text-violet-100">Pravidelná kontrola zajišťuje kvalitu služeb a spokojenost zákazníků</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
              <Award className="size-10 text-violet-200" />
            </CardContent>
          </Card>

          <Card className="border-none bg-white/10 text-white">
            <CardContent className="flex items-center justify-between p-4">
              <div>
                <h3 className="font-semibold">Potenciální bonus</h3>
                <p className="text-lg font-bold">{calculateBonus(calculateTotalProgress())}</p>
              </div>
              <Star className="size-10 text-yellow-300" />
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="store" className="mb-6">
        <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-4">
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
                  <h2 className="flex items-center text-xl font-bold">
                    <ClipboardCheck className="mr-2 size-5 text-violet-600" />
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
                        "flex items-center rounded-md transition-all",
                        "hover:bg-violet-50",
                        item.checked ? "bg-violet-50/50" : "bg-white",
                      )}
                    >
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={item.checked}
                        onChange={() => toggleItem(category.id, item.id)}
                        className="h-5 w-5 rounded border-violet-300 text-violet-600 focus:ring-violet-500"
                      />
                      <label htmlFor={item.id} className="ml-3 cursor-pointer flex-grow">
                        {item.label}
                      </label>
                      {item.checked ? (
                        <CheckCircle2 className="size-5 text-green-500" />
                      ) : (
                        <XCircle className="size-5 text-red-500" />
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
          <ClipboardCheck className="mr-2 size-6 text-violet-600" />
          Shrnutí kontroly
        </h2>

        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-3 rounded-full bg-violet-100 p-3">
                <CheckCircle2 className="size-6 text-violet-600" />
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
                <XCircle className="size-6 text-red-600" />
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
                <Award className="size-6 text-indigo-600" />
              </div>
              <h3 className="mb-1 font-semibold">Celkové hodnocení</h3>
              <p className="text-2xl font-bold text-indigo-600">{calculatePerformance(calculateTotalProgress())}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex flex-col items-center justify-center text-center p-4">
              <div className="mb-3 rounded-full bg-yellow-100 p-3">
                <Star className="size-6 text-yellow-600" />
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
                <AlertTriangle className="mr-3 mt-0.5 size-6 text-amber-500" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Doporučení ke zlepšení</h3>
                  <p className="mb-4 text-gray-600">
                    Na základě kontroly doporučujeme zaměřit se na následující oblasti:
                  </p>
                  <ul className="space-y-2">
                    {getUncheckedItems().map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block mr-2 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs text-amber-600">
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
          <Save className="mr-2 size-4" />
          Uložit pokrok
        </Button>
        <Button className="flex items-center bg-violet-600 text-white hover:bg-violet-700">
          <Send className="mr-2 size-4" />
          Dokončit kontrolu
        </Button>
      </div>
    </div>
  )
}

export default InspectionChecklist

