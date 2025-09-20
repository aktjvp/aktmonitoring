import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/ui/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Monitor,
  Users,
  Smartphone,
  Printer,
  Shield,
  Globe,
  AlertTriangle,
  TrendingUp,
  Package,
  Search,
  Filter,
  Eye,
  Wrench,
  Activity,
  Thermometer,
  Usb,
  Wifi,
  Server,
  Calendar,
  Clock,
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

// Mock data
const computerTypesData = [
  { name: "Desktop", soz: 180, nosoz: 12 },
  { name: "Monoblok", soz: 85, nosoz: 8 },
  { name: "Laptop", soz: 142, nosoz: 15 },
];

const phoneStatusData = [
  { name: "Faol", count: 125 },
  { name: "Tarmoqdan uzilgan", count: 18 },
  { name: "Omborda Soz", count: 28 },
  { name: "Omborda Nosoz", count: 5 },
];

const printerDistributionData = [
  { name: "Tashkilot", count: 32 },
  { name: "Shaxsiy", count: 18 },
  { name: "Omborda Soz", count: 12 },
  { name: "Omborda Nosoz", count: 3 },
];

const recentActivity = [
  { type: "Kompyuter", action: "Qo'shildi", device: "HP EliteDesk 800", time: "2 soat oldin", status: "success" },
  { type: "Printer", action: "Ta'mirlandi", device: "Canon Pixma", time: "4 soat oldin", status: "info" },
  { type: "Telefon", action: "Nosoz", device: "Alcatel IP Phone", time: "6 soat oldin", status: "error" },
  { type: "Kompyuter", action: "Yangilandi", device: "Dell OptiPlex", time: "1 kun oldin", status: "success" },
  { type: "Printer", action: "Qo'shildi", device: "HP LaserJet", time: "2 kun oldin", status: "success" },
];

const CHART_COLORS = ["hsl(var(--primary))", "hsl(var(--destructive))", "hsl(var(--warning))", "hsl(var(--success))"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            AKT qurilmalari va xodimlar hisoboti umumiy ko'rinishi
          </p>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Hudud/Bo'lim" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="it">IT Bo'limi</SelectItem>
              <SelectItem value="finance">Moliya</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
            </SelectContent>
          </Select>
          
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Qurilma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="computer">Kompyuter</SelectItem>
              <SelectItem value="phone">Telefon</SelectItem>
              <SelectItem value="printer">Printer</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Holat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Barchasi</SelectItem>
              <SelectItem value="working">Soz</SelectItem>
              <SelectItem value="broken">Nosoz</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Main Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Jami xodimlar"
          value="142"
          change="+5 yangi xodim"
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Jami kompyuterlar"
          value="442"
          change="407 soz / 35 nosoz"
          changeType="neutral"
          icon={Monitor}
        />
        <StatCard
          title="Jami telefonlar"
          value="176"
          change="156 soz / 20 nosoz"
          changeType="neutral"
          icon={Smartphone}
        />
        <StatCard
          title="Jami printerlar"
          value="65"
          change="50 soz / 15 nosoz"
          changeType="neutral"
          icon={Printer}
        />
      </div>

      {/* Warehouse Statistics */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Ombordagi texnikalar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border border-border rounded-lg">
              <Monitor className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Kompyuterlar</h3>
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-muted-foreground">38 soz / 7 nosoz</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <Smartphone className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Telefonlar</h3>
              <p className="text-2xl font-bold">33</p>
              <p className="text-sm text-muted-foreground">28 soz / 5 nosoz</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <Printer className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Printerlar</h3>
              <p className="text-2xl font-bold">15</p>
              <p className="text-sm text-muted-foreground">12 soz / 3 nosoz</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Kompyuterlar turlari
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={computerTypesData.map(item => ({ 
                    name: item.name, 
                    value: item.soz + item.nosoz,
                    soz: item.soz,
                    nosoz: item.nosoz
                  }))}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {computerTypesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [
                  `Jami: ${value}, Soz: ${props.payload.soz}, Nosoz: ${props.payload.nosoz}`,
                  name
                ]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Telefonlar holati
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={phoneStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Printer className="h-5 w-5" />
              Printerlar taqsimoti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={printerDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--success))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              So'nggi faoliyat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={
                      activity.status === 'success' ? 'default' : 
                      activity.status === 'error' ? 'destructive' : 'secondary'
                    }>
                      {activity.type}
                    </Badge>
                    <div>
                      <p className="font-medium">{activity.device}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monitoring and Alerts */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Monitoring va ogohlantirishlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 border-l-4 border-l-destructive bg-destructive/10 rounded">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Antivirus o'rnatilmagan</span>
                </div>
                <Badge variant="destructive">24</Badge>
              </div>
              
              <div className="flex items-center justify-between p-2 border-l-4 border-l-warning bg-warning/10 rounded">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-warning" />
                  <span className="text-sm">Domen qo'shilmagan</span>
                </div>
                <Badge variant="secondary">15</Badge>
              </div>

              <div className="flex items-center justify-between p-2 border-l-4 border-l-info bg-info/10 rounded">
                <div className="flex items-center gap-2">
                  <Usb className="h-4 w-4 text-info" />
                  <span className="text-sm">USB port ochiq</span>
                </div>
                <Badge variant="secondary">8</Badge>
              </div>

              <div className="flex items-center justify-between p-2 border-l-4 border-l-warning bg-warning/10 rounded">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-warning" />
                  <span className="text-sm">Harorati yuqori serverxona</span>
                </div>
                <Badge variant="secondary">2</Badge>
              </div>

              <div className="flex items-center justify-between p-2 border-l-4 border-l-destructive bg-destructive/10 rounded">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Nosoz texnikalar</span>
                </div>
                <Badge variant="destructive">70</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}