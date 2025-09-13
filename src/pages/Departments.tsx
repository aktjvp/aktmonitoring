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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          title="Jami printerlar"
          value={totalPrinters}
          icon={Monitor}
        />
      </div>

      {/* Departments Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((department) => (
          <Card key={department.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{department.location}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bo'lim rahbari</p>
                <p className="text-sm">{department.head}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Xodimlar:</span>
                  <Badge variant="secondary">{department.employeeCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Kompyuterlar:</span>
                  <Badge variant="secondary">{department.computerCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Telefonlar:</span>
                  <Badge variant="secondary">{department.phoneCount}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Printerlar:</span>
                  <Badge variant="secondary">{department.printerCount}</Badge>
                </div>
              </div>

              <div className="pt-2 border-t">
                <Button variant="outline" className="w-full" size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Xodimlarni ko'rish
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}