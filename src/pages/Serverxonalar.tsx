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
      floorMaterial: "Antistatik gilam",
      fireAlarm: "ishlayapti",
      securityAlarm: "ishlayapti", 
      fireExtinguisher: true,
      hasCamera: true,
      cameraIP: "192.168.1.100",
      servers: [{ model: "Dell PowerEdge R730", quantity: 2 }, { model: "HP ProLiant DL380", quantity: 1 }],
      routers: [{ model: "Cisco ISR 4331", quantity: 1 }],
      switches: [{ model: "Cisco Catalyst 2960", quantity: 2 }],
      ups: 2,
      stabilizer: 1,
      hasAirConditioner: true,
      airConditionerBTU: "18000",
      carpetUnderEquipment: false,
      cableManagement: true,
      hasThermometer: true,
      hasGrounding: true,
      cabinetCondition: "yaxshi"
    },
    {
      id: 2, 
      location: "Shimoliy bino, 2-qavat",
      doorMaterial: "Taxta",
      windowBars: false,
      floorMaterial: "Beton",
      fireAlarm: "ishlamayapti",
      securityAlarm: "ishlayapti",
      fireExtinguisher: true,
      hasCamera: true,
      cameraIP: "192.168.1.101",
      servers: [{ model: "HP ProLiant DL360", quantity: 1 }],
      routers: [{ model: "Huawei AR2220", quantity: 1 }],
      switches: [{ model: "D-Link DGS-3120", quantity: 1 }],
      ups: 1,
      stabilizer: 1,
      hasAirConditioner: true,
      airConditionerBTU: "12000",
      carpetUnderEquipment: true,
      cableManagement: false,
      hasThermometer: false,
      hasGrounding: true,
      cabinetCondition: "o'rta"
    },
    {
      id: 3,
      location: "Janubiy bino, 3-qavat",
      doorMaterial: "Temir",
      windowBars: true,
      floorMaterial: "Keramik plitka",
      fireAlarm: "ishlayapti",
      securityAlarm: "ishlayapti",
      fireExtinguisher: true,
      hasCamera: false,
      cameraIP: "",
      servers: [{ model: "Supermicro SuperServer", quantity: 3 }],
      routers: [{ model: "MikroTik CCR1036", quantity: 1 }],
      switches: [{ model: "Cisco SG350-28", quantity: 2 }],
      ups: 3,
      stabilizer: 2,
      hasAirConditioner: true,
      airConditionerBTU: "24000",
      carpetUnderEquipment: false,
      cableManagement: true,
      hasThermometer: true,
      hasGrounding: true,
      cabinetCondition: "yaxshi"
    }
  ],
  "Andijon viloyati": [
    {
      id: 4,
      location: "Viloyat markazi, asosiy bino",
      doorMaterial: "Temir",
      windowBars: true,
      floorMaterial: "Antistatik linoleum",
      fireAlarm: "ishlayapti",
      securityAlarm: "ishlamayapti",
      fireExtinguisher: false,
      hasCamera: true,
      cameraIP: "10.0.0.50",
      servers: [{ model: "IBM System x3650", quantity: 2 }],
      routers: [{ model: "Juniper SRX300", quantity: 1 }],
      switches: [{ model: "HPE OfficeConnect", quantity: 1 }],
      ups: 2,
      stabilizer: 1,
      hasAirConditioner: false,
      airConditionerBTU: "",
      carpetUnderEquipment: true,
      cableManagement: true,
      hasThermometer: false,
      hasGrounding: false,
      cabinetCondition: "o'rta"
    },
    {
      id: 5,
      location: "Xo'jalik binosi, yerto'la",
      doorMaterial: "Taxta",
      windowBars: false,
      floorMaterial: "Beton",
      fireAlarm: "ishlamayapti",
      securityAlarm: "ishlayapti",
      fireExtinguisher: true,
      hasCamera: false,
      cameraIP: "",
      servers: [{ model: "Lenovo ThinkSystem", quantity: 1 }],
      routers: [],
      switches: [{ model: "TP-Link TL-SG1024", quantity: 1 }],
      ups: 1,
      stabilizer: 0,
      hasAirConditioner: true,
      airConditionerBTU: "9000",
      carpetUnderEquipment: false,
      cableManagement: false,
      hasThermometer: true,
      hasGrounding: true,
      cabinetCondition: "yomon"
    }
  ],
  "Samarqand viloyati": [
    {
      id: 6,
      location: "Tumanhukumat binosi, 1-qavat",
      doorMaterial: "Temir",
      windowBars: true,
      floorMaterial: "Parket",
      fireAlarm: "ishlayapti",
      securityAlarm: "ishlayapti",
      fireExtinguisher: true,
      hasCamera: true,
      cameraIP: "172.16.1.200",
      servers: [{ model: "Fujitsu PRIMERGY", quantity: 2 }],
      routers: [{ model: "Cisco ISR 2901", quantity: 1 }],
      switches: [{ model: "Netgear ProSAFE", quantity: 2 }],
      ups: 2,
      stabilizer: 2,
      hasAirConditioner: true,
      airConditionerBTU: "12000",
      carpetUnderEquipment: true,
      cableManagement: true,
      hasThermometer: true,
      hasGrounding: true,
      cabinetCondition: "yaxshi"
    },
    {
      id: 7,
      location: "Ma'muriy bino, 2-qavat",
      doorMaterial: "Temir",
      windowBars: true,
      floorMaterial: "Gilam",
      fireAlarm: "ishlamayapti",
      securityAlarm: "ishlayapti",
      fireExtinguisher: false,
      hasCamera: true,
      cameraIP: "10.10.10.15",
      servers: [{ model: "ASUS ESC4000", quantity: 1 }],
      routers: [{ model: "Ubiquiti EdgeRouter", quantity: 1 }],
      switches: [{ model: "Aruba 2530", quantity: 1 }],
      ups: 1,
      stabilizer: 1,
      hasAirConditioner: false,
      airConditionerBTU: "",
      carpetUnderEquipment: false,
      cableManagement: false,
      hasThermometer: false,
      hasGrounding: false,
      cabinetCondition: "yomon"
    },
    {
      id: 8,
      location: "Texnik bino, basement",
      doorMaterial: "Taxta",
      windowBars: false,
      floorMaterial: "Rezina qoplama",
      fireAlarm: "ishlayapti",
      securityAlarm: "ishlayapti",
      fireExtinguisher: true,
      hasCamera: true,
      cameraIP: "192.168.100.5",
      servers: [{ model: "Dell PowerEdge T640", quantity: 1 }, { model: "HP ML350", quantity: 1 }],
      routers: [{ model: "FortiGate 100F", quantity: 1 }],
      switches: [{ model: "Allied Telesis x230", quantity: 3 }],
      ups: 4,
      stabilizer: 3,
      hasAirConditioner: true,
      airConditionerBTU: "18000",
      carpetUnderEquipment: true,
      cableManagement: true,
      hasThermometer: true,
      hasGrounding: true,
      cabinetCondition: "yaxshi"
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
  const totalServers = serverRooms.reduce((sum, room) => sum + room.servers.reduce((s, server) => s + server.quantity, 0), 0);
  const activeAlarms = serverRooms.filter(room => room.fireAlarm === "ishlayapti" && room.securityAlarm === "ishlayapti").length;
  const totalCameras = serverRooms.filter(room => room.hasCamera).length;

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
                      <TableHead className="font-semibold">Asosiy ma'lumotlar</TableHead>
                      <TableHead className="font-semibold">Xavfsizlik</TableHead>
                      <TableHead className="font-semibold">Texnik jihozlar</TableHead>
                      <TableHead className="font-semibold">Qo'shimcha</TableHead>
                      <TableHead className="text-center">Amallar</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id} className="hover:bg-muted/50">
                        {/* Asosiy ma'lumotlar */}
                        <TableCell className="max-w-xs">
                          <div className="space-y-2">
                            <div className="font-medium text-sm">{room.location}</div>
                            <div className="flex flex-wrap gap-1">
                              <Badge variant={room.doorMaterial === "Temir" ? "default" : "secondary"} className="text-xs">
                                {room.doorMaterial} eshik
                              </Badge>
                              {room.windowBars && (
                                <Badge variant="outline" className="text-xs">Panjara</Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {room.floorMaterial}
                            </div>
                          </div>
                        </TableCell>

                        {/* Xavfsizlik */}
                        <TableCell className="max-w-xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <StatusIcon status={room.fireAlarm === "ishlayapti"} />
                              <span className="text-xs">Yong'in</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <StatusIcon status={room.securityAlarm === "ishlayapti"} />
                              <span className="text-xs">Qo'riqlash</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <StatusIcon status={room.fireExtinguisher} />
                              <span className="text-xs">O't o'chirish</span>
                            </div>
                            {room.hasCamera && (
                              <div className="text-xs text-green-600 font-medium">
                                Kamera: {room.cameraIP}
                              </div>
                            )}
                          </div>
                        </TableCell>

                        {/* Texnik jihozlar */}
                        <TableCell className="max-w-xs">
                          <div className="space-y-1 text-xs">
                            {room.servers.length > 0 && (
                              <div>
                                <span className="font-medium">Serverlar:</span>
                                {room.servers.map((server, idx) => (
                                  <div key={idx} className="ml-2 text-muted-foreground">
                                    {server.model} ({server.quantity})
                                  </div>
                                ))}
                              </div>
                            )}
                            {room.routers.length > 0 && (
                              <div>
                                <span className="font-medium">Routerlar:</span>
                                {room.routers.map((router, idx) => (
                                  <div key={idx} className="ml-2 text-muted-foreground">
                                    {router.model} ({router.quantity})
                                  </div>
                                ))}
                              </div>
                            )}
                            {room.switches.length > 0 && (
                              <div>
                                <span className="font-medium">Switchlar:</span>
                                {room.switches.map((sw, idx) => (
                                  <div key={idx} className="ml-2 text-muted-foreground">
                                    {sw.model} ({sw.quantity})
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="flex gap-3 mt-2">
                              {room.ups > 0 && <span>UPS: {room.ups}</span>}
                              {room.stabilizer > 0 && <span>Stab: {room.stabilizer}</span>}
                            </div>
                          </div>
                        </TableCell>

                        {/* Qo'shimcha */}
                        <TableCell className="max-w-xs">
                          <div className="space-y-1">
                            {room.hasAirConditioner && (
                              <Badge variant="secondary" className="text-xs">
                                AC: {room.airConditionerBTU} BTU
                              </Badge>
                            )}
                            <div className="flex flex-wrap gap-1">
                              {room.carpetUnderEquipment && (
                                <Badge variant="outline" className="text-xs">Gilam</Badge>
                              )}
                              {room.cableManagement && (
                                <Badge variant="outline" className="text-xs">Kabel OK</Badge>
                              )}
                              {room.hasThermometer && (
                                <Badge variant="outline" className="text-xs">Termometr</Badge>
                              )}
                              {room.hasGrounding && (
                                <Badge variant="outline" className="text-xs">Yerga ulanish</Badge>
                              )}
                            </div>
                            <div className="mt-2">
                              <Badge 
                                variant={
                                  room.cabinetCondition === "yaxshi" ? "default" : 
                                  room.cabinetCondition === "o'rta" ? "secondary" : "destructive"
                                } 
                                className="text-xs"
                              >
                                Shkaf: {room.cabinetCondition}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>

                        {/* Amallar */}
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedRoom(room)}>
                                <Eye className="h-4 w-4 mr-1" />
                                Batafsil
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Serverxona ma'lumotlari</DialogTitle>
                              </DialogHeader>
                              {selectedRoom && (
                                <div className="grid gap-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Asosiy ma'lumotlar */}
                                    <div>
                                      <h4 className="font-semibold mb-3 text-primary">Asosiy ma'lumotlar</h4>
                                      <div className="space-y-2 text-sm">
                                        <div><span className="font-medium">Joylashuv:</span> {selectedRoom.location}</div>
                                        <div><span className="font-medium">Eshik materiali:</span> {selectedRoom.doorMaterial}</div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Derazada panjara:</span> 
                                          <StatusIcon status={selectedRoom.windowBars} />
                                        </div>
                                        <div><span className="font-medium">Pol materiali:</span> {selectedRoom.floorMaterial}</div>
                                      </div>
                                    </div>

                                    {/* Xavfsizlik */}
                                    <div>
                                      <h4 className="font-semibold mb-3 text-primary">Xavfsizlik</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Yong'in signalizatsiya:</span>
                                          <StatusIcon status={selectedRoom.fireAlarm === "ishlayapti"} />
                                          <span>{selectedRoom.fireAlarm}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Qo'riqlash signalizatsiya:</span>
                                          <StatusIcon status={selectedRoom.securityAlarm === "ishlayapti"} />
                                          <span>{selectedRoom.securityAlarm}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">O't o'chirish moslama:</span> 
                                          <StatusIcon status={selectedRoom.fireExtinguisher} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Kamera:</span> 
                                          <StatusIcon status={selectedRoom.hasCamera} />
                                          {selectedRoom.hasCamera && selectedRoom.cameraIP && (
                                            <span className="text-muted-foreground">({selectedRoom.cameraIP})</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Texnik jihozlar */}
                                    <div>
                                      <h4 className="font-semibold mb-3 text-primary">Texnik jihozlar</h4>
                                      <div className="space-y-3 text-sm">
                                        {selectedRoom.servers.length > 0 && (
                                          <div>
                                            <span className="font-medium">Serverlar:</span>
                                            <div className="ml-3 space-y-1">
                                              {selectedRoom.servers.map((server, idx) => (
                                                <div key={idx}>• {server.model} ({server.quantity} dona)</div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        {selectedRoom.routers.length > 0 && (
                                          <div>
                                            <span className="font-medium">Routerlar:</span>
                                            <div className="ml-3 space-y-1">
                                              {selectedRoom.routers.map((router, idx) => (
                                                <div key={idx}>• {router.model} ({router.quantity} dona)</div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        {selectedRoom.switches.length > 0 && (
                                          <div>
                                            <span className="font-medium">Switchlar:</span>
                                            <div className="ml-3 space-y-1">
                                              {selectedRoom.switches.map((sw, idx) => (
                                                <div key={idx}>• {sw.model} ({sw.quantity} dona)</div>
                                              ))}
                                            </div>
                                          </div>
                                        )}
                                        <div><span className="font-medium">UPS:</span> {selectedRoom.ups} dona</div>
                                        <div><span className="font-medium">Stabilizator:</span> {selectedRoom.stabilizer} dona</div>
                                      </div>
                                    </div>

                                    {/* Qo'shimcha */}
                                    <div>
                                      <h4 className="font-semibold mb-3 text-primary">Qo'shimcha</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Konditsioner:</span>
                                          <StatusIcon status={selectedRoom.hasAirConditioner} />
                                          {selectedRoom.hasAirConditioner && selectedRoom.airConditionerBTU && (
                                            <span>({selectedRoom.airConditionerBTU} BTU/h)</span>
                                          )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Pol ostida gilam:</span>
                                          <StatusIcon status={selectedRoom.carpetUnderEquipment} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Kabel tartibi:</span>
                                          <StatusIcon status={selectedRoom.cableManagement} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Termometr:</span>
                                          <StatusIcon status={selectedRoom.hasThermometer} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">Yerga ulanish:</span>
                                          <StatusIcon status={selectedRoom.hasGrounding} />
                                        </div>
                                        <div>
                                          <span className="font-medium">Shkaf ahvoli:</span> 
                                          <Badge 
                                            variant={
                                              selectedRoom.cabinetCondition === "yaxshi" ? "default" : 
                                              selectedRoom.cabinetCondition === "o'rta" ? "secondary" : "destructive"
                                            } 
                                            className="ml-2"
                                          >
                                            {selectedRoom.cabinetCondition}
                                          </Badge>
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