import React from "react";
import { Sidebar, SidebarNavItem } from "./sidebar";
import { Header } from "./header";

interface AppLayoutProps {
  navItems: SidebarNavItem[];
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * AppLayout - main dashboard shell
 * Composes Sidebar and Header for consistent layout
 */
export function AppLayout({ navItems, title, children, footer }: AppLayoutProps) {
  return (
    <div className="flex bg-background text-foreground min-h-screen">
      {/* Fixed Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 z-20 border-r border-border bg-background">
        <Sidebar items={navItems} footer={footer} />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-64">
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <Header title={title} />
        </div>
        {/* Scrollable Main Content */}
        <main className="flex-1 p-4 md:p-8 bg-muted overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
