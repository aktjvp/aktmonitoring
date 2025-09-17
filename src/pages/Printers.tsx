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
import { Plus, Search, Filter, Edit, Eye, Printer, Wifi, Cable } from "lucide-react";

// Mock data based on AddPrinter form
const printers = [
  {
    id: 1,
    printerModel: "HP",
    printerName: "IT bo'limi LaserJet",
    serialNumber: "HP123456789",
    acquisitionDate: "2023-01-10",
    acquisitionType: "organization",
    technicalCondition: true,
    connectionType: "Ethernet",
    connectedComputer: "IT-WORK-001",
    installedDepartment: "IT Bo'limi",
    installationDate: "2023-01-15",
    user: "IT Bo'limi umumiy",
  },
  {
    id: 2,
    printerModel: "Canon",
    printerName: "HR bo'limi printer",
    serialNumber: "CAN987654321",
    acquisitionDate: "2022-11-15",
    acquisitionType: "personal",
    technicalCondition: true,
    connectionType: "USB",
    connectedComputer: "HR-MONO-003",
    installedDepartment: "HR Bo'limi",
    installationDate: "2022-11-20",
    user: "Toshmatov Bobur Rustamovich",
  },
  {
    id: 3,
    printerModel: "Epson",
    printerName: "Moliya EcoTank",
    serialNumber: "EPS456789123",
    acquisitionDate: "2023-03-20",
    acquisitionType: "organization",
    technicalCondition: false,
    connectionType: "Ethernet",
    connectedComputer: "Tarmoq",
    installedDepartment: "Moliya Bo'limi",
    installationDate: "2023-03-25",
    user: "Moliya Bo'limi umumiy",
  },
  {
    id: 4,
    printerModel: "Brother",
    printerName: "Marketing Brother printer",
    serialNumber: "BRO789123456",
    acquisitionDate: "2022-08-05",
    acquisitionType: "organization",
    technicalCondition: true,
    connectionType: "Ethernet",
    connectedComputer: "Tarmoq",
    installedDepartment: "Marketing Bo'limi",
    installationDate: "2022-08-10",
    user: "Marketing Bo'limi umumiy",
  },
  {
    id: 5,
    printerModel: "Samsung",
    printerName: "Direktor kabineti printer",
    serialNumber: "SAM111222333",
    acquisitionDate: "2023-02-14",
    acquisitionType: "organization",
    technicalCondition: true,
    connectionType: "USB",
    connectedComputer: "DIRECTOR-PC",
    installedDepartment: "Boshqaruv",
    installationDate: "2023-02-20",
    user: "Abdullayev Javohir Bektoshevich",
  },
  {
    id: 6,
    printerModel: "Lexmark",
    printerName: "Hisobot bo'limi Lexmark",
    serialNumber: "LEX444555666",
    acquisitionDate: "2023-04-10",
    acquisitionType: "organization",
    technicalCondition: true,
    connectionType: "Ethernet",
    connectedComputer: "Tarmoq",
    installedDepartment: "Hisobot Bo'limi",
    installationDate: "2023-04-15",
    user: "Yusupova Malika Hasanovna",
  },
  {
    id: 7,
    printerModel: "Xerox",
    printerName: "Xavfsizlik Xerox",
    serialNumber: "XER777888999",
    acquisitionDate: "2023-01-25",
    acquisitionType: "organization",
    technicalCondition: false,
    connectionType: "USB",
    connectedComputer: "SECURITY-PC",
    installedDepartment: "Xavfsizlik Bo'limi",
    installationDate: "2023-02-01",
    user: "Mirzayev Akmal Karimovich",
  },
  {
    id: 8,
    printerModel: "Ricoh",
    printerName: "Qo'llab-quvvatlash Ricoh",
    serialNumber: "RIC000111222",
    acquisitionDate: "2023-05-15",
    acquisitionType: "organization",
    technicalCondition: true,
    connectionType: "Ethernet",
    connectedComputer: "Tarmoq",
    installedDepartment: "Qo'llab-quvvatlash",
    installationDate: "2023-05-20",
    user: "Ibragimova Dilnoza Rustamovna",
  },
];

