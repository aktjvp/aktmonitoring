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
import { Plus, Search, Filter, Edit, Eye, Smartphone } from "lucide-react";

// Mock data
const phones = [
  {
    id: 1,
    model: "Cisco IP Phone 7965",
    macAddress: "AA:BB:CC:DD:EE:FF",
    internalNumber: "101",
    serviceNumber: "+998 90 123 45 67",
    status: "Faol",
    features: ["HD Audio", "Ethernet", "PoE"],
    location: "IT Bo'limi",
    owner: "Karimov Sardor Akmalovich",
    installDate: "2023-01-15",
    warranty: "2 yil",
    vendor: "Cisco Systems",
    firmwareVersion: "9.14.1",
    ipAddress: "192.168.1.101",
  },
  {
    id: 2,
    model: "Avaya 9611G",
    macAddress: "BB:CC:DD:EE:FF:AA",
    internalNumber: "201",
    serviceNumber: "+998 91 234 56 78",
    status: "Faol",
    features: ["Color Display", "Gigabit Ethernet"],
    location: "Moliya Bo'limi",
    owner: "Rahimova Nozima Turgunovna",
    installDate: "2023-02-20",
    warranty: "3 yil",
    vendor: "Avaya Inc",
    firmwareVersion: "6.8.5",
    ipAddress: "192.168.1.201",
  },
  {
    id: 3,
    model: "Grandstream GXP2170",
    macAddress: "CC:DD:EE:FF:AA:BB",
    internalNumber: "301",
    serviceNumber: "+998 93 345 67 89",
    status: "Texnik xizmat",
    features: ["12 Line Keys", "HD Audio", "Color LCD"],
    location: "HR Bo'limi",
    owner: "Toshmatov Bobur Rustamovich",
    installDate: "2022-11-10",
    warranty: "1 yil",
    vendor: "Grandstream",
    firmwareVersion: "1.0.20.23",
    ipAddress: "192.168.1.301",
  },
  {
    id: 4,
    model: "Yealink T46S",
    macAddress: "DD:EE:FF:AA:BB:CC",
    internalNumber: "401",
    serviceNumber: "+998 94 456 78 90",
    status: "Faol",
    features: ["Color Screen", "Bluetooth", "WiFi"],
    location: "Marketing Bo'limi",
    owner: "Olimova Gulnora Azimovna",
    installDate: "2023-03-05",
    warranty: "2 yil",
    vendor: "Yealink",
    firmwareVersion: "66.85.0.125",
    ipAddress: "192.168.1.401",
  },
];

export default function Phones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredPhones = phones.filter((phone) => {
    const matchesSearch = 
      phone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.internalNumber.includes(searchTerm) ||
      phone.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || phone.status === selectedStatus;
    const matchesDepartment = selectedDepartment === "all" || phone.location === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Faol": return "default";
      case "Texnik xizmat": return "destructive";
      case "O'chiq": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Telefonlar</h1>
          <p className="text-muted-foreground">
            Tashkilotdagi barcha telefon apparatlari ro'yxati va ularning texnik ma'lumotlari
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Yangi telefon qo'shish
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami telefonlar</p>
                <p className="text-2xl font-bold">{phones.length}</p>
              </div>
              <Smartphone className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Faol</p>
                <p className="text-2xl font-bold text-green-600">
                  {phones.filter(p => p.status === "Faol").length}
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
                <p className="text-sm font-medium text-muted-foreground">Texnik xizmat</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {phones.filter(p => p.status === "Texnik xizmat").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-600"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">IP manzillar</p>
                <p className="text-2xl font-bold">{phones.filter(p => p.ipAddress).length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
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
                placeholder="Model, MAC manzil, raqam yoki egasi bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Holatini tanlang" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha holatlar</SelectItem>
                <SelectItem value="Faol">Faol</SelectItem>
                <SelectItem value="Texnik xizmat">Texnik xizmat</SelectItem>
                <SelectItem value="O'chiq">O'chiq</SelectItem>
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
                <SelectItem value="Marketing Bo'limi">Marketing Bo'limi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Phones Table */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Telefonlar ro'yxati ({filteredPhones.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Telefon ma'lumotlari</TableHead>
                  <TableHead>Raqamlar</TableHead>
                  <TableHead>Tarmoq ma'lumotlari</TableHead>
                  <TableHead>Texnik ma'lumotlar</TableHead>
                  <TableHead>Holat</TableHead>
                  <TableHead>Egasi</TableHead>
                  <TableHead>Harakatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPhones.map((phone) => (
                  <TableRow key={phone.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-semibold">{phone.model}</div>
                        <div className="text-sm text-muted-foreground">{phone.vendor}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          MAC: {phone.macAddress}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {phone.features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div><strong>Ichki:</strong> {phone.internalNumber}</div>
                        <div><strong>Xizmat:</strong> {phone.serviceNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div><strong>IP:</strong> {phone.ipAddress}</div>
                        <div><strong>Firmware:</strong> {phone.firmwareVersion}</div>
                        <div><strong>Joylashuv:</strong> {phone.location}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div><strong>O'rnatilgan:</strong> {phone.installDate}</div>
                        <div><strong>Kafolat:</strong> {phone.warranty}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(phone.status)} className="text-xs">
                        {phone.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{phone.owner}</div>
                        <div className="text-muted-foreground">{phone.location}</div>
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