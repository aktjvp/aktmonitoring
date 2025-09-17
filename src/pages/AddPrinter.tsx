import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Save, X, Printer } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const printerSchema = z.object({
  printerModel: z.string().min(1, "Printer modelini tanlash shart"),
  printerName: z.string().min(1, "Printer nomi kiritish shart"),
  serialNumber: z.string().min(1, "Serial raqam kiritish shart"),
  acquisitionDate: z.date().optional(),
  acquisitionType: z.enum(["organization", "personal"]).default("organization"),
  technicalCondition: z.boolean().default(true),
  connectionType: z.string().min(1, "Ulanish turini tanlash shart"),
  connectedComputer: z.string(),
  installedDepartment: z.string(),
  installationDate: z.date().optional(),
  user: z.string(),
});

const printerModels = [
  "HP",
  "Canon", 
  "Epson",
  "Brother",
  "Samsung",
  "Lexmark",
  "Xerox",
  "Ricoh",
  "Kyocera",
  "Dell",
  "Boshqa"
];

export default function AddPrinter() {
  const [acquisitionType, setAcquisitionType] = useState<"organization" | "personal">("organization");

  const form = useForm<z.infer<typeof printerSchema>>({
    resolver: zodResolver(printerSchema),
    defaultValues: {
      printerModel: "",
      printerName: "",
      serialNumber: "",
      acquisitionType: "organization",
      technicalCondition: true,
      connectionType: "",
      connectedComputer: "",
      installedDepartment: "",
      user: "",
    },
  });

  const onSubmit = (data: z.infer<typeof printerSchema>) => {
    console.log(data);
    toast({
      title: "Printer muvaffaqiyatli qo'shildi",
      description: "Yangi printer ma'lumotlari saqlandi.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Yangi printer qo'shish</h1>
          <p className="text-muted-foreground">
            Tashkilotga yangi printer ma'lumotlarini kiriting
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Printer ma'lumotlari */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Printer className="h-5 w-5" />
                Printer ma'lumotlari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="printerModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Printer modeli</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Printer modelini tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {printerModels.map((model) => (
                            <SelectItem key={model} value={model}>
                              {model}
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
                  name="printerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Printer nomi</FormLabel>
                      <FormControl>
                        <Input placeholder="Printer nomini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="serialNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Printer serial raqami</FormLabel>
                      <FormControl>
                        <Input placeholder="Serial raqamni kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="acquisitionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Egalik turi</FormLabel>
                        <Select onValueChange={(value) => {
                          field.onChange(value);
                          setAcquisitionType(value as "organization" | "personal");
                        }} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="organization">Tashkilot</SelectItem>
                            <SelectItem value="personal">Shaxsiy</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {acquisitionType === "organization" && (
                    <FormField
                      control={form.control}
                      name="acquisitionDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Tashkilot hisobiga olingan sana</FormLabel>
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
                                    format(field.value, "PPP")
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
                                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="technicalCondition"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Texnik holati</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          {field.value ? "Soz" : "Nosoz"}
                        </div>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tarmoq ma'lumotlari */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Tarmoq ma'lumotlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="connectionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kompyuterga ulanishi</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Ulanish turini tanlang" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="USB">USB</SelectItem>
                          <SelectItem value="Ethernet">Ethernet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="connectedComputer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>O'rnatilgan kompyuter</FormLabel>
                      <FormControl>
                        <Input placeholder="Kompyuter nomi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installedDepartment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>O'rnatilgan bo'lim yoki tuman</FormLabel>
                      <FormControl>
                        <Input placeholder="Bo'lim yoki tuman nomi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="installationDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>O'rnatilgan sana</FormLabel>
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
                                format(field.value, "PPP")
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
                            disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Foydalanuvchi */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Foydalanuvchi</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Printerdan foydalanuvchi xodim</FormLabel>
                    <FormControl>
                      <Input placeholder="Xodim ismi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-primary hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Saqlash
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link to="/printers">
                <X className="mr-2 h-4 w-4" />
                Bekor qilish
              </Link>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}