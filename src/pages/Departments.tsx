import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Users, Monitor, Plus, Edit, Trash2, Search, ArrowUpDown, Phone, Printer, X } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

const departments = [
  {
    id: 1,
    name: "IT Bo'limi",
    head: "Karimov Sardor Akmalovich",
    employeeCount: 45,
    computerCount: 135,
    phoneCount: 45,
    printerCount: 8,
    location: "Bino A, 3-qavat",
    employees: [
      {
        id: 1,
        fullName: "Karimov Sardor Akmalovich",
        position: "Bo'lim rahbari",
        computers: 2,
        phones: 1,
        printers: 1,
        email: "s.karimov@example.com"
      },
      {
        id: 2,
        fullName: "Abdullayev Javohir Rustamovich",
        position: "Senior dasturchi",
        computers: 3,
        phones: 1,
        printers: 0,
        email: "j.abdullayev@example.com"
      },
      {
        id: 3,
        fullName: "Normatova Dilnoza Azimovna",
        position: "Frontend dasturchi",
        computers: 2,
        phones: 1,
        printers: 0,
        email: "d.normatova@example.com"
      }
    ]
  },
  {
    id: 2,
    name: "Moliya Bo'limi",
    head: "Rahimova Nozima Turgunovna",
    employeeCount: 32,
    computerCount: 96,
    phoneCount: 32,
    printerCount: 6,
    location: "Bino B, 2-qavat",
    employees: [
      {
        id: 4,
        fullName: "Rahimova Nozima Turgunovna",
        position: "Bo'lim rahbari",
        computers: 2,
        phones: 1,
        printers: 1,
        email: "n.rahimova@example.com"
      },
      {
        id: 5,
        fullName: "Yusupov Bekzod Shavkatovich",
        position: "Bosh hisobchi",
        computers: 2,
        phones: 1,
        printers: 1,
        email: "b.yusupov@example.com"
      }
    ]
  },
  {
    id: 3,
    name: "HR Bo'limi",
    head: "Toshmatov Bobur Rustamovich",
    employeeCount: 28,
    computerCount: 84,
    phoneCount: 28,
    printerCount: 4,
    location: "Bino A, 1-qavat",
    employees: [
      {
        id: 6,
        fullName: "Toshmatov Bobur Rustamovich",
        position: "Bo'lim rahbari",
        computers: 2,
        phones: 1,
        printers: 1,
        email: "b.toshmatov@example.com"
      },
      {
        id: 7,
        fullName: "Saidova Malika Karimovna",
        position: "HR specialist",
        computers: 1,
        phones: 1,
        printers: 0,
        email: "m.saidova@example.com"
      }
    ]
  },
  {
    id: 4,
    name: "Marketing Bo'limi",
    head: "Abdullayeva Sevara Islomovna",
    employeeCount: 22,
    computerCount: 66,
    phoneCount: 22,
    printerCount: 3,
    location: "Bino C, 1-qavat",
    employees: [
      {
        id: 8,
        fullName: "Abdullayeva Sevara Islomovna",
        position: "Bo'lim rahbari",
        computers: 2,
        phones: 1,
        printers: 1,
        email: "s.abdullayeva@example.com"
      },
      {
        id: 9,
        fullName: "Qodirov Aziz Akramovich",
        position: "Marketing specialist",
        computers: 2,
        phones: 1,
        printers: 0,
        email: "a.qodirov@example.com"
      }
    ]
  },
];

