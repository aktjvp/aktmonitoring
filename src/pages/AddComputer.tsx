import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Save, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Kompyuter ma'lumotlari
  name: z.string().min(1, "Kompyuter nomi kiritilishi shart"),
  model: z.string().min(1, "Kompyuter modeli kiritilishi shart"),
  type: z.string().min(1, "Kompyuter turi tanlanishi shart"),
  macAddress: z.string().min(1, "MAC adressi kiritilishi shart"),
  purchaseDate: z.date({
    required_error: "Tashkilot hisobiga olingan sana kiritilishi shart",
  }),
  
  // Texnik xususiyatlari
  monitorSize: z.string().min(1, "Monitor o'lchami tanlanishi shart"),
  processor: z.string().min(1, "Protsessor ma'lumoti kiritilishi shart"),
  ram: z.string().min(1, "Tezkor xotira ma'lumoti kiritilishi shart"),
  upsStatus: z.string().min(1, "UPS holati tanlanishi shart"),
  
  // Xotira qurilmalari
  hasSsd: z.string().min(1, "SSD mavjudligi ko'rsatilishi shart"),
  ssdCapacity: z.string().optional(),
  ssdSerial: z.string().optional(),
  hasHdd: z.string().min(1, "HDD mavjudligi ko'rsatilishi shart"),
  hddCapacity: z.string().optional(),
  hddSerial: z.string().optional(),
  
  // Tizim va dasturlar
  isDomainJoined: z.boolean().default(false),
  antivirusName: z.string().optional(),
  antivirusUpdateDate: z.date().optional(),
  hasInternet: z.boolean().default(false),
  browserModel: z.string().optional(),
  
  // Xavfsizlik
  hasBiosPassword: z.boolean().default(false),
  hasUserPassword: z.boolean().default(false),
  hasSeal: z.string().min(1, "Plomba mavjudligi ko'rsatilishi shart"),
  sealNumber: z.string().optional(),
  sealSerial: z.string().optional(),
  usbPortStatus: z.string().min(1, "USB port holati tanlanishi shart"),
  
  // Foydalanuvchi
  user: z.string().min(1, "Foydalanuvchi ma'lumoti kiritilishi shart"),
});

type FormData = z.infer<typeof formSchema>;

