import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  location: z.string().min(1, "Joylashuv to'ldirilishi shart"),
  doorMaterial: z.boolean(),
  windowBars: z.boolean(),
  floorMaterial: z.string().min(1, "Pol materiali to'ldirilishi shart"),
  fireAlarm: z.boolean(),
  securityAlarm: z.boolean(),
  fireExtinguisher: z.boolean(),
  hasCamera: z.enum(["yes", "no"]),
  cameraIP: z.string().optional(),
  servers: z.array(z.object({
    model: z.string().min(1, "Server modeli to'ldirilishi shart"),
    quantity: z.number().min(1, "Soni kamida 1 bo'lishi kerak")
  })).min(1, "Kamida bitta server qo'shilishi kerak"),
  routers: z.array(z.object({
    model: z.string().min(1, "Router modeli to'ldirilishi shart"),
    quantity: z.number().min(1, "Soni kamida 1 bo'lishi kerak")
  })).optional(),
  switches: z.array(z.object({
    model: z.string().min(1, "Switch modeli to'ldirilishi shart"),
    quantity: z.number().min(1, "Soni kamida 1 bo'lishi kerak")
  })).optional(),
  ups: z.number().min(0),
  stabilizer: z.number().min(0),
  hasAirConditioner: z.boolean(),
  airConditionerBTU: z.string().optional(),
  hasCarpet: z.boolean(),
  cableManagement: z.boolean(),
  hasThermometer: z.boolean(),
  hasGrounding: z.boolean(),
  cabinetCondition: z.enum(["yomon", "o'rta", "yaxshi"])
}).refine((data) => {
  if (data.hasCamera === "yes" && !data.cameraIP) {
    return false;
  }
  return true;
}, {
  message: "Kamera IP manzili to'ldirilishi shart",
  path: ["cameraIP"]
}).refine((data) => {
  if (data.hasAirConditioner && !data.airConditionerBTU) {
    return false;
  }
  return true;
}, {
  message: "Konditsioner BTU qiymati tanlanishi shart",
  path: ["airConditionerBTU"]
});

type FormData = z.infer<typeof formSchema>;

interface EquipmentItem {
  model: string;
  quantity: number;
}

