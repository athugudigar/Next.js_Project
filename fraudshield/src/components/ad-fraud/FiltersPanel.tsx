"use client";

import { useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { campaigns, trafficSources, fraudTypes, regions } from "@/data/mockData";
import { cn } from "@/lib/utils";

function FilterGroup({
  label, options, selected, onSelect,
}: {
  label: string; options: string[]; selected: string; onSelect: (v: string) => void;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-1">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-1.5 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
      >
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open ? "rotate-0" : "-rotate-90")} />
      </button>
      {open && (
        <div className="space-y-0.5 pl-1">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className={cn(
                "w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent/10",
                selected === opt ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function FiltersPanel() {
  const [filters, setFilters] = useState({
    campaign: "All Campaigns",
    trafficSource: "All",
    fraudType: "All",
    region: "Global",
  });
  const setFilter = (key: keyof typeof filters) => (value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="stat-card flex h-full flex-col gap-4 overflow-hidden">
      
      <div className="flex shrink-0 items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Filters</p>
        <button
          onClick={() => setFilters({ campaign: "All Campaigns", trafficSource: "All", fraudType: "All", region: "Global" })}
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Reset
        </button>
      </div>

      
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto scrollbar-thin pr-1">

        
        <div className="space-y-1.5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date Range</p>
          <button className="flex w-full items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:border-primary/30 transition-colors">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>Oct 1 – Oct 25, 2024</span>
          </button>
        </div>

        <FilterGroup label="Campaigns"       options={campaigns}      selected={filters.campaign}      onSelect={setFilter("campaign")}      />
        <FilterGroup label="Traffic Sources" options={trafficSources} selected={filters.trafficSource} onSelect={setFilter("trafficSource")} />
        <FilterGroup label="Fraud Types"     options={fraudTypes}     selected={filters.fraudType}     onSelect={setFilter("fraudType")}     />
        <FilterGroup label="Region"          options={regions}        selected={filters.region}        onSelect={setFilter("region")}        />

      </div>
    </div>
  );
}
