"use client";

import { Button } from "@/components/ui/button";
import { userProfile } from "@/data/mockData";

export function UserProfile() {
  const fields = [
    { label: "Full Name", value: userProfile.fullName },
    { label: "Date of Birth", value: userProfile.dateOfBirth },
    { label: "Address", value: userProfile.address },
    { label: "National ID", value: userProfile.nationalId },
  ];

  return (
    <div className="stat-card flex h-full flex-col space-y-4">
      <div className="flex items-center justify-between">
        <p className="section-title mb-0">User Profile Information</p>
        <Button size="sm" variant="outline" className="text-xs border-primary/30 text-primary hover:bg-primary/10">
          Verifying Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">{field.label}</p>
            <p className="text-sm font-medium text-foreground mono animate-pulse">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}