export default function Printers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOwnership, setSelectedOwnership] = useState("all");

  const filteredPrinters = printers.filter((printer) => {
    const matchesSearch = 
      printer.printerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.printerModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.installedDepartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || printer.printerModel === selectedType;
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "Faol" && printer.technicalCondition) ||
      (selectedStatus === "Nosoz" && !printer.technicalCondition);
    const matchesOwnership = selectedOwnership === "all" || 
      (selectedOwnership === "Tashkilot" && printer.acquisitionType === "organization") ||
      (selectedOwnership === "Shaxsiy" && printer.acquisitionType === "personal");
    return matchesSearch && matchesType && matchesStatus && matchesOwnership;
  });

  const getStatusBadgeVariant = (technicalCondition: boolean) => {
    return technicalCondition ? "default" : "destructive";
  };

  const getStatusText = (technicalCondition: boolean) => {
    return technicalCondition ? "Soz" : "Nosoz";
  };

  const getTonerLevelColor = (level: number) => {
    if (level > 50) return "text-green-600";
    if (level > 20) return "text-yellow-600";
    return "text-red-600";
  };

  const getConnectivityIcon = (connectivity: string) => {
    switch (connectivity) {
      case "WiFi": return <Wifi className="h-4 w-4" />;
      case "Ethernet": return <Cable className="h-4 w-4" />;
      case "USB": return <Cable className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Printerlar</h1>
          <p className="text-muted-foreground">
            Tashkilotdagi barcha printer va ko'p funksiyali qurilmalar ro'yxati
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Yangi printer qo'shish
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami printerlar</p>
                <p className="text-2xl font-bold">{printers.length}</p>
              </div>
              <Printer className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Soz</p>
                <p className="text-2xl font-bold text-green-600">
                  {printers.filter(p => p.technicalCondition).length}
                </p>
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
                <p className="text-sm font-medium text-muted-foreground">Tashkilot mulki</p>
                <p className="text-2xl font-bold">
                  {printers.filter(p => p.acquisitionType === "organization").length}
                </p>
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
                <p className="text-sm font-medium text-muted-foreground">Ethernet ulanish</p>
                <p className="text-2xl font-bold">
                  {printers.filter(p => p.connectionType === "Ethernet").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
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
                placeholder="Model, seriya raqami, joylashuv yoki egasi bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Turini tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha modellar</SelectItem>
                <SelectItem value="HP">HP</SelectItem>
                <SelectItem value="Canon">Canon</SelectItem>
                <SelectItem value="Epson">Epson</SelectItem>
                <SelectItem value="Brother">Brother</SelectItem>
                <SelectItem value="Samsung">Samsung</SelectItem>
                <SelectItem value="Lexmark">Lexmark</SelectItem>
                <SelectItem value="Xerox">Xerox</SelectItem>
                <SelectItem value="Ricoh">Ricoh</SelectItem>
                <SelectItem value="Kyocera">Kyocera</SelectItem>
                <SelectItem value="Dell">Dell</SelectItem>
                <SelectItem value="Boshqa">Boshqa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Holatni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha holatlar</SelectItem>
                <SelectItem value="Faol">Soz</SelectItem>
                <SelectItem value="Nosoz">Nosoz</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedOwnership} onValueChange={setSelectedOwnership}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tegishlilik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barchasi</SelectItem>
                <SelectItem value="Tashkilot">Tashkilot</SelectItem>
                <SelectItem value="Shaxsiy">Shaxsiy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Printers Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Printer className="h-5 w-5" />
            Printerlar ro'yxati ({filteredPrinters.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Printer ma'lumotlari</TableHead>
                  <TableHead>Tarmoq ma'lumotlari</TableHead>
                  <TableHead>Foydalanuvchi</TableHead>
                  <TableHead>Harakatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrinters.map((printer) => (
                  <TableRow key={printer.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="font-semibold">{printer.printerName}</div>
                        <div className="text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs mr-2">
                            {printer.printerModel}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          S/N: {printer.serialNumber}
                        </div>
                        <div className="text-xs">
                          <strong>Olingan sana:</strong> {printer.acquisitionDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={printer.acquisitionType === "organization" ? "default" : "secondary"} 
                            className="text-xs"
                          >
                            {printer.acquisitionType === "organization" ? "Tashkilot" : "Shaxsiy"}
                          </Badge>
                          <Badge 
                            variant={getStatusBadgeVariant(printer.technicalCondition)} 
                            className="text-xs"
                          >
                            {getStatusText(printer.technicalCondition)}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          {getConnectivityIcon(printer.connectionType)}
                          <span className="text-sm">{printer.connectionType}</span>
                        </div>
                        <div className="text-xs">
                          <strong>Kompyuter:</strong> {printer.connectedComputer}
                        </div>
                        <div className="text-xs">
                          <strong>Bo'lim:</strong> {printer.installedDepartment}
                        </div>
                        <div className="text-xs">
                          <strong>O'rnatilgan:</strong> {printer.installationDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{printer.user}</div>
                        <div className="text-muted-foreground text-xs">{printer.installedDepartment}</div>
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