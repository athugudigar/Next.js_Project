import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BarChart3, Download, TrendingDown, TrendingUp, FileText } from "lucide-react";
import { statsData, fraudTrendData, fraudDistributionData, topFraudSources } from "@/data/mockData";

const reports = [
  {
    id: "1",
    name: "Monthly Fraud Summary — October 2024",
    type: "Ad Fraud",
    generated: "Oct 25, 2024",
    status: "Ready",
  },
  {
    id: "2",
    name: "Identity Verification Report — Q3 2024",
    type: "Identity",
    generated: "Oct 20, 2024",
    status: "Ready",
  },
  {
    id: "3",
    name: "Campaign Performance vs IVT — Oct 2024",
    type: "Ad Fraud",
    generated: "Oct 18, 2024",
    status: "Ready",
  },
  {
    id: "4",
    name: "User Verification Trends — Oct 2024",
    type: "Identity",
    generated: "Oct 15, 2024",
    status: "Processing",
  },
  {
    id: "5",
    name: "Geo Fraud Hotspot Analysis — Oct 2024",
    type: "Ad Fraud",
    generated: "Oct 10, 2024",
    status: "Ready",
  },
];

const summaryStats = [
  { label: "Total Reports", value: "24", icon: FileText, color: "text-blue-400" },
  { label: "Fraud Rate (Oct)", value: statsData.overallFraudRate.value, icon: TrendingDown, color: "text-red-400" },
  { label: "Revenue Saved", value: statsData.revenueSaved.value, icon: TrendingUp, color: "text-emerald-400" },
  { label: "Invalid Traffic", value: statsData.invalidTraffic.value, icon: BarChart3, color: "text-yellow-400" },
];

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reports">
      <div className="space-y-6">
        
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summaryStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="stat-card flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </span>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <span className="text-2xl font-bold tracking-tight text-foreground mono">
                  {stat.value}
                </span>
              </div>
            );
          })}
        </div>

        
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <div className="stat-card space-y-4">
            <p className="section-title">Fraud by Type — October 2024</p>
            <div className="space-y-3">
              {fraudDistributionData.map((item) => (
                <div key={item.type} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.type}</span>
                    <span className="font-medium text-foreground mono">{item.value}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full bg-primary/80"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stat-card space-y-4">
            <p className="section-title">Top Fraud Sources — October 2024</p>
            <div className="space-y-3">
              {topFraudSources.map((source) => (
                <div key={source.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-muted-foreground">{source.name}</span>
                    </div>
                    <span className="font-medium text-foreground mono">{source.value}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${source.value}%`, backgroundColor: source.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="stat-card space-y-4">
          <div className="flex items-center justify-between">
            <p className="section-title mb-0">Generated Reports</p>
            <button className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors">
              <Download className="h-3.5 w-3.5" />
              Export All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  {["Report Name", "Type", "Generated", "Status", "Actions"].map((h) => (
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
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-accent/5 transition-colors">
                    <td className="py-3 pr-4 font-medium text-foreground">{report.name}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          report.type === "Ad Fraud"
                            ? "bg-red-500/10 text-red-400 ring-red-500/20"
                            : "bg-blue-500/10 text-blue-400 ring-blue-500/20"
                        }`}
                      >
                        {report.type}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-muted-foreground mono">{report.generated}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          report.status === "Ready"
                            ? "bg-green-500/10 text-green-400 ring-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20"
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {report.status === "Ready" ? (
                        <button className="flex items-center gap-1 text-primary hover:underline">
                          <Download className="h-3 w-3" />
                          Download
                        </button>
                      ) : (
                        <span className="text-muted-foreground">Processing...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
