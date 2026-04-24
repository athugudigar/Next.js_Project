"use client";

import { useRef, useState } from "react";
import { Smartphone, FileText, Upload, CheckCircle, XCircle, File } from "lucide-react";
import { cn } from "@/lib/utils";


type UploadState = "idle" | "uploading" | "scanning" | "done" | "error";


interface ScanItemProps {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  status?: string;
  statusColor?: string;
  progress?: number;
  children?: React.ReactNode;
}

function ScanItem({ icon: Icon, title, subtitle, status, statusColor, progress, children }: ScanItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-background/40 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {status && (
            <span className={cn("text-xs font-medium shrink-0", statusColor)}>
              {status}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
        )}
        {progress !== undefined && (
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Processing — {progress}% Complete</p>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}


export function IdentityScanning() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [fileName, setFileName]       = useState<string | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [errorMsg, setErrorMsg]       = useState<string | null>(null);


  const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
  const MAX_MB   = 5;

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    
    if (!ACCEPTED.includes(file.type)) {
      setErrorMsg("Invalid file type. Please upload a JPG, PNG, WEBP, or PDF.");
      setUploadState("error");
      return;
    }

   
    if (file.size > MAX_MB * 1024 * 1024) {
      setErrorMsg(`File too large. Maximum size is ${MAX_MB}MB.`);
      setUploadState("error");
      return;
    }

    setFileName(file.name);
    setErrorMsg(null);
    setUploadState("uploading");
    setScanProgress(0);

    
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 20;
      setScanProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setUploadState("scanning");
        setScanProgress(0);

       
        let scanProg = 0;
        const scanInterval = setInterval(() => {
          scanProg += 10;
          setScanProgress(scanProg);
          if (scanProg >= 100) {
            clearInterval(scanInterval);
            setUploadState("done");
          }
        }, 200);
      }
    }, 300);
  }

  function handleReset() {
    setUploadState("idle");
    setFileName(null);
    setScanProgress(0);
    setErrorMsg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }


  const uploadContent = () => {
    if (uploadState === "idle") {
      return (
        <div className="mt-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Upload className="h-4 w-4" />
            Upload ID Document
          </button>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Accepted: JPG, PNG, WEBP, PDF · Max {MAX_MB}MB
          </p>
        </div>
      );
    }

    if (uploadState === "uploading") {
      return (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs text-foreground mono truncate">{fileName}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground">Uploading — {scanProgress}%</p>
        </div>
      );
    }

    if (uploadState === "scanning") {
      return (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-primary shrink-0" />
            <span className="text-xs text-foreground mono truncate">{fileName}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-300 animate-pulse"
              style={{ width: `${scanProgress}%` }}
            />
          </div>
          <p className="text-xs text-yellow-400">Scanning document — {scanProgress}%</p>
        </div>
      );
    }

    if (uploadState === "done") {
      return (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400 shrink-0" />
            <span className="text-xs text-green-400 font-semibold">Document scanned successfully</span>
          </div>
          <p className="text-xs text-muted-foreground mono truncate">{fileName}</p>
          <button
            onClick={handleReset}
            className="text-xs text-primary hover:underline"
          >
            Upload a different document
          </button>
        </div>
      );
    }

    if (uploadState === "error") {
      return (
        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-400 shrink-0" />
            <span className="text-xs text-red-400 font-semibold">{errorMsg}</span>
          </div>
          <button
            onClick={handleReset}
            className="text-xs text-primary hover:underline"
          >
            Try again
          </button>
        </div>
      );
    }
  };

  return (
    <div className="stat-card flex h-full flex-col space-y-4">

      
      <ScanItem
        icon={Smartphone}
        title="Phone Number Verification"
        status="Active"
        statusColor="text-green-400"
      />

      
      <ScanItem
        icon={FileText}
        title="Document Scan (ID Card/Driver's License)"
        progress={uploadState === "done" ? 100 : uploadState === "scanning" ? scanProgress : 65}
      />

      
      <div className="rounded-xl border border-border bg-background/40 p-4">
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
            uploadState === "done"  ? "bg-green-500/10 text-green-400" :
            uploadState === "error" ? "bg-red-500/10 text-red-400"     :
                                      "bg-primary/10 text-primary"
          )}>
            <Upload className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Upload ID Document</p>
            <p className="text-xs text-muted-foreground">Document Scan (ID Card/Driver&apos;s License)</p>
            {uploadContent()}
          </div>
        </div>
      </div>

      
      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,.pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
