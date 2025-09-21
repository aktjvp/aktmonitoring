import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Plus, Search, Filter, Edit } from "lucide-react";

// Mock data
const employees = [
  {
    id: 1,
    fullName: "Karimov Sardor Akmalovich",
    position: "Dasturchi",
    department: "IT Bo'limi",
    servicePhone: "+998 90 123 45 67",
    internalPhone: "101",
    phoneMAC: "AA:BB:CC:DD:EE:FF",
    computerType: "Desktop",
    computerModel: "HP EliteDesk 800",
    computerProcessor: "Intel Core i5-10400",
    ramSize: "8GB",
    computerMAC: "00:1B:44:11:3A:B7",
    ssdAvailable: true,
    ssdSerial: "SSD123456",
    ssdAsCDrive: true,
    hddAvailable: false,
    hddSerial: "",
    upsAvailable: true,
    upsStatus: "Ishlayapti",
    computerName: "IT-DESK-001",
    domainConnected: true,
    employeeLogin: "s.karimov",
    biosPassword: true,
    userPassword: true,
    sealAvailable: true,
    sealNumber: "SEAL001",
    usbPortsOpen: false,
    hasAntivirus: true,
    antivirusVersion: "Kaspersky 21.0",
    hasInternet: true,
    printerModel: "HP LaserJet Pro 400",
    printerOwnership: "Tashkilot",
    chromeVersion: "120.0.6099.109",
  },
  {
    id: 2,
    fullName: "Rahimova Nozima Turgunovna",
    position: "Buxgalter",
    department: "Moliya Bo'limi",
    servicePhone: "+998 91 234 56 78",
    internalPhone: "201",
    phoneMAC: "BB:CC:DD:EE:FF:AA",
    computerType: "Laptop",
    computerModel: "Dell OptiPlex 3070",
    computerProcessor: "Intel Core i3-8100",
    ramSize: "4GB",
    computerMAC: "00:1B:44:11:3A:B8",
    ssdAvailable: false,
    ssdSerial: "",
    ssdAsCDrive: false,
    hddAvailable: true,
    hddSerial: "HDD789012",
    upsAvailable: false,
    upsStatus: "Yo'q",
    computerName: "FIN-LAP-002",
    domainConnected: true,
    employeeLogin: "n.rahimova",
    biosPassword: false,
    userPassword: true,
    sealAvailable: false,
    sealNumber: "",
    usbPortsOpen: true,
    hasAntivirus: true,
    antivirusVersion: "Avast 23.1",
    hasInternet: false,
    printerModel: "",
    printerOwnership: "Yo'q",
    chromeVersion: "119.0.6045.160",
  },
  {
    id: 3,
    fullName: "Toshmatov Bobur Rustamovich",
    position: "HR meneger",
    department: "HR Bo'limi",
    servicePhone: "+998 93 345 67 89",
    internalPhone: "301",
    phoneMAC: "CC:DD:EE:FF:AA:BB",
    computerType: "Monoblock",
    computerModel: "Lenovo ThinkCentre M720",
    computerProcessor: "AMD Ryzen 5 3400G",
    ramSize: "16GB",
    computerMAC: "00:1B:44:11:3A:B9",
    ssdAvailable: true,
    ssdSerial: "SSD345678",
    ssdAsCDrive: true,
    hddAvailable: true,
    hddSerial: "HDD901234",
    upsAvailable: true,
    upsStatus: "Nosoz",
    computerName: "HR-MONO-003",
    domainConnected: false,
    employeeLogin: "b.toshmatov",
    biosPassword: true,
    userPassword: false,
    sealAvailable: true,
    sealNumber: "SEAL003",
    usbPortsOpen: true,
    hasAntivirus: false,
    antivirusVersion: "",
    hasInternet: true,
    printerModel: "Canon PIXMA G2010",
    printerOwnership: "Shaxsiy",
    chromeVersion: "118.0.5993.117",
  },
];

