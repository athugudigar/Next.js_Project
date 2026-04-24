"use client";

export function FraudHotspots() {
  const hotspots = [
    { x: 22, y: 38, label: "USA",    intensity: "high"   },
    { x: 48, y: 28, label: "UK",     intensity: "medium" },
    { x: 53, y: 26, label: "Russia", intensity: "high"   },
    { x: 78, y: 42, label: "China",  intensity: "high"   },
    { x: 35, y: 65, label: "Brazil", intensity: "medium" },
    { x: 80, y: 60, label: "India",  intensity: "medium" },
  ];

  return (
    <div className="stat-card flex flex-col gap-4">
      <p className="section-title">Fraud Hotspots by Country</p>
      <div className="relative h-64 w-full overflow-hidden rounded-lg bg-background/50">
        <svg viewBox="0 0 800 400" className="absolute inset-0 h-full w-full opacity-20" fill="none">
          <ellipse cx="175" cy="150" rx="120" ry="90" fill="hsl(var(--muted-foreground))" />
          <ellipse cx="230" cy="270" rx="65"  ry="80" fill="hsl(var(--muted-foreground))" />
          <ellipse cx="400" cy="120" rx="55"  ry="50" fill="hsl(var(--muted-foreground))" />
          <ellipse cx="405" cy="250" rx="65"  ry="90" fill="hsl(var(--muted-foreground))" />
          <ellipse cx="600" cy="140" rx="140" ry="90" fill="hsl(var(--muted-foreground))" />
          <ellipse cx="650" cy="290" rx="60"  ry="45" fill="hsl(var(--muted-foreground))" />
        </svg>
        {hotspots.map((spot) => (
          <div
            key={spot.label}
            className="absolute flex flex-col items-center"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <div className={`relative h-3 w-3 rounded-full ${spot.intensity === "high" ? "bg-red-500" : "bg-yellow-500"}`}>
              <span className={`absolute inset-0 animate-ping rounded-full opacity-40 ${spot.intensity === "high" ? "bg-red-500" : "bg-yellow-500"}`} />
            </div>
            <span className="mt-0.5 text-[9px] font-medium text-foreground/70 whitespace-nowrap">
              {spot.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />High Risk
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-yellow-500" />Medium Risk
        </div>
      </div>
    </div>
  );
}
