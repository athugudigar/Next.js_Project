import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Link from "next/link";
import {
  ShieldAlert, UserCheck, BarChart3, Bell,
  AlertTriangle, CheckCircle, Clock,
} from "lucide-react";
import { statsData, verificationHistory, recentFraudIncidents } from "@/data/mockData";

const modules = [
  {
    title: "Ad Fraud Detection",
    description: "Monitor IVT, bot traffic, click farms, and geo fraud across all campaigns.",
    href: "/ad-fraud", icon: ShieldAlert,
    stat: statsData.overallFraudRate.value, statLabel: "Fraud Rate",
    color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20",
  },
  {
    title: "Identity Verification",
    description: "Verify users via phone, ID document scanning, and face matching.",
    href: "/identity", icon: UserCheck,
    stat: "60%", statLabel: "Verified Users",
    color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20",
  },
  {
    title: "Reports",
    description: "Download fraud summaries, campaign performance, and identity trends.",
    href: "/reports", icon: BarChart3,
    stat: "24", statLabel: "Reports Ready",
    color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20",
  },
  {
    title: "Alerts",
    description: "Stay on top of critical fraud events and verification failures.",
    href: "/alerts", icon: Bell,
    stat: "2", statLabel: "Unread Alerts",
    color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20",
  },
];

const quickStats = [
  { label: "Total Traffic",   value: statsData.totalTraffic.value,   sub: "clicks this month"     },
  { label: "Valid Traffic",   value: statsData.validTraffic.value,   sub: "clean clicks"          },
  { label: "Invalid Traffic", value: statsData.invalidTraffic.value, sub: "blocked"               },
  { label: "Revenue Saved",   value: statsData.revenueSaved.value,   sub: "from fraud prevention" },
];

const recentAlerts = [
  { text: "High IVT spike on Campaign C_7812",    time: "11:32 AM", severity: "critical" },
  { text: "Bot activity detected — Source S_451", time: "10:15 AM", severity: "high"     },
  { text: "15 identity verification failures",    time: "09:48 AM", severity: "high"     },
];

export default function OverviewPage() {
  return (
    <DashboardLayout title="Overview">
      <div className="flex h-full flex-col gap-5">

        
        <div className="rounded-xl border border-primary/20 bg-primary/5 px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Welcome back, <span className="text-primary">Atharv Gudigar</span>
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Here&apos;s a snapshot of your fraud protection and identity verification platform.
              </p>
            </div>
            <div className="hidden shrink-0 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary sm:block">
              Oct 25, 2024
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {quickStats.map((stat) => (
            <div key={stat.label} className="stat-card flex flex-col gap-1.5 p-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </span>
              <span className="text-2xl font-bold tracking-tight text-foreground mono">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.sub}</span>
            </div>
          ))}
        </div>

        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Link
                key={mod.href}
                href={mod.href}
                className="stat-card group flex flex-col gap-4 p-4 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${mod.bg} border ${mod.border}`}>
                    <Icon className={`h-5 w-5 ${mod.color}`} />
                  </div>
                  <div className="text-right">
                    <p className={`text-xl font-bold mono ${mod.color}`}>{mod.stat}</p>
                    <p className="text-xs text-muted-foreground">{mod.statLabel}</p>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {mod.title}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    {mod.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-primary">Open dashboard →</span>
              </Link>
            );
          })}
        </div>

        
        <div className="grid flex-1 grid-cols-1 gap-4 xl:grid-cols-2 min-h-0 items-stretch">

         
          <div className="stat-card flex h-full flex-col gap-4 p-4">
            <div className="flex shrink-0 items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Recent Fraud Incidents
              </p>
              <Link href="/ad-fraud" className="text-xs font-medium text-primary hover:underline">
                View all →
              </Link>
            </div>
            <div className="flex flex-1 flex-col gap-2 min-h-0">
              {recentFraudIncidents.slice(0, 4).map((incident) => (
                <div
                  key={incident.id}
                  className="flex flex-1 items-center justify-between rounded-xl border border-border/50 bg-background/40 px-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                      <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {incident.fraudReason} — {incident.campaignId}
                      </p>
                      <p className="text-xs text-muted-foreground mono">
                        {incident.ipAddress} · {incident.location}
                      </p>
                    </div>
                  </div>
                  <span className="badge-blocked ml-3 shrink-0">{incident.action}</span>
                </div>
              ))}
            </div>
          </div>

          
          <div className="flex h-full flex-col gap-4 min-h-0">

            <div className="stat-card flex flex-1 flex-col gap-4 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Recent Alerts
                </p>
                <Link href="/alerts" className="text-xs font-medium text-primary hover:underline">
                  View all →
                </Link>
              </div>
              <div className="flex flex-1 flex-col gap-2 min-h-0">
                {recentAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="flex flex-1 items-center gap-3 rounded-xl border border-border/50 bg-background/40 px-4"
                  >
                    <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      alert.severity === "critical" ? "bg-red-500" : "bg-orange-500"
                    }`} />
                    <p className="flex-1 text-sm text-foreground truncate">{alert.text}</p>
                    <span className="shrink-0 text-xs text-muted-foreground mono">{alert.time}</span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="stat-card flex flex-1 flex-col gap-4 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Verification Summary
                </p>
                <Link href="/identity" className="text-xs font-medium text-primary hover:underline">
                  View all →
                </Link>
              </div>
              <div className="flex flex-1 flex-col gap-2 min-h-0">
                {verificationHistory.slice(0, 3).map((record) => (
                  <div
                    key={record.id}
                    className="flex flex-1 items-center justify-between rounded-xl border border-border/50 bg-background/40 px-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {record.status === "Verified" ? (
                        <CheckCircle className="h-4 w-4 shrink-0 text-green-400" />
                      ) : record.status === "Pending" ? (
                        <Clock className="h-4 w-4 shrink-0 text-yellow-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 shrink-0 text-red-400" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground mono truncate">
                          {record.userIdPhone}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.verificationType} · {record.date}
                        </p>
                      </div>
                    </div>
                    <span className={
                      record.status === "Verified" ? "badge-verified" :
                      record.status === "Pending"  ? "badge-pending"  : "badge-failed"
                    }>
                      {record.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
