
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { StatsCards } from "@/components/ad-fraud/StatsCards";
import { RecentIncidents } from "@/components/ad-fraud/RecentIncidents";
import { FiltersPanel } from "@/components/ad-fraud/FiltersPanel";
import { VerificationHistory } from "@/components/identity/VerificationHistory";
import { UserProfile } from "@/components/identity/UserProfile";
import { recentFraudIncidents, verificationHistory, statsData } from "@/data/mockData";

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: jest.fn() }),
}));



jest.mock("recharts", () => ({
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Line: () => null,
  Bar: () => null,
  Area: () => null,
  Pie: () => null,
  Cell: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  Legend: () => null,
  ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
}));



jest.mock("next/navigation", () => ({
  usePathname: () => "/ad-fraud",
}));



describe("StatsCards", () => {
  it("renders all 5 stat cards", () => {
    render(<StatsCards />);
    expect(screen.getByText(/Overall Fraud Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Traffic/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Valid Traffic/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Invalid Traffic/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Revenue Saved/i)).toBeInTheDocument();
  });

  it("displays correct fraud rate value", () => {
    render(<StatsCards />);
    expect(screen.getByText(statsData.overallFraudRate.value)).toBeInTheDocument();
  });

  it("displays revenue saved correctly", () => {
    render(<StatsCards />);
    expect(screen.getByText(statsData.revenueSaved.value)).toBeInTheDocument();
  });

  it("shows trend change indicator", () => {
    render(<StatsCards />);
    expect(screen.getByText(statsData.overallFraudRate.change!)).toBeInTheDocument();
  });
});


describe("RecentIncidents", () => {
  it("renders the table headers", () => {
    render(<RecentIncidents />);
    expect(screen.getByText(/Timestamp/i)).toBeInTheDocument();
    expect(screen.getByText(/Campaign ID/i)).toBeInTheDocument();
    expect(screen.getByText(/IP Address/i)).toBeInTheDocument();
    expect(screen.getByText(/Action/i)).toBeInTheDocument();
  });

  it("renders correct number of incident rows", () => {
    render(<RecentIncidents />);
    const rows = screen.getAllByText("Blocked");
    expect(rows.length).toBe(recentFraudIncidents.length);
  });

  it("shows timestamp for first incident", () => {
    render(<RecentIncidents />);
    expect(screen.getAllByText("Oct 25 11:32:01")[0]).toBeInTheDocument();
  });

  it("shows campaign ID in rows", () => {
    render(<RecentIncidents />);
    const cells = screen.getAllByText("C_7812");
    expect(cells.length).toBeGreaterThan(0);
  });
});



  it("renders date range button", () => {
    render(<FiltersPanel />);
    expect(screen.getByText(/Oct 1 – Oct 25, 2024/i)).toBeInTheDocument();
  });

  it("renders all filter group labels", () => {
    render(<FiltersPanel />);
    expect(screen.getAllByText(/Campaigns/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Traffic Sources/i)).toBeInTheDocument();
    expect(screen.getByText(/Fraud Types/i)).toBeInTheDocument();
    expect(screen.getByText(/Region/i)).toBeInTheDocument();
  });

  it("resets filters when reset button is clicked", () => {
    render(<FiltersPanel />);
  
    fireEvent.click(screen.getByText("IVT"));
    
    fireEvent.click(screen.getByText("Reset"));
    
    expect(screen.getAllByText("All")[0]).toBeInTheDocument();
  });

  it("allows selecting a campaign filter", () => {
    render(<FiltersPanel />);
    fireEvent.click(screen.getByText("Holiday Boost"));
    expect(screen.getByText("Holiday Boost")).toBeInTheDocument();
  });



describe("VerificationHistory", () => {
  it("renders table headers", () => {
    render(<VerificationHistory />);
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/User ID\/Phone/i)).toBeInTheDocument();
    expect(screen.getByText(/Verification Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Status/i)).toBeInTheDocument();
  });

  it("renders correct number of history rows", () => {
    render(<VerificationHistory />);
    const viewButtons = screen.getAllByText("View Details");
    expect(viewButtons.length).toBe(verificationHistory.length);
  });

  it("shows correct status badges", () => {
    render(<VerificationHistory />);
    const pendingBadges = screen.getAllByText("Pending");
    expect(pendingBadges.length).toBeGreaterThan(0);
  });

  it("shows verified badge for verified records", () => {
    render(<VerificationHistory />);
    expect(screen.getAllByText("Verified")[0]).toBeInTheDocument();
  });

  it("shows failed badge for failed records", () => {
    render(<VerificationHistory />);
    expect(screen.getByText("Failed")).toBeInTheDocument();
  });
});



describe("UserProfile", () => {
  it("renders all profile fields", () => {
    render(<UserProfile />);
    expect(screen.getByText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByText(/Address/i)).toBeInTheDocument();
    expect(screen.getByText(/National ID/i)).toBeInTheDocument();
  });

  it("shows scanning state for all fields", () => {
    render(<UserProfile />);
    const scanningTexts = screen.getAllByText("[Scanning...]");
    expect(scanningTexts.length).toBe(4);
  });

  it("shows verifying profile button", () => {
    render(<UserProfile />);
    expect(screen.getByText("Verifying Profile")).toBeInTheDocument();
  });
});



describe("ThemeToggle", () => {
  it("renders theme toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("has accessible label", () => {
    render(<ThemeToggle />);
    expect(screen.getByText("Toggle theme")).toBeInTheDocument();
  });
});



describe("Mock Data", () => {
  it("fraud incidents have all required fields", () => {
    recentFraudIncidents.forEach((incident) => {
      expect(incident).toHaveProperty("id");
      expect(incident).toHaveProperty("timestamp");
      expect(incident).toHaveProperty("campaignId");
      expect(incident).toHaveProperty("action");
      expect(incident.action).toBe("Blocked");
    });
  });

  it("verification history has valid status values", () => {
    const validStatuses = ["Pending", "Verified", "Failed"];
    verificationHistory.forEach((record) => {
      expect(validStatuses).toContain(record.status);
    });
  });

  it("stats data has all required properties", () => {
    expect(statsData).toHaveProperty("overallFraudRate");
    expect(statsData).toHaveProperty("totalTraffic");
    expect(statsData).toHaveProperty("validTraffic");
    expect(statsData).toHaveProperty("invalidTraffic");
    expect(statsData).toHaveProperty("revenueSaved");
  });
});