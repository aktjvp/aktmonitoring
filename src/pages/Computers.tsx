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
    type: "Desktop",
    model: "HP EliteDesk 800",
    processor: "Intel Core i5-10400",
    ram: "8GB",
    macAddress: "00:1B:44:11:3A:B7",
    ssd: { available: true, serial: "SSD123456", asCDrive: true },
    hdd: { available: false, serial: "" },
    ups: { available: true, status: "Ishlayapti" },
    domain: true,
    antivirus: "Kaspersky 21.0",
    internet: true,
    chrome: "120.0.6099.109",
    owner: "Karimov Sardor",
    department: "IT Bo'limi",
    biosPassword: true,
    userPassword: true,
    seal: { available: true, number: "SEAL001" },
    usbOpen: false,
  },
  {
    id: 2,
    name: "FIN-LAP-002",
    type: "Laptop",
    model: "Dell OptiPlex 3070",
    processor: "Intel Core i3-8100",
    ram: "4GB",
    macAddress: "00:1B:44:11:3A:B8",
    ssd: { available: false, serial: "", asCDrive: false },
    hdd: { available: true, serial: "HDD789012" },
    ups: { available: false, status: "Yo'q" },
    domain: true,
    antivirus: "Avast 23.1",
    internet: false,
    chrome: "119.0.6045.160",
    owner: "Rahimova Nozima",
    department: "Moliya Bo'limi",
    biosPassword: false,
    userPassword: true,
    seal: { available: false, number: "" },
    usbOpen: true,
  },
  {
    id: 3,
    name: "HR-MONO-003",
    type: "Monoblock",
    model: "Lenovo ThinkCentre M720",
    processor: "AMD Ryzen 5 3400G",
    ram: "16GB",
    macAddress: "00:1B:44:11:3A:B9",
    ssd: { available: true, serial: "SSD345678", asCDrive: true },
    hdd: { available: true, serial: "HDD901234" },
    ups: { available: true, status: "Nosoz" },
    domain: false,
    antivirus: "",
    internet: true,
    chrome: "118.0.5993.117",
    owner: "Toshmatov Bobur",
    department: "HR Bo'limi",
    biosPassword: true,
    userPassword: false,
    seal: { available: true, number: "SEAL003" },
    usbOpen: true,
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
      computer.owner.toLowerCase().includes(searchTerm.toLowerCase());
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
                <SelectItem value="Monoblock">Monoblock</SelectItem>
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
                  <TableHead>Egasi</TableHead>
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
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div><strong>Protsessor:</strong> {computer.processor}</div>
                        <div><strong>RAM:</strong> {computer.ram}</div>
                        <div className="flex items-center gap-1">
                          <Badge variant={computer.ups.available ? "default" : "outline"} className="text-xs">
                            UPS: {computer.ups.status}
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
                            {computer.ssd.available ? `SSD: ${computer.ssd.serial}` : "SSD yo'q"}
                          </Badge>
                          {computer.ssd.available && computer.ssd.asCDrive && (
                            <span className="text-xs text-green-600">C: disk sifatida</span>
                          )}
                        </div>
                        <div>
                          <Badge 
                            variant={computer.hdd.available ? "default" : "outline"} 
                            className="text-xs w-fit"
                          >
                            {computer.hdd.available ? `HDD: ${computer.hdd.serial}` : "HDD yo'q"}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge 
                          variant={computer.domain ? "default" : "outline"}
                          className="text-xs w-fit"
                        >
                          Domen {computer.domain ? "+" : "-"}
                        </Badge>
                        <div className="text-xs">
                          <strong>Antivirus:</strong> {computer.antivirus || "Yo'q"}
                        </div>
                        <Badge 
                          variant={computer.internet ? "default" : "secondary"}
                          className="text-xs w-fit"
                        >
                          Internet {computer.internet ? "+" : "-"}
                        </Badge>
                        <div className="text-xs">
                          <strong>Chrome:</strong> {computer.chrome}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex gap-1">
                          <Badge variant={computer.biosPassword ? "default" : "outline"} className="text-xs">
                            BIOS {computer.biosPassword ? "+" : "-"}
                          </Badge>
                          <Badge variant={computer.userPassword ? "default" : "outline"} className="text-xs">
                            User {computer.userPassword ? "+" : "-"}
                          </Badge>
                        </div>
                        <Badge 
                          variant={computer.seal.available ? "default" : "outline"} 
                          className="text-xs w-fit"
                        >
                          Plomba {computer.seal.available ? computer.seal.number : "-"}
                        </Badge>
                        <Badge 
                          variant={computer.usbOpen ? "destructive" : "default"} 
                          className="text-xs w-fit"
                        >
                          USB {computer.usbOpen ? "Ochiq" : "Yopiq"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{computer.owner}</div>
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