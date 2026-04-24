"use client";

import { Phone, CheckCircle, FileText, User, Copy, RefreshCw } from "lucide-react";
import { scanResults } from "@/data/mockData";

export function ScanResults() {
  return (
    <div className="stat-card flex h-full flex-col space-y-5">
      <p className="section-title">Scan Results</p>

   
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">Phone Number Scan</p>
        <div className="rounded-lg border border-border bg-background/40 p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm mono font-medium text-foreground">
                {scanResults.phoneNumber}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button className="text-muted-foreground hover:text-foreground">
                <Copy className="h-3.5 w-3.5" />
              </button>
              <button className="text-muted-foreground hover:text-foreground">
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
            <span className="text-xs font-medium text-green-400">Verified</span>
          </div>
        </div>
      </div>

     
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">ID Document Scan</p>
        <div className="rounded-lg border border-border bg-background/40 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <FileText className="h-8 w-8 text-muted-foreground/50" />
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

     
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-muted-foreground">Face Match</p>
          <span className="text-xs text-yellow-400 font-medium animate-pulse">
            {scanResults.faceMatchStatus}...
          </span>
        </div>
        <div className="rounded-lg border border-border bg-background/40 p-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-10 rounded border border-border bg-border/50 flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground/30" />
            </div>
            <div className="h-12 w-12 rounded-full border border-border bg-border/50 flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground/30" />
            </div>
            <div className="flex-1 text-xs text-muted-foreground">
              User's photo from document
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}