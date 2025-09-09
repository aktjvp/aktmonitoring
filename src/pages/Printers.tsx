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

// Mock data
const printers = [
  {
    id: 1,
    model: "HP LaserJet Pro 400",
    serialNumber: "HP123456789",
    type: "Lazer",
    connectivity: "Ethernet",
    ipAddress: "192.168.1.150",
    status: "Faol",
    ownership: "Tashkilot",
    location: "IT Bo'limi",
    connectedTo: "Tarmoq",
    monthlyVolume: 2500,
    totalPages: 45230,
    tonerLevel: 85,
    installDate: "2023-01-10",
    warranty: "2 yil",
    vendor: "HP Inc",
    features: ["Duplex", "Network", "Mobile Print"],
    lastMaintenance: "2024-01-15",
    owner: "IT Bo'limi umumiy",
  },
  {
    id: 2,
    model: "Canon PIXMA G2010",
    serialNumber: "CAN987654321",
    type: "Inkjet",
    connectivity: "USB",
    ipAddress: "",
    status: "Faol",
    ownership: "Shaxsiy",
    location: "HR Bo'limi",
    connectedTo: "HR-MONO-003",
    monthlyVolume: 150,
    totalPages: 3420,
    tonerLevel: 60,
    installDate: "2022-11-15",
    warranty: "1 yil",
    vendor: "Canon",
    features: ["Color", "Tank System"],
    lastMaintenance: "2023-12-01",
    owner: "Toshmatov Bobur Rustamovich",
  },
  {
    id: 3,
    model: "Epson EcoTank L3150",
    serialNumber: "EPS456789123",
    type: "Inkjet",
    connectivity: "WiFi",
    ipAddress: "192.168.1.155",
    status: "Texnik xizmat",
    ownership: "Tashkilot",
    location: "Moliya Bo'limi",
    connectedTo: "Tarmoq",
    monthlyVolume: 800,
    totalPages: 12450,
    tonerLevel: 25,
    installDate: "2023-03-20",
    warranty: "3 yil",
    vendor: "Epson",
    features: ["Color", "WiFi", "Mobile Print", "Scanner"],
    lastMaintenance: "2024-02-20",
    owner: "Moliya Bo'limi umumiy",
  },
  {
    id: 4,
    model: "Brother HL-L2350DW",
    serialNumber: "BRO789123456",
    type: "Lazer",
    connectivity: "WiFi",
    ipAddress: "192.168.1.160",
    status: "Faol",
    ownership: "Tashkilot",
    location: "Marketing Bo'limi",
    connectedTo: "Tarmoq",
    monthlyVolume: 1200,
    totalPages: 28750,
    tonerLevel: 40,
    installDate: "2022-08-05",
    warranty: "2 yil",
    vendor: "Brother",
    features: ["Duplex", "WiFi", "Mobile Print"],
    lastMaintenance: "2024-01-10",
    owner: "Marketing Bo'limi umumiy",
  },
];

export default function Printers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOwnership, setSelectedOwnership] = useState("all");

  const filteredPrinters = printers.filter((printer) => {
    const matchesSearch = 
      printer.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      printer.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || printer.type === selectedType;
    const matchesStatus = selectedStatus === "all" || printer.status === selectedStatus;
    const matchesOwnership = selectedOwnership === "all" || printer.ownership === selectedOwnership;
    return matchesSearch && matchesType && matchesStatus && matchesOwnership;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Faol": return "default";
      case "Texnik xizmat": return "destructive";
      case "O'chiq": return "secondary";
      default: return "outline";
    }
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
                <p className="text-sm font-medium text-muted-foreground">Faol</p>
                <p className="text-2xl font-bold text-green-600">
                  {printers.filter(p => p.status === "Faol").length}
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
                  {printers.filter(p => p.ownership === "Tashkilot").length}
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
                <p className="text-sm font-medium text-muted-foreground">Oylik chop etish</p>
                <p className="text-2xl font-bold">
                  {printers.reduce((sum, p) => sum + p.monthlyVolume, 0).toLocaleString()}
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
                <SelectItem value="all">Barcha turlar</SelectItem>
                <SelectItem value="Lazer">Lazer</SelectItem>
                <SelectItem value="Inkjet">Inkjet</SelectItem>
                <SelectItem value="Dot Matrix">Dot Matrix</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Holatni tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha holatlar</SelectItem>
                <SelectItem value="Faol">Faol</SelectItem>
                <SelectItem value="Texnik xizmat">Texnik xizmat</SelectItem>
                <SelectItem value="O'chiq">O'chiq</SelectItem>
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
                  <TableHead>Ulanish</TableHead>
                  <TableHead>Holat va statistika</TableHead>
                  <TableHead>Texnik ma'lumotlar</TableHead>
                  <TableHead>Tegishlilik</TableHead>
                  <TableHead>Harakatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrinters.map((printer) => (
                  <TableRow key={printer.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold">{printer.model}</div>
                        <div className="text-sm text-muted-foreground">{printer.vendor}</div>
                        <Badge variant="outline" className="text-xs">
                          {printer.type}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          S/N: {printer.serialNumber}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {printer.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          {getConnectivityIcon(printer.connectivity)}
                          <span className="text-sm">{printer.connectivity}</span>
                        </div>
                        {printer.ipAddress && (
                          <div className="text-xs text-muted-foreground">
                            IP: {printer.ipAddress}
                          </div>
                        )}
                        <div className="text-xs">
                          <strong>Ulangan:</strong> {printer.connectedTo}
                        </div>
                        <div className="text-xs">
                          <strong>Joylashuv:</strong> {printer.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant={getStatusBadgeVariant(printer.status)} className="text-xs">
                          {printer.status}
                        </Badge>
                        <div className="text-xs">
                          <strong>Toner:</strong> 
                          <span className={getTonerLevelColor(printer.tonerLevel)}>
                            {" "}{printer.tonerLevel}%
                          </span>
                        </div>
                        <div className="text-xs">
                          <strong>Oylik:</strong> {printer.monthlyVolume.toLocaleString()}
                        </div>
                        <div className="text-xs">
                          <strong>Jami:</strong> {printer.totalPages.toLocaleString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs space-y-1">
                        <div><strong>O'rnatilgan:</strong> {printer.installDate}</div>
                        <div><strong>Kafolat:</strong> {printer.warranty}</div>
                        <div><strong>Oxirgi xizmat:</strong> {printer.lastMaintenance}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge 
                          variant={printer.ownership === "Tashkilot" ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {printer.ownership}
                        </Badge>
                        <div className="text-xs font-medium">{printer.owner}</div>
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