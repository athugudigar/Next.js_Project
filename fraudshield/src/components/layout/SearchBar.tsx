"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldAlert, UserCheck, FileText, Bell, Settings, LayoutDashboard, X } from "lucide-react";
import { recentFraudIncidents, verificationHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";



const pages = [
  { label: "Overview",               href: "/",          icon: LayoutDashboard, category: "Page" },
  { label: "Ad Fraud Detection",     href: "/ad-fraud",  icon: ShieldAlert,     category: "Page" },
  { label: "Identity Verification",  href: "/identity",  icon: UserCheck,       category: "Page" },
  { label: "Reports",                href: "/reports",   icon: FileText,        category: "Page" },
  { label: "Alerts",                 href: "/alerts",    icon: Bell,            category: "Page" },
  { label: "Settings",               href: "/settings",  icon: Settings,        category: "Page" },
];

const incidents = recentFraudIncidents.map((i) => ({
  label: `${i.campaignId} — ${i.fraudReason}`,
  sub: `${i.ipAddress} · ${i.location} · ${i.timestamp}`,
  href: "/ad-fraud",
  icon: ShieldAlert,
  category: "Fraud Incident",
}));

const verifications = verificationHistory.map((v) => ({
  label: v.userIdPhone,
  sub: `${v.verificationType} · ${v.status} · ${v.date}`,
  href: "/identity",
  icon: UserCheck,
  category: "Verification",
}));

const allItems = [...pages, ...incidents, ...verifications];



const categoryColor: Record<string, string> = {
  Page:             "bg-blue-500/10 text-blue-400",
  "Fraud Incident": "bg-red-500/10 text-red-400",
  Verification:     "bg-green-500/10 text-green-400",
};



export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);


  const results = query.trim().length === 0
    ? []
    : allItems.filter((item) => {
        const q = query.toLowerCase();
        return (
          item.label.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          ("sub" in item && (item as any).sub.toLowerCase().includes(q))
        );
      }).slice(0, 8);

 
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);


  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigate(results[activeIndex].href);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  function navigate(href: string) {
    router.push(href);
    setQuery("");
    setOpen(false);
    inputRef.current?.blur();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setOpen(true);
  }

  function clearSearch() {
    setQuery("");
    setOpen(false);
    inputRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative hidden md:block">
     
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search pages, incidents, verifications..."
          className="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && query.trim().length > 0 && (
        <div className="absolute top-full left-0 z-50 mt-2 w-96 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          {results.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-8 text-center">
              <Search className="h-6 w-6 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No results for <span className="font-medium text-foreground">&quot;{query}&quot;</span>
              </p>
              <p className="text-xs text-muted-foreground/60">
                Try searching for a page, campaign ID, or IP address
              </p>
            </div>
          ) : (
            <ul className="max-h-80 overflow-y-auto py-1 scrollbar-thin">
              {results.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === activeIndex;
                return (
                  <li key={index}>
                    <button
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => navigate(item.href)}
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-2.5 text-left transition-colors",
                        isActive ? "bg-primary/10" : "hover:bg-accent/5"
                      )}
                    >
                    
                      <div className={cn(
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg",
                        item.category === "Fraud Incident" ? "bg-red-500/10 text-red-400" :
                        item.category === "Verification"   ? "bg-green-500/10 text-green-400" :
                                                             "bg-primary/10 text-primary"
                      )}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>

                    
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.label}
                        </p>
                        {"sub" in item && (
                          <p className="text-xs text-muted-foreground truncate mono">
                            {(item as any).sub}
                          </p>
                        )}
                      </div>

                     
                      <span className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                        categoryColor[item.category]
                      )}>
                        {item.category}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

         
          <div className="border-t border-border px-4 py-2 flex items-center gap-3 text-xs text-muted-foreground">
            <span><kbd className="rounded border border-border px-1 py-0.5 font-mono text-xs">↑↓</kbd> navigate</span>
            <span><kbd className="rounded border border-border px-1 py-0.5 font-mono text-xs">↵</kbd> open</span>
            <span><kbd className="rounded border border-border px-1 py-0.5 font-mono text-xs">Esc</kbd> close</span>
          </div>
        </div>
      )}
    </div>
  );
}
