import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for Bo'limlar/Hududlar
const departmentData = [
  {
    id: 1,
    name: "IT Bo'limi",
    employees: { tezkor: 12, texnik: 8 },
    computers: { desktop: 15, monoblock: 5, laptop: 10 },
    ups: 20,
    phones: 18,
    printers: 8
  },
  {
    id: 2,
    name: "Buxgalteriya",
    employees: { tezkor: 8, texnik: 2 },
    computers: { desktop: 10, monoblock: 0, laptop: 3 },
    ups: 13,
    phones: 10,
    printers: 3
  },
  {
    id: 3,
    name: "Kadrlar bo'limi",
    employees: { tezkor: 5, texnik: 1 },
    computers: { desktop: 6, monoblock: 2, laptop: 2 },
    ups: 10,
    phones: 6,
    printers: 2
  },
  {
    id: 4,
    name: "Xavfsizlik xizmati",
    employees: { tezkor: 15, texnik: 3 },
    computers: { desktop: 12, monoblock: 0, laptop: 8 },
    ups: 20,
    phones: 18,
    printers: 4
  },
  {
    id: 5,
    name: "Marketing",
    employees: { tezkor: 10, texnik: 2 },
    computers: { desktop: 8, monoblock: 3, laptop: 6 },
    ups: 17,
    phones: 12,
    printers: 3
  }
];

// Mock data for Kompyuterlar
const computerData = [
  {
    type: "Desktop",
    total: { soz: 45, nosoz: 5 },
    inUse: 42,
    domainJoined: 40,
    internetConnected: 38,
    antivirus: { bor: 44, yoq: 6 },
    storage: "SSD",
    biosPassword: { bor: 35, yoq: 15 },
    userPassword: { bor: 48, yoq: 2 },
    seal: { bor: 30, yoq: 20 },
    usbPort: { ochiq: 20, yopiq: 30 },
    ups: { soz: 45, nosoz: 5 },
    warehouse: { soz: 5, nosoz: 3 }
  },
  {
    type: "Monoblock",
    total: { soz: 18, nosoz: 2 },
    inUse: 16,
    domainJoined: 15,
    internetConnected: 18,
    antivirus: { bor: 19, yoq: 1 },
    storage: "SSD",
    biosPassword: { bor: 12, yoq: 8 },
    userPassword: { bor: 18, yoq: 2 },
    seal: { bor: 8, yoq: 12 },
    usbPort: { ochiq: 10, yopiq: 10 },
    ups: { soz: 18, nosoz: 2 },
    warehouse: { soz: 2, nosoz: 2 }
  },
  {
    type: "Laptop",
    total: { soz: 32, nosoz: 3 },
    inUse: 29,
    domainJoined: 25,
    internetConnected: 32,
    antivirus: { bor: 33, yoq: 2 },
    storage: "SSD",
    biosPassword: { bor: 28, yoq: 7 },
    userPassword: { bor: 34, yoq: 1 },
    seal: { bor: 15, yoq: 20 },
    usbPort: { ochiq: 25, yopiq: 10 },
    ups: { soz: 0, nosoz: 0 },
    warehouse: { soz: 3, nosoz: 3 }
  }
];

// Mock data for Telefonlar
const phoneData = [
  {
    model: "Cisco IP Phone 7841",
    total: { soz: 25, nosoz: 3 },
    inUse: 22,
    warehouse: { soz: 3, nosoz: 3 }
  },
  {
    model: "Yealink T46S",
    total: { soz: 18, nosoz: 2 },
    inUse: 16,
    warehouse: { soz: 2, nosoz: 2 }
  },
  {
    model: "Grandstream GXP2170",
    total: { soz: 15, nosoz: 1 },
    inUse: 14,
    warehouse: { soz: 1, nosoz: 1 }
  },
  {
    model: "Panasonic KX-TGF310",
    total: { soz: 12, nosoz: 2 },
    inUse: 10,
    warehouse: { soz: 2, nosoz: 2 }
  }
];

