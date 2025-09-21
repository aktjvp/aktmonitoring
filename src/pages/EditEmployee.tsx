import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for phones and computers (MAC addresses)
const mockPhones = [
  { id: 1, macAddress: "00:1B:44:11:3A:B7", name: "IT Bo'limi telefoni", user: "Karimov Sardor Akmalovich" },
  { id: 2, macAddress: "00:1B:44:22:4B:C8", name: "Moliya bo'limi telefoni", user: "Rahimova Nozima Turgunovna" },
  { id: 3, macAddress: "00:1B:44:33:5C:D9", name: "HR bo'limi telefoni", user: "Toshmatov Bobur Rustamovich" },
  { id: 4, macAddress: "00:1B:44:44:6D:EA", name: "Marketing telefoni", user: "" },
  { id: 5, macAddress: "00:1B:44:55:7E:FB", name: "Boshqaruv telefoni", user: "" },
];

const mockComputers = [
  { id: 1, macAddress: "00:1B:44:11:3A:B7", name: "IT-DESK-001", model: "HP EliteDesk 800", user: "Karimov Sardor Akmalovich" },
  { id: 2, macAddress: "00:1B:44:11:3A:B8", name: "FIN-LAP-002", model: "Dell OptiPlex 3070", user: "Rahimova Nozima Turgunovna" },
  { id: 3, macAddress: "00:1B:44:11:3A:B9", name: "HR-MONO-003", model: "Lenovo ThinkCentre M720", user: "Toshmatov Bobur Rustamovich" },
  { id: 4, macAddress: "00:1B:44:11:3A:C0", name: "MKT-DESK-004", model: "ASUS VivoPC", user: "" },
  { id: 5, macAddress: "00:1B:44:11:3A:C1", name: "ADM-LAP-005", model: "HP ProBook 450", user: "" },
];

// Mock employee data
const mockEmployee = {
  id: 1,
  firstName: "Sardor",
  lastName: "Karimov",
  fatherName: "Akmalovich",
  position: "bolim-xodimi",
  department: "6-bolim",
  adLogin: "s.karimov",
  phoneId: 1,
  computerId: 1,
};

