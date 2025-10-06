-- Updated_at avtomatik yangilash funksiyasi
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Rol turi yaratish
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Foydalanuvchi profillari jadvali
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Foydalanuvchi rollari jadvali
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Bo'limlar jadvali
CREATE TABLE public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  head_name TEXT,
  phone TEXT,
  email TEXT,
  floor INTEGER,
  room_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Xodimlar jadvali
CREATE TABLE public.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  phone TEXT,
  email TEXT,
  internal_phone TEXT,
  hire_date DATE,
  birth_date DATE,
  photo_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'vacation')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Kompyuterlar jadvali
CREATE TABLE public.computers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_number TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  processor TEXT,
  ram INTEGER,
  storage INTEGER,
  storage_type TEXT CHECK (storage_type IN ('HDD', 'SSD', 'NVMe')),
  os TEXT,
  ip_address TEXT,
  mac_address TEXT,
  employee_id UUID REFERENCES public.employees(id) ON DELETE SET NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  purchase_date DATE,
  warranty_end_date DATE,
  status TEXT DEFAULT 'working' CHECK (status IN ('working', 'repair', 'retired')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Telefonlar jadvali
CREATE TABLE public.phones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_number TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  phone_number TEXT,
  imei TEXT,
  employee_id UUID REFERENCES public.employees(id) ON DELETE SET NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  purchase_date DATE,
  warranty_end_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'repair', 'lost')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Printerlar jadvali
CREATE TABLE public.printers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inventory_number TEXT UNIQUE NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  printer_type TEXT CHECK (printer_type IN ('laser', 'inkjet', 'thermal', 'matrix')),
  ip_address TEXT,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  location TEXT,
  purchase_date DATE,
  warranty_end_date DATE,
  status TEXT DEFAULT 'working' CHECK (status IN ('working', 'repair', 'retired')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Turniketlar jadvali
CREATE TABLE public.turnstiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  model TEXT,
  ip_address TEXT,
  installation_date DATE,
  last_maintenance_date DATE,
  status TEXT DEFAULT 'working' CHECK (status IN ('working', 'repair', 'offline')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- RLS yoqish
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.computers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.phones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.printers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.turnstiles ENABLE ROW LEVEL SECURITY;

-- Rol tekshirish funksiyasi
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Profiles RLS policies
CREATE POLICY "Foydalanuvchilar o'z profilini ko'rishlari mumkin"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Foydalanuvchilar o'z profilini yangilashlari mumkin"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Yangi profil yaratish"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User roles RLS policies
CREATE POLICY "Adminlar barcha rollarni ko'rishlari mumkin"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar rol qo'shishlari mumkin"
  ON public.user_roles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar rollarni o'chirishlari mumkin"
  ON public.user_roles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Departments RLS policies
CREATE POLICY "Hamma autentifikatsiya qilingan foydalanuvchilar bo'limlarni ko'rishlari mumkin"
  ON public.departments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Adminlar bo'lim qo'shishlari mumkin"
  ON public.departments FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar bo'limlarni yangilashlari mumkin"
  ON public.departments FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar bo'limlarni o'chirishlari mumkin"
  ON public.departments FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Employees RLS policies
CREATE POLICY "Hamma autentifikatsiya qilingan foydalanuvchilar xodimlarni ko'rishlari mumkin"
  ON public.employees FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Adminlar xodim qo'shishlari mumkin"
  ON public.employees FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar xodimlarni yangilashlari mumkin"
  ON public.employees FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar xodimlarni o'chirishlari mumkin"
  ON public.employees FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Computers RLS policies
CREATE POLICY "Hamma autentifikatsiya qilingan foydalanuvchilar kompyuterlarni ko'rishlari mumkin"
  ON public.computers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Adminlar kompyuter qo'shishlari mumkin"
  ON public.computers FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar kompyuterlarni yangilashlari mumkin"
  ON public.computers FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar kompyuterlarni o'chirishlari mumkin"
  ON public.computers FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Phones RLS policies
CREATE POLICY "Hamma autentifikatsiya qilingan foydalanuvchilar telefonlarni ko'rishlari mumkin"
  ON public.phones FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Adminlar telefon qo'shishlari mumkin"
  ON public.phones FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar telefonlarni yangilashlari mumkin"
  ON public.phones FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar telefonlarni o'chirishlari mumkin"
  ON public.phones FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Printers RLS policies
CREATE POLICY "Hamma autentifikatsiya qilingan foydalanuvchilar printerlarni ko'rishlari mumkin"
  ON public.printers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Adminlar printer qo'shishlari mumkin"
  ON public.printers FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar printerlarni yangilashlari mumkin"
  ON public.printers FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar printerlarni o'chirishlari mumkin"
  ON public.printers FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Turnstiles RLS policies
CREATE POLICY "Hamma autentifikatsiya qilingan foydalanuvchilar turniketlarni ko'rishlari mumkin"
  ON public.turnstiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Adminlar turniket qo'shishlari mumkin"
  ON public.turnstiles FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar turniketlarni yangilashlari mumkin"
  ON public.turnstiles FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Adminlar turniketlarni o'chirishlari mumkin"
  ON public.turnstiles FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at avtomatik yangilash triggerlari
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON public.departments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employees_updated_at
  BEFORE UPDATE ON public.employees
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_computers_updated_at
  BEFORE UPDATE ON public.computers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_phones_updated_at
  BEFORE UPDATE ON public.phones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_printers_updated_at
  BEFORE UPDATE ON public.printers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_turnstiles_updated_at
  BEFORE UPDATE ON public.turnstiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Yangi foydalanuvchi ro'yxatdan o'tganda profil yaratish
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', new.email));
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();