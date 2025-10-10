import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

const printerSchema = z.object({
  printerModel: z.string().min(1, "Printer modeli tanlanishi shart"),
  printerName: z.string().min(1, "Printer nomi kiritilishi shart"),
  serialNumber: z.string().min(1, "Seriya raqami kiritilishi shart"),
  acquisitionDate: z.string().min(1, "Olingan sanasi kiritilishi shart"),
  acquisitionType: z.string().min(1, "Olingan turi tanlanishi shart"),
  technicalCondition: z.boolean(),
  connectionType: z.string().min(1, "Ulanish turi tanlanishi shart"),
  connectedComputer: z.string().min(1, "Ulangan kompyuter kiritilishi shart"),
  installedDepartment: z.string().min(1, "O'rnatilgan bo'lim kiritilishi shart"),
  installationDate: z.string().min(1, "O'rnatilgan sana kiritilishi shart"),
  user: z.string().min(1, "Foydalanuvchi kiritilishi shart"),
});

type PrinterFormData = z.infer<typeof printerSchema>;

// Mock data
const mockPrinters = [
  {
    id: "1",
    printerModel: "HP",
    printerName: "IT bo'limi LaserJet",
    serialNumber: "HP123456789",
    acquisitionDate: "2023-01-10",
    acquisitionType: "organization",
    technicalCondition: true,
    connectionType: "Ethernet",
    connectedComputer: "IT-WORK-001",
    installedDepartment: "IT Bo'limi",
    installationDate: "2023-01-15",
    user: "IT Bo'limi umumiy",
  },
  {
    id: "2",
    printerModel: "Canon",
    printerName: "HR bo'limi printer",
    serialNumber: "CAN987654321",
    acquisitionDate: "2022-11-15",
    acquisitionType: "personal",
    technicalCondition: true,
    connectionType: "USB",
    connectedComputer: "HR-MONO-003",
    installedDepartment: "HR Bo'limi",
    installationDate: "2022-11-20",
    user: "Toshmatov Bobur Rustamovich",
  },
];

