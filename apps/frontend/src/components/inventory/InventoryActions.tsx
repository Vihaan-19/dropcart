import React from "react";

/**
 * InventoryActions - actions for inventory (add, bulk, etc)
 */
export function InventoryActions() {
  return (
    <div className="mb-4 flex gap-2">
      <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition">Add Product</button>
      {/* TODO: Add bulk actions, export, etc */}
    </div>
  );
}
