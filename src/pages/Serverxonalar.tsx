import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Server, 
  Shield, 
  Camera, 
  Thermometer, 
  Zap, 
  Router,
  HardDrive,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Plus
} from "lucide-react";
import { useState } from "react";

const serverRoomsByDistrict = {
  "Toshkent shahar": [
    {
      id: 1,
      location: "Markaziy bino, 1-qavat",
      doorMaterial: "Temir",
      windowBars: true,
      fireAlarm: true,
      securityAlarm: true,
      fireExtinguisher: true,
      cameras: 2,
      airConditioner: "18000 BTU",
      floorMaterial: "Antistatik gilam",
      carpetUnderEquipment: false,
      cableManagement: true,
      thermometer: "Raqamli",
      grounding: true,
      cabinetCondition: "Yaxshi",
      equipment: {
        servers: 4,
        routers: 2,
        switches: 6,
        ups: 3,
        stabilizers: 2
      }
    },
    {
      id: 2,
      location: "Shimoliy bino, 2-qavat",
      doorMaterial: "Taxta",
      windowBars: false,
      fireAlarm: false,
      securityAlarm: true,
      fireExtinguisher: true,
      cameras: 1,
      airConditioner: "12000 BTU",
      floorMaterial: "Beton",
      carpetUnderEquipment: true,
      cableManagement: false,
      thermometer: "Analog",
      grounding: true,
      cabinetCondition: "O'rtacha",
      equipment: {
        servers: 2,
        routers: 1,
        switches: 3,
        ups: 2,
        stabilizers: 1
      }
    }
  ],
  "Andijon viloyati": [
    {
      id: 3,
      location: "Viloyat markazi, asosiy bino",
      doorMaterial: "Temir",
      windowBars: true,
      fireAlarm: true,
      securityAlarm: true,
      fireExtinguisher: true,
      cameras: 1,
      airConditioner: "24000 BTU",
      floorMaterial: "Keramik",
      carpetUnderEquipment: false,
      cableManagement: true,
      thermometer: "Raqamli",
      grounding: true,
      cabinetCondition: "Yaxshi",
      equipment: {
        servers: 3,
        routers: 2,
        switches: 4,
        ups: 2,
        stabilizers: 2
      }
    }
  ],
  "Samarqand viloyati": [
    {
      id: 4,
      location: "Tumanhukumat binosi",
      doorMaterial: "Temir",
      windowBars: true,
      fireAlarm: false,
      securityAlarm: true,
      fireExtinguisher: true,
      cameras: 2,
      airConditioner: "12000 BTU",
      floorMaterial: "Linoleum",
      carpetUnderEquipment: true,
      cableManagement: true,
      thermometer: "Analog",
      grounding: false,
      cabinetCondition: "O'rtacha",
      equipment: {
        servers: 1,
        routers: 1,
        switches: 2,
        ups: 1,
        stabilizers: 1
      }
    }
  ]
};

const serverRooms = Object.values(serverRoomsByDistrict).flat();