export default function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    position: "",
    department: "",
    adLogin: "",
    phoneId: "",
    computerId: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    position: "",
    department: "",
    adLogin: "",
  });

  const [phoneOpen, setPhoneOpen] = useState(false);
  const [computerOpen, setComputerOpen] = useState(false);
  const [phoneSearch, setPhoneSearch] = useState("");
  const [computerSearch, setComputerSearch] = useState("");

  // Load employee data (in real app, this would be API call)
  useEffect(() => {
    if (id) {
      setFormData({
        firstName: mockEmployee.firstName,
        lastName: mockEmployee.lastName,
        fatherName: mockEmployee.fatherName,
        position: mockEmployee.position,
        department: mockEmployee.department,
        adLogin: mockEmployee.adLogin,
        phoneId: mockEmployee.phoneId.toString(),
        computerId: mockEmployee.computerId.toString(),
      });
    }
  }, [id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      fatherName: "",
      position: "",
      department: "",
      adLogin: "",
    };

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Ism majburiy maydon";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Familiya majburiy maydon";
    }
    if (!formData.fatherName.trim()) {
      newErrors.fatherName = "Otasini ismi majburiy maydon";
    }
    if (!formData.position) {
      newErrors.position = "Lavozim majburiy maydon";
    }
    if (!formData.department) {
      newErrors.department = "Bo'lim majburiy maydon";
    }
    if (!formData.adLogin.trim()) {
      newErrors.adLogin = "Active Directory login majburiy maydon";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    toast({
      title: "Muvaffaqiyat!",
      description: "Xodim ma'lumotlari muvaffaqiyatli yangilandi.",
    });
    navigate("/employees");
  };

  const filteredPhones = mockPhones.filter(phone =>
    phone.macAddress.toLowerCase().includes(phoneSearch.toLowerCase()) ||
    phone.name.toLowerCase().includes(phoneSearch.toLowerCase())
  );

  const filteredComputers = mockComputers.filter(computer =>
    computer.macAddress.toLowerCase().includes(computerSearch.toLowerCase()) ||
    computer.name.toLowerCase().includes(computerSearch.toLowerCase()) ||
    computer.model.toLowerCase().includes(computerSearch.toLowerCase())
  );

  const selectedPhone = mockPhones.find(phone => phone.id.toString() === formData.phoneId);
  const selectedComputer = mockComputers.find(computer => computer.id.toString() === formData.computerId);

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
          <h1 className="text-3xl font-bold">Xodim ma'lumotlarini o'zgartirish</h1>
          <p className="text-muted-foreground">
            Xodimning ma'lumotlarini tahrirlang
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Xodim Ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ismi *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Ismingizni kiriting"
                  className={errors.firstName ? "border-destructive" : ""}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Familiyasi *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Familiyangizni kiriting"
                  className={errors.lastName ? "border-destructive" : ""}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fatherName">Otasini ismi *</Label>
              <Input
                id="fatherName"
                value={formData.fatherName}
                onChange={(e) => handleInputChange("fatherName", e.target.value)}
                placeholder="Otangizning ismini kiriting"
                className={errors.fatherName ? "border-destructive" : ""}
              />
              {errors.fatherName && (
                <p className="text-sm text-destructive">{errors.fatherName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Lavozimi *</Label>
                <Select 
                  value={formData.position} 
                  onValueChange={(value) => handleInputChange("position", value)}
                >
                  <SelectTrigger className={errors.position ? "border-destructive" : ""}>
                    <SelectValue placeholder="Lavozimni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bolim-boshligi">Bo'lim boshlig'i</SelectItem>
                    <SelectItem value="bolim-xodimi">Bo'lim xodimi</SelectItem>
                  </SelectContent>
                </Select>
                {errors.position && (
                  <p className="text-sm text-destructive">{errors.position}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Bo'limi *</Label>
                <Select 
                  value={formData.department} 
                  onValueChange={(value) => handleInputChange("department", value)}
                >
                  <SelectTrigger className={errors.department ? "border-destructive" : ""}>
                    <SelectValue placeholder="Bo'limni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-bolim">6-bo'lim</SelectItem>
                    <SelectItem value="7-bolim">7-bo'lim</SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-sm text-destructive">{errors.department}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adLogin">Active Directory logini *</Label>
              <Input
                id="adLogin"
                value={formData.adLogin}
                onChange={(e) => handleInputChange("adLogin", e.target.value)}
                placeholder="Active Directory loginini kiriting"
                className={errors.adLogin ? "border-destructive" : ""}
              />
              {errors.adLogin && (
                <p className="text-sm text-destructive">{errors.adLogin}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Telefon (MAC address orqali qidirish)</Label>
              <Popover open={phoneOpen} onOpenChange={setPhoneOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={phoneOpen}
                    className="w-full justify-between"
                  >
                    {selectedPhone ? (
                      <span className="flex items-center gap-2">
                        <span className="font-medium">{selectedPhone.macAddress}</span>
                        <span className="text-muted-foreground">- {selectedPhone.name}</span>
                      </span>
                    ) : (
                      "MAC address orqali telefon tanlang..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="MAC address yoki nom bo'yicha qidirish..."
                      value={phoneSearch}
                      onValueChange={setPhoneSearch}
                    />
                    <CommandList>
                      <CommandEmpty>Telefon topilmadi.</CommandEmpty>
                      <CommandGroup>
                        {filteredPhones.map((phone) => (
                          <CommandItem
                            key={phone.id}
                            value={phone.macAddress}
                            onSelect={() => {
                              setFormData(prev => ({ ...prev, phoneId: phone.id.toString() }));
                              setPhoneOpen(false);
                              setPhoneSearch("");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.phoneId === phone.id.toString() ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{phone.macAddress}</span>
                              <span className="text-sm text-muted-foreground">{phone.name}</span>
                              {phone.user && (
                                <span className="text-xs text-muted-foreground">Foydalanuvchi: {phone.user}</span>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Kompyuter (MAC address orqali qidirish)</Label>
              <Popover open={computerOpen} onOpenChange={setComputerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={computerOpen}
                    className="w-full justify-between"
                  >
                    {selectedComputer ? (
                      <span className="flex items-center gap-2">
                        <span className="font-medium">{selectedComputer.macAddress}</span>
                        <span className="text-muted-foreground">- {selectedComputer.name} ({selectedComputer.model})</span>
                      </span>
                    ) : (
                      "MAC address orqali kompyuter tanlang..."
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="MAC address, nom yoki model bo'yicha qidirish..."
                      value={computerSearch}
                      onValueChange={setComputerSearch}
                    />
                    <CommandList>
                      <CommandEmpty>Kompyuter topilmadi.</CommandEmpty>
                      <CommandGroup>
                        {filteredComputers.map((computer) => (
                          <CommandItem
                            key={computer.id}
                            value={computer.macAddress}
                            onSelect={() => {
                              setFormData(prev => ({ ...prev, computerId: computer.id.toString() }));
                              setComputerOpen(false);
                              setComputerSearch("");
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.computerId === computer.id.toString() ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{computer.macAddress}</span>
                              <span className="text-sm text-muted-foreground">{computer.name} - {computer.model}</span>
                              {computer.user && (
                                <span className="text-xs text-muted-foreground">Foydalanuvchi: {computer.user}</span>
                              )}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/employees")}
          >
            Bekor qilish
          </Button>
          <Button type="submit">
            Saqlash
          </Button>
        </div>
      </form>
    </div>
  );
}