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

        
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-5 items-stretch">

          <div className="xl:col-span-3 flex flex-col gap-5">

            <IdentityScanning />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 flex-1 items-stretch">
              <UserProfile />
              <VerificationChart />
            </div>

          </div>

          <div className="xl:col-span-2 flex flex-col gap-5">
            <ScanResults />
            <UserStatusChart />
          </div>

        </div>

      
        <div className="flex-1 min-h-0">
          <VerificationHistory />
        </div>

      </div>
    </DashboardLayout>
  );
}