// Mock data for Printerlar
const printerData = [
  {
    model: "HP LaserJet Pro",
    total: { soz: 12, nosoz: 2 },
    organizational: { soz: 10, nosoz: 1 },
    personal: 3,
    inUse: { organizational: 9, personal: 2 },
    warehouse: { soz: 2, nosoz: 1 }
  },
  {
    model: "Canon PIXMA",
    total: { soz: 8, nosoz: 1 },
    organizational: { soz: 6, nosoz: 1 },
    personal: 2,
    inUse: { organizational: 5, personal: 2 },
    warehouse: { soz: 1, nosoz: 0 }
  },
  {
    model: "Epson EcoTank",
    total: { soz: 6, nosoz: 0 },
    organizational: { soz: 4, nosoz: 0 },
    personal: 2,
    inUse: { organizational: 4, personal: 1 },
    warehouse: { soz: 0, nosoz: 0 }
  },
  {
    model: "Brother DCP",
    total: { soz: 5, nosoz: 1 },
    organizational: { soz: 4, nosoz: 1 },
    personal: 1,
    inUse: { organizational: 3, personal: 1 },
    warehouse: { soz: 1, nosoz: 0 }
  }
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState("departments");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Hisobotlar</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Statistik ma'lumotlar</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="departments">Bo'limlar/Hududlar</TabsTrigger>
              <TabsTrigger value="computers">Kompyuterlar</TabsTrigger>
              <TabsTrigger value="phones">Telefonlar</TabsTrigger>
              <TabsTrigger value="printers">Printerlar</TabsTrigger>
            </TabsList>

            <TabsContent value="departments" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">№</TableHead>
                      <TableHead>Bo'lim/Hudud nomi</TableHead>
                      <TableHead>Xodimlar soni</TableHead>
                      <TableHead>Kompyuterlar</TableHead>
                      <TableHead>UPS</TableHead>
                      <TableHead>Telefonlar</TableHead>
                      <TableHead>Printerlar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {departmentData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.id}</TableCell>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Tezkor: <Badge variant="secondary">{item.employees.tezkor}</Badge></div>
                            <div>Texnik: <Badge variant="outline">{item.employees.texnik}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Desktop: <Badge variant="secondary">{item.computers.desktop}</Badge></div>
                            <div>Monoblock: <Badge variant="outline">{item.computers.monoblock}</Badge></div>
                            <div>Laptop: <Badge variant="secondary">{item.computers.laptop}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{item.ups}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{item.phones}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">{item.printers}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-medium">
                      <TableCell className="font-bold">-</TableCell>
                      <TableCell className="font-bold">Umumiy summa</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Tezkor: <Badge variant="secondary">{departmentData.reduce((sum, item) => sum + item.employees.tezkor, 0)}</Badge></div>
                          <div>Texnik: <Badge variant="outline">{departmentData.reduce((sum, item) => sum + item.employees.texnik, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Desktop: <Badge variant="secondary">{departmentData.reduce((sum, item) => sum + item.computers.desktop, 0)}</Badge></div>
                          <div>Monoblock: <Badge variant="outline">{departmentData.reduce((sum, item) => sum + item.computers.monoblock, 0)}</Badge></div>
                          <div>Laptop: <Badge variant="secondary">{departmentData.reduce((sum, item) => sum + item.computers.laptop, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{departmentData.reduce((sum, item) => sum + item.ups, 0)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{departmentData.reduce((sum, item) => sum + item.phones, 0)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{departmentData.reduce((sum, item) => sum + item.printers, 0)}</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="computers" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Turi</TableHead>
                      <TableHead>Jami</TableHead>
                      <TableHead>Foydalanishda</TableHead>
                      <TableHead>Domenga qo'shilgan</TableHead>
                      <TableHead>Internet</TableHead>
                      <TableHead>Antivirus</TableHead>
                      <TableHead>Storage</TableHead>
                      <TableHead>BIOS parol</TableHead>
                      <TableHead>User parol</TableHead>
                      <TableHead>Plomba</TableHead>
                      <TableHead>USB port</TableHead>
                      <TableHead>UPS</TableHead>
                      <TableHead>Omborda</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {computerData.map((item) => (
                      <TableRow key={item.type}>
                        <TableCell className="font-medium">{item.type}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.total.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.total.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="default">{item.inUse}</Badge></TableCell>
                        <TableCell><Badge variant="default">{item.domainJoined}</Badge></TableCell>
                        <TableCell><Badge variant="default">{item.internetConnected}</Badge></TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Bor: <Badge variant="secondary">{item.antivirus.bor}</Badge></div>
                            <div>Yo'q: <Badge variant="destructive">{item.antivirus.yoq}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{item.storage}</Badge></TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Bor: <Badge variant="secondary">{item.biosPassword.bor}</Badge></div>
                            <div>Yo'q: <Badge variant="destructive">{item.biosPassword.yoq}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Bor: <Badge variant="secondary">{item.userPassword.bor}</Badge></div>
                            <div>Yo'q: <Badge variant="destructive">{item.userPassword.yoq}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Bor: <Badge variant="secondary">{item.seal.bor}</Badge></div>
                            <div>Yo'q: <Badge variant="destructive">{item.seal.yoq}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Ochiq: <Badge variant="destructive">{item.usbPort.ochiq}</Badge></div>
                            <div>Yopiq: <Badge variant="secondary">{item.usbPort.yopiq}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.ups.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.ups.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.warehouse.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.warehouse.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-medium">
                      <TableCell className="font-bold">Umumiy summa</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.total.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.total.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="default">{computerData.reduce((sum, item) => sum + item.inUse, 0)}</Badge></TableCell>
                      <TableCell><Badge variant="default">{computerData.reduce((sum, item) => sum + item.domainJoined, 0)}</Badge></TableCell>
                      <TableCell><Badge variant="default">{computerData.reduce((sum, item) => sum + item.internetConnected, 0)}</Badge></TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Bor: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.antivirus.bor, 0)}</Badge></div>
                          <div>Yo'q: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.antivirus.yoq, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">-</Badge></TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Bor: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.biosPassword.bor, 0)}</Badge></div>
                          <div>Yo'q: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.biosPassword.yoq, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Bor: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.userPassword.bor, 0)}</Badge></div>
                          <div>Yo'q: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.userPassword.yoq, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Bor: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.seal.bor, 0)}</Badge></div>
                          <div>Yo'q: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.seal.yoq, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Ochiq: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.usbPort.ochiq, 0)}</Badge></div>
                          <div>Yopiq: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.usbPort.yopiq, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.ups.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.ups.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{computerData.reduce((sum, item) => sum + item.warehouse.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{computerData.reduce((sum, item) => sum + item.warehouse.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="phones" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Telefon modeli</TableHead>
                      <TableHead>Jami</TableHead>
                      <TableHead>Foydalanishda</TableHead>
                      <TableHead>Omborda</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {phoneData.map((item) => (
                      <TableRow key={item.model}>
                        <TableCell className="font-medium">{item.model}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.total.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.total.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="default">{item.inUse}</Badge></TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.warehouse.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.warehouse.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-medium">
                      <TableCell className="font-bold">Umumiy summa</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{phoneData.reduce((sum, item) => sum + item.total.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{phoneData.reduce((sum, item) => sum + item.total.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="default">{phoneData.reduce((sum, item) => sum + item.inUse, 0)}</Badge></TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{phoneData.reduce((sum, item) => sum + item.warehouse.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{phoneData.reduce((sum, item) => sum + item.warehouse.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="printers" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Printer modeli</TableHead>
                      <TableHead>Jami</TableHead>
                      <TableHead>Tashkilotga tegishli</TableHead>
                      <TableHead>Shaxsiy</TableHead>
                      <TableHead>Foydalanishda</TableHead>
                      <TableHead>Omborda</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {printerData.map((item) => (
                      <TableRow key={item.model}>
                        <TableCell className="font-medium">{item.model}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.total.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.total.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.organizational.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.organizational.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell><Badge variant="outline">{item.personal}</Badge></TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Tashkilot: <Badge variant="secondary">{item.inUse.organizational}</Badge></div>
                            <div>Shaxsiy: <Badge variant="outline">{item.inUse.personal}</Badge></div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>Soz: <Badge variant="secondary">{item.warehouse.soz}</Badge></div>
                            <div>Nosoz: <Badge variant="destructive">{item.warehouse.nosoz}</Badge></div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-muted/50 font-medium">
                      <TableCell className="font-bold">Umumiy summa</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{printerData.reduce((sum, item) => sum + item.total.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{printerData.reduce((sum, item) => sum + item.total.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{printerData.reduce((sum, item) => sum + item.organizational.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{printerData.reduce((sum, item) => sum + item.organizational.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{printerData.reduce((sum, item) => sum + item.personal, 0)}</Badge></TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Tashkilot: <Badge variant="secondary">{printerData.reduce((sum, item) => sum + item.inUse.organizational, 0)}</Badge></div>
                          <div>Shaxsiy: <Badge variant="outline">{printerData.reduce((sum, item) => sum + item.inUse.personal, 0)}</Badge></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div>Soz: <Badge variant="secondary">{printerData.reduce((sum, item) => sum + item.warehouse.soz, 0)}</Badge></div>
                          <div>Nosoz: <Badge variant="destructive">{printerData.reduce((sum, item) => sum + item.warehouse.nosoz, 0)}</Badge></div>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}