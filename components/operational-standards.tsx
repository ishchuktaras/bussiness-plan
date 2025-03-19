"use client"

import { CardFooter } from "@/components/ui/card"

import { BookOpen, Calendar, Clock, Users, Percent, BarChart4 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function OperationalStandards() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Provozní standardy Žabka</h1>

      <Tabs defaultValue="hours">
        <TabsList className="flex flex-wrap w-full md:grid md:grid-cols-6">
          <TabsTrigger value="hours" className="flex-1 min-w-[120px] py-2">
            <Clock className="mr-2 h-4 w-4" /> Hodiny
          </TabsTrigger>
          <TabsTrigger value="staff" className="flex-1 min-w-[120px] py-2">
            <Users className="mr-2 h-4 w-4" /> Personál
          </TabsTrigger>
          <TabsTrigger value="products" className="flex-1 min-w-[120px] py-2">
            <Percent className="mr-2 h-4 w-4" /> Produkty
          </TabsTrigger>
          <TabsTrigger value="bakery" className="flex-1 min-w-[120px] py-2">
            <BookOpen className="mr-2 h-4 w-4" /> Pekárna
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex-1 min-w-[120px] py-2">
            <Calendar className="mr-2 h-4 w-4" /> Marketing
          </TabsTrigger>
          <TabsTrigger value="kpis" className="flex-1 min-w-[120px] py-2">
            <BarChart4 className="mr-2 h-4 w-4" /> KPI
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hours" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Otevírací doba</CardTitle>
              <CardDescription>Požadovaná provozní doba a zásady</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Standardní provozní doba</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Podle oddílu 3.12 franšízové smlouvy musí obchody fungovat:
                </p>

                <div className="bg-muted p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sedm (7) dní v týdnu (včetně nedělí a svátků)</li>
                    <li>Od 6:00 do 23:00 denně</li>
                    <li>Jakékoli změny provozní doby musí být písemně dohodnuty s franšízorem</li>
                    <li>Výjimky mohou platit prostřednictvím Manuálu nebo na základě dohody</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Sankce za nedodržení</h3>
                <p className="text-sm text-gray-600 mb-4">Podle oddílu 9.6 franšízové smlouvy:</p>

                <div className="bg-red-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Celodenní uzavření: Až 50 000 Kč pokuta za kalendářní den</li>
                    <li>Částečné denní uzavření: Až 700 Kč pokuta za 15 minut</li>
                    <li>Opakované porušení může vést k ukončení franšízové smlouvy</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Úpravy provize</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Pokud je otevírací doba upravena dohodou, fixní provize se snižuje:
                </p>

                <div className="bg-yellow-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Za každou 1 hodinu snížení denní provozní doby: 440 Kč snížení měsíční fixní provize</li>
                    <li>Výpočet: 110 Kč × 4 × počet dnů se sníženou dobou</li>
                    <li>Snížení platí, když změny trvají více než 16 dní v měsíci</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Stáhnout šablonu rozvrhu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Požadavky na personál</CardTitle>
              <CardDescription>Personální standardy a vzhled</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Uniforma personálu</h3>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="bg-green-100 p-3 rounded-md text-center flex-1">
                    <div className="font-medium mb-1">Schváleno</div>
                    <ul className="text-sm text-left list-disc pl-5">
                      <li>Černé tričko s logem společnosti</li>
                      <li>Zelené tričko s logem společnosti</li>
                      <li>Firemní vesta</li>
                    </ul>
                  </div>
                  <div className="bg-red-100 p-3 rounded-md text-center flex-1">
                    <div className="font-medium mb-1">Není povoleno</div>
                    <ul className="text-sm text-left list-disc pl-5">
                      <li>Pokrývky hlavy (čepice, kšilty) na prodejní ploše</li>
                      <li>Nefiremní oblečení</li>
                      <li>Špinavé nebo poškozené uniformy</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Standardy zákaznického servisu</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="font-medium mb-2">Princip zákaznického servisu 3N/3P:</p>
                  <ol className="list-decimal pl-5 space-y-1">
                    <li>Pozdravit zákazníka</li>
                    <li>Poděkovat zákazníkovi</li>
                    <li>Rozloučit se</li>
                  </ol>
                  <div className="mt-4">
                    <Badge variant="outline" className="mr-2">
                      Vyžadováno smlouvou
                    </Badge>
                    <Badge variant="outline">Pravidelně kontrolováno</Badge>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Požadavky na školení</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Úvodní školení</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Povinné před zahájením provozu</li>
                      <li>Zahrnuje provoz obchodu a manuál</li>
                      <li>Franšízant se musí zúčastnit osobně</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Průběžné školení</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Pravidelné školení organizované franšízorem</li>
                      <li>Franšízant se musí zúčastnit a zajistit účast personálu</li>
                      <li>Náklady hradí franšízant</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Zakázané činnosti</h3>
                <div className="bg-red-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Používání mobilních telefonů u pokladny</li>
                    <li>Komunikace s médii bez souhlasu franšízora</li>
                    <li>Provozování konkurenčních podniků</li>
                    <li>Neoprávněné úpravy obchodu</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Stáhnout příručku pro zaměstnance
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Standardy produktů</CardTitle>
              <CardDescription>Požadavky na dostupnost a prezentaci produktů</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Povinné kategorie produktů</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Ovoce a zelenina</div>
                    <p className="text-xs mb-2">Požadované položky:</p>
                    <ul className="text-sm list-disc pl-5">
                      <li>Banány</li>
                      <li>Citrony</li>
                      <li>Jablka</li>
                      <li>Okurky</li>
                      <li>Cherry rajčata (250g)</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Mléčné výrobky</div>
                    <p className="text-xs mb-2">Požadavky na prezentaci:</p>
                    <ul className="text-sm list-disc pl-5">
                      <li>Max. 2 viditelné mezery v modulu</li>
                      <li>Všechny produkty s cenovkou</li>
                      <li>Jednotná velikost cenovek</li>
                      <li>Max. 1 chybějící cenovka</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Obecné požadavky</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Max. 3 viditelné mezery na modul</li>
                      <li>Produkty seskupené podle kategorie</li>
                      <li>Všechny produkty s cenovkou</li>
                      <li>Max. 2 chybějící cenovky</li>
                      <li>Žádné prošlé produkty</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Objednávání a správa produktů</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Produkty musí být objednávány ze seznamu schválených dodavatelů franšízora</li>
                    <li>Zboží zůstává majetkem franšízora až do prodeje</li>
                    <li>Franšízant odpovídá za ztráty a poškození produktů</li>
                    <li>Pravidelné kontroly zásob prováděné franšízorem</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Pravidla pro lokální produkty</h3>
                <div className="bg-green-50 p-4 rounded-md">
                  <p className="mb-2">Franšízant může prodávat vlastní produkty ("Zboží Franchisanta") s omezeními:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Maximálně 10 produktových rodin</li>
                    <li>Produkty musí být schváleny a registrovány franšízorem</li>
                    <li>
                      Nesmí zahrnovat: alkohol {">15%"}, nealkoholické nápoje (kromě čerstvých šťáv), kávu, čaj, tabák,
                      mražené produkty, pochutiny
                    </li>
                    <li>Provize: 5% z prodejní ceny franšízorovi</li>
                    <li>Lokální produkty musí být vystaveny v rámci příslušných kategorií produktů</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Požadavky na tabákové výrobky</h3>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Musí dodržovat planogram franšízora pro tabákové výrobky</li>
                    <li>Podléhá kontrole franšízorem nebo třetími stranami</li>
                    <li>Bonus: 1 000 Kč za čtvrtletí při dodržení</li>
                    <li>Pokuta: Až 3 000 Kč za nedodržení</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Stáhnout pokyny k produktům
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bakery" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Standardy pekárny</CardTitle>
              <CardDescription>Požadavky na pekárnu a prezentaci</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Nebalené pekařské výrobky - Ráno (6:00-14:00)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Slané položky</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Minimálně 8 druhů</li>
                      <li>Minimálně 40 kusů celkem</li>
                      <li>Kromě základních rohlíků (rohlík, houska)</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Sladké položky</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Minimálně 5 druhů</li>
                      <li>Minimálně 25 kusů celkem</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Nebalené pekařské výrobky - Odpoledne (14:00-19:00)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Slané položky</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Minimálně 6 druhů</li>
                      <li>Minimálně 30 kusů celkem</li>
                      <li>Kromě základních rohlíků (rohlík, houska)</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Sladké položky</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Minimálně 5 druhů</li>
                      <li>Minimálně 20 kusů celkem</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Balené pekařské výrobky - Ráno (6:00-14:00)</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Minimálně 3 druhy baleného chleba</li>
                    <li>Minimálně 3 druhy toustového chleba</li>
                    <li>Minimálně 6 druhů sladkých balených výrobků (koláče, štrúdl atd.)</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Balené pekařské výrobky - Odpoledne (14:00-19:00)</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Minimálně 2 druhy baleného chleba</li>
                    <li>Minimálně 2 druhy toustového chleba</li>
                    <li>Minimálně 4 druhy sladkých balených výrobků</li>
                    <li>Maximálně 2 viditelné mezery na regálech pekárny</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Požadavky na prezentaci pekárny</h3>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Sáčky a rukavice k dispozici pro zákazníky</li>
                    <li>Odpadkový koš s víkem v blízkosti pekárny</li>
                    <li>Všechny produkty mají cenovky</li>
                    <li>Pouze nebalené zboží v pekařských koších</li>
                    <li>Čisté koše a pečicí papíry</li>
                    <li>Balené produkty jasně rozdělené na slané a sladké</li>
                    <li>Seznam ingrediencí viditelný pro nebalené produkty</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Stáhnout pokyny pro pekárnu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Marketingové standardy</CardTitle>
              <CardDescription>Požadavky na propagaci a vizuální prezentaci</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Povinné propagační aktivity</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Aktivní prodej produktů v zóně pokladny</li>
                    <li>Účast na propagačních a reklamních kampaních</li>
                    <li>Implementace spotřebitelských her a soutěží</li>
                    <li>Instalace propagačních předmětů a značení dodaných franšízorem</li>
                    <li>Štítky se sníženou cenou musí být na žlutém papíře</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Vzhled obchodu</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Standardy exteriéru</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Čistý prostor kolem vchodu do obchodu</li>
                      <li>Čisté vstupní dveře a okna</li>
                      <li>Pouze autorizované označení na vstupních dveřích</li>
                      <li>Žádné neautorizované reklamní nálepky</li>
                    </ul>
                  </div>
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Standardy interiéru</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Čisté podlahy a zametené rohožky</li>
                      <li>Čistý odpadkový koš s víkem u kávovaru</li>
                      <li>Čisté a funkční nákupní košíky</li>
                      <li>Čisté chladicí zařízení bez námrazy</li>
                      <li>Čisté a nepoškozené regály a lišty</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Požadavky na značku</h3>
                <div className="bg-green-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Povinné používání loga Žabka</li>
                    <li>Personál musí nosit určené pracovní oblečení</li>
                    <li>Jednotný vzhled obchodu podle standardů</li>
                    <li>Žádné neoprávněné úpravy designu obchodu</li>
                    <li>Ochrana práv duševního vlastnictví</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Požadavky na aktivní prodejní položku</h3>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Zobrazit aktivní prodejní položku v zóně pokladny podle specifikace v týdenní zprávě</li>
                    <li>Personál musí aktivně nabízet tento produkt zákazníkům</li>
                    <li>Dvě různé nabídky během měsíce</li>
                    <li>Nezobrazení nebo nenabízení vede k hodnocení 0 Kč pro toto kritérium</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Stáhnout marketingové pokyny
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="kpis" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Klíčové ukazatele výkonnosti</CardTitle>
              <CardDescription>Metriky výkonu a systém hodnocení</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Systém hodnocení obchodu</h3>
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="mb-2">
                    Obchody jsou hodnoceny na základě systému kontrolního seznamu s potenciálními odměnami:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-md">
                      <div className="font-medium mb-1">Běžný obchod</div>
                      <p className="text-sm mb-2">Maximální měsíční bonus: 34 000 Kč</p>
                      <ul className="text-xs list-disc pl-5">
                        <li>Zákaznický servis: 2 500 Kč</li>
                        <li>Standardy exteriéru: 1 000 Kč</li>
                        <li>Standardy interiéru: 1 000 Kč</li>
                        <li>Standardy pekárny: 6 500 Kč</li>
                        <li>Standardy produktů: 19 500 Kč</li>
                        <li>Standardy služeb: 3 500 Kč</li>
                      </ul>
                    </div>
                    <div className="bg-white p-3 rounded-md">
                      <div className="font-medium mb-1">Kancelářský obchod (Brno Tuřanka)</div>
                      <p className="text-sm mb-2">Maximální měsíční bonus: 20 400 Kč</p>
                      <ul className="text-xs list-disc pl-5">
                        <li>Zákaznický servis: 1 500 Kč</li>
                        <li>Standardy exteriéru: 600 Kč</li>
                        <li>Standardy interiéru: 600 Kč</li>
                        <li>Standardy pekárny: 3 900 Kč</li>
                        <li>Standardy produktů: 11 700 Kč</li>
                        <li>Standardy služeb: 2 100 Kč</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Hodnocení výkonu</h3>
                <div className="space-y-4">
                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Frekvence kontrol</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Pravidelné kontroly prováděné franšízorem</li>
                      <li>Neohlášené návštěvy ke kontrole dodržování</li>
                      <li>V kalendářním měsíci je možných více kontrol</li>
                    </ul>
                  </div>

                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Důsledky špatného výkonu</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Neuspokojivé výsledky mohou vést k finančním sankcím</li>
                      <li>Opakovaný špatný výkon může být důvodem k ukončení</li>
                      <li>Tři případy nulové odměny představují "opakovaný" špatný výkon</li>
                    </ul>
                  </div>

                  <div className="border p-3 rounded-md">
                    <div className="font-medium mb-1">Proces zlepšování</div>
                    <ul className="text-sm list-disc pl-5">
                      <li>Zjištěné problémy musí být napraveny v časovém rámci stanoveném franšízorem</li>
                      <li>Neodstranění problémů může vést k dalším sankcím</li>
                      <li>Franšízant musí implementovat nápravná opatření pro všechny nedostatky</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Speciální bonusy</h3>
                <div className="bg-green-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Dodržování planogramu tabáku: 1 000 Kč za čtvrtletí</li>
                    <li>Sezónní propagační kampaně: Dodatečné bonusy podle specifikace</li>
                    <li>Pobídky založené na výkonu za překročení prodejních cílů</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Správa zásob</h3>
                <div className="bg-yellow-50 p-4 rounded-md">
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Pravidelné kontroly zásob prováděné franšízorem</li>
                    <li>Franšízant se musí účastnit kontrol zásob</li>
                    <li>Rozdíly v zásobách ovlivňují zadržení 2 % variabilní provize</li>
                    <li>Pokud ztráty přesáhnou 2,49 % prodeje, zadržení se zvýší na 3 %</li>
                    <li>Vysoké ztráty zásob (≥4 %) mohou vyvolat dodatečné inventury na náklady franšízanta</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Stáhnout pokyny k výkonu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

