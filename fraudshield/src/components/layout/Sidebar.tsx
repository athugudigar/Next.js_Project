"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, ShieldAlert, UserCheck,
  BarChart3, Bell, Settings,
  ChevronLeft, ChevronRight, Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview",  href: "/",         icon: LayoutDashboard },
  { label: "Ad Fraud",  href: "/ad-fraud",  icon: ShieldAlert     },
  { label: "Identity",  href: "/identity",  icon: UserCheck       },
  { label: "Reports",   href: "/reports",   icon: BarChart3       },
  { label: "Alerts",    href: "/alerts",    icon: Bell            },
  { label: "Settings",  href: "/settings",  icon: Settings        },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "relative flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-[220px]"
    )}>

      
      <div className="flex h-[60px] items-center border-b border-border px-4 gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 ring-1 ring-primary/30">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        {!collapsed && (
          <span className="font-bold text-base tracking-wide text-foreground">
            FRAUD<span className="text-primary">SHIELD</span>
          </span>
        )}
      </div>

     
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                "text-muted-foreground hover:bg-accent/10 hover:text-foreground",
                isActive && "bg-primary/10 text-primary border border-primary/20",
                collapsed && "justify-center px-2"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span className="text-sm">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

     
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm hover:text-foreground transition-colors"
      >
        {collapsed
          ? <ChevronRight className="h-3 w-3" />
          : <ChevronLeft className="h-3 w-3" />
        }
      </button>
    </aside>
  );
}
