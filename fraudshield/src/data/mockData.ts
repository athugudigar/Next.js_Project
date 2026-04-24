export const statsData = {
  overallFraudRate: { value: "8.4%", change: "-0.5%", trend: "down" },
  totalTraffic: { value: "1,245,678", label: "clicks" },
  validTraffic: { value: "1,141,010", label: "" },
  invalidTraffic: { value: "104,668", label: "clicks" },
  revenueSaved: { value: "$3,240", label: "" },
};

export const fraudTrendData = [
  { date: "Oct 3", ivt: 12 },
  { date: "Oct 5", ivt: 18 },
  { date: "Oct 7", ivt: 8 },
  { date: "Oct 9", ivt: 22 },
  { date: "Oct 11", ivt: 15 },
  { date: "Oct 13", ivt: 30 },
  { date: "Oct 15", ivt: 25 },
  { date: "Oct 17", ivt: 20 },
  { date: "Oct 19", ivt: 35 },
  { date: "Oct 21", ivt: 28 },
  { date: "Oct 23", ivt: 18 },
  { date: "Oct 25", ivt: 22 },
];

export const fraudDistributionData = [
  { type: "Bots", value: 35 },
  { type: "Click Farm", value: 28 },
  { type: "Geo", value: 18 },
  { type: "Data Center", value: 14 },
  { type: "Hidden Ads", value: 9 },
];

export const topFraudSources = [
  { name: "Source A", value: 28, color: "#6366f1" },
  { name: "Source B", value: 24, color: "#8b5cf6" },
  { name: "Source C", value: 19, color: "#a78bfa" },
  { name: "Source D", value: 16, color: "#c4b5fd" },
  { name: "Source E", value: 13, color: "#ddd6fe" },
];

export const recentFraudIncidents = [
  {
    id: "1",
    timestamp: "Oct 25 11:32:01",
    campaignId: "C_7812",
    eventId: "E_98234",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    fraudReason: "High IVT",
    location: "NY, USA",
    ipAddress: "192.0.2.14",
    action: "Blocked",
  },
  {
    id: "2",
    timestamp: "Oct 25 11:32:01",
    campaignId: "C_7812",
    eventId: "E_88234",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    fraudReason: "High IVT",
    location: "NY, USA",
    ipAddress: "192.0.2.14",
    action: "Blocked",
  },
  {
    id: "3",
    timestamp: "Oct 25 11:32:01",
    campaignId: "C_7812",
    eventId: "E_98234",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    fraudReason: "High IVT",
    location: "NY, USA",
    ipAddress: "192.0.2.14",
    action: "Blocked",
  },
  {
    id: "4",
    timestamp: "Oct 25 11:32:01",
    campaignId: "C_7812",
    eventId: "E_89234",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    fraudReason: "High IVT",
    location: "NY, USA",
    ipAddress: "192.0.2.14",
    action: "Blocked",
  },
  {
    id: "5",
    timestamp: "Oct 25 11:32:01",
    campaignId: "C_7812",
    eventId: "E_88234",
    sourceId: "S_451 (DSP X)",
    trafficType: "Click",
    fraudReason: "High IVT",
    location: "NY, USA",
    ipAddress: "192.0.2.14",
    action: "Blocked",
  },
];

export const campaigns = [
  "All Campaigns",
  "Holiday Boost",
  "App Installs",
  "Web Traffic",
];

export const trafficSources = ["All", "DSPs", "Ad Networks", "Direct"];
export const fraudTypes = ["All", "IVT", "Bots", "Click Farming", "Geo Fraud"];
export const regions = ["Global", "North America", "Europe", "Asia", "LATAM"];

export const verificationSuccessData = [
  { day: 10, rate: 60 },
  { day: 20, rate: 45 },
  { day: 30, rate: 70 },
  { day: 40, rate: 55 },
  { day: 50, rate: 80 },
  { day: 60, rate: 65 },
  { day: 70, rate: 75 },
  { day: 80, rate: 85 },
  { day: 90, rate: 72 },
  { day: 100, rate: 90 },
];

export const userStatusData = [
  { name: "Verified", value: 60, color: "#6366f1" },
  { name: "Pending", value: 25, color: "#f59e0b" },
  { name: "Failed", value: 15, color: "#ef4444" },
];

export const verificationHistory = [
  {
    id: "1",
    date: "2023-10-27",
    userIdPhone: "+1 (555) 123-4567",
    verificationType: "Phone & ID",
    status: "Pending",
  },
  {
    id: "2",
    date: "2023-10-27",
    userIdPhone: "+1 (555) 123-4567",
    verificationType: "Phone & ID",
    status: "Pending",
  },
  {
    id: "3",
    date: "2023-10-27",
    userIdPhone: "+1 (555) 123-4567",
    verificationType: "Phone & ID",
    status: "Verified",
  },
  {
    id: "4",
    date: "2023-10-26",
    userIdPhone: "+1 (555) 987-6543",
    verificationType: "Phone",
    status: "Failed",
  },
  {
    id: "5",
    date: "2023-10-26",
    userIdPhone: "+1 (555) 456-7890",
    verificationType: "ID",
    status: "Verified",
  },
];

export const scanResults = {
  phoneNumber: "+1 (555) 123-4567",
  phoneStatus: "Verified",
  idScanProgress: 65,
  faceMatchStatus: "Comparing",
};

export const userProfile = {
  fullName: "[Scanning...]",
  dateOfBirth: "[Scanning...]",
  address: "[Scanning...]",
  nationalId: "[Scanning...]",
};