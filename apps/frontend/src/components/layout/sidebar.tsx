import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface SidebarProps {
  items: SidebarNavItem[];
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Sidebar navigation component
 * - Accepts nav items (label, href, icon, active)
 * - Highlights active item
 * - Themed and accessible
 */
export function Sidebar({ items, footer, className }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col w-64 bg-background border-r border-border p-4 text-foreground",
        className
      )}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center mb-8">
        <span className="text-2xl font-extrabold text-orange-600">DropCart</span>
      </div>
      <nav className="flex-1 space-y-1" aria-label="Main">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition",
              item.active
                ? "bg-orange-500 text-white dark:bg-orange-600 dark:text-white shadow"
                : "text-foreground hover:bg-muted"
            )}
            aria-current={item.active ? "page" : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      {footer && <div className="mt-auto">{footer}</div>}
    </aside>
  );
}
