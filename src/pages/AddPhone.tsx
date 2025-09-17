import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Save, X, Phone } from "lucide-react";
import { Link } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
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

const phoneSchema = z.object({
  phoneName: z.string().min(1, "Telefon nomi kiritish shart"),
  macAddress: z.string().min(1, "MAC manzil kiritish shart"),
  acquisitionDate: z.date({
    required_error: "Olingan sanani tanlang",
  }),
  technicalCondition: z.boolean().default(true),
  internalPhoneNumber: z.string(),
  servicePhone: z.string(),
  ipAddress: z.string(),
  installedDepartment: z.string(),
  installationDate: z.date().optional(),
  workingStatus: z.boolean().default(true),
  user: z.string(),
});

export default function AddPhone() {
  const form = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneName: "",
      macAddress: "",
      technicalCondition: true,
      internalPhoneNumber: "",
      servicePhone: "",
      ipAddress: "",
      installedDepartment: "",
      workingStatus: true,
      user: "",
    },
  });

  const onSubmit = (data: z.infer<typeof phoneSchema>) => {
    console.log(data);
    toast({
      title: "Telefon muvaffaqiyatli qo'shildi",
      description: "Yangi telefon ma'lumotlari saqlandi.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Yangi telefon qo'shish</h1>
          <p className="text-muted-foreground">
            Tashkilotga yangi telefon ma'lumotlarini kiriting
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Telefon ma'lumotlari */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Telefon ma'lumotlari
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phoneName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefon nomi</FormLabel>
                      <FormControl>
                        <Input placeholder="Telefon nomini kiriting" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="macAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MAC manzili</FormLabel>
                      <FormControl>
                        <Input placeholder="00:1B:44:11:3A:B7" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

          {/* Telefon raqamlari */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Telefon raqamlari</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="internalPhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ichki telefon raqami</FormLabel>
                      <FormControl>
                        <Input placeholder="1234" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servicePhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xizmat telefoni</FormLabel>
                      <FormControl>
                        <Input placeholder="+998 90 123 45 67" {...field} />
                      </FormControl>
                      <FormMessage />
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
                  name="ipAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>IP manzili</FormLabel>
                      <FormControl>
                        <Input placeholder="192.168.1.100" {...field} />
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
                      <FormLabel>O'rnatilgan bo'limi</FormLabel>
                      <FormControl>
                        <Input placeholder="IT Bo'limi" {...field} />
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

                <FormField
                  control={form.control}
                  name="workingStatus"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Ishchi holati</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          {field.value ? "Faol" : "Tarmoqdan uzilgan"}
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
                    <FormLabel>Telefondan foydalanuvchi xodim</FormLabel>
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
              <Link to="/phones">
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