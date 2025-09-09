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
import { Plus, Search, Filter, Edit, Eye } from "lucide-react";

// Mock data
const employees = [
  {
    id: 1,
    fullName: "Karimov Sardor Akmalovich",
    position: "Dasturchi",
    department: "IT Bo'limi",
    servicePhone: "+998 90 123 45 67",
    internalPhone: "101",
    computerModel: "HP EliteDesk 800",
    computerMAC: "00:1B:44:11:3A:B7",
    phoneMAC: "AA:BB:CC:DD:EE:FF",
    hasAntivirus: true,
    hasInternet: true,
    domainConnected: true,
  },
  {
    id: 2,
    fullName: "Rahimova Nozima Turgunovna",
    position: "Buxgalter",
    department: "Moliya Bo'limi",
    servicePhone: "+998 91 234 56 78",
    internalPhone: "201",
    computerModel: "Dell OptiPlex 3070",
    computerMAC: "00:1B:44:11:3A:B8",
    phoneMAC: "BB:CC:DD:EE:FF:AA",
    hasAntivirus: true,
    hasInternet: false,
    domainConnected: true,
  },
  {
    id: 3,
    fullName: "Toshmatov Bobur Rustamovich",
    position: "HR meneger",
    department: "HR Bo'limi",
    servicePhone: "+998 93 345 67 89",
    internalPhone: "301",
    computerModel: "Lenovo ThinkCentre M720",
    computerMAC: "00:1B:44:11:3A:B9",
    phoneMAC: "CC:DD:EE:FF:AA:BB",
    hasAntivirus: false,
    hasInternet: true,
    domainConnected: false,
  },
];

export default function Employees() {
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
        <Button className="bg-primary hover:bg-primary/90">
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
                  <TableHead>Lavozim</TableHead>
                  <TableHead>Bo'lim</TableHead>
                  <TableHead>Telefon</TableHead>
                  <TableHead>Kompyuter</TableHead>
                  <TableHead>Holat</TableHead>
                  <TableHead>Harakatlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">
                      {employee.fullName}
                    </TableCell>
                    <TableCell>{employee.position}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{employee.servicePhone}</div>
                        <div className="text-muted-foreground">
                          Ichki: {employee.internalPhone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{employee.computerModel}</div>
                        <div className="text-muted-foreground text-xs">
                          {employee.computerMAC}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge 
                          variant={employee.hasAntivirus ? "default" : "destructive"}
                          className="text-xs w-fit"
                        >
                          {employee.hasAntivirus ? "Antivirus +" : "Antivirus -"}
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