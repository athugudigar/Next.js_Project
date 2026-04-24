"use client";

import { Phone, CheckCircle, FileText, User, Copy, RefreshCw } from "lucide-react";
import { scanResults } from "@/data/mockData";

export function ScanResults() {
  return (
    <div className="stat-card flex h-full flex-col gap-4">
      <p className="section-title">Scan Results</p>

      {/* Phone Number Scan */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Phone Number Scan
        </p>
        <div className="rounded-lg border border-border bg-background/40 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm mono font-medium text-foreground">
                {scanResults.phoneNumber}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Copy className="h-3.5 w-3.5" />
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-semibold text-green-400">Verified</span>
          </div>
        </div>
      </div>

      {/* ID Document Scan */}
      <div className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          ID Document Scan
        </p>
        <div className="rounded-lg border border-border bg-background/40 p-3 space-y-2">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 shrink-0 text-muted-foreground/50" />
            <div>
              <p className="text-xs text-muted-foreground">Analyzing Document...</p>
              <p className="text-xs text-muted-foreground">Extracting Details...</p>
            </div>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary animate-pulse"
              style={{ width: `${scanResults.idScanProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Face Match — compact, no stretching */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Face Match
          </p>
          <span className="text-xs font-semibold text-yellow-400 animate-pulse">
            {scanResults.faceMatchStatus}...
          </span>
        </div>
        <div className="rounded-lg border border-border bg-background/40 p-4">
          <div className="flex items-center justify-between">
            {/* Document photo */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-14 w-12 rounded-lg border border-border bg-border/50 flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground/30" />
              </div>
              <span className="text-[10px] text-muted-foreground">Document</span>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-0.5 px-2">
              <div className="h-px w-6 bg-border" />
              <span className="text-[9px] font-bold text-muted-foreground/50">VS</span>
              <div className="h-px w-6 bg-border" />
            </div>

            {/* Live photo */}
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-14 w-14 rounded-full border border-border bg-border/50 flex items-center justify-center">
                <User className="h-6 w-6 text-muted-foreground/30" />
              </div>
              <span className="text-[10px] text-muted-foreground">Live Photo</span>
            </div>

            {/* Status badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-semibold text-yellow-400 ring-1 ring-yellow-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-yellow-400 animate-pulse" />
              Comparing
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
