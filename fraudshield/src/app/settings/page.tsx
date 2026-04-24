"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { Save, Shield, Bell, User, Lock, Globe, Sliders } from "lucide-react";
import { cn } from "@/lib/utils";

type SettingsSection = "general" | "fraud" | "identity" | "notifications" | "security";

const sections: { key: SettingsSection; label: string; icon: React.ElementType }[] = [
  { key: "general", label: "General", icon: Sliders },
  { key: "fraud", label: "Fraud Detection", icon: Shield },
  { key: "identity", label: "Identity Verification", icon: User },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "security", label: "Security", icon: Lock },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        enabled ? "bg-primary" : "bg-border"
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform",
          enabled ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border/50 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("general");
  const [saved, setSaved] = useState(false);

 
  const [orgName, setOrgName] = useState("Acme Corp");
  const [timezone, setTimezone] = useState("UTC-5 (Eastern)");

 
  const [ivtThreshold, setIvtThreshold] = useState("10");
  const [autoBlock, setAutoBlock] = useState(true);
  const [geoBlocking, setGeoBlocking] = useState(true);
  const [botDetection, setBotDetection] = useState(true);
  const [clickFarmDetection, setClickFarmDetection] = useState(true);

 
  const [phoneVerification, setPhoneVerification] = useState(true);
  const [idDocumentScan, setIdDocumentScan] = useState(true);
  const [faceMatch, setFaceMatch] = useState(false);
  const [manualReviewThreshold, setManualReviewThreshold] = useState("80");

 
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalOnly, setCriticalOnly] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [slackIntegration, setSlackIntegration] = useState(false);

  
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [auditLog, setAuditLog] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout title="Settings">
      <div className="flex gap-6">
        <aside className="hidden w-48 shrink-0 lg:block">
          <div className="stat-card p-2 space-y-0.5">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.key}
                  onClick={() => setActiveSection(s.key)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    activeSection === s.key
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-accent/10 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </aside>

        
        <div className="flex-1 min-w-0 space-y-4">
          <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {sections.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSection(s.key)}
                className={cn(
                  "shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                  activeSection === s.key
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-accent/10"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>

         
          {activeSection === "general" && (
            <div className="stat-card space-y-1">
              <p className="section-title">General Settings</p>
              <SettingRow label="Organization Name" description="Displayed across the dashboard">
                <input
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="h-8 w-44 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </SettingRow>
              <SettingRow label="Timezone" description="Used for timestamps and reports">
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="h-8 w-44 rounded-md border border-border bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                >
                  <option>UTC-5 (Eastern)</option>
                  <option>UTC-6 (Central)</option>
                  <option>UTC-7 (Mountain)</option>
                  <option>UTC-8 (Pacific)</option>
                  <option>UTC+0 (GMT)</option>
                  <option>UTC+1 (CET)</option>
                </select>
              </SettingRow>
              <SettingRow label="Dashboard Theme" description="Default theme for new sessions">
                <select className="h-8 w-44 rounded-md border border-border bg-background px-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50">
                  <option>Dark</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </SettingRow>
            </div>
          )}

          
          {activeSection === "fraud" && (
            <div className="stat-card space-y-1">
              <p className="section-title">Fraud Detection Settings</p>
              <SettingRow
                label="IVT Threshold (%)"
                description="Flag campaigns exceeding this invalid traffic rate"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={ivtThreshold}
                    onChange={(e) => setIvtThreshold(e.target.value)}
                    className="h-8 w-20 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <span className="text-xs text-muted-foreground">%</span>
                </div>
              </SettingRow>
              <SettingRow
                label="Auto-Block Fraudulent Sources"
                description="Automatically block sources exceeding the IVT threshold"
              >
                <Toggle enabled={autoBlock} onChange={setAutoBlock} />
              </SettingRow>
              <SettingRow
                label="Geo Blocking"
                description="Block traffic from high-risk geographic regions"
              >
                <Toggle enabled={geoBlocking} onChange={setGeoBlocking} />
              </SettingRow>
              <SettingRow
                label="Bot Detection"
                description="Detect and filter automated bot traffic"
              >
                <Toggle enabled={botDetection} onChange={setBotDetection} />
              </SettingRow>
              <SettingRow
                label="Click Farm Detection"
                description="Identify and block click farm activity"
              >
                <Toggle enabled={clickFarmDetection} onChange={setClickFarmDetection} />
              </SettingRow>
            </div>
          )}

        
          {activeSection === "identity" && (
            <div className="stat-card space-y-1">
              <p className="section-title">Identity Verification Settings</p>
              <SettingRow
                label="Phone Number Verification"
                description="Require phone verification for new users"
              >
                <Toggle enabled={phoneVerification} onChange={setPhoneVerification} />
              </SettingRow>
              <SettingRow
                label="ID Document Scan"
                description="Enable document scanning for identity verification"
              >
                <Toggle enabled={idDocumentScan} onChange={setIdDocumentScan} />
              </SettingRow>
              <SettingRow
                label="Face Match"
                description="Compare live photo against ID document photo"
              >
                <Toggle enabled={faceMatch} onChange={setFaceMatch} />
              </SettingRow>
              <SettingRow
                label="Manual Review Threshold (%)"
                description="Send to manual review if confidence score is below this value"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={manualReviewThreshold}
                    onChange={(e) => setManualReviewThreshold(e.target.value)}
                    className="h-8 w-20 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                  />
                  <span className="text-xs text-muted-foreground">%</span>
                </div>
              </SettingRow>
            </div>
          )}

         
          {activeSection === "notifications" && (
            <div className="stat-card space-y-1">
              <p className="section-title">Notification Settings</p>
              <SettingRow
                label="Email Alerts"
                description="Receive fraud and verification alerts via email"
              >
                <Toggle enabled={emailAlerts} onChange={setEmailAlerts} />
              </SettingRow>
              <SettingRow
                label="Critical Alerts Only"
                description="Only send notifications for critical severity events"
              >
                <Toggle enabled={criticalOnly} onChange={setCriticalOnly} />
              </SettingRow>
              <SettingRow
                label="Weekly Digest"
                description="Receive a weekly summary report every Monday"
              >
                <Toggle enabled={weeklyDigest} onChange={setWeeklyDigest} />
              </SettingRow>
              <SettingRow
                label="Slack Integration"
                description="Send alerts to a Slack channel"
              >
                <Toggle enabled={slackIntegration} onChange={setSlackIntegration} />
              </SettingRow>
            </div>
          )}

        
          {activeSection === "security" && (
            <div className="stat-card space-y-1">
              <p className="section-title">Security Settings</p>
              <SettingRow
                label="Two-Factor Authentication"
                description="Require 2FA for all admin logins"
              >
                <Toggle enabled={twoFactor} onChange={setTwoFactor} />
              </SettingRow>
              <SettingRow
                label="Session Timeout (minutes)"
                description="Automatically log out after inactivity"
              >
                <input
                  type="number"
                  min="5"
                  max="480"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  className="h-8 w-20 rounded-md border border-border bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </SettingRow>
              <SettingRow
                label="Audit Log"
                description="Log all admin actions for compliance"
              >
                <Toggle enabled={auditLog} onChange={setAuditLog} />
              </SettingRow>
            </div>
          )}

        
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className={cn(
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                saved
                  ? "bg-green-500/10 text-green-400 border border-green-500/20"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              <Save className="h-4 w-4" />
              {saved ? "Saved!" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
