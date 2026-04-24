"use client";

import { useState } from "react";
import { X, Phone, FileText, User, CheckCircle, Clock, XCircle, AlertTriangle } from "lucide-react";
import { verificationHistory } from "@/data/mockData";
import { cn } from "@/lib/utils";



interface VerificationRecord {
  id: string;
  date: string;
  userIdPhone: string;
  verificationType: string;
  status: string;
}



function DetailsModal({
  record,
  onClose,
}: {
  record: VerificationRecord;
  onClose: () => void;
}) {
  const isVerified = record.status === "Verified";
  const isPending  = record.status === "Pending";
  const isFailed   = record.status === "Failed";

  const StatusIcon = isVerified ? CheckCircle : isPending ? Clock : XCircle;
  const statusColor = isVerified
    ? "text-green-400"
    : isPending
    ? "text-yellow-400"
    : "text-red-400";
  const statusBg = isVerified
    ? "bg-green-500/10 border-green-500/20"
    : isPending
    ? "bg-yellow-500/10 border-yellow-500/20"
    : "bg-red-500/10 border-red-500/20";

  const steps = [
    {
      icon: Phone,
      label: "Phone Verification",
      value: record.userIdPhone,
      done: true,
      detail: "OTP sent and confirmed",
    },
    {
      icon: FileText,
      label: "ID Document Scan",
      value: record.verificationType.includes("ID") ? "ID Card / Driver's License" : "Not required",
      done: record.verificationType.includes("ID"),
      detail: record.verificationType.includes("ID")
        ? isVerified ? "Document verified successfully" : isPending ? "Analysis in progress" : "Document could not be verified"
        : "Skipped for this verification type",
    },
    {
      icon: User,
      label: "Face Match",
      value: isVerified ? "Match confirmed" : isPending ? "Comparing..." : "Match failed",
      done: isVerified,
      detail: isVerified
        ? "Live photo matched document photo"
        : isPending
        ? "Awaiting face comparison result"
        : "Face did not match document photo",
    },
  ];

  return (
   
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
    
      <div
        className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Verification Details</h2>
            <p className="text-xs text-muted-foreground mono mt-0.5">Record ID: #{record.id.padStart(6, "0")}</p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        
        <div className="space-y-5 px-6 py-5">

         
          <div className={cn("flex items-center gap-3 rounded-xl border p-4", statusBg)}>
            <StatusIcon className={cn("h-6 w-6 shrink-0", statusColor)} />
            <div>
              <p className={cn("text-sm font-bold", statusColor)}>{record.status}</p>
              <p className="text-xs text-muted-foreground">
                {isVerified ? "Identity successfully verified" : isPending ? "Verification in progress" : "Verification failed — manual review required"}
              </p>
            </div>
          </div>

          
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Date",              value: record.date           },
              { label: "Phone / User ID",   value: record.userIdPhone    },
              { label: "Verification Type", value: record.verificationType },
              { label: "Status",            value: record.status         },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-background/40 px-3 py-2.5">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-0.5 text-sm font-semibold text-foreground mono">{item.value}</p>
              </div>
            ))}
          </div>

          
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Verification Steps
            </p>
            <div className="space-y-2">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-border bg-background/40 px-4 py-3"
                  >
                    <div className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                      step.done ? "bg-green-500/10 text-green-400" : "bg-border/50 text-muted-foreground"
                    )}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-foreground">{step.label}</p>
                        {step.done
                          ? <CheckCircle className="h-3.5 w-3.5 shrink-0 text-green-400" />
                          : isFailed
                          ? <XCircle className="h-3.5 w-3.5 shrink-0 text-red-400" />
                          : <Clock className="h-3.5 w-3.5 shrink-0 text-yellow-400" />
                        }
                      </div>
                      <p className="text-xs text-muted-foreground mono">{step.value}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          
          {isFailed && (
            <div className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">
              <AlertTriangle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-400">Manual Review Required</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This record has been flagged for manual review by an administrator.
                </p>
              </div>
            </div>
          )}
        </div>

        
        <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-foreground transition-colors"
          >
            Close
          </button>
          {isPending && (
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Approve Manually
            </button>
          )}
          {isFailed && (
            <button className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors">
              Flag for Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}



export function VerificationHistory() {
  const [selected, setSelected] = useState<VerificationRecord | null>(null);

  const statusClass = (status: string) => {
    switch (status) {
      case "Verified": return "badge-verified";
      case "Pending":  return "badge-pending";
      case "Failed":   return "badge-failed";
      default:         return "";
    }
  };

  return (
    <>
      <div className="stat-card flex h-full flex-col space-y-4">
        <p className="section-title">Verification History</p>
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                {["Date", "User ID/Phone", "Verification Type", "Status", "Actions"].map((h) => (
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
              {verificationHistory.map((record) => (
                <tr key={record.id} className="hover:bg-accent/5 transition-colors">
                  <td className="py-3 pr-4 text-muted-foreground mono">{record.date}</td>
                  <td className="py-3 pr-4 text-foreground mono">{record.userIdPhone}</td>
                  <td className="py-3 pr-4 text-foreground">{record.verificationType}</td>
                  <td className="py-3 pr-4">
                    <span className={statusClass(record.status)}>{record.status}</span>
                  </td>
                  <td className="py-3 pr-4">
                    <button
                      onClick={() => setSelected(record)}
                      className="rounded-md border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      {selected && (
        <DetailsModal record={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
