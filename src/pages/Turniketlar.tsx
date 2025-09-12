import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { StatCard } from "@/components/ui/stat-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DoorOpen, 
  DoorClosed, 
  Users, 
  UserCheck,
  Search,
  CheckCircle,
  XCircle,
  BarChart3
} from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const turnstileData = [
  {
    id: 1,
    location: "Asosiy kirish",
    deviceCount: 2,
    activeDevices: 2,
    dailyEntries: 145,
    dailyExits: 142,
    status: "active"
  },
  {
    id: 2,
    location: "Yon kirish",
    deviceCount: 1,
    activeDevices: 1,
    dailyEntries: 67,
    dailyExits: 65,
    status: "active"
  },
  {
    id: 3,
    location: "Xizmat ko'rsatish kirishi",
    deviceCount: 1,
    activeDevices: 0,
    dailyEntries: 0,
    dailyExits: 0,
    status: "inactive"
  },
  {
    id: 4,
    location: "Favqulodda chiqish",
    deviceCount: 2,
    activeDevices: 1,
    dailyEntries: 23,
    dailyExits: 25,
    status: "partial"
  }
];

const chartData = turnstileData.map(item => ({
  location: item.location.split(' ')[0],
  kirishlar: item.dailyEntries,
  chiqishlar: item.dailyExits
}));

export default function Turniketlar() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = turnstileData.filter(item =>
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDevices = turnstileData.reduce((sum, item) => sum + item.deviceCount, 0);
  const activeDevices = turnstileData.reduce((sum, item) => sum + item.activeDevices, 0);
  const totalEntries = turnstileData.reduce((sum, item) => sum + item.dailyEntries, 0);
  const totalExits = turnstileData.reduce((sum, item) => sum + item.dailyExits, 0);

  const getStatusBadge = (status: string, activeDevices: number, deviceCount: number) => {
    if (status === "active" && activeDevices === deviceCount) {
      return <Badge className="bg-green-100 text-green-800">Faol</Badge>;
    } else if (status === "inactive" || activeDevices === 0) {
      return <Badge variant="destructive">O'chiq</Badge>;
    } else {
      return <Badge variant="secondary">Qisman faol</Badge>;
    }
  };

  const getStatusIcon = (status: string, activeDevices: number, deviceCount: number) => {
    if (status === "active" && activeDevices === deviceCount) {
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    } else if (status === "inactive" || activeDevices === 0) {
      return <XCircle className="h-4 w-4 text-red-600" />;
    } else {
      return <DoorOpen className="h-4 w-4 text-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Turniketlar</h1>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Jami qurilmalar"
          value={totalDevices.toString()}
          change="Barcha hududlarda"
          icon={DoorClosed}
        />
        <StatCard
          title="Faol qurilmalar"
          value={`${activeDevices}/${totalDevices}`}
          change="Ishlab turganlar"
          icon={DoorOpen}
        />
        <StatCard
          title="Kunlik kirishlar"
          value={totalEntries.toString()}
          change="Bugungi kun"
          icon={Users}
        />
        <StatCard
          title="Kunlik chiqishlar"
          value={totalExits.toString()}
          change="Bugungi kun"
          icon={UserCheck}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Kunlik kirish-chiqish statistikasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="location" />
                <YAxis />
                <Bar dataKey="kirishlar" fill="hsl(var(--primary))" name="Kirishlar" />
                <Bar dataKey="chiqishlar" fill="hsl(var(--secondary))" name="Chiqishlar" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Umumiy ma'lumot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Faol qurilmalar:</span>
              <span className="text-lg font-bold text-green-600">{activeDevices}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">O'chiq qurilmalar:</span>
              <span className="text-lg font-bold text-red-600">{totalDevices - activeDevices}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Bugungi aylanma:</span>
              <span className="text-lg font-bold">{Math.abs(totalEntries - totalExits)}</span>
            </div>
            <div className="pt-4 border-t">
              <div className="text-sm text-muted-foreground">
                Faollik darajasi: {Math.round((activeDevices / totalDevices) * 100)}%
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Turniketlar ro'yxati</CardTitle>
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Joylashuv bo'yicha qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Joylashuv</TableHead>
                <TableHead>Qurilmalar soni</TableHead>
                <TableHead>Faol qurilmalar</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Kunlik kirishlar</TableHead>
                <TableHead>Kunlik chiqishlar</TableHead>
                <TableHead>Farq</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      {getStatusIcon(item.status, item.activeDevices, item.deviceCount)}
                      <span className="ml-2">{item.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.deviceCount}</TableCell>
                  <TableCell>
                    <span className={item.activeDevices === item.deviceCount ? "text-green-600" : "text-red-600"}>
                      {item.activeDevices}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(item.status, item.activeDevices, item.deviceCount)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-green-600" />
                      {item.dailyEntries}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <UserCheck className="h-4 w-4 mr-1 text-blue-600" />
                      {item.dailyExits}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.dailyEntries - item.dailyExits >= 0 ? "default" : "secondary"}>
                      {item.dailyEntries - item.dailyExits > 0 ? "+" : ""}{item.dailyEntries - item.dailyExits}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}