export default function Departments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<typeof departments[0] | null>(null);
  
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalComputers = departments.reduce((sum, dept) => sum + dept.computerCount, 0);
  const totalPhones = departments.reduce((sum, dept) => sum + dept.phoneCount, 0);
  const totalPrinters = departments.reduce((sum, dept) => sum + dept.printerCount, 0);

  // Filter and sort departments
  const filteredDepartments = departments
    .filter(dept => 
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortColumn) return 0;
      
      let aValue: number | string = "";
      let bValue: number | string = "";
      
      switch (sortColumn) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "employees":
          aValue = a.employeeCount;
          bValue = b.employeeCount;
          break;
        case "computers":
          aValue = a.computerCount;
          bValue = b.computerCount;
          break;
        case "phones":
          aValue = a.phoneCount;
          bValue = b.phoneCount;
          break;
        case "printers":
          aValue = a.printerCount;
          bValue = b.printerCount;
          break;
        default:
          return 0;
      }
      
      if (typeof aValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      } else {
        return sortDirection === "asc" 
          ? aValue - (bValue as number)
          : (bValue as number) - aValue;
      }
    });

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const SortableHeader = ({ column, children }: { column: string; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-muted/50 select-none"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-2">
        {children}
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bo'limlar</h1>
          <p className="text-muted-foreground">
            Tashkilot bo'limlari va ularning texnik jihozlari
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate("/departments/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Yangi bo'lim qo'shish
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <StatCard
          title="Jami bo'limlar"
          value={departments.length}
          icon={Building2}
        />
        <StatCard
          title="Jami xodimlar"
          value={totalEmployees}
          icon={Users}
        />
        <StatCard
          title="Jami kompyuterlar"
          value={totalComputers}
          icon={Monitor}
        />
        <StatCard
          title="Jami telefonlar"
          value={totalPhones}
          icon={Phone}
        />
        <StatCard
          title="Jami printerlar"
          value={totalPrinters}
          icon={Printer}
        />
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Bo'limlar bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Departments Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader column="name">Bo'lim nomi</SortableHeader>
              <SortableHeader column="employees">Xodimlar</SortableHeader>
              <SortableHeader column="computers">Kompyuterlar</SortableHeader>
              <SortableHeader column="phones">Telefonlar</SortableHeader>
              <SortableHeader column="printers">Printerlar</SortableHeader>
              <TableHead>Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDepartments.map((department) => (
              <TableRow key={department.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedDepartment(department)}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{department.name}</p>
                      <p className="text-sm text-muted-foreground">{department.head}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {department.employeeCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                    {department.computerCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                    {department.phoneCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-orange-50 text-orange-700 border-orange-200">
                    {department.printerCount}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Employee Details Dialog */}
      <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <span>{selectedDepartment?.name}</span>
                <p className="text-sm font-normal text-muted-foreground">{selectedDepartment?.head}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedDepartment && (
            <div className="space-y-6">
              {/* Department Summary */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600">Xodimlar</p>
                    <p className="font-semibold text-blue-800">{selectedDepartment.employeeCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Monitor className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600">Kompyuterlar</p>
                    <p className="font-semibold text-green-800">{selectedDepartment.computerCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-600">Telefonlar</p>
                    <p className="font-semibold text-purple-800">{selectedDepartment.phoneCount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                  <Printer className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-orange-600">Printerlar</p>
                    <p className="font-semibold text-orange-800">{selectedDepartment.printerCount}</p>
                  </div>
                </div>
              </div>

              {/* Employee Search */}
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Xodimlar ro'yxati</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Xodimlar bo'yicha qidirish..."
                    value={employeeSearchTerm}
                    onChange={(e) => setEmployeeSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>

              {/* Employees Table */}
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>F.I.O.</TableHead>
                      <TableHead>Lavozimi</TableHead>
                      <TableHead>Kompyuterlar</TableHead>
                      <TableHead>Telefonlar</TableHead>
                      <TableHead>Printerlar</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedDepartment.employees
                      .filter(emp => 
                        emp.fullName.toLowerCase().includes(employeeSearchTerm.toLowerCase()) ||
                        emp.position.toLowerCase().includes(employeeSearchTerm.toLowerCase())
                      )
                      .map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">{employee.fullName}</TableCell>
                          <TableCell>{employee.position}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {employee.computers}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {employee.phones}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                              {employee.printers}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}