export default function Employees() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === "all" || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Xodimlar</h1>
          <p className="text-muted-foreground">
            Xodimlar va ularning texnik jihozlari ro'yxati
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate("/employees/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Yangi xodim qo'shish
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
                placeholder="F.I.Sh. yoki lavozim bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Bo'limni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha bo'limlar</SelectItem>
                <SelectItem value="IT Bo'limi">IT Bo'limi</SelectItem>
                <SelectItem value="Moliya Bo'limi">Moliya Bo'limi</SelectItem>
                <SelectItem value="HR Bo'limi">HR Bo'limi</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Employees Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>Xodimlar ro'yxati ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>F.I.Sh.</TableHead>
                  <TableHead>Lavozim/Bo'lim</TableHead>
                  <TableHead>Telefon ma'lumotlari</TableHead>
                  <TableHead>Kompyuter ma'lumotlari</TableHead>
                  <TableHead>Tizim ma'lumotlari</TableHead>
                  <TableHead>Xavfsizlik</TableHead>
                  <TableHead>Harakatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="font-semibold">{employee.fullName}</div>
                        <div className="text-xs text-muted-foreground">Login: {employee.employeeLogin}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{employee.position}</div>
                        <div className="text-muted-foreground">{employee.department}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>Xizmat: {employee.servicePhone}</div>
                        <div>Ichki: {employee.internalPhone}</div>
                        <div className="text-xs text-muted-foreground">MAC: {employee.phoneMAC}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="font-medium">{employee.computerModel}</div>
                        <div className="text-xs text-muted-foreground">{employee.computerType}</div>
                        <div className="text-xs">{employee.computerProcessor}</div>
                        <div className="text-xs">RAM: {employee.ramSize}</div>
                        <div className="text-xs text-muted-foreground">MAC: {employee.computerMAC}</div>
                        <div className="text-xs">Nomi: {employee.computerName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <Badge variant={employee.ssdAvailable ? "default" : "outline"} className="text-xs">
                            SSD {employee.ssdAvailable ? "+" : "-"}
                          </Badge>
                          <Badge variant={employee.hddAvailable ? "default" : "outline"} className="text-xs">
                            HDD {employee.hddAvailable ? "+" : "-"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant={employee.upsAvailable ? "default" : "outline"} className="text-xs">
                            UPS {employee.upsAvailable ? employee.upsStatus : "Yo'q"}
                          </Badge>
                        </div>
                        <div className="text-xs">Chrome: {employee.chromeVersion}</div>
                        {employee.printerModel && (
                          <div className="text-xs">Printer: {employee.printerModel}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge 
                          variant={employee.hasAntivirus ? "default" : "destructive"}
                          className="text-xs w-fit"
                        >
                          {employee.hasAntivirus ? `Antivirus: ${employee.antivirusVersion}` : "Antivirus yo'q"}
                        </Badge>
                        <Badge 
                          variant={employee.hasInternet ? "default" : "secondary"}
                          className="text-xs w-fit"
                        >
                          {employee.hasInternet ? "Internet +" : "Internet -"}
                        </Badge>
                        <Badge 
                          variant={employee.domainConnected ? "default" : "outline"}
                          className="text-xs w-fit"
                        >
                          {employee.domainConnected ? "Domen +" : "Domen -"}
                        </Badge>
                        <div className="flex gap-1 mt-1">
                          <Badge variant={employee.biosPassword ? "default" : "outline"} className="text-xs">
                            BIOS {employee.biosPassword ? "+" : "-"}
                          </Badge>
                          <Badge variant={employee.userPassword ? "default" : "outline"} className="text-xs">
                            User {employee.userPassword ? "+" : "-"}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Badge variant={employee.sealAvailable ? "default" : "outline"} className="text-xs">
                            Plomba {employee.sealAvailable ? employee.sealNumber : "-"}
                          </Badge>
                        </div>
                        <Badge variant={employee.usbPortsOpen ? "destructive" : "default"} className="text-xs w-fit">
                          USB {employee.usbPortsOpen ? "Ochiq" : "Yopiq"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/employees/${employee.id}/edit`)}
                        >
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