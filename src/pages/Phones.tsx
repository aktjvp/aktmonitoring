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

// Mock data based on AddPhone form
const phones = [
  {
    id: 1,
    phoneName: "IT Bo'limi telefoni",
    macAddress: "00:1B:44:11:3A:B7",
    acquisitionDate: "2023-01-15",
    technicalCondition: true,
    internalPhoneNumber: "101",
    servicePhone: "+998 90 123 45 67",
    ipAddress: "192.168.1.101",
    installedDepartment: "IT Bo'limi",
    installationDate: "2023-01-20",
    workingStatus: true,
    user: "Karimov Sardor Akmalovich",
  },
  {
    id: 2,
    phoneName: "Moliya bo'limi telefoni",
    macAddress: "00:1B:44:22:4B:C8",
    acquisitionDate: "2023-02-10",
    technicalCondition: true,
    internalPhoneNumber: "201",
    servicePhone: "+998 91 234 56 78",
    ipAddress: "192.168.1.201",
    installedDepartment: "Moliya Bo'limi",
    installationDate: "2023-02-15",
    workingStatus: true,
    user: "Rahimova Nozima Turgunovna",
  },
  {
    id: 3,
    phoneName: "HR bo'limi telefoni",
    macAddress: "00:1B:44:33:5C:D9",
    acquisitionDate: "2022-11-05",
    technicalCondition: false,
    internalPhoneNumber: "301",
    servicePhone: "+998 93 345 67 89",
    ipAddress: "192.168.1.301",
    installedDepartment: "HR Bo'limi",
    installationDate: "2022-11-10",
    workingStatus: false,
    user: "Toshmatov Bobur Rustamovich",
  },
  {
    id: 4,
    phoneName: "Marketing bo'limi telefoni",
    macAddress: "00:1B:44:44:6D:EA",
    acquisitionDate: "2023-03-01",
    technicalCondition: true,
    internalPhoneNumber: "401",
    servicePhone: "+998 94 456 78 90",
    ipAddress: "192.168.1.401",
    installedDepartment: "Marketing Bo'limi",
    installationDate: "2023-03-05",
    workingStatus: true,
    user: "Olimova Gulnora Azimovna",
  },
  {
    id: 5,
    phoneName: "Bosh direktor telefoni",
    macAddress: "00:1B:44:55:7E:FB",
    acquisitionDate: "2022-12-20",
    technicalCondition: true,
    internalPhoneNumber: "100",
    servicePhone: "+998 95 567 89 01",
    ipAddress: "192.168.1.100",
    installedDepartment: "Boshqaruv",
    installationDate: "2022-12-25",
    workingStatus: true,
    user: "Abdullayev Javohir Bektoshevich",
  },
  {
    id: 6,
    phoneName: "Hisobot bo'limi telefoni",
    macAddress: "00:1B:44:66:8F:0C",
    acquisitionDate: "2023-04-10",
    technicalCondition: true,
    internalPhoneNumber: "501",
    servicePhone: "+998 97 678 90 12",
    ipAddress: "192.168.1.501",
    installedDepartment: "Hisobot Bo'limi",
    installationDate: "2023-04-15",
    workingStatus: true,
    user: "Yusupova Malika Hasanovna",
  },
  {
    id: 7,
    phoneName: "Xavfsizlik bo'limi telefoni",
    macAddress: "00:1B:44:77:90:1D",
    acquisitionDate: "2023-01-25",
    technicalCondition: false,
    internalPhoneNumber: "601",
    servicePhone: "+998 98 789 01 23",
    ipAddress: "192.168.1.601",
    installedDepartment: "Xavfsizlik Bo'limi",
    installationDate: "2023-02-01",
    workingStatus: false,
    user: "Mirzayev Akmal Karimovich",
  },
  {
    id: 8,
    phoneName: "Qo'llab-quvvatlash telefoni",
    macAddress: "00:1B:44:88:A1:2E",
    acquisitionDate: "2023-05-15",
    technicalCondition: true,
    internalPhoneNumber: "701",
    servicePhone: "+998 99 890 12 34",
    ipAddress: "192.168.1.701",
    installedDepartment: "Qo'llab-quvvatlash",
    installationDate: "2023-05-20",
    workingStatus: true,
    user: "Ibragimova Dilnoza Rustamovna",
  },
];

