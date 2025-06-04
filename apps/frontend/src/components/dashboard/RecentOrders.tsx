import React from "react";
import { Card } from "@/components/ui/card";
import { Order, OrderRow } from "./OrderRow";

interface RecentOrdersProps {
  orders: Order[];
}

/**
 * RecentOrders - shows a list of recent orders in a card.
 */
export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card>
      <div className="font-semibold mb-2">Recent Orders</div>
      <div className="space-y-3">
        {orders.length === 0 ? (
          <div className="text-muted-foreground text-sm">No recent orders.</div>
        ) : (
          orders.map((order) => <OrderRow key={order.id} order={order} />)
        )}
      </div>
    </Card>
  );
}
