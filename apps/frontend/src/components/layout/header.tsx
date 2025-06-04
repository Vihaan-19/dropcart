import React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  children?: React.ReactNode; // For actions (theme toggle, etc.)
  className?: string;
}

/**
 * Topbar/Header component
 * - Shows page title, user info, and actions
 * - Themed and accessible
 */
export function Header({ title, children, className }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-border bg-background text-foreground",
        className
      )}
      aria-label="Page header"
    >
      <h1 className="text-xl font-bold tracking-tight truncate" title={title}>{title}</h1>
      <div className="flex items-center gap-4">
        {children}
        {/* Placeholder avatar/user info (replace with real user data later) */}
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">A</span>
          <span className="hidden md:inline text-sm font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
}
