"use client";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      
      <Sidebar />

      
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar title={title} />
        <main className="flex flex-1 flex-col overflow-y-auto scrollbar-thin p-6">
          {children}
        </main>
      </div>
    </div>
  );
}