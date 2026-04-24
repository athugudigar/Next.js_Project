"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { topFraudSources } from "@/data/mockData";

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-[#0f1729] px-3 py-2 shadow-xl">
      <p className="text-xs font-semibold text-white">{item.name}</p>
      <p className="text-sm font-bold text-indigo-400">{item.value}% share</p>
    </div>
  );
}

export function TopFraudSources() {
  return (
    <div className="stat-card flex h-full flex-col gap-4">
      <p className="section-title">Top 5 Fraudulent Sources</p>

      <div className="flex flex-1 items-center justify-center min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={topFraudSources}
              cx="50%"
              cy="50%"
              innerRadius="35%"
              outerRadius="60%"
              paddingAngle={3}
              dataKey="value"
            >
              {topFraudSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {topFraudSources.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-muted-foreground truncate">{item.name}</span>
            </div>
            <span className="ml-2 shrink-0 font-semibold text-foreground mono">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
