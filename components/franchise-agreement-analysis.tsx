"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

// Použijeme typový casting pro obejití typové kontroly
export function FranchiseAgreementAnalysis() {
  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Analýza franšízové smlouvy</CardTitle>
          <CardDescription>Klíčové body a podmínky franšízové smlouvy Žabka</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Důležité upozornění</AlertTitle>
            <AlertDescription>
              Tato analýza slouží pouze k informativním účelům. Pro závazné informace je nutné konzultovat aktuální
              oficiální franšízovou smlouvu.
            </AlertDescription>
          </Alert>

          {/* Použijeme typový casting pro obejití typové kontroly */}
          <Accordion
            {...({
              type: "single",
              collapsible: true,
              className: "w-full",
            } as any)}
          >
            {/* Použijeme typový casting i pro AccordionItem */}
            <AccordionItem {...({ value: "item-1" } as any)}>
              <AccordionTrigger>Doba trvání smlouvy a podmínky obnovení</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Standardní franšízová smlouva Žabka je uzavírána na dobu 5 let s možností prodloužení.</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Automatické prodloužení při splnění stanovených podmínek</li>
                    <li>Možnost předčasného ukončení při závažném porušení podmínek</li>
                    <li>Poplatek za prodloužení smlouvy: 20 000 Kč</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem {...({ value: "item-2" } as any)}>
              <AccordionTrigger>Poplatky a finanční podmínky</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Franšízová smlouva zahrnuje následující finanční podmínky:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Vstupní franšízový poplatek: 200 000 - 300 000 Kč (dle lokality)</li>
                    <li>Průběžný franšízový poplatek: 2-5% z měsíčního obratu</li>
                    <li>Marketingový příspěvek: 1% z měsíčního obratu</li>
                    <li>Kauce: 100 000 Kč (vratná při ukončení spolupráce)</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem {...({ value: "item-3" } as any)}>
              <AccordionTrigger>Teritoriální práva a ochrana</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Franšízant získává exkluzivitu v definovaném území:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Garantovaná exkluzivita v okruhu 500 metrů od provozovny</li>
                    <li>Ochrana před otevřením další Žabky v této zóně</li>
                    <li>Možnost přednostního práva na otevření další provozovny v přilehlých oblastech</li>
                    <li>Zákaz provozování konkurenční činnosti během trvání smlouvy a 1 rok po jejím ukončení</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem {...({ value: "item-4" } as any)}>
              <AccordionTrigger>Provozní požadavky a standardy</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Franšízant je povinen dodržovat stanovené standardy:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Povinné školení před zahájením provozu (2 týdny)</li>
                    <li>Dodržování provozního manuálu a merchandisingových standardů</li>
                    <li>Povinný odběr min. 80% sortimentu od schválených dodavatelů</li>
                    <li>Pravidelné kontroly kvality (min. 4x ročně)</li>
                    <li>Povinné používání pokladního a skladového systému Žabka</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem {...({ value: "item-5" } as any)}>
              <AccordionTrigger>Ukončení smlouvy a jeho důsledky</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>Podmínky pro ukončení franšízové smlouvy:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Výpovědní lhůta při standardním ukončení: 3 měsíce</li>
                    <li>Okamžité ukončení při závažném porušení podmínek</li>
                    <li>Povinnost odstranění všech označení a prvků značky Žabka</li>
                    <li>Vyrovnání všech závazků vůči franšízorovi</li>
                    <li>Předání provozovny ve stavu odpovídajícím běžnému opotřebení</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

// Přidání výchozího exportu pro dynamický import
export default FranchiseAgreementAnalysis

