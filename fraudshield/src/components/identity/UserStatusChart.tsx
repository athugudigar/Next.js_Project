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
    <div className="stat-card flex h-full flex-col gap-4">
      <p className="section-title">User Status Distribution</p>

      {/* Fills remaining height — chart centered */}
      <div className="flex flex-1 flex-col items-center justify-center gap-5 min-h-0">

        {/* Pie chart — fixed size so it always renders */}
        <div className="h-44 w-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={userStatusData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
              >
                {userStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-3">
          {userStatusData.map((item) => (
            <div key={item.name} className="flex items-center gap-3">
              <span
                className="h-3 w-3 shrink-0 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