export default function Phones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  const filteredPhones = phones.filter((phone) => {
    const matchesSearch = 
      phone.phoneName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.macAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.internalPhoneNumber.includes(searchTerm) ||
      phone.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || 
      (selectedStatus === "Faol" && phone.workingStatus) ||
      (selectedStatus === "Nosoz" && !phone.workingStatus);
    const matchesDepartment = selectedDepartment === "all" || phone.installedDepartment === selectedDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadgeVariant = (workingStatus: boolean, technicalCondition: boolean) => {
    if (!technicalCondition) return "destructive";
    if (workingStatus) return "default";
    return "secondary";
  };

  const getStatusText = (workingStatus: boolean, technicalCondition: boolean) => {
    if (!technicalCondition) return "Nosoz";
    if (workingStatus) return "Faol";
    return "Tarmoqdan uzilgan";
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jami telefonlar</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{phones.length}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-600">{phones.filter(p => p.technicalCondition).length} soz</span>
                    <span className="mx-1">•</span>
                    <span className="text-red-600">{phones.filter(p => !p.technicalCondition).length} nosoz</span>
                  </div>
                </div>
              </div>
              <Smartphone className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Faol telefonlar</p>
                <p className="text-2xl font-bold text-green-600">
                  {phones.filter(p => p.workingStatus && p.technicalCondition).length}
                </p>
                <p className="text-xs text-muted-foreground">Tarmoqqa ulangan</p>
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
                <p className="text-sm font-medium text-muted-foreground">Tarmoqdan uzilgan</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {phones.filter(p => !p.workingStatus && p.technicalCondition).length}
                </p>
                <p className="text-xs text-muted-foreground">Soz lekin faol emas</p>
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
                <p className="text-sm font-medium text-muted-foreground">Obmordagi telefonlar</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">{phones.filter(p => p.ipAddress.startsWith("192.168.")).length}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="text-green-600">{phones.filter(p => p.ipAddress.startsWith("192.168.") && p.technicalCondition).length} soz</span>
                    <span className="mx-1">•</span>
                    <span className="text-red-600">{phones.filter(p => p.ipAddress.startsWith("192.168.") && !p.technicalCondition).length} nosoz</span>
                  </div>
                </div>
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
                <SelectItem value="Nosoz">Nosoz</SelectItem>
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
                <SelectItem value="Boshqaruv">Boshqaruv</SelectItem>
                <SelectItem value="Hisobot Bo'limi">Hisobot Bo'limi</SelectItem>
                <SelectItem value="Xavfsizlik Bo'limi">Xavfsizlik Bo'limi</SelectItem>
                <SelectItem value="Qo'llab-quvvatlash">Qo'llab-quvvatlash</SelectItem>
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
                  <TableHead>Telefon raqamlari</TableHead>
                  <TableHead>Tarmoq ma'lumotlari</TableHead>
                  <TableHead>Foydalanuvchi</TableHead>
                  <TableHead>Harakatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPhones.map((phone) => (
                  <TableRow key={phone.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="font-semibold">{phone.phoneName}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          MAC: {phone.macAddress}
                        </div>
                        <div className="text-xs">
                          <strong>Olingan sana:</strong> {phone.acquisitionDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={phone.technicalCondition ? "default" : "destructive"} 
                            className="text-xs"
                          >
                            {phone.technicalCondition ? "Soz" : "Nosoz"}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div><strong>Ichki:</strong> {phone.internalPhoneNumber}</div>
                        <div><strong>Xizmat:</strong> {phone.servicePhone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div><strong>IP:</strong> {phone.ipAddress}</div>
                        <div><strong>Bo'lim:</strong> {phone.installedDepartment}</div>
                        <div><strong>O'rnatilgan:</strong> {phone.installationDate}</div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={getStatusBadgeVariant(phone.workingStatus, phone.technicalCondition)} 
                            className="text-xs"
                          >
                            {getStatusText(phone.workingStatus, phone.technicalCondition)}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{phone.user}</div>
                        <div className="text-muted-foreground text-xs">{phone.installedDepartment}</div>
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