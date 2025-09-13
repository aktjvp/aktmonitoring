import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Shaxsiy ma'lumotlar
    firstName: "",
    lastName: "",
    position: "",
    department: "",
    phoneNumber: "",
    email: "",
    
    // Kompyuter ma'lumotlari
    computerName: "",
    computerModel: "",
    processor: "",
    ram: "",
    storage: "",
    operatingSystem: "",
    
    // Telefon ma'lumotlari
    phoneType: "",
    phoneModel: "",
    phoneNumber2: "",
    
    // Tizim ma'lumotlari
    ipAddress: "",
    macAddress: "",
    networkAccess: "",
    softwareList: "",
    
    // Xavfsizlik ma'lumotlari
    accessLevel: "",
    securityKey: "",
    biometricAccess: "",
    workingHours: "",
    
    // Qo'shimcha ma'lumotlar
    notes: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Bu yerda ma'lumotlarni saqlash logikasi bo'ladi
    toast({
      title: "Muvaffaqiyat!",
      description: "Yangi xodim muvaffaqiyatli qo'shildi.",
    });
    navigate("/employees");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/employees")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Yangi Xodim Qo'shish</h1>
          <p className="text-muted-foreground">
            Yangi xodimning barcha ma'lumotlarini kiriting
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Shaxsiy</TabsTrigger>
            <TabsTrigger value="computer">Kompyuter</TabsTrigger>
            <TabsTrigger value="phone">Telefon</TabsTrigger>
            <TabsTrigger value="system">Tizim</TabsTrigger>
            <TabsTrigger value="security">Xavfsizlik</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Shaxsiy Ma'lumotlar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Ism</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Familiya</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Lavozim</Label>
                    <Select onValueChange={(value) => handleInputChange("position", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Lavozimni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dasturchi">Dasturchi</SelectItem>
                        <SelectItem value="tahlilchi">Tahlilchi</SelectItem>
                        <SelectItem value="menejer">Menejer</SelectItem>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="dizayner">Dizayner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Bo'lim</Label>
                    <Select onValueChange={(value) => handleInputChange("department", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bo'limni tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="it">IT Bo'limi</SelectItem>
                        <SelectItem value="hr">HR Bo'limi</SelectItem>
                        <SelectItem value="finance">Moliya Bo'limi</SelectItem>
                        <SelectItem value="marketing">Marketing Bo'limi</SelectItem>
                        <SelectItem value="sales">Sotuv Bo'limi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Telefon Raqami</Label>
                    <Input
                      id="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="+998901234567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="computer">
            <Card>
              <CardHeader>
                <CardTitle>Kompyuter Ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="computerName">Kompyuter Nomi</Label>
                    <Input
                      id="computerName"
                      value={formData.computerName}
                      onChange={(e) => handleInputChange("computerName", e.target.value)}
                      placeholder="PC-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="computerModel">Model</Label>
                    <Input
                      id="computerModel"
                      value={formData.computerModel}
                      onChange={(e) => handleInputChange("computerModel", e.target.value)}
                      placeholder="Dell OptiPlex 7090"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="processor">Protsessor</Label>
                    <Input
                      id="processor"
                      value={formData.processor}
                      onChange={(e) => handleInputChange("processor", e.target.value)}
                      placeholder="Intel Core i7"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ram">RAM</Label>
                    <Select onValueChange={(value) => handleInputChange("ram", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="RAM hajmi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4GB">4 GB</SelectItem>
                        <SelectItem value="8GB">8 GB</SelectItem>
                        <SelectItem value="16GB">16 GB</SelectItem>
                        <SelectItem value="32GB">32 GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storage">Xotira</Label>
                    <Select onValueChange={(value) => handleInputChange("storage", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Xotira hajmi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="256GB SSD">256 GB SSD</SelectItem>
                        <SelectItem value="512GB SSD">512 GB SSD</SelectItem>
                        <SelectItem value="1TB SSD">1 TB SSD</SelectItem>
                        <SelectItem value="1TB HDD">1 TB HDD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="operatingSystem">Operatsion Tizim</Label>
                  <Select onValueChange={(value) => handleInputChange("operatingSystem", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="OS ni tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="windows11">Windows 11</SelectItem>
                      <SelectItem value="windows10">Windows 10</SelectItem>
                      <SelectItem value="ubuntu">Ubuntu Linux</SelectItem>
                      <SelectItem value="macos">macOS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="phone">
            <Card>
              <CardHeader>
                <CardTitle>Telefon Ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneType">Telefon Turi</Label>
                    <Select onValueChange={(value) => handleInputChange("phoneType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Telefon turini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smartphone">Smartphone</SelectItem>
                        <SelectItem value="landline">Statsionar</SelectItem>
                        <SelectItem value="tablet">Planshet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneModel">Telefon Modeli</Label>
                    <Input
                      id="phoneModel"
                      value={formData.phoneModel}
                      onChange={(e) => handleInputChange("phoneModel", e.target.value)}
                      placeholder="iPhone 14, Samsung Galaxy S23"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber2">Qo'shimcha Telefon</Label>
                  <Input
                    id="phoneNumber2"
    value={formData.phoneNumber2}
                    onChange={(e) => handleInputChange("phoneNumber2", e.target.value)}
                    placeholder="+998901234567"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Tizim Ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ipAddress">IP Manzil</Label>
                    <Input
                      id="ipAddress"
                      value={formData.ipAddress}
                      onChange={(e) => handleInputChange("ipAddress", e.target.value)}
                      placeholder="192.168.1.100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="macAddress">MAC Manzil</Label>
                    <Input
                      id="macAddress"
                      value={formData.macAddress}
                      onChange={(e) => handleInputChange("macAddress", e.target.value)}
                      placeholder="00:1B:44:11:3A:B7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="networkAccess">Tarmoq Kirishi</Label>
                  <Select onValueChange={(value) => handleInputChange("networkAccess", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kirish darajasini tanlang" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">To'liq kirish</SelectItem>
                      <SelectItem value="limited">Cheklangan</SelectItem>
                      <SelectItem value="restricted">Taqiqlangan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="softwareList">O'rnatilgan Dasturlar</Label>
                  <Textarea
                    id="softwareList"
                    value={formData.softwareList}
                    onChange={(e) => handleInputChange("softwareList", e.target.value)}
                    placeholder="Microsoft Office, Adobe Creative Suite..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Xavfsizlik Ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="accessLevel">Kirish Darajasi</Label>
                    <Select onValueChange={(value) => handleInputChange("accessLevel", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Kirish darajasini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Menejer</SelectItem>
                        <SelectItem value="user">Oddiy foydalanuvchi</SelectItem>
                        <SelectItem value="guest">Mehmon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="securityKey">Xavfsizlik Kaliti</Label>
                    <Input
                      id="securityKey"
                      value={formData.securityKey}
                      onChange={(e) => handleInputChange("securityKey", e.target.value)}
                      placeholder="SEC-001"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="biometricAccess">Biometrik Kirish</Label>
                    <Select onValueChange={(value) => handleInputChange("biometricAccess", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Biometrik turini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fingerprint">Barmoq izi</SelectItem>
                        <SelectItem value="face">Yuz tanish</SelectItem>
                        <SelectItem value="both">Ikkalasi</SelectItem>
                        <SelectItem value="none">Yo'q</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workingHours">Ish Vaqti</Label>
                    <Select onValueChange={(value) => handleInputChange("workingHours", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ish vaqtini tanlang" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9-18">09:00 - 18:00</SelectItem>
                        <SelectItem value="8-17">08:00 - 17:00</SelectItem>
                        <SelectItem value="10-19">10:00 - 19:00</SelectItem>
                        <SelectItem value="flexible">Moslashuvchan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Qo'shimcha Izohlar</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Qo'shimcha ma'lumotlar..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/employees")}
          >
            Bekor Qilish
          </Button>
          <Button type="submit">
            Xodimni Qo'shish
          </Button>
        </div>
      </form>
    </div>
  );
}