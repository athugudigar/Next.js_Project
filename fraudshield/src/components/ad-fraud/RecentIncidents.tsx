"use client";

import { recentFraudIncidents } from "@/data/mockData";

export function RecentIncidents() {
  return (
    <div className="stat-card flex h-full flex-col gap-4">
      <p className="section-title">Recent Fraud Incidents</p>
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border">
              {[
                "Timestamp",
                "Campaign ID",
                "Event ID",
                "Source ID",
                "Traffic Type",
                "Fraud Reason",
                "Location",
                "IP Address",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="pb-2 pr-4 text-left font-medium uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {recentFraudIncidents.map((incident) => (
              <tr key={incident.id} className="hover:bg-accent/5 transition-colors">
                <td className="py-2.5 pr-4 mono text-muted-foreground whitespace-nowrap">
                  {incident.timestamp}
                </td>
                <td className="py-2.5 pr-4 mono text-foreground">{incident.campaignId}</td>
                <td className="py-2.5 pr-4 mono text-foreground">{incident.eventId}</td>
                <td className="py-2.5 pr-4 text-foreground whitespace-nowrap">{incident.sourceId}</td>
                <td className="py-2.5 pr-4 text-foreground">{incident.trafficType}</td>
                <td className="py-2.5 pr-4">
                  <span className="rounded-md bg-red-500/10 px-1.5 py-0.5 text-xs font-medium text-red-400">
                    {incident.fraudReason}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-muted-foreground">{incident.location}</td>
                <td className="py-2.5 pr-4 mono text-muted-foreground">{incident.ipAddress}</td>
                <td className="py-2.5 pr-4">
                  <span className="badge-blocked">{incident.action}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
