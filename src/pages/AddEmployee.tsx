import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AddEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    position: "",
    department: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    position: "",
    department: ""
  });

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
      department: ""
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
            Yangi xodimning asosiy ma'lumotlarini kiriting
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Xodim Ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
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