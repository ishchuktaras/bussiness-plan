import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileCheck, FileWarning, AlertTriangle } from "lucide-react"

export default function FranchiseRequirements() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">Požadavky na franšízanta Žabka</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="mr-2 h-5 w-5 text-green-500" />
              Požadované dokumenty
            </CardTitle>
            <CardDescription>Dokumenty potřebné pro uzavření franšízové smlouvy</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dokument</TableHead>
                  <TableHead>Poznámka</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Občanský průkaz</TableCell>
                  <TableCell>Platný doklad totožnosti</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Živnostenský list</TableCell>
                  <TableCell>Volná živnost - maloobchod</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Výpis z rejstříku trestů</TableCell>
                  <TableCell>Ne starší než 3 měsíce</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Doklad o vzdělání</TableCell>
                  <TableCell>Minimálně středoškolské</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Potvrzení o bezdlužnosti</TableCell>
                  <TableCell>Finanční úřad, ČSSZ</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bankovní výpis</TableCell>
                  <TableCell>Doklad o finanční situaci</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileWarning className="mr-2 h-5 w-5 text-yellow-500" />
              Kvalifikační požadavky
            </CardTitle>
            <CardDescription>Požadavky na zkušenosti a kvalifikaci franšízanta</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Požadavek</TableHead>
                  <TableHead>Popis</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Vzdělání</TableCell>
                  <TableCell>Minimálně středoškolské s maturitou</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Praxe v obchodě</TableCell>
                  <TableCell>Výhodou, ne podmínkou</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Manažerské zkušenosti</TableCell>
                  <TableCell>Výhodou, ne podmínkou</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Trestní bezúhonnost</TableCell>
                  <TableCell>Podmínkou</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jazykové znalosti</TableCell>
                  <TableCell>Čeština na úrovni rodilého mluvčího</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Počítačová gramotnost</TableCell>
                  <TableCell>Základní znalost MS Office</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
            Finanční požadavky
          </CardTitle>
          <CardDescription>Finanční podmínky pro zahájení franšízové spolupráce</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Všechny částky jsou uvedeny bez DPH</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Položka</TableHead>
                <TableHead>Částka</TableHead>
                <TableHead>Poznámka</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Počáteční jistina</TableCell>
                <TableCell>20 000 Kč</TableCell>
                <TableCell>Vratná kauce</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Konečná jistina</TableCell>
                <TableCell>150 000 Kč</TableCell>
                <TableCell>Postupně navyšována z provizí</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Poplatek při převzetí</TableCell>
                <TableCell>10 000 Kč + DPH</TableCell>
                <TableCell>Jednorázový poplatek</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Licenční poplatek</TableCell>
                <TableCell>1% z obratu</TableCell>
                <TableCell>Měsíční platba</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Finanční rezerva</TableCell>
                <TableCell>Min. 100 000 Kč</TableCell>
                <TableCell>Doporučená částka na provozní výdaje</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Proces výběru franšízanta</CardTitle>
            <CardDescription>Jednotlivé kroky výběrového řízení</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  1
                </span>
                <div>
                  <h3 className="font-medium">Úvodní pohovor</h3>
                  <p className="text-sm text-muted-foreground">Seznámení s konceptem a základními podmínkami</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  2
                </span>
                <div>
                  <h3 className="font-medium">Předložení dokumentů</h3>
                  <p className="text-sm text-muted-foreground">Doložení všech požadovaných dokumentů</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  3
                </span>
                <div>
                  <h3 className="font-medium">Psychologické testy</h3>
                  <p className="text-sm text-muted-foreground">Ověření osobnostních předpokladů</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  4
                </span>
                <div>
                  <h3 className="font-medium">Assessment centrum</h3>
                  <p className="text-sm text-muted-foreground">Celodenní hodnocení schopností a dovedností</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-sm mr-3 mt-0.5">
                  5
                </span>
                <div>
                  <h3 className="font-medium">Závěrečný pohovor</h3>
                  <p className="text-sm text-muted-foreground">Finální rozhodnutí o přijetí</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Časté důvody zamítnutí</CardTitle>
            <CardDescription>Nejčastější důvody pro nepřijetí uchazečů</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Nedostatečná finanční situace</h3>
                  <p className="text-sm text-muted-foreground">
                    Nedostatek finančních prostředků na počáteční investici
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Záznam v rejstříku trestů</h3>
                  <p className="text-sm text-muted-foreground">Zejména majetkové a hospodářské trestné činy</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Nedostatečná motivace</h3>
                  <p className="text-sm text-muted-foreground">Nerealistická očekávání nebo nedostatek zájmu</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Špatné výsledky v testech</h3>
                  <p className="text-sm text-muted-foreground">Nedostatečné manažerské nebo osobnostní předpoklady</p>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium">Konflikt zájmů</h3>
                  <p className="text-sm text-muted-foreground">Zapojení v konkurenčních podnikatelských aktivitách</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

