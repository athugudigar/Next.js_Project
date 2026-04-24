"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AlertTriangle, ShieldAlert, UserX, Globe, CheckCircle, Clock, XCircle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const alerts = [
  {
    id: "1",
    title: "High IVT Spike Detected",
    description: "Campaign C_7812 experienced a 42% IVT rate in the last hour — 3× above threshold.",
    severity: "critical",
    category: "Ad Fraud",
    timestamp: "Oct 25, 2024 — 11:32 AM",
    status: "unread",
    icon: ShieldAlert,
  },
  {
    id: "2",
    title: "Suspicious Bot Activity",
    description: "Source S_451 (DSP X) flagged for bot-like click patterns across 3 campaigns.",
    severity: "high",
    category: "Ad Fraud",
    timestamp: "Oct 25, 2024 — 10:15 AM",
    status: "unread",
    icon: AlertTriangle,
  },
  {
    id: "3",
    title: "Identity Verification Failure Surge",
    description: "15 consecutive verification failures from the same IP range in the last 30 minutes.",
    severity: "high",
    category: "Identity",
    timestamp: "Oct 25, 2024 — 09:48 AM",
    status: "read",
    icon: UserX,
  },
  {
    id: "4",
    title: "Geo Fraud — Unusual Traffic from Restricted Region",
    description: "Traffic originating from a restricted region detected on Campaign C_4521.",
    severity: "medium",
    category: "Ad Fraud",
    timestamp: "Oct 24, 2024 — 06:20 PM",
    status: "read",
    icon: Globe,
  },
  {
    id: "5",
    title: "New Fraud Source Identified",
    description: "Source S_892 added to the blocklist after exceeding the fraud threshold.",
    severity: "medium",
    category: "Ad Fraud",
    timestamp: "Oct 24, 2024 — 03:05 PM",
    status: "read",
    icon: ShieldAlert,
  },
  {
    id: "6",
    title: "Identity Scan Completed",
    description: "Batch identity scan for 120 users completed. 14 flagged for manual review.",
    severity: "low",
    category: "Identity",
    timestamp: "Oct 24, 2024 — 01:00 PM",
    status: "read",
    icon: CheckCircle,
  },
];

const severityConfig: Record<string, { label: string; classes: string; dot: string }> = {
  critical: {
    label: "Critical",
    classes: "bg-red-500/10 text-red-400 ring-red-500/20",
    dot: "bg-red-500",
  },
  high: {
    label: "High",
    classes: "bg-orange-500/10 text-orange-400 ring-orange-500/20",
    dot: "bg-orange-500",
  },
  medium: {
    label: "Medium",
    classes: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",
    dot: "bg-yellow-500",
  },
  low: {
    label: "Low",
    classes: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    dot: "bg-blue-500",
  },
};

type FilterType = "all" | "unread" | "Ad Fraud" | "Identity";

export default function AlertsPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [alertList, setAlertList] = useState(alerts);

  const filtered = alertList.filter((a) => {
    if (filter === "unread") return a.status === "unread";
    if (filter === "Ad Fraud" || filter === "Identity") return a.category === filter;
    return true;
  });

  const unreadCount = alertList.filter((a) => a.status === "unread").length;

  const markAllRead = () =>
    setAlertList((prev) => prev.map((a) => ({ ...a, status: "read" })));

  const markRead = (id: string) =>
    setAlertList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "read" } : a))
    );

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "unread", label: `Unread (${unreadCount})` },
    { key: "Ad Fraud", label: "Ad Fraud" },
    { key: "Identity", label: "Identity" },
  ];

  return (
    <DashboardLayout title="Alerts">
      <div className="space-y-6">
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  filter === tab.key
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Alert list */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="stat-card flex flex-col items-center justify-center gap-3 py-12 text-center">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <p className="text-sm font-medium text-foreground">No alerts here</p>
              <p className="text-xs text-muted-foreground">You&apos;re all caught up.</p>
            </div>
          )}
          {filtered.map((alert) => {
            const Icon = alert.icon;
            const sev = severityConfig[alert.severity];
            return (
              <div
                key={alert.id}
                className={cn(
                  "stat-card flex items-start gap-4 transition-all",
                  alert.status === "unread" && "border-primary/30 bg-primary/5"
                )}
              >
                <div
                  className={cn(
                    "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                    alert.severity === "critical" && "bg-red-500/10 text-red-400",
                    alert.severity === "high" && "bg-orange-500/10 text-orange-400",
                    alert.severity === "medium" && "bg-yellow-500/10 text-yellow-400",
                    alert.severity === "low" && "bg-blue-500/10 text-blue-400"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
                        sev.classes
                      )}
                    >
                      {sev.label}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {alert.category}
                    </span>
                    {alert.status === "unread" && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground mono">
                      <Clock className="h-3 w-3" />
                      {alert.timestamp}
                    </span>
                    {alert.status === "unread" && (
                      <button
                        onClick={() => markRead(alert.id)}
                        className="text-xs text-primary hover:underline"
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
