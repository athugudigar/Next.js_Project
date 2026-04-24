import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsCards } from "@/components/ad-fraud/StatsCards";
import { FraudTrendChart } from "@/components/ad-fraud/FraudTrendChart";
import { FraudDistributionChart } from "@/components/ad-fraud/FraudDistributionChart";
import { FraudHotspots } from "@/components/ad-fraud/FraudHotspots";
import { TopFraudSources } from "@/components/ad-fraud/TopFraudSources";
import { RecentIncidents } from "@/components/ad-fraud/RecentIncidents";
import { FiltersPanel } from "@/components/ad-fraud/FiltersPanel";

export default function AdFraudPage() {
  return (
    <DashboardLayout title="Ad Fraud Detection Dashboard">
      <div className="flex h-full gap-5">

        
        <aside className="hidden w-52 shrink-0 lg:flex lg:flex-col min-h-0">
          <FiltersPanel />
        </aside>

        
        <div className="flex flex-1 flex-col gap-5 min-w-0">

          
          <StatsCards />

          
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            <FraudTrendChart />
            <FraudDistributionChart />
            <FraudHotspots />
          </div>

         
          <div className="grid flex-1 grid-cols-1 gap-5 xl:grid-cols-5 min-h-0 items-stretch">
            <div className="xl:col-span-2 flex flex-col">
              <TopFraudSources />
            </div>
            <div className="xl:col-span-3 flex flex-col">
              <RecentIncidents />
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
