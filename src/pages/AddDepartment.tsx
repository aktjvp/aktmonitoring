import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function AddDepartment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    index: "",
    status: true
  });

  const [errors, setErrors] = useState({
    name: "",
    index: ""
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (typeof value === "string" && errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      index: ""
    };

    if (!formData.name.trim()) {
      newErrors.name = "Bo'lim nomi majburiy maydon";
    }
    if (!formData.index.trim()) {
      newErrors.index = "Bo'lim indeksi majburiy maydon";
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
      description: "Yangi bo'lim muvaffaqiyatli qo'shildi.",
    });
    navigate("/departments");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/departments")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Yangi Bo'lim Qo'shish</h1>
          <p className="text-muted-foreground">
            Yangi bo'limning asosiy ma'lumotlarini kiriting
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Bo'lim Ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Bo'lim nomi *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Bo'lim nomini kiriting"
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="index">Bo'lim indeksi *</Label>
              <Input
                id="index"
                value={formData.index}
                onChange={(e) => handleInputChange("index", e.target.value)}
                placeholder="Bo'lim indeksini kiriting"
                className={errors.index ? "border-destructive" : ""}
              />
              {errors.index && (
                <p className="text-sm text-destructive">{errors.index}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Bo'lim holati</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={formData.status}
                  onCheckedChange={(checked) => handleInputChange("status", checked)}
                />
                <Label htmlFor="status" className="text-sm">
                  {formData.status ? "Faol" : "Faoliyati to'xtagan"}
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/departments")}
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