export default function EditPrinter() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Find printer data
  const printerData = mockPrinters.find((p) => p.id === id);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PrinterFormData>({
    resolver: zodResolver(printerSchema),
    defaultValues: printerData || {
      printerModel: "",
      printerName: "",
      serialNumber: "",
      acquisitionDate: "",
      acquisitionType: "",
      technicalCondition: true,
      connectionType: "",
      connectedComputer: "",
      installedDepartment: "",
      installationDate: "",
      user: "",
    },
  });

  const technicalCondition = watch("technicalCondition");

  const onSubmit = async (data: PrinterFormData) => {
    setIsLoading(true);
    try {
      console.log("Printer updated:", data);
      toast.success("Printer muvaffaqiyatli yangilandi!");
      navigate("/printers");
    } catch (error) {
      toast.error("Xatolik yuz berdi");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!printerData) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">Printer topilmadi</p>
            <div className="flex justify-center mt-4">
              <Button onClick={() => navigate("/printers")} variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Orqaga
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button onClick={() => navigate("/printers")} variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Orqaga
        </Button>
        <h1 className="text-3xl font-bold">Printerni tahrirlash</h1>
        <p className="text-muted-foreground">Printer ma'lumotlarini yangilang</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Asosiy ma'lumotlar */}
        <Card>
          <CardHeader>
            <CardTitle>Asosiy ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="printerModel">Printer modeli *</Label>
                <Select
                  value={watch("printerModel")}
                  onValueChange={(value) => setValue("printerModel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Modelni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HP">HP</SelectItem>
                    <SelectItem value="Canon">Canon</SelectItem>
                    <SelectItem value="Epson">Epson</SelectItem>
                    <SelectItem value="Brother">Brother</SelectItem>
                    <SelectItem value="Samsung">Samsung</SelectItem>
                    <SelectItem value="Lexmark">Lexmark</SelectItem>
                    <SelectItem value="Xerox">Xerox</SelectItem>
                    <SelectItem value="Ricoh">Ricoh</SelectItem>
                    <SelectItem value="Kyocera">Kyocera</SelectItem>
                    <SelectItem value="Dell">Dell</SelectItem>
                    <SelectItem value="Boshqa">Boshqa</SelectItem>
                  </SelectContent>
                </Select>
                {errors.printerModel && (
                  <p className="text-sm text-destructive">{errors.printerModel.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="printerName">Printer nomi *</Label>
                <Input
                  id="printerName"
                  {...register("printerName")}
                  placeholder="Printer nomini kiriting"
                />
                {errors.printerName && (
                  <p className="text-sm text-destructive">{errors.printerName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="serialNumber">Seriya raqami *</Label>
                <Input
                  id="serialNumber"
                  {...register("serialNumber")}
                  placeholder="Seriya raqamini kiriting"
                />
                {errors.serialNumber && (
                  <p className="text-sm text-destructive">{errors.serialNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="acquisitionDate">Olingan sanasi *</Label>
                <Input
                  id="acquisitionDate"
                  type="date"
                  {...register("acquisitionDate")}
                />
                {errors.acquisitionDate && (
                  <p className="text-sm text-destructive">{errors.acquisitionDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="acquisitionType">Olingan turi *</Label>
                <Select
                  value={watch("acquisitionType")}
                  onValueChange={(value) => setValue("acquisitionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Turni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organization">Tashkilot</SelectItem>
                    <SelectItem value="personal">Shaxsiy</SelectItem>
                  </SelectContent>
                </Select>
                {errors.acquisitionType && (
                  <p className="text-sm text-destructive">{errors.acquisitionType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="technicalCondition">Texnik holati</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="technicalCondition"
                    checked={technicalCondition}
                    onCheckedChange={(checked) => setValue("technicalCondition", checked)}
                  />
                  <Label htmlFor="technicalCondition" className="cursor-pointer">
                    {technicalCondition ? "Soz" : "Nosoz"}
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tarmoq va ulanish ma'lumotlari */}
        <Card>
          <CardHeader>
            <CardTitle>Tarmoq va ulanish ma'lumotlari</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="connectionType">Ulanish turi *</Label>
                <Select
                  value={watch("connectionType")}
                  onValueChange={(value) => setValue("connectionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Ulanish turini tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WiFi">WiFi</SelectItem>
                    <SelectItem value="Ethernet">Ethernet</SelectItem>
                    <SelectItem value="USB">USB</SelectItem>
                  </SelectContent>
                </Select>
                {errors.connectionType && (
                  <p className="text-sm text-destructive">{errors.connectionType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="connectedComputer">Ulangan kompyuter *</Label>
                <Input
                  id="connectedComputer"
                  {...register("connectedComputer")}
                  placeholder="Kompyuter nomini kiriting"
                />
                {errors.connectedComputer && (
                  <p className="text-sm text-destructive">{errors.connectedComputer.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Joylashuv ma'lumotlari */}
        <Card>
          <CardHeader>
            <CardTitle>Joylashuv va foydalanuvchi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="installedDepartment">O'rnatilgan bo'lim *</Label>
                <Input
                  id="installedDepartment"
                  {...register("installedDepartment")}
                  placeholder="Bo'lim nomini kiriting"
                />
                {errors.installedDepartment && (
                  <p className="text-sm text-destructive">{errors.installedDepartment.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="installationDate">O'rnatilgan sana *</Label>
                <Input
                  id="installationDate"
                  type="date"
                  {...register("installationDate")}
                />
                {errors.installationDate && (
                  <p className="text-sm text-destructive">{errors.installationDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="user">Foydalanuvchi *</Label>
                <Input
                  id="user"
                  {...register("user")}
                  placeholder="Foydalanuvchi nomini kiriting"
                />
                {errors.user && (
                  <p className="text-sm text-destructive">{errors.user.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form actions */}
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/printers")}
          >
            Bekor qilish
          </Button>
          <Button type="submit" disabled={isLoading}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </div>
  );
}
