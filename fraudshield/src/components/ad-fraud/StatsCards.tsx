"use client";

import { TrendingDown, TrendingUp, MousePointer, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { statsData } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  label?: string;
  change?: string;
  trend?: "up" | "down";
  icon: React.ElementType;
  accent?: string;
}

function StatCard({ title, value, label, change, trend, icon: Icon, accent = "text-primary" }: StatCardProps) {
  return (
    <div className="stat-card flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {title}
        </span>
        <Icon className={cn("h-5 w-5", accent)} />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold tracking-tight text-foreground mono">
          {value}
        </span>
        {label && (
          <span className="mb-0.5 text-sm text-muted-foreground">{label}</span>
        )}
      </div>
      {change && (
        <div className="flex items-center gap-1">
          {trend === "down"
            ? <TrendingDown className="h-3.5 w-3.5 text-green-400" />
            : <TrendingUp className="h-3.5 w-3.5 text-red-400" />
          }
          <span className={cn("text-sm font-semibold", trend === "down" ? "text-green-400" : "text-red-400")}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <StatCard title="Overall Fraud Rate"   value={statsData.overallFraudRate.value} change={statsData.overallFraudRate.change} trend="down" icon={ShieldIcon}    accent="text-red-400"     />
      <StatCard title="Total Traffic"        value={statsData.totalTraffic.value}     label={statsData.totalTraffic.label}                                          icon={MousePointer}       accent="text-blue-400"    />
      <StatCard title="Valid Traffic"        value={statsData.validTraffic.value}                                                                                   icon={CheckCircle}        accent="text-green-400"   />
      <StatCard title="Invalid Traffic (IVT)" value={statsData.invalidTraffic.value} label={statsData.invalidTraffic.label}                                        icon={XCircle}            accent="text-red-400"     />
      <StatCard title="Revenue Saved"        value={statsData.revenueSaved.value}                                                                                   icon={DollarSign}         accent="text-emerald-400" />
    </div>
  );
}
