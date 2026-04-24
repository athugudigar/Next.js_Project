"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { userStatusData } from "@/data/mockData";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f1729] px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-white">{item.name}</p>
      <p className="text-sm font-bold text-indigo-400">{item.value}%</p>
    </div>
  );
}

export function UserStatusChart() {
  return (
    <div className="stat-card flex h-full flex-col space-y-4">
      <p className="section-title">User Status Distribution</p>
      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={userStatusData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
              {userStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-1.5">
        {userStatusData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <span className="font-medium text-foreground mono">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