const AddComputer = () => {
  const navigate = useNavigate();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isDomainJoined: false,
      hasInternet: false,
      hasBiosPassword: false,
      hasUserPassword: false,
    },
  });

  const watchHasSsd = form.watch("hasSsd");
  const watchHasHdd = form.watch("hasHdd");
  const watchHasSeal = form.watch("hasSeal");

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast({
      title: "Kompyuter muvaffaqiyatli qo'shildi",
      description: "Yangi kompyuter ma'lumotlari saqlandi.",
    });
    navigate("/computers");
  };

  const monitorSizes = [
    "11.6\"", "12.5\"", "13.3\"", "14.0\"", "15.6\"", "16.0\"", "17.0\"", 
    "17.3\"", "18.5\"", "19.0\"", "20.0\"", "21.0\"", "21.5\"", "22.0\"", 
    "23.8\"", "24.0\"", "27.0\"", "32.0\"", "34.0\" (Ultrawide)", 
    "38.0\" (Ultrawide)", "49.0\" (Ultrawide)", "Boshqa"
  ];

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/computers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Yangi kompyuter qo'shish</h1>
          <p className="text-muted-foreground">Kompyuter ma'lumotlarini to'ldiring</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Kompyuter ma'lumotlari */}
          <Card>
            <CardHeader>
              <CardTitle>Kompyuter ma'lumotlari</CardTitle>
              <CardDescription>Asosiy kompyuter ma'lumotlari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kompyuter nomi</FormLabel>
                      <FormControl>
                        <Input placeholder="Kompyuter nomini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kompyuter modeli</FormLabel>
                      <FormControl>
                        <Input placeholder="Model nomini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kompyuter turi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Kompyuter turini tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="laptop">Laptop</SelectItem>
                          <SelectItem value="desktop">Desktop</SelectItem>
                          <SelectItem value="monoblok">Monoblok</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="macAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MAC adressi</FormLabel>
                      <FormControl>
                        <Input placeholder="MAC adresini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="purchaseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tashkilot hisobiga olingan sana</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd.MM.yyyy")
                            ) : (
                              <span>Sanani tanlang</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Texnik xususiyatlari */}
          <Card>
            <CardHeader>
              <CardTitle>Texnik xususiyatlari</CardTitle>
              <CardDescription>Kompyuterning texnik parametrlari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="monitorSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monitor o'lchami</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Monitor o'lchamini tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {monitorSizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="processor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protsessor</FormLabel>
                      <FormControl>
                        <Input placeholder="Protsessor nomini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="ram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tezkor xotira (RAM)</FormLabel>
                      <FormControl>
                        <Input placeholder="RAM hajmini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="upsStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UPS mavjudligi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="UPS holatini tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="available">Bor</SelectItem>
                          <SelectItem value="broken">Bor nosoz</SelectItem>
                          <SelectItem value="none">Yo'q</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Xotira qurilmalari */}
          <Card>
            <CardHeader>
              <CardTitle>Xotira qurilmalari</CardTitle>
              <CardDescription>SSD va HDD ma'lumotlari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* SSD */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasSsd"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>SSD qurilmasi</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="ssd-yes" />
                            <label htmlFor="ssd-yes">Bor</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="ssd-no" />
                            <label htmlFor="ssd-no">Yo'q</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {watchHasSsd === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                    <FormField
                      control={form.control}
                      name="ssdCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SSD hajmi</FormLabel>
                          <FormControl>
                            <Input placeholder="Hajmini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="ssdSerial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>SSD seriya raqami</FormLabel>
                          <FormControl>
                            <Input placeholder="Seriya raqamini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              
              <Separator />
              
              {/* HDD */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasHdd"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>HDD qurilmasi</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="hdd-yes" />
                            <label htmlFor="hdd-yes">Bor</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="hdd-no" />
                            <label htmlFor="hdd-no">Yo'q</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {watchHasHdd === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                    <FormField
                      control={form.control}
                      name="hddCapacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HDD hajmi</FormLabel>
                          <FormControl>
                            <Input placeholder="Hajmini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hddSerial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>HDD seriya raqami</FormLabel>
                          <FormControl>
                            <Input placeholder="Seriya raqamini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tizim va dasturlar */}
          <Card>
            <CardHeader>
              <CardTitle>Tizim va dasturlar</CardTitle>
              <CardDescription>Dasturiy ta'minot ma'lumotlari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="isDomainJoined"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Domen qo'shilganligi</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hasInternet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Internetga ulanganligi</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="antivirusName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Antivirus dasturi</FormLabel>
                      <FormControl>
                        <Input placeholder="Antivirus nomini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="antivirusUpdateDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Baza yangilangan sanasi</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd.MM.yyyy")
                              ) : (
                                <span>Sanani tanlang</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="browserModel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Browser modeli</FormLabel>
                    <FormControl>
                      <Input placeholder="Browser nomini kiriting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Xavfsizlik */}
          <Card>
            <CardHeader>
              <CardTitle>Xavfsizlik</CardTitle>
              <CardDescription>Xavfsizlik sozlamalari</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="hasBiosPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">BIOS paroli</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hasUserPassword"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">User paroli</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="hasSeal"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Plomba mavjudligi</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="seal-yes" />
                            <label htmlFor="seal-yes">Bor</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="seal-no" />
                            <label htmlFor="seal-no">Yo'q</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {watchHasSeal === "yes" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                    <FormField
                      control={form.control}
                      name="sealNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plomba raqami</FormLabel>
                          <FormControl>
                            <Input placeholder="Plomba raqamini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sealSerial"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Plomba seriya raqami</FormLabel>
                          <FormControl>
                            <Input placeholder="Seriya raqamini kiriting" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="usbPortStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>USB port holati</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="USB port holatini tanlang" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="open">Ochiq</SelectItem>
                        <SelectItem value="closed">Yopiq</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Foydalanuvchi */}
          <Card>
            <CardHeader>
              <CardTitle>Foydalanuvchi</CardTitle>
              <CardDescription>Kompyuterdan foydalanuvchi ma'lumotlari</CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kompyuterdan foydalanuvchi</FormLabel>
                    <FormControl>
                      <Input placeholder="Foydalanuvchi nomini kiriting" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Form tugmalari */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate("/computers")}>
              <X className="h-4 w-4 mr-2" />
              Bekor qilish
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Saqlash
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddComputer;