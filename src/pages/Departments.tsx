import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Monitor, Plus, Edit, Trash2 } from "lucide-react";
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
  },
];

export default function Departments() {
  const navigate = useNavigate();
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalComputers = departments.reduce((sum, dept) => sum + dept.computerCount, 0);
  const totalPhones = departments.reduce((sum, dept) => sum + dept.phoneCount, 0);
  const totalPrinters = departments.reduce((sum, dept) => sum + dept.printerCount, 0);

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
          icon={Monitor}
        />
        <StatCard
          title="Jami printerlar"
          value={totalPrinters}
          icon={Monitor}
        />
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Card key={department.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">{department.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{department.location}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Bo'lim rahbari</p>
                <p className="text-sm font-medium">{department.head}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Xodimlar</p>
                  <p className="text-lg font-bold text-blue-600">{department.employeeCount}</p>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Kompyuterlar</p>
                  <p className="text-lg font-bold text-green-600">{department.computerCount}</p>
                </div>
                <div className="text-center p-2 bg-purple-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Telefonlar</p>
                  <p className="text-lg font-bold text-purple-600">{department.phoneCount}</p>
                </div>
                <div className="text-center p-2 bg-orange-50 rounded-lg">
                  <p className="text-xs text-muted-foreground">Printerlar</p>
                  <p className="text-lg font-bold text-orange-600">{department.printerCount}</p>
                </div>
              </div>

              <Button variant="outline" className="w-full mt-4" size="sm">
                <Users className="mr-2 h-4 w-4" />
                Xodimlarni ko'rish
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}