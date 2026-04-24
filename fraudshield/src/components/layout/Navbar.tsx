"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, User, Settings, LogOut, UserCircle, ShieldAlert, AlertTriangle, CheckCircle, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  title: string;
}



const initialNotifications = [
  {
    id: "1",
    title: "High IVT Spike Detected",
    desc: "Campaign C_7812 hit 42% IVT rate",
    time: "2 min ago",
    read: false,
    icon: ShieldAlert,
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
  {
    id: "2",
    title: "Bot Activity Flagged",
    desc: "Source S_451 flagged across 3 campaigns",
    time: "18 min ago",
    read: false,
    icon: AlertTriangle,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    id: "3",
    title: "Identity Scan Completed",
    desc: "120 users scanned, 14 flagged for review",
    time: "1 hr ago",
    read: true,
    icon: CheckCircle,
    color: "text-green-400",
    bg: "bg-green-500/10",
  },
  {
    id: "4",
    title: "Geo Fraud Detected",
    desc: "Restricted region traffic on Campaign C_4521",
    time: "3 hr ago",
    read: true,
    icon: ShieldAlert,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
  },
];



function useClickOutside(ref: React.RefObject<HTMLDivElement | null>, onClose: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, onClose]);
}



function NotificationsPanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  const dismiss = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-card shadow-xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">Notifications</p>
          {unreadCount > 0 && (
            <span className="rounded-full bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs text-primary hover:underline"
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <ul className="max-h-72 overflow-y-auto divide-y divide-border/50 scrollbar-thin">
        {notifications.length === 0 ? (
          <li className="flex flex-col items-center gap-2 py-8 text-center">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <p className="text-sm text-muted-foreground">All caught up!</p>
          </li>
        ) : (
          notifications.map((n) => {
            const Icon = n.icon;
            return (
              <li
                key={n.id}
                className={cn(
                  "group flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/5 cursor-pointer",
                  !n.read && "bg-primary/5"
                )}
                onClick={() => {
                  markRead(n.id);
                  router.push("/alerts");
                  onClose();
                }}
              >
                <div className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", n.bg)}>
                  <Icon className={cn("h-4 w-4", n.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-foreground truncate">{n.title}</p>
                    {!n.read && (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{n.desc}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground/60">{n.time}</p>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                  className="mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground transition-all"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            );
          })
        )}
      </ul>

      {/* Footer */}
      <div className="border-t border-border px-4 py-2.5">
        <button
          onClick={() => { router.push("/alerts"); onClose(); }}
          className="w-full text-center text-xs text-primary hover:underline"
        >
          View all alerts →
        </button>
      </div>
    </div>
  );
}



function ProfilePanel({ onClose }: { onClose: () => void }) {
  const router = useRouter();

  const menuItems = [
    {
      label: "My Profile",
      icon: UserCircle,
      onClick: () => { router.push("/settings"); onClose(); },
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: () => { router.push("/settings"); onClose(); },
    },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card shadow-xl z-50">

      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-sm">
            AG
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Atharv Gudigar</p>
            <p className="text-xs text-muted-foreground">Admin</p>
          </div>
        </div>
      </div>

      
      <ul className="py-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <button
                onClick={item.onClick}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      
      <div className="border-t border-border py-1">
        <button
          onClick={() => {
            onClose();
            alert("Sign out clicked — connect your auth provider here.");
          }}
          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
}



export function Navbar({ title }: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications] = useState(initialNotifications);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(notifRef, () => setShowNotifications(false));
  useClickOutside(profileRef, () => setShowProfile(false));

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 flex h-[60px] items-center justify-between border-b border-border bg-card/80 px-6 backdrop-blur-sm">
    
      <h1 className="text-base font-bold tracking-tight text-foreground">
        {title}
      </h1>

      <div className="flex items-center gap-2">

    
        <SearchBar />

       
        <ThemeToggle />

        
        <div ref={notifRef} className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowNotifications((v) => !v);
              setShowProfile(false);
            }}
            className={cn(
              "h-9 w-9 rounded-lg border border-border hover:bg-accent/10 relative",
              showNotifications && "bg-accent/10 border-primary/30"
            )}
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-1 ring-card" />
            )}
          </Button>
          {showNotifications && (
            <NotificationsPanel onClose={() => setShowNotifications(false)} />
          )}
        </div>

       
        <div ref={profileRef} className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setShowProfile((v) => !v);
              setShowNotifications(false);
            }}
            className={cn(
              "h-9 w-9 rounded-lg border border-border hover:bg-accent/10",
              showProfile && "bg-accent/10 border-primary/30"
            )}
          >
            <User className="h-4 w-4" />
          </Button>
          {showProfile && (
            <ProfilePanel onClose={() => setShowProfile(false)} />
          )}
        </div>

        <div className="hidden md:block text-right">
          <p className="text-xs font-semibold text-foreground">Admin</p>
          <p className="text-xs text-muted-foreground">Atharv Gudigar</p>
        </div>
      </div>
    </header>
  );
}
