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
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar items={navItems} footer={footer} />
      <div className="flex-1 flex flex-col">
        <Header title={title} />
        <main className="flex-1 p-4 md:p-8 bg-muted overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