export default function Serverxonalar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoom, setSelectedRoom] = useState<typeof serverRooms[0] | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const filteredRoomsByDistrict = Object.entries(serverRoomsByDistrict).reduce((acc, [district, rooms]) => {
    const filteredRooms = rooms.filter(room =>
      room.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDistrict === "" || district === selectedDistrict)
    );
    if (filteredRooms.length > 0) {
      acc[district] = filteredRooms;
    }
    return acc;
  }, {} as typeof serverRoomsByDistrict);

  const totalRooms = serverRooms.length;
  const totalServers = serverRooms.reduce((sum, room) => sum + room.equipment.servers, 0);
  const activeAlarms = serverRooms.filter(room => room.fireAlarm && room.securityAlarm).length;
  const totalCameras = serverRooms.reduce((sum, room) => sum + room.cameras, 0);

  const StatusIcon = ({ status }: { status: boolean }) => 
    status ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-red-600" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Serverxonalar</h1>
        <Button onClick={() => window.location.href = "/add-serverroom"}>
          <Plus className="h-4 w-4 mr-2" />
          Yangi serverxona qo'shish
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Jami serverxonalar"
          value={totalRooms.toString()}
          change="Barcha hududlarda"
          icon={Server}
        />
        <StatCard
          title="Jami serverlar"
          value={totalServers.toString()}
          change="Barcha serverxonalarda"
          icon={HardDrive}
        />
        <StatCard
          title="Faol signalizatsiyalar"
          value={activeAlarms.toString()}
          change="Yong'in va xavfsizlik"
          icon={Shield}
        />
        <StatCard
          title="Kamera kuzatuvi"
          value={totalCameras.toString()}
          change="Jami kameralar"
          icon={Camera}
        />
      </div>

      {/* Search and Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Serverxonalar ro'yxati</CardTitle>
            <div className="flex items-center space-x-4">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Barcha tumanlar</option>
                {Object.keys(serverRoomsByDistrict).map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(filteredRoomsByDistrict).map(([district, rooms]) => (
              <div key={district}>
                <h3 className="text-lg font-semibold mb-3 text-primary">{district}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Joylashuv</TableHead>
                      <TableHead>Eshik materiali</TableHead>
                      <TableHead>Xavfsizlik</TableHead>
                      <TableHead>Konditsioner</TableHead>
                      <TableHead>Texnikalar</TableHead>
                      <TableHead>Holat</TableHead>
                      <TableHead>Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.location}</TableCell>
                        <TableCell>
                          <Badge variant={room.doorMaterial === "Temir" ? "default" : "secondary"}>
                            {room.doorMaterial}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <StatusIcon status={room.fireAlarm} />
                            <StatusIcon status={room.securityAlarm} />
                            <StatusIcon status={room.cameras > 0} />
                          </div>
                        </TableCell>
                        <TableCell>{room.airConditioner}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>Serverlar: {room.equipment.servers}</div>
                            <div>Routerlar: {room.equipment.routers}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={room.cabinetCondition === "Yaxshi" ? "default" : "secondary"}>
                            {room.cabinetCondition}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedRoom(room)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Batafsil
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Serverxona ma'lumotlari</DialogTitle>
                              </DialogHeader>
                              {selectedRoom && (
                                <div className="grid gap-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Asosiy ma'lumotlar</h4>
                                      <div className="space-y-2 text-sm">
                                        <div>Joylashuv: {selectedRoom.location}</div>
                                        <div>Eshik materiali: {selectedRoom.doorMaterial}</div>
                                        <div>Pol materiali: {selectedRoom.floorMaterial}</div>
                                        <div>Kabinet holati: {selectedRoom.cabinetCondition}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Xavfsizlik</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center">
                                          Temir panjara: <StatusIcon status={selectedRoom.windowBars} />
                                        </div>
                                        <div className="flex items-center">
                                          Yong'in signalizatsiyasi: <StatusIcon status={selectedRoom.fireAlarm} />
                                        </div>
                                        <div className="flex items-center">
                                          Qo'riqlash signalizatsiyasi: <StatusIcon status={selectedRoom.securityAlarm} />
                                        </div>
                                        <div className="flex items-center">
                                          O't o'chirish moslama: <StatusIcon status={selectedRoom.fireExtinguisher} />
                                        </div>
                                        <div>Kameralar: {selectedRoom.cameras} dona</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Texnik jihozlar</h4>
                                      <div className="space-y-1 text-sm">
                                        <div>Serverlar: {selectedRoom.equipment.servers}</div>
                                        <div>Routerlar: {selectedRoom.equipment.routers}</div>
                                        <div>Kommutatorlar: {selectedRoom.equipment.switches}</div>
                                        <div>UPS: {selectedRoom.equipment.ups}</div>
                                        <div>Stabilizatorlar: {selectedRoom.equipment.stabilizers}</div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Qo'shimcha</h4>
                                      <div className="space-y-2 text-sm">
                                        <div>Konditsioner: {selectedRoom.airConditioner}</div>
                                        <div>Termometr: {selectedRoom.thermometer}</div>
                                        <div className="flex items-center">
                                          Kabel tartibga solingan: <StatusIcon status={selectedRoom.cableManagement} />
                                        </div>
                                        <div className="flex items-center">
                                          Yerga ulanish: <StatusIcon status={selectedRoom.grounding} />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}