import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { IdentityScanning } from "@/components/identity/IdentityScanning";
import { ScanResults } from "@/components/identity/ScanResults";
import { UserProfile } from "@/components/identity/UserProfile";
import { VerificationChart } from "@/components/identity/VerificationChart";
import { VerificationHistory } from "@/components/identity/VerificationHistory";
import { UserStatusChart } from "@/components/identity/UserStatusChart";

export default function IdentityPage() {
  return (
    <DashboardLayout title="Identity Verification & User Dashboard">
      <div className="flex h-full flex-col gap-5">

        {/* ── Row 1: 3 columns, equal height ── */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3 items-stretch">
          <div className="xl:col-span-1 flex flex-col">
            <IdentityScanning />
          </div>
          <div className="xl:col-span-1 flex flex-col gap-5">
            <UserProfile />
            <VerificationChart />
          </div>
          <div className="xl:col-span-1 flex flex-col">
            <ScanResults />
          </div>
        </div>

        {/* ── Row 2: fills remaining page height ── */}
        <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-3 items-stretch min-h-0">
          <div className="xl:col-span-2 flex flex-col min-h-0">
            <VerificationHistory />
          </div>
          <div className="xl:col-span-1 flex flex-col min-h-0">
            <UserStatusChart />
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
