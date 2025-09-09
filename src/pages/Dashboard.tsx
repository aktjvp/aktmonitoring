import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import {
  Monitor,
  Users,
  Smartphone,
  Printer,
  Shield,
  Globe,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const departmentData = [
  { name: "IT Bo'limi", employees: 45, equipment: 135 },
  { name: "Moliya Bo'limi", employees: 32, equipment: 96 },
  { name: "HR Bo'limi", employees: 28, equipment: 84 },
  { name: "Marketing", employees: 22, equipment: 66 },
  { name: "Boshqaruv", employees: 15, equipment: 45 },
];

const securityData = [
  { name: "Antivirus mavjud", value: 85, color: "#10b981" },
  { name: "Antivirus yo'q", value: 15, color: "#ef4444" },
];

const COLORS = ["#10b981", "#ef4444"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          AKT qurilmalari va xodimlar hisoboti umumiy ko'rinishi
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Jami xodimlar"
          value="142"
          change="+5 yangi xodim"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Kompyuterlar"
          value="426"
          change="8 ta yangilangan"
          changeType="neutral"
          icon={Monitor}
        />
        <StatCard
          title="Telefonlar"
          value="156"
          change="2 ta buzuq"
          changeType="negative"
          icon={Smartphone}
        />
        <StatCard
          title="Printerlar"
          value="43"
          change="100% ishlaydi"
          changeType="positive"
          icon={Printer}
        />
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Bo'limlar bo'yicha statistika
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="employees" fill="hsl(215 68% 45%)" name="Xodimlar" />
                <Bar dataKey="equipment" fill="hsl(215 78% 55%)" name="Qurilmalar" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Xavfsizlik holati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={securityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {securityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-l-4 border-l-warning shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Antivirus yangilanishi kerak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">kompyuter</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-info shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-info" />
              Internet ulanishi yo'q
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs text-muted-foreground">kompyuter</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Monitor className="h-4 w-4 text-destructive" />
              Domen ulanmagan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">5</p>
            <p className="text-xs text-muted-foreground">kompyuter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}