"use client"

import { CardFooter } from "@/components/ui/card"
import { User, Home, Box, Hammer, ShoppingBag, HeartHandshake } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"

export default function ChecklistZabka() {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Kontrolní seznam Žabka</h1>

      <Tabs defaultValue="customer">
        <div className="overflow-x-auto">
          <TabsList className="flex min-w-max">
            <TabsTrigger value="customer" className="flex-none py-2 px-3 text-xs sm:text-sm whitespace-nowrap">
              <User className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Zákazník
            </TabsTrigger>
            <TabsTrigger value="exterior" className="flex-none py-2 px-3 text-xs sm:text-sm whitespace-nowrap">
              <Home className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Exteriér
            </TabsTrigger>
            <TabsTrigger value="interior" className="flex-none py-2 px-3 text-xs sm:text-sm whitespace-nowrap">
              <Box className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Interiér
            </TabsTrigger>
            <TabsTrigger value="bakery" className="flex-none py-2 px-3 text-xs sm:text-sm whitespace-nowrap">
              <Hammer className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Pekárna
            </TabsTrigger>
            <TabsTrigger value="products" className="flex-none py-2 px-3 text-xs sm:text-sm whitespace-nowrap">
              <ShoppingBag className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Produkty
            </TabsTrigger>
            <TabsTrigger value="services" className="flex-none py-2 px-3 text-xs sm:text-sm whitespace-nowrap">
              <HeartHandshake className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" /> Služby
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="customer" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Zákaznický servis</CardTitle>
              <CardDescription>Kontrola standardů zákaznického servisu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Celkový progres</h3>
                <Badge variant="outline">3/10 splněno</Badge>
              </div>
              <Progress value={30} className="h-2 mb-4" />

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox id="item-1" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="item-1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pozdravení zákazníka
                    </label>
                    <p className="text-sm text-muted-foreground">
                      Personál pozdraví každého zákazníka do 3 sekund od vstupu do zorného pole
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="item-2" />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="item-2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Poděkování zákazníkovi
                    </label>
                    <p className="text-sm text-muted-foreground">Personál poděkuje zákazníkovi za nákup</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="item-3" checked />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="item-3"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Rozloučení se zákazníkem
                    </label>
                    <p className="text-sm text-muted-foreground">Personál se rozloučí se zákazníkem</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="item-4" checked />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="item-4"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Nabídka aktivní prodejní položky
                    </label>
                    <p className="text-sm text-muted-foreground">Personál aktivně nabízí aktuální prodejní položku</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="item-5" checked />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="item-5"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Uniforma personálu
                    </label>
                    <p className="text-sm text-muted-foreground">Personál má čistou a kompletní uniformu</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Uložit kontrolu
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Další záložky by byly podobně strukturované */}
        <TabsContent value="exterior" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Exteriér</CardTitle>
              <CardDescription>Kontrola standardů exteriéru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Obsah pro tuto sekci se připravuje</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interior" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Interiér</CardTitle>
              <CardDescription>Kontrola standardů interiéru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Obsah pro tuto sekci se připravuje</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bakery" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pekárna</CardTitle>
              <CardDescription>Kontrola standardů pekárny</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Obsah pro tuto sekci se připravuje</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Produkty</CardTitle>
              <CardDescription>Kontrola standardů produktů</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Obsah pro tuto sekci se připravuje</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Služby</CardTitle>
              <CardDescription>Kontrola standardů služeb</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Obsah pro tuto sekci se připravuje</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