export default function AddServerRoom() {
  const navigate = useNavigate();
  const [servers, setServers] = useState<EquipmentItem[]>([{ model: "", quantity: 1 }]);
  const [routers, setRouters] = useState<EquipmentItem[]>([{ model: "", quantity: 1 }]);
  const [switches, setSwitches] = useState<EquipmentItem[]>([{ model: "", quantity: 1 }]);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      doorMaterial: true,
      windowBars: true,
      floorMaterial: "",
      fireAlarm: true,
      securityAlarm: true,
      fireExtinguisher: true,
      hasCamera: "no",
      cameraIP: "",
      servers: [{ model: "", quantity: 1 }],
      routers: [],
      switches: [],
      ups: 0,
      stabilizer: 0,
      hasAirConditioner: false,
      airConditionerBTU: "",
      hasCarpet: false,
      cableManagement: true,
      hasThermometer: true,
      hasGrounding: true,
      cabinetCondition: "yaxshi"
    }
  });

  const addEquipment = (type: 'servers' | 'routers' | 'switches') => {
    const newItem = { model: "", quantity: 1 };
    if (type === 'servers') {
      const updated = [...servers, newItem];
      setServers(updated);
      form.setValue('servers', updated);
    } else if (type === 'routers') {
      const updated = [...routers, newItem];
      setRouters(updated);
      form.setValue('routers', updated);
    } else {
      const updated = [...switches, newItem];
      setSwitches(updated);
      form.setValue('switches', updated);
    }
  };

  const removeEquipment = (type: 'servers' | 'routers' | 'switches', index: number) => {
    if (type === 'servers') {
      if (servers.length > 1) {
        const updated = servers.filter((_, i) => i !== index);
        setServers(updated);
        form.setValue('servers', updated);
      }
    } else if (type === 'routers') {
      const updated = routers.filter((_, i) => i !== index);
      setRouters(updated);
      form.setValue('routers', updated);
    } else {
      const updated = switches.filter((_, i) => i !== index);
      setSwitches(updated);
      form.setValue('switches', updated);
    }
  };

  const updateEquipment = (type: 'servers' | 'routers' | 'switches', index: number, field: 'model' | 'quantity', value: string | number) => {
    if (type === 'servers') {
      const updated = servers.map((item, i) => i === index ? { ...item, [field]: value } : item);
      setServers(updated);
      form.setValue('servers', updated);
    } else if (type === 'routers') {
      const updated = routers.map((item, i) => i === index ? { ...item, [field]: value } : item);
      setRouters(updated);
      form.setValue('routers', updated);
    } else {
      const updated = switches.map((item, i) => i === index ? { ...item, [field]: value } : item);
      setSwitches(updated);
      form.setValue('switches', updated);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      // Simulate API call
      console.log("Server room data:", data);
      
      toast({
        title: "Serverxona muvaffaqiyatli qo'shildi",
        description: "Yangi serverxona ma'lumotlari saqlandi.",
      });
      
      navigate("/serverxonalar");
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        description: "Serverxona qo'shishda xatolik yuz berdi.",
        variant: "destructive"
      });
    }
  };

  const EquipmentSection = ({ 
    title, 
    items, 
    type 
  }: { 
    title: string; 
    items: EquipmentItem[]; 
    type: 'servers' | 'routers' | 'switches' 
  }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium">{title}</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => addEquipment(type)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Yangi qo'shish
        </Button>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-end gap-4 p-4 border rounded-lg">
          <div className="flex-1">
            <Label htmlFor={`${type}-model-${index}`}>Model</Label>
            <Input
              id={`${type}-model-${index}`}
              value={item.model}
              onChange={(e) => updateEquipment(type, index, 'model', e.target.value)}
              placeholder="Model nomini kiriting"
            />
          </div>
          <div className="w-24">
            <Label htmlFor={`${type}-quantity-${index}`}>Soni</Label>
            <Input
              id={`${type}-quantity-${index}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateEquipment(type, index, 'quantity', parseInt(e.target.value) || 1)}
            />
          </div>
          {(type !== 'servers' || items.length > 1) && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeEquipment(type, index)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => navigate("/serverxonalar")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Orqaga
          </Button>
          <h1 className="text-3xl font-bold">Yangi serverxona qo'shish</h1>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Asosiy ma'lumotlar</TabsTrigger>
              <TabsTrigger value="security">Xavfsizlik</TabsTrigger>
              <TabsTrigger value="equipment">Texnik jihozlar</TabsTrigger>
              <TabsTrigger value="additional">Qo'shimcha</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Asosiy ma'lumotlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Joylashuvi *</FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Markaziy bino, 1-qavat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="doorMaterial"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Eshik materiali</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="door-material">Taxta</Label>
                          <FormControl>
                            <Switch
                              id="door-material"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="door-material">Temir</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="windowBars"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Derazada temir panjara</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="window-bars">Yo'q</Label>
                          <FormControl>
                            <Switch
                              id="window-bars"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="window-bars">Bor</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="floorMaterial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pol materiali *</FormLabel>
                        <FormControl>
                          <Input placeholder="Masalan: Antistatik gilam, Keramik, Beton" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Xavfsizlik</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="fireAlarm"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Yong'inga qarshi signalizatsiya</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="fire-alarm">Ishlamayapti</Label>
                          <FormControl>
                            <Switch
                              id="fire-alarm"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="fire-alarm">Ishlayapti</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="securityAlarm"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Qo'riqlash signalizatsiya</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="security-alarm">Ishlamayapti</Label>
                          <FormControl>
                            <Switch
                              id="security-alarm"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="security-alarm">Ishlayapti</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="fireExtinguisher"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>O't o'chirish moslama</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="fire-extinguisher">Yo'q</Label>
                          <FormControl>
                            <Switch
                              id="fire-extinguisher"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="fire-extinguisher">Bor</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasCamera"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video-kuzatuv kamerasi</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex items-center space-x-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="camera-no" />
                              <Label htmlFor="camera-no">Yo'q</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="camera-yes" />
                              <Label htmlFor="camera-yes">Bor</Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("hasCamera") === "yes" && (
                    <FormField
                      control={form.control}
                      name="cameraIP"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Kamera IP manzili *</FormLabel>
                          <FormControl>
                            <Input placeholder="192.168.1.100" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="equipment">
              <Card>
                <CardHeader>
                  <CardTitle>Texnik jihozlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <EquipmentSection 
                    title="Server" 
                    items={servers} 
                    type="servers" 
                  />

                  <EquipmentSection 
                    title="Marshrutizator" 
                    items={routers} 
                    type="routers" 
                  />

                  <EquipmentSection 
                    title="Kommutator" 
                    items={switches} 
                    type="switches" 
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="ups"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>UPS soni</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stabilizer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stabilizator soni</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="0" 
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="additional">
              <Card>
                <CardHeader>
                  <CardTitle>Qo'shimcha ma'lumotlar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="hasAirConditioner"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Konditsioner</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="air-conditioner">Yo'q</Label>
                          <FormControl>
                            <Switch
                              id="air-conditioner"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="air-conditioner">Bor</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  {form.watch("hasAirConditioner") && (
                    <FormField
                      control={form.control}
                      name="airConditionerBTU"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Konditsioner quvvati *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="BTU/h tanlanmang" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="7000">7000 BTU/h</SelectItem>
                              <SelectItem value="9000">9000 BTU/h</SelectItem>
                              <SelectItem value="12000">12000 BTU/h</SelectItem>
                              <SelectItem value="18000">18000 BTU/h</SelectItem>
                              <SelectItem value="24000">24000 BTU/h</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="hasCarpet"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Polda texnika tagida gilam/kovrolon</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="carpet">Yo'q</Label>
                          <FormControl>
                            <Switch
                              id="carpet"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="carpet">Bor</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cableManagement"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Kabel liniyalari tartibga keltirilganligi</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="cable-management">Yo'q</Label>
                          <FormControl>
                            <Switch
                              id="cable-management"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="cable-management">Ha</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasThermometer"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Termometr</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="thermometer">Yo'q</Label>
                          <FormControl>
                            <Switch
                              id="thermometer"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="thermometer">Bor</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="hasGrounding"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Yerga ulanish</FormLabel>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="grounding">Yo'q</Label>
                          <FormControl>
                            <Switch
                              id="grounding"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <Label htmlFor="grounding">Bor</Label>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cabinetCondition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telekommunikatsiya shkafi atvoli</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Holat tanlang" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="yomon">Yomon</SelectItem>
                            <SelectItem value="o'rta">O'rta</SelectItem>
                            <SelectItem value="yaxshi">Yaxshi</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/serverxonalar")}
            >
              Bekor qilish
            </Button>
            <Button type="submit">
              Saqlash
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}