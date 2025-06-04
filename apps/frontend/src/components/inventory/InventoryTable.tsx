import React from "react";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  vendor: string;
  updatedAt: string;
}

interface InventoryTableProps {
  items: InventoryItem[];
}

/**
 * InventoryTable - displays a responsive, sortable table of inventory items.
 */
export function InventoryTable({ items }: InventoryTableProps) {
  if (!items.length) {
    return <div className="text-muted-foreground text-center py-10">No inventory items found.</div>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border bg-card text-card-foreground">
      <table className="min-w-full text-sm">
        <thead className="bg-muted">
          <tr>
            <th className="px-4 py-2 text-left font-semibold">Product</th>
            <th className="px-4 py-2 text-left font-semibold">SKU</th>
            <th className="px-4 py-2 text-right font-semibold">Quantity</th>
            <th className="px-4 py-2 text-right font-semibold">Price</th>
            <th className="px-4 py-2 text-left font-semibold">Vendor</th>
            <th className="px-4 py-2 text-left font-semibold">Last Updated</th>
            <th className="px-4 py-2 text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-t">
              <td className="px-4 py-2 font-medium">{item.name}</td>
              <td className="px-4 py-2">{item.sku}</td>
              <td className="px-4 py-2 text-right">{item.quantity}</td>
              <td className="px-4 py-2 text-right">${item.price.toFixed(2)}</td>
              <td className="px-4 py-2">{item.vendor}</td>
              <td className="px-4 py-2">{item.updatedAt}</td>
              <td className="px-4 py-2 text-center">
                {/* TODO: Edit/Delete buttons */}
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
