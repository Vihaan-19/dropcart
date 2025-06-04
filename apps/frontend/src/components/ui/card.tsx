import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Reusable Card component for content containers.
 * - Uses shadcn/ui conventions
 * - Typed
 * - Accepts extra className
 */
export function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card text-card-foreground shadow-sm border border-border p-5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
