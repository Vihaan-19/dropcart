import React from "react";
import { cn } from "@/lib/utils";

export interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  status: string;
  price: string;
  statusColor: string;
}

interface OrderRowProps {
  order: Order;
}

/**
 * OrderRow - displays a single order in the recent orders list/table.
 */
export function OrderRow({ order }: OrderRowProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
      <div>
        <div className="font-medium">{order.id}</div>
        <div className="text-xs text-muted-foreground">{order.customer} &bull; {order.product}</div>
        <div className="text-xs text-muted-foreground/70">{order.date}</div>
      </div>
      <div className="flex items-center gap-4">
        <span className={cn("px-2 py-1 rounded-full text-xs font-semibold", order.statusColor)}>{order.status}</span>
        <span className="font-bold">{order.price}</span>
      </div>
    </div>
  );
}
