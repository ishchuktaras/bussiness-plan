import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Info, FileText, Shield, Coins, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function FranchiseAgreementAnalysis() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Analýza franšízové smlouvy Žabka</h1>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview">
            <FileText className="mr-2 h-4 w-4" /> Přehled
          </TabsTrigger>
          <TabsTrigger value="obligations">
            <Users className="mr-2 h-4 w-4" /> Povinnosti
          </TabsTrigger>
          <TabsTrigger value="financial">
            <Coins className="mr-2 h-4 w-4" /> Finanční podmínky
          </TabsTrigger>
          <TabsTrigger value="termination">
            <Shield className="mr-2 h-4 w-4" /> Ukončení
          </TabsTrigger>
          <TabsTrigger value="risks">
            <AlertCircle className="mr-2 h-4 w-4" /> Rizika
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Přehled franšízové smlouvy</CardTitle>
              <CardDescription>Základní informace o smlouvě a její struktuře</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Důležité upozornění</AlertTitle>
                <AlertDescription>
                  Tato analýza je pouze informativní a nenahrazuje právní poradenství. Před podpisem smlouvy
                  doporučujeme konzultaci s právníkem.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Základní informace</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Typ smlouvy:</span>
                      <span className="font-medium">Franšízová smlouva</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Franšízor:</span>
                      <span className="font-medium">Žabka a.s.</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Doba trvání:</span>
                      <span className="font-medium">Neurčitá s výpovědní lhůtou</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-muted-foreground">Výpovědní lhůta:</span>
                      <span className="font-medium">3 měsíce</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Struktura smlouvy</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        1-3
                      </Badge>
                      <span>Definice a předmět smlouvy</span>
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        4-8
                      </Badge>
                      <span>Práva a povinnosti franšízanta</span>
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        9-12
                      </Badge>
                      <span>Finanční podmínky</span>
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        13-15
                      </Badge>
                      <span>Ukončení smlouvy</span>
                    </li>
                    <li className="flex items-center">
                      <Badge variant="outline" className="mr-2">
                        16-20
                      </Badge>
                      <span>Závěrečná ustanovení</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Klíčové body smlouvy</h3>
                <Accordion className="w-full">
                  <AccordionItem>
                    <AccordionTrigger>Předmět smlouvy</AccordionTrigger>
                    <AccordionContent>
                      Franšízor poskytuje franšízantovi právo provozovat maloobchodní prodejnu pod značkou Žabka,
                      používat know-how, obchodní tajemství a další práva duševního vlastnictví. Franšízant se zavazuje
                      dodržovat standardy a platit poplatky.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionTrigger>Provozovna</AccordionTrigger>
                    <AccordionContent>
                      Franšízor poskytuje franšízantovi prostory k provozování prodejny. Franšízant nemá vlastnické
                      právo k provozovně a nesmí ji využívat k jiným účelům než k provozování prodejny Žabka.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionTrigger>Zboží a zásoby</AccordionTrigger>
                    <AccordionContent>
                      Franšízant je povinen objednávat zboží od schválených dodavatelů. Zboží zůstává ve vlastnictví
                      franšízora až do prodeje zákazníkovi. Franšízant odpovídá za ztráty a poškození zboží.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionTrigger>Provize a poplatky</AccordionTrigger>
                    <AccordionContent>
                      Franšízant obdrží fixní a variabilní provizi za prodej zboží. Franšízant platí licenční poplatek
                      ve výši 1% z obratu a další poplatky za služby poskytované franšízorem.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionTrigger>Ukončení smlouvy</AccordionTrigger>
                    <AccordionContent>
                      Smlouva může být ukončena výpovědí s 3měsíční výpovědní lhůtou nebo okamžitým odstoupením v
                      případě závažného porušení smlouvy. Po ukončení smlouvy musí franšízant vrátit veškeré vybavení a
                      materiály.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="obligations">
          <Card>
            <CardHeader>
              <CardTitle>Povinnosti franšízanta</CardTitle>
              <CardDescription>Detailní přehled povinností vyplývajících ze smlouvy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Provozní povinnosti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          1
                        </span>
                        <span>Dodržovat otevírací dobu 6:00-23:00, 7 dní v týdnu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          2
                        </span>
                        <span>Udržovat prodejnu v čistotě a pořádku dle standardů</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          3
                        </span>
                        <span>Zajistit dostatečné množství personálu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          4
                        </span>
                        <span>Dodržovat standardy zákaznického servisu</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          5
                        </span>
                        <span>Účastnit se školení a zajistit školení personálu</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Obchodní povinnosti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          1
                        </span>
                        <span>Objednávat zboží pouze od schválených dodavatelů</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          2
                        </span>
                        <span>Dodržovat cenovou politiku stanovenou franšízorem</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          3
                        </span>
                        <span>Účastnit se marketingových akcí a kampaní</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          4
                        </span>
                        <span>Vést řádnou evidenci tržeb a zásob</span>
                      </li>
                      <li className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                          5
                        </span>
                        <span>Umožnit kontroly ze strany franšízora</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Omezení a zákazy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Zakázané činnosti</h4>
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Provozovat konkurenční podnikání</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Měnit vzhled nebo vybavení prodejny bez souhlasu</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Komunikovat s médii bez souhlasu franšízora</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Používat know-how mimo prodejnu Žabka</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Omezení po ukončení smlouvy</h4>
                      <ul className="space-y-1">
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Zákaz konkurence po dobu 1 roku</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Zákaz využívání know-how a obchodního tajemství</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Zákaz kontaktování zákazníků Žabky</span>
                        </li>
                        <li className="flex items-center">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2" />
                          <span>Zákaz zaměstnávání personálu Žabky po dobu 6 měsíců</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Důležité upozornění</AlertTitle>
                <AlertDescription>
                  Porušení povinností může vést k finančním sankcím nebo okamžitému ukončení smlouvy. Některá omezení
                  mohou být považována za přísná, doporučujeme konzultaci s právníkem.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Finanční podmínky</CardTitle>
              <CardDescription>Analýza finančních aspektů franšízové smlouvy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Příjmy franšízanta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li>
                        <div className="font-medium">Fixní provize</div>
                        <div className="text-sm text-muted-foreground">25 000 Kč měsíčně</div>
                        <div className="text-xs text-muted-foreground">
                          Může být snížena při zkrácení otevírací doby
                        </div>
                      </li>
                      <li>
                        <div className="font-medium">Variabilní provize</div>
                        <div className="text-sm text-muted-foreground">
                          Založena na obratu a marži jednotlivých kategorií produktů
                        </div>
                        <div className="text-xs text-muted-foreground">Průměrně 5-25% z obratu podle kategorie</div>
                      </li>
                      <li>
                        <div className="font-medium">Bonusy za výkon</div>
                        <div className="text-sm text-muted-foreground">Až 34 000 Kč měsíčně za splnění standardů</div>
                        <div className="text-xs text-muted-foreground">Rozděleno do 6 kategorií hodnocení</div>
                      </li>
                      <li>
                        <div className="font-medium">Speciální bonusy</div>
                        <div className="text-sm text-muted-foreground">
                          Dodržování planogramu tabáku: 1 000 Kč čtvrtletně
                        </div>
                        <div className="text-xs text-muted-foreground">Sezónní kampaně: dle specifikace</div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Výdaje franšízanta</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li>
                        <div className="font-medium">Licenční poplatek</div>
                        <div className="text-sm text-muted-foreground">1% z měsíčního obratu</div>
                      </li>
                      <li>
                        <div className="font-medium">Jistina</div>
                        <div className="text-sm text-muted-foreground">Počáteční: 20 000 Kč</div>
                        <div className="text-sm text-muted-foreground">Konečná: 150 000 Kč</div>
                        <div className="text-xs text-muted-foreground">Postupně navyšována z provizí</div>
                      </li>
                      <li>
                        <div className="font-medium">Poplatek při převzetí</div>
                        <div className="text-sm text-muted-foreground">10 000 Kč + DPH</div>
                      </li>
                      <li>
                        <div className="font-medium">Provozní náklady</div>
                        <div className="text-sm text-muted-foreground">Personál, energie, pojištění, údržba</div>
                        <div className="text-xs text-muted-foreground">Nájem hradí franšízor</div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Finanční rizika a sankce</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Sankce za porušení smlouvy</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Uzavření prodejny:</span>
                            <span className="ml-1">Až 50 000 Kč za den, 700 Kč za každých 15 minut</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Nedodržení planogramu tabáku:</span>
                            <span className="ml-1">Až 3 000 Kč</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Nedodržení standardů:</span>
                            <span className="ml-1">Ztráta bonusů až 34 000 Kč měsíčně</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Rizika spojená se zásobami</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Ztráty zásob:</span>
                            <span className="ml-1">Zadržení 2% variabilní provize</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Vysoké ztráty ({">"}2.49%):</span>
                            <span className="ml-1">Zadržení 3% variabilní provize</span>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                          <div>
                            <span className="font-medium">Velmi vysoké ztráty (≥4%):</span>
                            <span className="ml-1">Dodatečné inventury na náklady franšízanta</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Finanční doporučení</AlertTitle>
                <AlertDescription>
                  Doporučujeme vytvořit si finanční rezervu ve výši alespoň 3 měsíčních provozních nákladů. Věnujte
                  zvláštní pozornost řízení zásob a prevenci ztrát, které mohou významně ovlivnit vaši ziskovost.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="termination">
          <Card>
            <CardHeader>
              <CardTitle>Ukončení smlouvy</CardTitle>
              <CardDescription>Podmínky a důsledky ukončení franšízové smlouvy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Způsoby ukončení smlouvy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li>
                        <div className="font-medium">Výpověď bez udání důvodu</div>
                        <div className="text-sm">Výpovědní lhůta 3 měsíce</div>
                        <div className="text-xs text-muted-foreground">Platí pro obě strany</div>
                      </li>
                      <li>
                        <div className="font-medium">Okamžité odstoupení franšízorem</div>
                        <div className="text-sm">Při závažném porušení smlouvy franšízantem</div>
                        <div className="text-xs text-muted-foreground">Účinné doručením oznámení</div>
                      </li>
                      <li>
                        <div className="font-medium">Okamžité odstoupení franšízantem</div>
                        <div className="text-sm">Při závažném porušení smlouvy franšízorem</div>
                        <div className="text-xs text-muted-foreground">Účinné doručením oznámení</div>
                      </li>
                      <li>
                        <div className="font-medium">Dohoda stran</div>
                        <div className="text-sm">Vzájemná dohoda o ukončení spolupráce</div>
                      </li>
                      <li>
                        <div className="font-medium">Zánik oprávnění</div>
                        <div className="text-sm">Ztráta živnostenského nebo jiného oprávnění</div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Důvody pro okamžité odstoupení</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Ze strany franšízora</h4>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Opakované porušení standardů kvality</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Neoprávněné uzavření prodejny</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Porušení zákazu konkurence</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Poškození dobrého jména značky</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Neoprávněné nakládání se zbožím</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Ze strany franšízanta</h4>
                        <ul className="space-y-1">
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Neposkytnutí slíbené podpory</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Neposkytnutí slíbené podpory</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Porušení exkluzivity dodávek</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Nevyplácení provizí</span>
                          </li>
                          <li className="flex items-start">
                            <AlertCircle className="h-4 w-4 text-destructive mr-2 mt-0.5" />
                            <span>Porušení ochrany osobních údajů</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Povinnosti při ukončení smlouvy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Povinnosti franšízanta</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            1
                          </span>
                          <span>Vrátit veškeré vybavení, materiály a dokumentaci</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            2
                          </span>
                          <span>Odstranit veškeré označení a prvky značky Žabka</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            3
                          </span>
                          <span>Přestat používat know-how a obchodní tajemství</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            4
                          </span>
                          <span>Vrátit neprodané zboží</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            5
                          </span>
                          <span>Dodržovat zákaz konkurence po dobu 1 roku</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Povinnosti franšízora</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            1
                          </span>
                          <span>Vyplatit konečné vyúčtování provizí</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            2
                          </span>
                          <span>Vrátit jistinu po odečtení případných pohledávek</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            3
                          </span>
                          <span>Převzít provozovnu a vybavení</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Důležité upozornění</AlertTitle>
                <AlertDescription>
                  Nedodržení povinností při ukončení smlouvy může vést k právním sporům a finančním sankcím.
                  Doporučujeme vést podrobnou dokumentaci o stavu provozovny a vybavení při převzetí i předání.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risks">
          <Card>
            <CardHeader>
              <CardTitle>Analýza rizik</CardTitle>
              <CardDescription>Identifikace a hodnocení klíčových rizik franšízové smlouvy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Právní upozornění</AlertTitle>
                <AlertDescription>
                  Tato analýza rizik je pouze informativní a nenahrazuje právní poradenství. Před podpisem smlouvy
                  doporučujeme konzultaci s právníkem specializovaným na franšízové smlouvy.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Provozní rizika</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li>
                        <div className="flex items-center">
                          <Badge variant="destructive" className="mr-2">
                            Vysoké
                          </Badge>
                          <span className="font-medium">Přísné standardy kvality</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Náročné požadavky na provoz a kvalitu, které mohou být obtížně splnitelné.
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <Badge variant="destructive" className="mr-2">
                            Vysoké
                          </Badge>
                          <span className="font-medium">Dlouhá otevírací doba</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Požadavek na provoz 17 hodin denně, 7 dní v týdnu zvyšuje náklady na personál.
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">Střední</Badge>
                          <span className="font-medium">Ztráty zásob</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Franšízant nese odpovědnost za ztráty zboží, které může vést ke snížení provize.
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">Střední</Badge>
                          <span className="font-medium">Závislost na dodavatelích</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Povinnost objednávat pouze od schválených dodavatelů omezuje flexibilitu.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Finanční rizika</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li>
                        <div className="flex items-center">
                          <Badge variant="destructive" className="mr-2">
                            Vysoké
                          </Badge>
                          <span className="font-medium">Vysoké sankce</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Sankce až 50 000 Kč za den při uzavření prodejny mohou být likvidační.
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <Badge variant="destructive" className="mr-2">
                            Vysoké
                          </Badge>
                          <span className="font-medium">Nejistý příjem</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Variabilní složka provize závisí na mnoha faktorech, které franšízant nemůže plně ovlivnit.
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">Střední</Badge>
                          <span className="font-medium">Vysoká jistina</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Konečná jistina 150 000 Kč představuje významnou vázanou částku.
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center">
                          <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">Střední</Badge>
                          <span className="font-medium">Náklady na personál</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Dlouhá otevírací doba vyžaduje více zaměstnanců, což zvyšuje náklady.
                        </div>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Právní a smluvní rizika</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <ul className="space-y-3">
                        <li>
                          <div className="flex items-center">
                            <Badge variant="destructive" className="mr-2">
                              Vysoké
                            </Badge>
                            <span className="font-medium">Jednostranné ukončení</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Franšízor má široké možnosti okamžitého ukončení smlouvy.
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <Badge variant="destructive" className="mr-2">
                              Vysoké
                            </Badge>
                            <span className="font-medium">Zákaz konkurence</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Přísný zákaz konkurence po dobu 1 roku po ukončení smlouvy.
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <ul className="space-y-3">
                        <li>
                          <div className="flex items-center">
                            <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">Střední</Badge>
                            <span className="font-medium">Změny smlouvy</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Franšízor může jednostranně měnit některé aspekty smlouvy.
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center">
                            <Badge className="bg-yellow-500 hover:bg-yellow-600 mr-2">Střední</Badge>
                            <span className="font-medium">Odpovědnost za škody</span>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            Franšízant nese odpovědnost za škody způsobené zákazníkům.
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Doporučení pro zmírnění rizik</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Před podpisem smlouvy</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            1
                          </span>
                          <span>Konzultujte smlouvu s právníkem specializovaným na franšízové smlouvy</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            2
                          </span>
                          <span>Kontaktujte stávající franšízanty a zjistěte jejich zkušenosti</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            3
                          </span>
                          <span>Vytvořte si detailní finanční plán a analýzu bodu zvratu</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            4
                          </span>
                          <span>Vyjednejte si případné úpravy smlouvy, zejména v oblasti sankcí</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Během provozu</h4>
                      <ul className="space-y-1">
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            1
                          </span>
                          <span>Důsledně dodržujte standardy a pravidelně kontrolujte jejich plnění</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            2
                          </span>
                          <span>Zaveďte systém prevence ztrát a pravidelné inventury</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            3
                          </span>
                          <span>Udržujte finanční rezervu pro případ neočekávaných výdajů</span>
                        </li>
                        <li className="flex items-start">
                          <span className="bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                            4
                          </span>
                          <span>Dokumentujte veškerou komunikaci s franšízorem</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

