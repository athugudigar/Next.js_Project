export interface StatCard {
  value: string;
  change?: string;
  trend?: "up" | "down";
  label?: string;
}

export interface FraudIncident {
  id: string;
  timestamp: string;
  campaignId: string;
  eventId: string;
  sourceId: string;
  trafficType: string;
  fraudReason: string;
  location: string;
  ipAddress: string;
  action: "Blocked" | "Flagged" | "Allowed";
}

export interface ChartDataPoint {
  date?: string;
  day?: number;
  ivt?: number;
  rate?: number;
  type?: string;
  value?: number;
}

export interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface VerificationRecord {
  id: string;
  date: string;
  userIdPhone: string;
  verificationType: string;
  status: "Pending" | "Verified" | "Failed";
}

export interface FilterState {
  dateRange: string;
  campaign: string;
  trafficSource: string;
  fraudType: string;
  region: string;
}