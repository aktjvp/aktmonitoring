import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Filter, Edit, Eye, Monitor } from "lucide-react";
import { Link } from "react-router-dom";

// Mock data
const computers = [
  {
    id: 1,
    name: "IT-DESK-001",
    model: "HP EliteDesk 800",
    type: "Desktop",
    macAddress: "00:1B:44:11:3A:B7",
    purchaseDate: "15.03.2023",
    monitorSize: "24.0\"",
    processor: "Intel Core i5-10400",
    ram: "8GB",
    upsStatus: "Bor",
    ssd: { available: true, capacity: "256GB", serial: "SSD123456" },
    hdd: { available: false, capacity: "", serial: "" },
    isDomainJoined: true,
    antivirusName: "Kaspersky Endpoint Security",
    antivirusUpdateDate: "20.12.2024",
    hasInternet: true,
    browserModel: "Chrome 120.0.6099.109",
    hasBiosPassword: true,
    hasUserPassword: true,
    seal: { available: true, number: "SEAL001" },
    usbPortStatus: "Yopiq",
    user: "Karimov Sardor",
    department: "IT Bo'limi",
  },
  {
    id: 2,
    name: "FIN-LAP-002",
    model: "Dell Latitude 5520",
    type: "Laptop",
    macAddress: "00:1B:44:11:3A:B8",
    purchaseDate: "08.06.2023",
    monitorSize: "15.6\"",
    processor: "Intel Core i3-8100",
    ram: "4GB",
    upsStatus: "Yo'q",
    ssd: { available: false, capacity: "", serial: "" },
    hdd: { available: true, capacity: "500GB", serial: "HDD789012" },
    isDomainJoined: true,
    antivirusName: "Avast Business",
    antivirusUpdateDate: "18.12.2024",
    hasInternet: false,
    browserModel: "Chrome 119.0.6045.160",
    hasBiosPassword: false,
    hasUserPassword: true,
    seal: { available: false, number: "" },
    usbPortStatus: "Ochiq",
    user: "Rahimova Nozima",
    department: "Moliya Bo'limi",
  },
  {
    id: 3,
    name: "HR-MONO-003",
    model: "Lenovo ThinkCentre M720",
    type: "Monoblok",
    macAddress: "00:1B:44:11:3A:B9",
    purchaseDate: "22.09.2023",
    monitorSize: "21.5\"",
    processor: "AMD Ryzen 5 3400G",
    ram: "16GB",
    upsStatus: "Bor nosoz",
    ssd: { available: true, capacity: "512GB", serial: "SSD345678" },
    hdd: { available: true, capacity: "1TB", serial: "HDD901234" },
    isDomainJoined: false,
    antivirusName: "",
    antivirusUpdateDate: "",
    hasInternet: true,
    browserModel: "Chrome 118.0.5993.117",
    hasBiosPassword: true,
    hasUserPassword: false,
    seal: { available: true, number: "SEAL003" },
    usbPortStatus: "Ochiq",
    user: "Toshmatov Bobur",
    department: "HR Bo'limi",
  },
  {
    id: 4,
    name: "ACC-DESK-004",
    model: "ASUS ExpertCenter D500",
    type: "Desktop",
    macAddress: "00:1B:44:11:3A:C0",
    purchaseDate: "10.01.2024",
    monitorSize: "27.0\"",
    processor: "Intel Core i7-11700",
    ram: "32GB",
    upsStatus: "Bor",
    ssd: { available: true, capacity: "1TB", serial: "SSD567890" },
    hdd: { available: false, capacity: "", serial: "" },
    isDomainJoined: true,
    antivirusName: "ESET Endpoint Protection",
    antivirusUpdateDate: "21.12.2024",
    hasInternet: true,
    browserModel: "Chrome 121.0.6167.139",
    hasBiosPassword: true,
    hasUserPassword: true,
    seal: { available: true, number: "SEAL004" },
    usbPortStatus: "Yopiq",
    user: "Abdullayev Aziz",
    department: "Buxgalteriya",
  },
  {
    id: 5,
    name: "SEC-LAP-005",
    model: "HP ProBook 450",
    type: "Laptop",
    macAddress: "00:1B:44:11:3A:C1",
    purchaseDate: "05.11.2023",
    monitorSize: "14.0\"",
    processor: "Intel Core i5-1135G7",
    ram: "8GB",
    upsStatus: "Yo'q",
    ssd: { available: true, capacity: "256GB", serial: "SSD234567" },
    hdd: { available: false, capacity: "", serial: "" },
    isDomainJoined: true,
    antivirusName: "Windows Defender",
    antivirusUpdateDate: "22.12.2024",
    hasInternet: true,
    browserModel: "Chrome 120.0.6099.199",
    hasBiosPassword: true,
    hasUserPassword: true,
    seal: { available: false, number: "" },
    usbPortStatus: "Yopiq",
    user: "Mirzayeva Dilnoza",
    department: "Xavfsizlik Bo'limi",
  },
  {
    id: 6,
    name: "ADM-MONO-006",
    model: "Acer Aspire C24",
    type: "Monoblok",
    macAddress: "00:1B:44:11:3A:C2",
    purchaseDate: "18.04.2023",
    monitorSize: "23.8\"",
    processor: "Intel Core i3-10110U",
    ram: "4GB",
    upsStatus: "Bor",
    ssd: { available: false, capacity: "", serial: "" },
    hdd: { available: true, capacity: "1TB", serial: "HDD456789" },
    isDomainJoined: false,
    antivirusName: "Avira Antivirus",
    antivirusUpdateDate: "19.12.2024",
    hasInternet: false,
    browserModel: "Chrome 119.0.6045.199",
    hasBiosPassword: false,
    hasUserPassword: true,
    seal: { available: true, number: "SEAL006" },
    usbPortStatus: "Ochiq",
    user: "Karimova Feruza",
    department: "Ma'muriyat",
  },
  {
    id: 7,
    name: "LOG-DESK-007",
    model: "MSI Pro B660M",
    type: "Desktop",
    macAddress: "00:1B:44:11:3A:C3",
    purchaseDate: "29.08.2024",
    monitorSize: "32.0\"",
    processor: "Intel Core i9-12900K",
    ram: "64GB",
    upsStatus: "Bor",
    ssd: { available: true, capacity: "2TB", serial: "SSD789012" },
    hdd: { available: true, capacity: "4TB", serial: "HDD123456" },
    isDomainJoined: true,
    antivirusName: "McAfee Total Protection",
    antivirusUpdateDate: "23.12.2024",
    hasInternet: true,
    browserModel: "Chrome 121.0.6167.184",
    hasBiosPassword: true,
    hasUserPassword: true,
    seal: { available: true, number: "SEAL007" },
    usbPortStatus: "Yopiq",
    user: "Sattorov Jahongir",
    department: "Logistika Bo'limi",
  },
  {
    id: 8,
    name: "CONS-LAP-008",
    model: "Lenovo IdeaPad 3",
    type: "Laptop",
    macAddress: "00:1B:44:11:3A:C4",
    purchaseDate: "12.07.2024",
    monitorSize: "17.3\"",
    processor: "AMD Ryzen 7 5700U",
    ram: "12GB",
    upsStatus: "Yo'q",
    ssd: { available: true, capacity: "512GB", serial: "SSD890123" },
    hdd: { available: false, capacity: "", serial: "" },
    isDomainJoined: false,
    antivirusName: "Bitdefender GravityZone",
    antivirusUpdateDate: "21.12.2024",
    hasInternet: true,
    browserModel: "Chrome 120.0.6099.234",
    hasBiosPassword: false,
    hasUserPassword: false,
    seal: { available: false, number: "" },
    usbPortStatus: "Ochiq",
    user: "Yusupova Kamila",
    department: "Konsalting Bo'limi",
  },
];

