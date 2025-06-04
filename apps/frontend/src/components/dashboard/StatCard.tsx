import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: string;
  changeColor?: string;
  className?: string;
}

/**
 * StatCard - shows a dashboard metric with optional icon and change indicator.
 */
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from "@heroicons/react/24/solid";

export function StatCard({ label, value, icon, change, changeColor, className }: StatCardProps) {
  // Detect if change is positive or negative for arrow
  const isPositive = change && change.trim().startsWith("+");
  const isNegative = change && change.trim().startsWith("-");

  return (
    <section
      className={cn(
        "rounded-xl p-5 shadow-sm border bg-card text-card-foreground flex flex-row items-center gap-4",
        className
      )}
      aria-label={`Stat: ${label}`}
    >
      {/* Icon on left */}
      {icon && <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted text-muted-foreground shrink-0">{icon}</div>}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="text-xs font-medium text-muted-foreground truncate">{label}</div>
        <div className="text-2xl font-bold leading-tight">{value}</div>
        {change && (
          <div className={cn("flex items-center gap-1 text-xs mt-1", changeColor)}>
            {/* Up/down arrow if change is present */}
            {isPositive && <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" aria-label="increase" />}
            {isNegative && <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" aria-label="decrease" />}
            <span>{change.replace(/^[-+]/, "")}</span>
          </div>
        )}
      </div>
    </section>
  );
}
