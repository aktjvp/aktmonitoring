import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Monitor,
  Users,
  Building2,
  BarChart3,
  Settings,
  Menu,
  X,
  Home,
  Smartphone,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Bosh sahifa",
    icon: Home,
    href: "/",
  },
  {
    title: "Xodimlar",
    icon: Users,
    href: "/employees",
  },
  {
    title: "Bo'limlar",
    icon: Building2,
    href: "/departments",
  },
  {
    title: "Kompyuterlar",
    icon: Monitor,
    href: "/computers",
  },
  {
    title: "Telefonlar",
    icon: Smartphone,
    href: "/phones",
  },
  {
    title: "Printerlar",
    icon: Printer,
    href: "/printers",
  },
  {
    title: "Hisobotlar",
    icon: BarChart3,
    href: "/reports",
  },
  {
    title: "Sozlamalar",
    icon: Settings,
    href: "/settings",
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "flex h-screen flex-col border-r bg-card transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!isCollapsed && (
          <h1 className="text-lg font-semibold text-primary">AKT Tizimi</h1>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <Menu className="h-4 w-4" />
          ) : (
            <X className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.href} to={item.href}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed ? "px-2" : "px-3",
                  isActive && "bg-accent text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && (
                  <span className="ml-3 text-sm">{item.title}</span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}