export default function Computers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredComputers = computers.filter((computer) => {
    const matchesSearch = 
      computer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      computer.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || computer.type === selectedType;
    const matchesDepartment = selectedDepartment === "all" || computer.department === selectedDepartment;
    return matchesSearch && matchesType && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Kompyuterlar</h1>
          <p className="text-muted-foreground">
            Tashkilotdagi barcha kompyuterlar ro'yxati va ularning texnik ma'lumotlari
          </p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link to="/computers/add">
            <Plus className="mr-2 h-4 w-4" />
            Yangi kompyuter qo'shish
          </Link>
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami kompyuterlar</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{computers.length}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-600">{computers.filter(c => c.upsStatus !== "Bor nosoz").length} soz</span>
                    <span className="mx-1">•</span>
                    <span className="text-red-600">{computers.filter(c => c.upsStatus === "Bor nosoz").length} nosoz</span>
                  </div>
                </div>
              </div>
              <Monitor className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Domen qo'shilgan</p>
                <p className="text-2xl font-bold text-green-600">
                  {computers.filter(c => c.isDomainJoined).length}
                </p>
                <p className="text-xs text-muted-foreground">Active Directory</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Internet ulangan</p>
                <p className="text-2xl font-bold text-blue-600">
                  {computers.filter(c => c.hasInternet).length}
                </p>
                <p className="text-xs text-muted-foreground">Tarmoq mavjud</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Antivirus</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{computers.filter(c => c.antivirusName).length}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-600">{computers.filter(c => c.antivirusName).length} o'rnatilgan</span>
                    <span className="mx-1">•</span>
                    <span className="text-red-600">{computers.filter(c => !c.antivirusName).length} yo'q</span>
                  </div>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">USB portlar</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{computers.filter(c => c.usbPortStatus === "Ochiq").length}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-red-600">{computers.filter(c => c.usbPortStatus === "Ochiq").length} ochiq</span>
                    <span className="mx-1">•</span>
                    <span className="text-green-600">{computers.filter(c => c.usbPortStatus === "Yopiq").length} yopiq</span>
                  </div>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-orange-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Obmordagi kompyuterlar</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{computers.filter(c => c.macAddress.startsWith("00:1B:44")).length}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-600">{computers.filter(c => c.macAddress.startsWith("00:1B:44") && c.upsStatus !== "Bor nosoz").length} soz</span>
                    <span className="mx-1">•</span>
                    <span className="text-red-600">{computers.filter(c => c.macAddress.startsWith("00:1B:44") && c.upsStatus === "Bor nosoz").length} nosoz</span>
                  </div>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full bg-cyan-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-cyan-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Qidiruv va filtrlar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Nomi, modeli, MAC manzili yoki egasi bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Kompyuter turini tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha turlar</SelectItem>
                <SelectItem value="Desktop">Desktop</SelectItem>
                <SelectItem value="Laptop">Laptop</SelectItem>
                <SelectItem value="Monoblok">Monoblok</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Bo'limni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha bo'limlar</SelectItem>
                <SelectItem value="IT Bo'limi">IT Bo'limi</SelectItem>
                <SelectItem value="Moliya Bo'limi">Moliya Bo'limi</SelectItem>
                <SelectItem value="HR Bo'limi">HR Bo'limi</SelectItem>
                <SelectItem value="Buxgalteriya">Buxgalteriya</SelectItem>
                <SelectItem value="Xavfsizlik Bo'limi">Xavfsizlik Bo'limi</SelectItem>
                <SelectItem value="Ma'muriyat">Ma'muriyat</SelectItem>
                <SelectItem value="Logistika Bo'limi">Logistika Bo'limi</SelectItem>
                <SelectItem value="Konsalting Bo'limi">Konsalting Bo'limi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Computers Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Kompyuterlar ro'yxati ({filteredComputers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kompyuter ma'lumotlari</TableHead>
                  <TableHead>Texnik xususiyatlari</TableHead>
                  <TableHead>Xotira qurilmalari</TableHead>
                  <TableHead>Tizim va dasturlar</TableHead>
                  <TableHead>Xavfsizlik</TableHead>
                  <TableHead>Foydalanuvchi</TableHead>
                  <TableHead>Harakatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComputers.map((computer) => (
                  <TableRow key={computer.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold">{computer.name}</div>
                        <div className="text-sm text-muted-foreground">{computer.model}</div>
                        <Badge variant="outline" className="text-xs">
                          {computer.type}
                        </Badge>
                        <div className="text-xs text-muted-foreground font-mono">
                          MAC: {computer.macAddress}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Olingan: {computer.purchaseDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div><strong>Monitor:</strong> {computer.monitorSize}</div>
                        <div><strong>Protsessor:</strong> {computer.processor}</div>
                        <div><strong>RAM:</strong> {computer.ram}</div>
                        <div className="flex items-center gap-1">
                          <Badge 
                            variant={
                              computer.upsStatus === "Bor" ? "default" : 
                              computer.upsStatus === "Bor nosoz" ? "destructive" : "outline"
                            } 
                            className="text-xs"
                          >
                            UPS: {computer.upsStatus}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex flex-col gap-1">
                          <Badge 
                            variant={computer.ssd.available ? "default" : "outline"} 
                            className="text-xs w-fit"
                          >
                            {computer.ssd.available ? `SSD: ${computer.ssd.capacity}` : "SSD yo'q"}
                          </Badge>
                          {computer.ssd.available && (
                            <span className="text-xs text-muted-foreground">
                              Serial: {computer.ssd.serial}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <Badge 
                            variant={computer.hdd.available ? "default" : "outline"} 
                            className="text-xs w-fit"
                          >
                            {computer.hdd.available ? `HDD: ${computer.hdd.capacity}` : "HDD yo'q"}
                          </Badge>
                          {computer.hdd.available && (
                            <span className="text-xs text-muted-foreground">
                              Serial: {computer.hdd.serial}
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge 
                          variant={computer.isDomainJoined ? "default" : "outline"}
                          className="text-xs w-fit"
                        >
                          Domen {computer.isDomainJoined ? "+" : "-"}
                        </Badge>
                        <div className="text-xs">
                          <strong>Antivirus:</strong> {computer.antivirusName || "Yo'q"}
                        </div>
                        {computer.antivirusUpdateDate && (
                          <div className="text-xs text-muted-foreground">
                            Yangilangan: {computer.antivirusUpdateDate}
                          </div>
                        )}
                        <Badge 
                          variant={computer.hasInternet ? "default" : "secondary"}
                          className="text-xs w-fit"
                        >
                          Internet {computer.hasInternet ? "+" : "-"}
                        </Badge>
                        <div className="text-xs">
                          <strong>Browser:</strong> {computer.browserModel}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          <Badge variant={computer.hasBiosPassword ? "default" : "outline"} className="text-xs">
                            BIOS {computer.hasBiosPassword ? "+" : "-"}
                          </Badge>
                          <Badge variant={computer.hasUserPassword ? "default" : "outline"} className="text-xs">
                            User {computer.hasUserPassword ? "+" : "-"}
                          </Badge>
                        </div>
                        <Badge 
                          variant={computer.seal.available ? "default" : "outline"} 
                          className="text-xs w-fit"
                        >
                          Plomba {computer.seal.available ? computer.seal.number : "-"}
                        </Badge>
                        <Badge 
                          variant={computer.usbPortStatus === "Ochiq" ? "destructive" : "default"} 
                          className="text-xs w-fit"
                        >
                          USB {computer.usbPortStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{computer.user}</div>
                        <div className="text-muted-foreground">{computer.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}